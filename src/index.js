import app from "./app.js";
import "./db/index.js";

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Skills house server running at http://${hostname}:${port}`);
});

export default app;