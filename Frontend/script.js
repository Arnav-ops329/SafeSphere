// ---------- Helpers ----------
function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key, defaultValue = null) {
  const raw = localStorage.getItem(key);
  if (!raw) return defaultValue;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

// ---------- Navigation ----------
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.section;

    navLinks.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    sections.forEach((sec) => {
      sec.classList.toggle("active", sec.id === target);
    });
  });
});

// ---------- Tracker ----------
const trackerForm = document.getElementById("trackerForm");
const trackerResult = document.getElementById("trackerResult");
const cycleSummary = document.getElementById("cycleSummary");

function updateTrackerUI() {
  const data = loadFromStorage("cycleData");
  if (!data) {
    trackerResult.innerHTML = "<p>Fill the form to see predictions.</p>";
    cycleSummary.innerHTML =
      "<p>No data yet. Go to <strong>Cycle Tracker</strong> to add your details.</p>";
    return;
  }

  const last = new Date(data.lastPeriod);
  const cycleLength = data.cycleLength;
  const next = new Date(last);
  next.setDate(next.getDate() + cycleLength);

  const ovulation = new Date(next);
  ovulation.setDate(ovulation.getDate() - 14);

  const fertileStart = new Date(ovulation);
  fertileStart.setDate(fertileStart.getDate() - 4);
  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  trackerResult.innerHTML = `
    <p><strong>Last period:</strong> ${formatDate(last)}</p>
    <p><strong>Average cycle length:</strong> ${cycleLength} days</p>
    <p><strong>Estimated next period:</strong> ${formatDate(next)}</p>
    <p><strong>Possible fertile window:</strong> ${formatDate(
      fertileStart
    )} – ${formatDate(fertileEnd)}</p>
    <p><strong>Estimated ovulation day:</strong> ${formatDate(ovulation)}</p>
    <p class="small">
      These are only estimates. Every body is different and cycles can shift.
    </p>
  `;

  cycleSummary.innerHTML = `
    <p><strong>Next period:</strong> ${formatDate(next)}</p>
    <p><strong>Fertile window:</strong> ${formatDate(
      fertileStart
    )} – ${formatDate(fertileEnd)}</p>
  `;

  // Fill inputs when user opens tracker again
  document.getElementById("lastPeriod").value = data.lastPeriod;
  document.getElementById("cycleLength").value = data.cycleLength;
}

if (trackerForm) {
  trackerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastPeriodInput = document.getElementById("lastPeriod").value;
    const cycleLengthInput = parseInt(
      document.getElementById("cycleLength").value,
      10
    );

    if (!lastPeriodInput || !cycleLengthInput) return;

    const data = {
      lastPeriod: lastPeriodInput,
      cycleLength: cycleLengthInput,
    };

    saveToStorage("cycleData", data);
    updateTrackerUI();
  });
}

// ---------- Symptoms & Mood ----------
const logForm = document.getElementById("logForm");
const logsList = document.getElementById("logsList");
const recentLogs = document.getElementById("recentLogs");

