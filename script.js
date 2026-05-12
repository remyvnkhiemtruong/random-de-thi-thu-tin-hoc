const STORAGE_KEYS = {
  completed: "tinHocExam.completedIds",
  favorite: "tinHocExam.favoriteIds",
  theme: "tinHocExam.theme"
};

// ================================
// THÊM LINK ĐỀ THI TẠI ĐÂY
// ================================
const exams = [
  {
    id: 1,
    title: "Đề thi thử Tin Học số 1",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/vnsemw",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 2,
    title: "Đề thi thử Tin Học số 2",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/7oxqqr",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 3,
    title: "Đề thi thử Tin Học số 3",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/axka5y",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 4,
    title: "Đề thi thử Tin Học số 4",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/hrwgjk",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 5,
    title: "Đề thi thử Tin Học số 5",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/y3l729",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 6,
    title: "Đề thi thử Tin Học số 6",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/ivjea4",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 7,
    title: "Đề thi thử Tin Học số 7",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/lw7ryd",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 8,
    title: "Đề thi thử Tin Học số 8",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/cgpqfk",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 9,
    title: "Đề thi thử Tin Học số 9",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/6t06pa",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 10,
    title: "Đề thi thử Tin Học số 10",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/xaxbia",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 11,
    title: "Đề thi thử Tin Học số 11",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/mwfffu",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  },
  {
    id: 12,
    title: "Đề thi thử Tin Học số 12",
    description: "Đề thi thử tốt nghiệp THPT môn Tin Học.",
    type: "Azota",
    url: "https://azota.vn/de-thi/t34o40",
    password: "giaimakienthucTNTHPTtinhoc",
    completed: false,
    favorite: false
  }
];

const state = {
  filter: "all",
  searchTerm: "",
  randomExamId: null,
  completedIds: new Set(readStoredIds(STORAGE_KEYS.completed)),
  favoriteIds: new Set(readStoredIds(STORAGE_KEYS.favorite))
};

const elements = {
  themeToggle: document.querySelector("#themeToggle"),
  randomButton: document.querySelector("#randomButton"),
  randomResult: document.querySelector("#randomResult"),
  totalCount: document.querySelector("#totalCount"),
  azotaCount: document.querySelector("#azotaCount"),
  completedCount: document.querySelector("#completedCount"),
  pendingCount: document.querySelector("#pendingCount"),
  favoriteCount: document.querySelector("#favoriteCount"),
  searchInput: document.querySelector("#searchInput"),
  filterButtons: document.querySelectorAll(".filter-button"),
  examList: document.querySelector("#examList"),
  emptyMessage: document.querySelector("#emptyMessage"),
  toast: document.querySelector("#toast")
};

let toastTimer;

document.addEventListener("DOMContentLoaded", init);

function init() {
  applyStoredTheme();
  attachEvents();
  syncExamState();
  renderAll();
}

function attachEvents() {
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.randomButton.addEventListener("click", randomizeExam);
  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value.trim().toLowerCase();
    renderExamList();
  });

  elements.filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      updateActiveFilter();
      renderExamList();
    });
  });

  document.addEventListener("click", handleActionClick);
}

function readStoredIds(key) {
  try {
    const storedValue = localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue) ? parsedValue.map(Number).filter(Number.isFinite) : [];
  } catch (error) {
    console.warn(`Không thể đọc dữ liệu localStorage: ${key}`, error);
    return [];
  }
}

function saveStoredIds(key, idSet) {
  localStorage.setItem(key, JSON.stringify([...idSet]));
}

function syncExamState() {
  exams.forEach((exam) => {
    exam.completed = state.completedIds.has(exam.id);
    exam.favorite = state.favoriteIds.has(exam.id);
  });
}

function renderAll() {
  renderStats();
  renderExamList();
  renderRandomResult();
}

function renderStats() {
  const total = exams.length;
  const azota = exams.filter((exam) => exam.type.toLowerCase() === "azota").length;
  const completed = exams.filter((exam) => exam.completed).length;
  const favorites = exams.filter((exam) => exam.favorite).length;

  elements.totalCount.textContent = total;
  elements.azotaCount.textContent = azota;
  elements.completedCount.textContent = completed;
  elements.pendingCount.textContent = total - completed;
  elements.favoriteCount.textContent = favorites;
}

function renderExamList() {
  const filteredExams = getFilteredExams();

  elements.examList.innerHTML = filteredExams.map((exam) => createExamCard(exam)).join("");
  elements.emptyMessage.classList.toggle("hidden", filteredExams.length > 0);

  if (exams.length === 0) {
    elements.emptyMessage.textContent = "Hiện chưa có đề thi nào. Hãy thêm đề thi vào file script.js.";
  } else {
    elements.emptyMessage.textContent = "Không tìm thấy đề thi phù hợp.";
  }
}

