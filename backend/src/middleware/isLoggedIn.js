// middleware/isLoggedIn.js (or .ts)
import { auth } from "../lib/auth.js";

const isLoggedIn = async (req, res, next) => {
  try {
    // Pass the incoming request headers to getSession
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Optionally attach session to req for later use
    req.user = session.user;
    req.session = session;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default isLoggedIn;
