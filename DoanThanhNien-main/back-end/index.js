import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./src/routers/userRouter.js";
import buyRouter from "./src/routers/buyRouter.js";

const app = express();
dotenv.config();
const corsOptions = {
  credentials: true, // This is important.
  origin: true,
};
app.use(cors(corsOptions));

//connection to database
mongoose
  .connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// router for user
app.use("/api/user", userRouter);

// router cho mua sản phẩm
app.use("/api/product", buyRouter);

app.listen(8800, () => {
  console.log("Server is running");
});
