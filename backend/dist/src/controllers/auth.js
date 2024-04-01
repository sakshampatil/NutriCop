"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const db_1 = require("../db");
const errorHandler_1 = require("../service/errorHandler");
const users_1 = require("../schema/users");
const drizzle_orm_1 = require("drizzle-orm");
const responseHandler_1 = require("../service/responseHandler");
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
        const user = await db_1.db
            .insert(users_1.users)
            .values({ email: body.email, name: body.name })
            .onConflictDoUpdate({
            target: users_1.users.id,
            set: { name: body.name },
            where: (0, drizzle_orm_1.eq)(body.email, users_1.users.email),
        });
        (0, responseHandler_1.responseHandler)(res, user);
    }
    catch (err) {
        next(err);
    }
};
exports.signIn = signIn;
