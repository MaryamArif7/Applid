import supabase from "../db/supabase.js";

/**
 * GET /answers
 * Returns all saved answers for the user, grouped by question similarity.
 * This powers the Answer Library feature.
 */
export async function getAnswers(req, res) {
  const userId = req.user.id;
  const { search } = req.query;

  let query = supabase
    .from("answers")
    .select("*, submissions(title, url, submitted_at)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  // Basic search filter
  if (search) {
    query = query.ilike("question", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ answers: data });
}
