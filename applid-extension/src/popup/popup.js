
"use strict";


const countEl = document.getElementById("count");
const emptyState = document.getElementById("empty-state");
const submissionsList = document.getElementById("submissions-list");
const clearBtn = document.getElementById("clear-btn");


const STATUSES = [
  { value: "submitted", label: "Submitted" },
  { value: "waiting", label: "Waiting" },
  { value: "heard_back", label: "Heard back" },
  { value: "accepted", label: "Accepted 🎉" },
  { value: "rejected", label: "Rejected" },
];

document.addEventListener("DOMContentLoaded", loadSubmissions);
clearBtn.addEventListener("click", handleClearAll);



function loadSubmissions() {
  chrome.runtime.sendMessage({ type: "GET_SUBMISSIONS" }, (response) => {
    if (chrome.runtime.lastError || !response?.success) {
      console.error("[Applid Popup] Failed to load:", chrome.runtime.lastError);
      return;
    }
    render(response.submissions);
  });
}

function render(submissions) {
  const total = submissions.length;


  countEl.textContent = `${total} tracked`;

  if (total === 0) {
    emptyState.classList.remove("hidden");
    submissionsList.classList.remove("visible");
    return;
  }

  emptyState.classList.add("hidden");
  submissionsList.classList.add("visible");
  submissionsList.innerHTML = "";

  submissions.forEach((sub, index) => {
    const li = document.createElement("li");
    li.className = "sub-item";
    li.dataset.id = sub.id;

    const date = formatDate(sub.submittedAt);
    const answerCount = sub.answers?.length || 0;

    li.innerHTML = `
      <div class="sub-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="sub-body">
        <div class="sub-title" title="${escapeHtml(sub.title)}">${escapeHtml(sub.title)}</div>
        <div class="sub-meta">${date}</div>
        <select class="status-select ${sub.status}" data-id="${sub.id}">
          ${STATUSES.map(
      (s) =>
        `<option value="${s.value}" ${sub.status === s.value ? "selected" : ""}>${s.label}</option>`
    ).join("")}
        </select>
        <div class="answer-count">${answerCount} answer${answerCount !== 1 ? "s" : ""} saved</div>
      </div>
    `;

    submissionsList.appendChild(li);
  });


  submissionsList.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", handleStatusChange);
  });
}


function handleStatusChange(e) {
  const id = e.target.dataset.id;
  const status = e.target.value;


  e.target.className = `status-select ${status}`;


  chrome.runtime.sendMessage(
    { type: "UPDATE_STATUS", payload: { id, status } },
    (response) => {
      if (!response?.success) {
        console.error("[Applid Popup] Status update failed");
      }
    }
  );
}

function handleClearAll() {
  if (!confirm("Clear all tracked submissions? This cannot be undone.")) return;

  chrome.storage.local.set({ applid_submissions: [] }, () => {
    loadSubmissions();
  });
}


function formatDate(isoString) {
  if (!isoString) return "Unknown date";
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
