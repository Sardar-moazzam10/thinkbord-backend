// middleware/ratelimit.js
import rateLimit from "express-rate-limit";
const ratelimitmiddleware = rateLimit({
    windowMs: 20 * 20 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again in 15 minutes",
});
export default ratelimitmiddleware;
