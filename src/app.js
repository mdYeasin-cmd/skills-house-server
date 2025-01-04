import express from "express";
import router from "./routes/v1/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.get("/", async (req, res) => {
    res.json({
        message: "Skills House server is running..."
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

export default app;