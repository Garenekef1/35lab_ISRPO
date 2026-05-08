const inputTitle = document.getElementById("inputTitle");
const inputCategory = document.getElementById("inputCategory");
const inputRating = document.getElementById("inputRating");
const btnAdd = document.getElementById("btnAdd");
const errorMessage = document.getElementById("errorMessage");
const loadingText = document.getElementById("loadingText");
const memesGrid = document.getElementById("memesGrid");
const memesCount = document.getElementById("memesCount");

let memes = [];

function renderMemes() {
    memesCount.textContent = `Всего мемов: ${memes.length}`;

    if (memes.length === 0) {
        memesGrid.innerHTML = '<p class="empty-text">Мемов пока нет</p>';
        return;
    }

    memesGrid.innerHTML = memes.map(createCardHTML).join("");
}

function createCardHTML(meme) {
    const date = new Date(meme.addedAt).toLocaleDateString("ru-RU");
    const rating = "★".repeat(meme.rating);

    return `
        <article class="meme-card">
            <h3 class="meme-title">${escapeHTML(meme.title)}</h3>
            <span class="meme-category">${escapeHTML(meme.category)}</span>
            <p class="meme-rating">${rating}</p>
            <p class="meme-date">Добавлено: ${date}</p>
            <button onclick="handleDelete(${meme.id})">Удалить</button>
        </article>
    `;
}

async function loadMemes() {
    loadingText.style.display = "block";
    errorMessage.textContent = "";

    try {
        memes = await getAllMemes();
        renderMemes();
    } catch (error) {
        memes = [];
        renderMemes();
        errorMessage.textContent = error.message;
    } finally {
        loadingText.style.display = "none";
    }
}

async function handleAdd() {
    const title = inputTitle.value.trim();
    const category = inputCategory.value;
    const rating = inputRating.value;

    if (!title) {
        errorMessage.textContent = "Введите название мема";
        return;
    }

    btnAdd.disabled = true;
    errorMessage.textContent = "";

    try {
        const meme = await addMeme(title, category, rating);
        memes.unshift(meme);
        inputTitle.value = "";
        inputRating.value = "5";
        renderMemes();
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        btnAdd.disabled = false;
        inputTitle.focus();
    }
}

async function handleDelete(id) {
    if (!confirm("Удалить мем?")) {
        return;
    }

    try {
        await deleteMeme(id);
        memes = memes.filter(meme => meme.id !== id);
        renderMemes();
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function escapeHTML(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

btnAdd.addEventListener("click", handleAdd);

inputTitle.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        handleAdd();
    }
});

loadMemes();
