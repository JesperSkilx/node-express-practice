const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user');

const app = express();
const userManager = new User();
const PORT = 3003;

// Настройки для обработки форм (HTML)
app.use(bodyParser.urlencoded({ extended: false }));

// Корневая страница
app.get('/', (req, res) => {
    res.send(`
        <h1>Добро пожаловать!</h1>
        <ul>
            <li><a href="/register">Регистрация</a></li>
            <li><a href="/login">Вход</a></li>
        </ul>
    `);
});

// HTML-форма регистрации
app.get('/register', (req, res) => {
    res.send(`
        <h2>Регистрация</h2>
        <form method="POST" action="/register">
            <label>Имя: <input name="username" required /></label><br />
            <label>Пароль: <input name="password" type="password" required /></label><br />
            <button type="submit">Зарегистрироваться</button>
        </form>
        <p><a href="/">На главную</a></p>
    `);
});

// HTML-форма логина
app.get('/login', (req, res) => {
    res.send(`
        <h2>Вход</h2>
        <form method="POST" action="/login">
            <label>Имя: <input name="username" required /></label><br />
            <label>Пароль: <input name="password" type="password" required /></label><br />
            <button type="submit">Войти</button>
        </form>
        <p><a href="/">На главную</a></p>
    `);
});

// Обработка POST-запроса регистрации
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const result = userManager.register(username, password);
    res.send(`<p>${result.message}</p><a href="/">Назад</a>`);
});

// Обработка POST-запроса входа
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = userManager.login(username, password);
    res.send(`<p>${result.message}</p><a href="/">Назад</a>`);
});

// Запуск
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
