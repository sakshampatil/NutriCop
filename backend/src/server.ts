import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes";
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

//routes
routes(app);

//starting server
app.listen(port, (err?: Error) => {
  if (err) {
    console.log(err);
  }
  console.log(`serving is up and running on port:${port}`);
});
