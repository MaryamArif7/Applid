import supabase from "../db/supabase.js";

/**
 * Middleware that verifies the Bearer token sent by the extension or frontend.
 * Attaches req.user to every authenticated request.
 *
 * Usage: router.get("/submissions", authenticate, handler)
 */
export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = data.user;
  next();
}
