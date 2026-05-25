import supabase from "../db/supabase.js";

/**
 * GET /submissions
 * Returns all submissions for the authenticated user, newest first.
 */
export async function getSubmissions(req, res) {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("user_id", userId)
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error("[Controller] getSubmissions error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ submissions: data });
}

/**
 * GET /submissions/:id
 * Returns a single submission with its answers.
 */
export async function getSubmission(req, res) {
  const userId = req.user.id;
  const { id } = req.params;

  const { data, error } = await supabase
    .from("submissions")
    .select("*, answers(*)")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    return res.status(404).json({ error: "Submission not found" });
  }

  res.json({ submission: data });
}

/**
 * POST /submissions
 * Called by the Chrome extension when a form is submitted.
 * Body: { title, url, answers: [{question, answer}], submittedAt }
 */
export async function createSubmission(req, res) {
  const userId = req.user.id;
  const { title, url, answers = [], submittedAt } = req.body;

  if (!title || !url) {
    return res.status(400).json({ error: "title and url are required" });
  }

  // ── Duplicate check: same URL submitted in the last 5 minutes ──
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const { data: existing } = await supabase
    .from("submissions")
    .select("id")
    .eq("user_id", userId)
    .eq("url", url)
    .gte("submitted_at", fiveMinutesAgo)
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: "duplicate", message: "Already tracked this submission recently." });
  }

  // ── Insert submission ──
  const { data: submission, error: subError } = await supabase
    .from("submissions")
    .insert({
      user_id: userId,
      title,
      url,
      submitted_at: submittedAt || new Date().toISOString(),
      status: "submitted",
    })
    .select()
    .single();

  if (subError) {
    console.error("[Controller] createSubmission error:", subError);
    return res.status(500).json({ error: subError.message });
  }

  // ── Insert answers (bulk) ──
  if (answers.length > 0) {
    const answerRows = answers.map((a) => ({
      submission_id: submission.id,
      user_id: userId,
      question: a.question,
      answer: a.answer,
    }));

    const { error: ansError } = await supabase
      .from("answers")
      .insert(answerRows);

    if (ansError) {
      console.error("[Controller] answers insert error:", ansError);
      // Don't fail the whole request — submission is saved, answers failed
    }
  }

  res.status(201).json({ submission });
}

/**
 * PATCH /submissions/:id
 * Update the status of a submission.
 * Body: { status: "submitted" | "waiting" | "heard_back" | "accepted" | "rejected" }
 */
export async function updateSubmissionStatus(req, res) {
  const userId = req.user.id;
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["submitted", "waiting", "heard_back", "accepted", "rejected"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${validStatuses.join(", ")}` });
  }

  const { data, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return res.status(404).json({ error: "Submission not found or not yours" });
  }

  res.json({ submission: data });
}

/**
 * DELETE /submissions/:id
 */
export async function deleteSubmission(req, res) {
  const userId = req.user.id;
  const { id } = req.params;

  const { error } = await supabase
    .from("submissions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return res.status(404).json({ error: "Submission not found or not yours" });
  }

  res.json({ success: true });
}
