// DOM SELECTORS
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load stored tasks
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save tasks
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create task card
function createTodoNode(todo, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveTodos();
        render();
    });

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = todo.text;
    if (todo.completed) text.style.textDecoration = "line-through";

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";

    del.addEventListener("click", () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(del);

    return li;
}

// Rendering tasks
function render(filter = "all") {
    list.innerHTML = "";

    const filtered = todos.filter(todo => {
        if (filter === "all") return true;
        if (filter === "completed") return todo.completed;
        if (filter === "pending") return !todo.completed;
    });

    filtered.forEach((todo, index) => {
        list.appendChild(createTodoNode(todo, index));
    });

    saveTodos();
}

// Add new task
function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = "";
    render();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", e => {
    if (e.key === "Enter") addTodo();
});

// Tabs Filtering
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelector(".tab.active")?.classList.remove("active");
        tab.classList.add("active");

        const filter = tab.dataset.filter;
        render(filter);
    });
});

// DARK MODE
const toggle = document.getElementById("theme-toggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
}

// DATE & TIME
function updateDateTime() {
    const now = new Date();

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    document.getElementById("day").textContent = days[now.getDay()];
    document.getElementById("date").textContent = now.toLocaleDateString(
        "en-US", { month: "short", day: "numeric" }
    );
    document.getElementById("time").textContent = now.toLocaleTimeString(
        "en-US", { hour: "2-digit", minute: "2-digit" }
    );
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Initial Render
render();
// ---------------------------
// OFFLINE MOTIVATIONAL QUOTES
// ---------------------------

const quotes = [
  "Clean code always looks like it was written by someone who cares.",
  "First, solve the problem. Then, write the code.",
  "Simplicity is the soul of efficiency.",
  "Programs must be written for people to read.",
  "Every great developer you know got there by solving problems."
];

function loadQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-text").textContent = q;
}

loadQuote();


