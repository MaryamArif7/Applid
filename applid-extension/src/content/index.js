

(function () {
  "use strict";

  if (window.__applid_loaded) return;
  window.__applid_loaded = true;

  console.log("[Applid] Content script loaded on:", window.location.href);


  function getFormTitle() {
    const heading = document.querySelector(
      "[data-params] + div [role='heading'], .freebirdFormviewerViewHeaderHeader"
    );
    if (heading) return heading.innerText.trim();


    return document.title.replace(/\s*[-–]\s*Google Forms.*$/i, "").trim();
  }


  function getAnswers() {
    const answers = [];

    const items = document.querySelectorAll('[role="listitem"]');

    items.forEach((item) => {

      const questionEl = item.querySelector(
        '[role="heading"], .freebirdFormviewerComponentsQuestionBaseTitle'
      );
      const question = questionEl ? questionEl.innerText.trim() : null;
      if (!question) return;

      let answer = "";


      const textInput = item.querySelector(
        'input[type="text"], textarea'
      );
      if (textInput) {
        answer = textInput.value.trim();
      }


      if (!answer) {
        const selected = item.querySelector(
          '[role="radio"][aria-checked="true"], [role="checkbox"][aria-checked="true"]'
        );
        if (selected) {
          const label = selected.closest("[data-value]");
          answer = label
            ? label.getAttribute("data-value")
            : selected.getAttribute("aria-label") || "";
        }
      }


      if (!answer) {
        const dropdown = item.querySelector('[role="option"][aria-selected="true"]');
        if (dropdown) answer = dropdown.innerText.trim();
      }


      if (!answer) {
        const scale = item.querySelector('[role="radio"][aria-checked="true"]');
        if (scale) answer = scale.getAttribute("data-value") || "";
      }

      answers.push({ question, answer: answer || "(no answer)" });
    });

    return answers;
  }


  function buildSubmission() {
    return {
      id: crypto.randomUUID(),
      title: getFormTitle(),
      url: window.location.href,
      answers: getAnswers(),
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };
  }


  function saveSubmission(submission) {
    chrome.runtime.sendMessage(
      { type: "SAVE_SUBMISSION", payload: submission },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("[Applid] Message error:", chrome.runtime.lastError);
          return;
        }
        console.log("[Applid] Submission saved:", response);
      }
    );
  }



  let submitted = false;

  function onConfirmationDetected() {
    if (submitted) return;
    submitted = true;

    console.log("[Applid] Form submission detected!");

    const submission = buildSubmission();
    console.log("[Applid] Captured submission:", submission);

    saveSubmission(submission);
  }

  const observer = new MutationObserver(() => {

    const confirmation = document.querySelector(
      ".freebirdFormviewerViewResponseConfirmationMessage, [data-confirmation-message], .freebirdFormviewerViewResponseLinksContainer"
    );

    if (confirmation) {
      observer.disconnect();
      onConfirmationDetected();
    }
  });


  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });


  let lastUrl = window.location.href;

  const urlObserver = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;

      if (
        window.location.href.includes("formResponse") ||
        window.location.href.includes("viewresponse")
      ) {
        onConfirmationDetected();
      }
    }
  });

  urlObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
