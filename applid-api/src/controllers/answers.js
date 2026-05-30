import supabase from "../db/supabase.js";
export async function getAnswers(req, res) {
  const userId = req.user.id;
  const { search } = req.query;

  let query = supabase
    .from("answers")
    .select("*, submissions(title, url, submitted_at)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("question", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ answers: data });
}
