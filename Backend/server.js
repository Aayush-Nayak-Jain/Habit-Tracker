import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js"
import logRoutes from "./routes/logs.js";
import {connectDB} from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorHandler.js";

const app= express();

const allowedOrigins= (process.env.CLIENT_URL || "")
    .split(",")
    .map((s)=> s.trim())
    .filter(Boolean);

const corsOptions= {
    origin: (origin, callback) => {
        //allow requests with no origin 
        if(!origin) return callback(null, true);
        //allow requests from localhost
        if(/^https?:\/\/(?:localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
            return callback(null, true);
        //allow requests from allowed origins
        if(allowedOrigins.includes(origin))
            return callback(null, true);
        return callback(new Error(`Origin ${origin} Not allowed by CORS`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => 
    res.status(200).json({ message: "API is healthy" , status:"ok", time: new Date().toISOString() })
);

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/logs", logRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT= process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on  http://localhost:${PORT}`);
    });
}); 

