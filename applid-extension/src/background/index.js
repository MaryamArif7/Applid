
"use strict";

const STORAGE_KEY = "applid_submissions";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[Applid BG] Message received:", message.type);

  switch (message.type) {
    case "SAVE_SUBMISSION":
      handleSaveSubmission(message.payload, sendResponse);
      return true;

    case "GET_SUBMISSIONS":
      handleGetSubmissions(sendResponse);
      return true;

    case "UPDATE_STATUS":
      handleUpdateStatus(message.payload, sendResponse);
      return true;

    case "DELETE_SUBMISSION":
      handleDeleteSubmission(message.payload.id, sendResponse);
      return true;

    default:
      console.warn("[Applid BG] Unknown message type:", message.type);
  }
});

async function handleSaveSubmission(submission, sendResponse) {
  try {
    const existing = await getSubmissions();

    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    const isDuplicate = existing.some(
      (s) =>
        s.url === submission.url &&
        new Date(s.submittedAt).getTime() > fiveMinutesAgo
    );

    if (isDuplicate) {
      console.log("[Applid BG] Duplicate submission ignored:", submission.url);
      sendResponse({ success: false, reason: "duplicate" });
      return;
    }

    const updated = [submission, ...existing];
    await chrome.storage.local.set({ [STORAGE_KEY]: updated });

    console.log("[Applid BG] Submission saved. Total:", updated.length);

    showNotification(submission.title);

    sendResponse({ success: true, total: updated.length });
  } catch (err) {
    console.error("[Applid BG] Save error:", err);
    sendResponse({ success: false, error: err.message });
  }
}

async function handleGetSubmissions(sendResponse) {
  try {
    const submissions = await getSubmissions();
    sendResponse({ success: true, submissions });
  } catch (err) {
    console.error("[Applid BG] Get error:", err);
    sendResponse({ success: false, error: err.message });
  }
}


async function handleUpdateStatus({ id, status }, sendResponse) {
  try {
    const submissions = await getSubmissions();
    const updated = submissions.map((s) =>
      s.id === id ? { ...s, status } : s
    );
    await chrome.storage.local.set({ [STORAGE_KEY]: updated });
    sendResponse({ success: true });
  } catch (err) {
    console.error("[Applid BG] Update error:", err);
    sendResponse({ success: false, error: err.message });
  }
}

async function handleDeleteSubmission(id, sendResponse) {
  try {
    const submissions = await getSubmissions();
    const updated = submissions.filter((s) => s.id !== id);
    await chrome.storage.local.set({ [STORAGE_KEY]: updated });
    sendResponse({ success: true });
  } catch (err) {
    console.error("[Applid BG] Delete error:", err);
    sendResponse({ success: false, error: err.message });
  }
}


async function getSubmissions() {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return result[STORAGE_KEY] || [];
}


function showNotification(formTitle) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Applid — Application tracked ✓",
    message: formTitle || "Your submission has been saved.",
    priority: 1,
  });
}



chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("[Applid BG] Extension installed. Welcome!");

    chrome.storage.local.set({ [STORAGE_KEY]: [] });
  }
});
