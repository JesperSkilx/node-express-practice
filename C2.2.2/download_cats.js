const fs = require('fs');
const axios = require('axios');

const DEFAULT_CODES = [
    100, 101, 102, 103, 200, 201, 202, 204, 206, 301, 302, 304, 
    400, 401, 403, 404, 405, 500, 501, 502, 503, 504
]; // HTTP-коды по умолчанию

// Получаем коды из аргументов командной строки
const inputCodes = process.argv.slice(2).map(Number);
const CODES = inputCodes.length > 0 ? inputCodes : DEFAULT_CODES;

async function downloadImages() {
    for (let code of CODES) {
        const folder = `./${Math.floor(code / 100)}`;
        const filePath = `${folder}/${code}.jpg`;

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        try {
            console.log(`📥 Загружаем: ${code}.jpg`);
            const response = await axios({
                url: `https://http.cat/${code}`,
                responseType: 'stream'
            });

            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`✅ Сохранено: ${filePath}`);
        } catch (error) {
            console.error(`❌ Ошибка загрузки ${code}:`, error.message);
        }
    }
}

// Запускаем загрузку
downloadImages();
