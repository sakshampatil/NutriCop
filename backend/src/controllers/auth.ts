import { NextFunction, Response, Request } from "express";
import { db } from "../db";
import { UserI } from "../types/types";
import { BadRequest } from "../service/errorHandler";
import { users } from "../schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { responseHandler } from "../service/responseHandler";

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

    const user = await db
      .insert(users)
      .values({ email: body.email, name: body.name })
      .onConflictDoUpdate({
        target: users.id,
        set: { name: body.name },
        where: eq(body.email, users.email),
      });

    responseHandler(res, user);
  } catch (err) {
    next(err);
  }
};