function renderRandomResult() {
  if (state.randomExamId === null) {
    elements.randomResult.innerHTML = "";
    return;
  }

  const exam = exams.find((item) => item.id === state.randomExamId);
  elements.randomResult.innerHTML = exam
    ? `<div class="section-heading">
        <p class="section-kicker">🎯 Kết quả random</p>
        <h2>Đề dành cho lượt luyện tập này</h2>
      </div>
      ${createExamCard(exam, true)}`
    : "";
}

function createExamCard(exam, isRandomCard = false) {
  const statusText = exam.completed ? "✅ Đã làm" : "📝 Chưa làm";
  const completedButtonText = exam.completed ? "↩️ Bỏ đã làm" : "✅ Đánh dấu đã làm";
  const favoriteButtonText = exam.favorite ? "⭐ Bỏ yêu thích" : "⭐ Yêu thích";
  const cardClasses = [
    "exam-card",
    exam.completed ? "completed" : "",
    exam.favorite ? "favorite" : "",
    isRandomCard ? "random-card-animate" : ""
  ].filter(Boolean).join(" ");

  return `
    <article class="${cardClasses}" data-exam-id="${exam.id}">
      <div class="exam-title-row">
        <div>
          <h3 class="exam-title">${escapeHtml(exam.title)}</h3>
          <p class="exam-description">${escapeHtml(exam.description)}</p>
        </div>
        <span class="favorite-badge" aria-label="${exam.favorite ? "Đề yêu thích" : "Chưa yêu thích"}">${exam.favorite ? "⭐" : "☆"}</span>
      </div>

      <div class="exam-meta">
        <div class="meta-line">
          <span class="meta-label">Loại đề:</span>
          <span class="type-pill">${escapeHtml(exam.type)}</span>
        </div>
        <div class="meta-line">
          <span class="meta-label">🔓 Mật khẩu:</span>
          <span class="password-text">${escapeHtml(exam.password)}</span>
        </div>
        <div class="meta-line">
          <span class="meta-label">Trạng thái:</span>
          <span class="status-pill ${exam.completed ? "done" : ""}">${statusText}</span>
        </div>
      </div>

      <div class="card-actions">
        <button class="card-action copy" type="button" data-action="copy" data-id="${exam.id}">📋 Sao chép</button>
        <button class="card-action open" type="button" data-action="open" data-id="${exam.id}">🔗 Mở đề thi</button>
        <button class="card-action completed-action ${exam.completed ? "active" : ""}" type="button" data-action="completed" data-id="${exam.id}">${completedButtonText}</button>
        <button class="card-action favorite-action ${exam.favorite ? "active" : ""}" type="button" data-action="favorite" data-id="${exam.id}">${favoriteButtonText}</button>
      </div>
    </article>
  `;
}

function getFilteredExams() {
  return exams.filter((exam) => {
    const matchesSearch = !state.searchTerm
      || exam.title.toLowerCase().includes(state.searchTerm)
      || exam.description.toLowerCase().includes(state.searchTerm);

    const matchesFilter = state.filter === "all"
      || (state.filter === "azota" && exam.type.toLowerCase() === "azota")
      || (state.filter === "completed" && exam.completed)
      || (state.filter === "pending" && !exam.completed)
      || (state.filter === "favorite" && exam.favorite);

    return matchesSearch && matchesFilter;
  });
}

function randomizeExam() {
  if (exams.length === 0) {
    showToast("Hiện chưa có đề thi nào để random.");
    renderRandomResult();
    return;
  }

  const randomIndex = Math.floor(Math.random() * exams.length);
  state.randomExamId = exams[randomIndex].id;
  renderRandomResult();
  elements.randomResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handleActionClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const examId = Number(button.dataset.id);
  const exam = exams.find((item) => item.id === examId);
  if (!exam) {
    return;
  }

  const actions = {
    copy: () => copyPassword(exam.password),
    open: () => window.open(exam.url, "_blank", "noopener,noreferrer"),
    completed: () => toggleCompleted(exam.id),
    favorite: () => toggleFavorite(exam.id)
  };

  actions[button.dataset.action]?.();
}

function toggleCompleted(examId) {
  toggleIdInSet(state.completedIds, examId);
  saveStoredIds(STORAGE_KEYS.completed, state.completedIds);
  syncExamState();
  renderAll();
}

function toggleFavorite(examId) {
  toggleIdInSet(state.favoriteIds, examId);
  saveStoredIds(STORAGE_KEYS.favorite, state.favoriteIds);
  syncExamState();
  renderAll();
}

function toggleIdInSet(idSet, id) {
  if (idSet.has(id)) {
    idSet.delete(id);
  } else {
    idSet.add(id);
  }
}

async function copyPassword(password) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(password);
    } else {
      fallbackCopyText(password);
    }
    showToast("Đã sao chép mật khẩu");
  } catch (error) {
    fallbackCopyText(password);
    showToast("Đã sao chép mật khẩu");
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme || (prefersDark ? "dark" : "light");
  setTheme(theme);
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  elements.themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function updateActiveFilter() {
  elements.filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === state.filter);
  });
}

function showToast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");

  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
