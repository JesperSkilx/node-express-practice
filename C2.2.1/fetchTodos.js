const fs = require('fs');
const axios = require('axios');

const URL = 'https://jsonplaceholder.typicode.com/todos';
const JSON_FILE = 'todos.json';

// Функция для загрузки списка дел и сохранения в файл
async function fetchAndSaveTodos() {
    try {
        console.log("📥 Загружаем список дел...");
        const response = await axios.get(URL);

        console.log("💾 Сохраняем данные в файл...");
        fs.writeFileSync(JSON_FILE, JSON.stringify(response.data, null, 2));

        console.log("✅ Данные успешно сохранены в", JSON_FILE);
    } catch (error) {
        console.error("❌ Ошибка загрузки данных:", error);
    }
}

// Запускаем скрипт
fetchAndSaveTodos();
