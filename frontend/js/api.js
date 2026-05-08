const API_URL = "http://localhost:5110/api/memes";

async function getAllMemes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Не удалось загрузить мемы");
    }

    return await response.json();
}

async function addMeme(title, category, rating) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            category,
            rating: Number(rating)
        })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Не удалось добавить мем");
    }

    return await response.json();
}

async function deleteMeme(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Не удалось удалить мем");
    }
}
