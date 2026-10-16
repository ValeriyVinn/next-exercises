"use strict";

// Операція 1: Очистити кеш
clearCache(() => {
    // Операція 2: Завантажити конфіг
    loadConfig(() => {
        // Операція 3: Запустити сервер
        startServer(() => {
            console.log("Сервер готовий!");
        });
    });
});
clearCache()