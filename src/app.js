import express from "express";
import router from "./routes/v1/index.js";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import morgan from "morgan";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    })
);

app.use("/api/v1", router);

app.get("/", async (req, res) => {
    res.json({
        message: "Skills House server is running..."
    });
});

app.use(globalErrorHandler);

export default app;
