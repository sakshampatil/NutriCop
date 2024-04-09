"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const users_1 = require("../schema/users");
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const signIn = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body.email) {
            throw new errorHandler_1.BadRequest("Bad Request!");
        }
        const existsQuery = (0, drizzle_orm_1.sql) `
  SELECT EXISTS(${db_1.db
            .select({ n: (0, drizzle_orm_1.sql) `1` })
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.email, body.email))}) AS exists
`;
        const result = await db_1.db.execute(existsQuery);
        const recordExists = result[0].exists;
        let user;
        if (recordExists) {
            //update name
            user = await db_1.db
                .update(users_1.users)
                .set({ name: body.name })
                .where((0, drizzle_orm_1.eq)(users_1.users.email, body.email))
                .returning({ id: users_1.users.id });
        }
        else {
            //insert user
            user = await db_1.db
                .insert(users_1.users)
                .values({ email: body.email, name: body.name })
                .returning({ id: users_1.users.id });
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
        const token = await jsonwebtoken_1.default.sign({ email: body.email, userId: user[0].id }, process.env.SECRET_KEY);
        res.send({
            token: token,
        });
        // responseHandler(res, user);
    }
    catch (err) {
        next(err);
    }
};
exports.signIn = signIn;
