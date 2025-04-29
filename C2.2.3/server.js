const express = require('express');
const axios = require('axios');

const app = express(); // <-- Объявление app
const PORT = 3002; // Или process.env.PORT

// Маршрут поиска по названию
app.get('/search', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Ошибка: укажите query' });
    }

    try {
        console.log(`🔎 Запрос к Nominatim (поиск): ${query}`);
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
                format: 'json',
                q: query
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка запроса к Nominatim', details: error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 API-сервер запущен: http://localhost:${PORT}`);
});
