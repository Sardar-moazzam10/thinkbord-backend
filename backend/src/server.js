import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import cors from 'cors';
import { connectDB } from './connection/db.js';
import notesRouter from './router/notesRouter.js';
import ratelimitmiddleware from './middleware/rateLimit.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
        })
    );
}
// // ✅ JSON Body Parser
app.use(express.json());

// ✅ Rate Limiting
app.use('/api', ratelimitmiddleware);
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method} | Request URL: ${req.url}`);
//     next();
// });

app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; style-src 'self' https://cdn.jsdelivr.net; script-src 'self';"
    );
    next();
});

// ✅ Notes Routes
app.use("/api/notes", notesRouter);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("❌ Failed to connect to DB", err);
});
