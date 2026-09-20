"use strict";


/*
 * =========================================================
 * CATEGORY CONFIGURATION
 * =========================================================
 *
 * Opcional.
 *
 * Categorias não configuradas aqui recebem automaticamente
 * uma cor e um ícone padrão.
 */

const CATEGORY_CONFIG = {
  Sistema: {
    icon: "⚙",
    color: "#2563eb",
    light: "#eff6ff",
  },

  Navegação: {
    icon: "↗",
    color: "#0891b2",
    light: "#ecfeff",
  },

  Arquivos: {
    icon: "▤",
    color: "#7c3aed",
    light: "#f5f3ff",
  },

  Permissões: {
    icon: "♙",
    color: "#d97706",
    light: "#fffbeb",
  },

  Rede: {
    icon: "◎",
    color: "#059669",
    light: "#ecfdf5",
  },

  Pacotes: {
    icon: "⬡",
    color: "#db2777",
    light: "#fdf2f8",
  },

  Docker: {
    icon: "◈",
    color: "#0284c7",
    light: "#f0f9ff",
  },
};

/*
 * =========================================================
 * APPLICATION
 * =========================================================
 */

const elements = {
  content: document.getElementById("content"),
  filters: document.getElementById("categoryFilters"),
  search: document.getElementById("searchInput"),
  clearButton: document.getElementById("clearButton"),
  printButton: document.getElementById("printButton"),
  totalCommands: document.getElementById("totalCommands"),
  totalCategories: document.getElementById("totalCategories"),
};

const state = {
  search: "",
  category: "Todas",
};

const DEFAULT_CATEGORY_CONFIG = {
  icon: "$",
  color: "#475569",
  light: "#f1f5f9",
};

const COPY_ICON = `
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <rect x="8" y="8" width="13" height="13" rx="2" />
    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
  </svg>
`;

const CHECK_ICON = `
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12 4 4L19 6" />
  </svg>
`;

function getCategories() {
  return [...new Set(COMMANDS.map((item) => item.category))];
}

function getCommandsByCategory(category) {
  return COMMANDS.filter((item) => item.category === category);
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getFilteredCommands() {
  const search = normalizeText(state.search.trim());

  return COMMANDS.filter((item) => {
    const matchesCategory =
      state.category === "Todas" ||
      item.category === state.category;

    const searchableText = normalizeText(
      `${item.category} ${item.command} ${item.description}`
    );

    const matchesSearch = searchableText.includes(search);

    return matchesCategory && matchesSearch;
  });
}

/*
 * FORMATTING
 */

function formatCommand(command) {
  const fragment = document.createDocumentFragment();

  // Destaca argumentos como <file>, <dir> e <container>.
  // textContent garante que os comandos sejam exibidos como
  // texto, sem serem interpretados como HTML.

  const parts = command.split(/(<[^<>]+>)/g);

  for (const part of parts) {
    if (!part) continue;

    if (/^<[^<>]+>$/.test(part)) {
      const placeholder = document.createElement("span");

      placeholder.className = "placeholder";
      placeholder.textContent = part;

      fragment.appendChild(placeholder);
    } else {
      fragment.appendChild(document.createTextNode(part));
    }
  }

  return fragment;
}

/*
 * COPY COMMAND
 */

async function copyCommand(command, button) {
  try {
    await navigator.clipboard.writeText(command);

    button.classList.add("copied");
    button.innerHTML = CHECK_ICON;
    button.setAttribute("aria-label", "Comando copiado");
    button.title = "Copiado!";

    setTimeout(() => {
      button.classList.remove("copied");
      button.innerHTML = COPY_ICON;
      button.setAttribute("aria-label", "Copiar comando");
      button.title = "Copiar comando";
    }, 1500);
  } catch {
    // O clipboard pode estar indisponível em alguns
    // navegadores quando o arquivo é aberto via file://.

    const textArea = document.createElement("textarea");

    textArea.value = command;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } finally {
      textArea.remove();
    }

    if (copied) {
      button.classList.add("copied");
      button.innerHTML = CHECK_ICON;
      button.title = "Copiado!";

      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = COPY_ICON;
        button.title = "Copiar comando";
      }, 1500);
    } else {
      button.title = "Não foi possível copiar";
    }
  }
}

