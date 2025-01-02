import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Skills House server is running..."
    });
});

export default app;