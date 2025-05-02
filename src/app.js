import express from "express";
import router from "./routes/v1/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", async (req, res) => {
    res.json({
        message: "Skills House server is running..."
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error.",
    });
});

export default app;