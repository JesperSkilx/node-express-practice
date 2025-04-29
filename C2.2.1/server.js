const fs = require('fs');
const express = require('express');

const app = express();
const PORT = 3000;
const JSON_FILE = 'todos.json';

// Проверяем, существует ли файл
if (!fs.existsSync(JSON_FILE)) {
    console.error("❌ Файл данных не найден! Запустите fetchTodos.js.");
    process.exit(1);
}

// Загружаем JSON
let todos = [];
try {
    const data = fs.readFileSync(JSON_FILE, 'utf8');
    todos = JSON.parse(data);
    console.log("✅ Данные загружены.");
} catch (error) {
    console.error("❌ Ошибка чтения JSON-файла:", error);
    process.exit(1);
}

// API маршрут
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Задача не найдена' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
});