/*
 * COMMAND ROW
 */

function createCommandRow(item) {
  const row = document.createElement("div");

  row.className = "command-row";

  const code = document.createElement("code");

  code.className = "command-code";
  code.appendChild(formatCommand(item.command));

  const description = document.createElement("p");

  description.className = "command-description";
  description.textContent = item.description;

  const copyButton = document.createElement("button");

  copyButton.className = "copy-btn";
  copyButton.type = "button";
  copyButton.title = "Copiar comando";
  copyButton.setAttribute("aria-label", "Copiar comando");
  copyButton.innerHTML = COPY_ICON;

  copyButton.addEventListener("click", () => {
    copyCommand(item.command, copyButton);
  });

  row.append(code, description, copyButton);

  return row;
}

/*
 * CATEGORY SECTION
 */

function createCategorySection(category, commands) {
  const config =
    CATEGORY_CONFIG[category] ?? DEFAULT_CATEGORY_CONFIG;

  const section = document.createElement("section");

  section.className = "section";

  section.style.setProperty(
    "--category-color",
    config.color
  );

  section.style.setProperty(
    "--category-light",
    config.light
  );

  const header = document.createElement("div");

  header.className = "section-header";

  const title = document.createElement("h2");

  title.className = "section-title";

  const icon = document.createElement("span");

  icon.className = "section-icon";
  icon.textContent = config.icon;
  icon.setAttribute("aria-hidden", "true");

  const titleText = document.createElement("span");

  titleText.textContent = category;

  title.append(icon, titleText);

  const count = document.createElement("span");

  count.className = "section-count";
  count.textContent = String(commands.length).padStart(2, "0");

  header.append(title, count);

  const list = document.createElement("div");

  list.className = "command-list";

  for (const command of commands) {
    list.appendChild(createCommandRow(command));
  }

  section.append(header, list);

  return section;
}

/*
 * CATEGORY FILTERS
 */

function renderCategoryFilters() {
  elements.filters.replaceChildren();

  const categories = ["Todas", ...getCategories()];

  for (const category of categories) {
    const count =
      category === "Todas"
        ? COMMANDS.length
        : getCommandsByCategory(category).length;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "category-filter";

    const isActive = category === state.category;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    const label = document.createElement("span");

    label.textContent = category;

    const counter = document.createElement("span");

    counter.className = "filter-count";
    counter.textContent = count;

    button.append(label, counter);

    button.addEventListener("click", () => {
      state.category = category;

      render();
    });

    elements.filters.appendChild(button);
  }
}

/*
 * MAIN RENDER
 */

function renderContent() {
  const filteredCommands = getFilteredCommands();

  elements.content.replaceChildren();

  if (filteredCommands.length === 0) {
    const emptyState = document.createElement("div");

    emptyState.className = "empty-state visible";

    const title = document.createElement("h2");

    title.textContent = "Nenhum comando encontrado";

    const description = document.createElement("p");

    description.textContent =
      "Tente buscar por outro termo ou selecione outra categoria.";

    emptyState.append(title, description);

    elements.content.appendChild(emptyState);

    return;
  }

  const categories = getCategories();

  for (const category of categories) {
    const commands = filteredCommands.filter(
      (item) => item.category === category
    );

    if (commands.length === 0) continue;

    elements.content.appendChild(
      createCategorySection(category, commands)
    );
  }
}

function renderStatistics() {
  const categoryCount = getCategories().length;

  elements.totalCommands.textContent =
    `${COMMANDS.length} comandos`;

  elements.totalCategories.textContent =
    `${categoryCount} categorias`;
}

function render() {
  renderCategoryFilters();
  renderContent();
}

/*
 * EVENTS
 */

elements.search.addEventListener("input", (event) => {
  state.search = event.target.value;

  renderContent();
});

elements.clearButton.addEventListener("click", () => {
  state.search = "";
  state.category = "Todas";

  elements.search.value = "";

  render();
  elements.search.focus();
});

elements.printButton.addEventListener("click", () => {
  // A impressão sempre apresenta todos os comandos.

  state.search = "";
  state.category = "Todas";

  elements.search.value = "";

  render();

  window.print();
});

/*
 * INITIALIZATION
 */

renderStatistics();
render();