function updateLogsUI() {
  const logs = loadFromStorage("symptomLogs", []);
  logsList.innerHTML = "";
  recentLogs.innerHTML = "";

  if (!logs.length) {
    logsList.innerHTML = "<li>No logs yet. Add your first log above.</li>";
    recentLogs.innerHTML =
      "<li>No logs yet. Add one in <strong>Symptoms & Mood</strong>.</li>";
    return;
  }

  const latest = logs.slice(-5).reverse();

  latest.forEach((log) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${log.date}</strong>: Mood – ${
      log.mood || "not set"
    }${log.symptoms.length ? ", Symptoms – " + log.symptoms.join(", ") : ""}`;
    logsList.appendChild(li);
  });

  recentLogs.innerHTML = "";
  latest.slice(0, 3).forEach((log) => {
    const li = document.createElement("li");
    li.textContent = `${log.date}: ${log.mood || "Mood not set"}`;
    recentLogs.appendChild(li);
  });
}

if (logForm) {
  logForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dateInput = document.getElementById("logDate");
    const dateValue = dateInput.value
      ? new Date(dateInput.value)
      : new Date();

    const moodEl = document.querySelector('input[name="mood"]:checked');
    const mood = moodEl ? moodEl.value : "";

    const symptomCheckboxes = logForm.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const symptoms = Array.from(symptomCheckboxes).map((c) => c.value);

    const logs = loadFromStorage("symptomLogs", []);
    logs.push({
      date: formatDate(dateValue),
      mood,
      symptoms,
    });

    saveToStorage("symptomLogs", logs);
    logForm.reset();
    updateLogsUI();
  });
}

// ---------- SOS Modal ----------
const sosBtn = document.getElementById("sosBtn");
const sosModal = document.getElementById("sosModal");
const closeSos = document.getElementById("closeSos");
const sosForm = document.getElementById("sosForm");
const sosSavedMsg = document.getElementById("sosSavedMsg");

function openModal() {
  sosModal.classList.add("active");

  const data = loadFromStorage("sosContacts", {});
  document.getElementById("contact1").value = data.contact1 || "";
  document.getElementById("contact2").value = data.contact2 || "";
  document.getElementById("contact3").value = data.contact3 || "";
  sosSavedMsg.textContent = "";
}

function closeModal() {
  sosModal.classList.remove("active");
}

if (sosBtn) sosBtn.addEventListener("click", openModal);
if (closeSos) closeSos.addEventListener("click", closeModal);

if (sosModal) {
  sosModal.addEventListener("click", (e) => {
    if (e.target === sosModal) closeModal();
  });
}

if (sosForm) {
  sosForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const contacts = {
      contact1: document.getElementById("contact1").value.trim(),
      contact2: document.getElementById("contact2").value.trim(),
      contact3: document.getElementById("contact3").value.trim(),
    };
    saveToStorage("sosContacts", contacts);
    sosSavedMsg.textContent = "Contacts saved on this device.";
  });
}

// ---------- Accordion (Myths & FAQ) ----------
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const body = item.querySelector(".accordion-body");

    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".accordion-item")
      .forEach((i) => i.classList.remove("open"));
    document.querySelectorAll(".accordion-body").forEach((b) => {
      b.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});

// ---------- Chat Helper (Simple Rule-Based) ----------
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function appendMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.classList.add("chat-message", sender);
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function basicChatReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("late") || msg.includes("missed")) {
    return "Periods can be late due to stress, illness, weight changes, or hormonal reasons. If your period is very delayed or you are worried, please talk to a doctor or trusted health professional.";
  }
  if (msg.includes("cramp") || msg.includes("pain")) {
    return "Mild to moderate cramps are common. Warm compress, gentle stretching, and staying hydrated can help. Very severe or sudden pain should be checked by a doctor.";
  }
  if (msg.includes("heavy")) {
    return "Very heavy bleeding (changing products very often, passing large clots, feeling dizzy) is something you should discuss with a doctor.";
  }
  if (msg.includes("pcos") || msg.includes("pcod")) {
    return "PCOS/PCOD is a hormonal condition. Common signs include irregular periods, acne, and increased hair growth. Only a doctor can diagnose it properly.";
  }
  if (msg.includes("normal")) {
    return "Everyone’s cycle is a bit different. This website gives general information only. For anything worrying or unusual, please talk to a doctor who can examine you.";
  }

  return "I can give general information only. For specific or serious problems, please consult a doctor or a trusted health professional. 💙";
}

if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("open");
  });
}
if (chatClose) {
  chatClose.addEventListener("click", () => {
    chatBox.classList.remove("open");
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = basicChatReply(text);
      appendMessage(reply, "bot");
    }, 300);
  });
}

// ---------- Init ----------
window.addEventListener("DOMContentLoaded", () => {
  updateTrackerUI();
  updateLogsUI();
});
