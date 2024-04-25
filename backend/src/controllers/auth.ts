import { NextFunction, Response, Request } from "express";
import { db } from "../db";
import { IGetUserAuthInfoRequest, IUser } from "../types/types";
import { BadRequest } from "../service/errorHandler";
import { users } from "../schema/users";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { responseHandler } from "../service/responseHandler";
import jwt from "jsonwebtoken";

// export const signup = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const body = req.body as UserI | null;
//     if (!body?.name || !body?.email || !body.password) {
//       throw new BadRequest("Bad Request!");
//     }

//     const email = await db.query.users.findFirst({
//       where: eq(users.email, body.email),
//     });

//     if (email) {
//       throw new BadRequest("Email already exists!");
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(body.password, salt);
//     body.password = hashPassword;

//     const user = await db.insert(users).values(body);
//     responseHandler(res, user);
//   } catch (err) {
//     next(err);
//   }
// };

// export const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const body = req.body;
//     if (!body.email || !body.password) {
//       throw new BadRequest("Bad Request!");
//     }

//     const user = await db.query.users.findFirst({
//       where: eq(users.email, body.email),
//     });

//     if (!user) {
//       throw new BadRequest("User does not exists!");
//     }

//     const passResult = await bcrypt.compare(body.password, user.password);
//     if (!passResult) {
//       throw new BadRequest("Incorrect password!");
//     }

//     responseHandler(res, user);
//   } catch (err) {
//     next(err);
//   }
// };

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;

    if (!body.email) {
      throw new BadRequest("Bad Request!");
    }

    const existsQuery = sql`
  SELECT EXISTS(${db
    .select({ n: sql`1` })
    .from(users)
    .where(eq(users.email, body.email))}) AS exists
`;

    const result = await db.execute<{ exists: boolean }>(existsQuery);
    const recordExists = result[0].exists;
    let user;
    if (recordExists) {
      //update name
      user = await db
        .update(users)
        .set({ name: body.name })
        .where(eq(users.email, body.email))
        .returning({
          id: users.id,
          targetProteins: users.targetProteins,
          targetCalories: users.targetCalories,
        });
    } else {
      //insert user
      user = await db.insert(users).values({ email: body.email, name: body.name }).returning({
        id: users.id,
        targetProteins: users.targetProteins,
        targetCalories: users.targetCalories,
      });
    }

    console.log("exists = ", recordExists);
    // const user = await db
    //   .insert(users)
    //   .values({ email: body.email, name: body.name })
    //   .onConflictDoUpdate({
    //     target: users.id,
    //     set: { name: body.name },
    //     where: eq(body.email, users.email),
    //   });
    console.log("uss = ", user);
    const token = await jwt.sign(
      { email: body.email, userId: user[0].id },
      process.env.SECRET_KEY as string
    );
    res.send({
      token: token,
      targetProteins: user[0].targetProteins,
      targetCalories: user[0].targetCalories,
    });

    // responseHandler(res, user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    const target = await db.query.users.findFirst({
      where: eq(users.id, Number(req?.user)),
    });
    responseHandler(res, target);
  } catch (err) {
    next(err);
  }
};

export const updateTarget = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    if (!body.targetProteins || !body.targetCalories) {
      throw new BadRequest("Bad Request!");
    }

    const updatedUser = await db
      .update(users)
      .set({ targetCalories: body.targetCalories, targetProteins: body.targetProteins })
      .where(eq(users.id, Number(req?.user)));

    responseHandler(res, updatedUser);
  } catch (err) {
    next(err);
  }
};
