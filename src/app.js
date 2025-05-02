import express from "express";
import router from "./routes/v1/index.js";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", async (req, res) => {
    res.json({
        message: "Skills House server is running..."
    });
});

app.use(globalErrorHandler);

export default app;
