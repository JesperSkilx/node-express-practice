class User {
    constructor() {
        this.users = [];
    }

    register(username, password) {
        const exists = this.users.find(u => u.username === username);
        if (exists) {
            return { success: false, message: 'Пользователь уже существует' };
        }

        this.users.push({ username, password });
        return { success: true, message: 'Пользователь зарегистрирован' };
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            return { success: true, message: 'Аутентификация успешна' };
        } else {
            return { success: false, message: 'Неверный логин или пароль' };
        }
    }
}

module.exports = User;
