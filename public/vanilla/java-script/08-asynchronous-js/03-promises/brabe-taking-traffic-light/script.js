"use strict";

// ==========================================
// 1. DOM ELEMENTS
// ==========================================

const trafficLight = document.querySelector("#traffic-light");
const message = document.querySelector("#message");

const paymentOptions = document.querySelectorAll(
    'input[name="payment"]'
);

// ==========================================
// 2. SERVER REQUEST
// ==========================================

function getColor(colorName) {
    return fetch(`http://localhost:4000/api/colors/${colorName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        });
}

// ==========================================
// 3. UPDATE TRAFFIC LIGHT
// ==========================================

function changeTrafficLight(color) {
    trafficLight.style.backgroundColor = color.hex;
    trafficLight.style.color = color.hex;

    trafficLight.setAttribute(
        "aria-label",
        `Світлофор: ${color.name}`
    );

    console.log(`🚦 Traffic light: ${color.name}`);
}

// ==========================================
// 4. INITIAL STATE: YELLOW
// ==========================================

console.log("--- 1. YELLOW PROMISE ---");

let decisionSettled = false;

const yellowPromise = getColor("yellow");

yellowPromise
    .then((color) => {
        if (decisionSettled) return;

        changeTrafficLight(color);

        message.textContent = "🟡 Очікуємо на рішення...";
    })
    .catch((error) => {
        console.error("Yellow error:", error);
        message.textContent = "Не вдалося завантажити жовтий сигнал.";
    });

// ==========================================
// 5. GREEN PROMISE: FULFILLED
// ==========================================

console.log("--- 2. GREEN PROMISE ---");

const greenPromise = new Promise((resolve, reject) => {

    paymentOptions.forEach((option) => {

        option.addEventListener("change", () => {

            if (
                option.value === "bribe" &&
                !decisionSettled
            ) {
                console.log("💰 Запропоновано 10 гривень!");

                getColor("green")
                    .then((color) => {
                        resolve(color);
                    })
                    .catch(reject);
            }

        });

    });

});

greenPromise
    .then((color) => {

        if (decisionSettled) return;

        decisionSettled = true;

        changeTrafficLight(color);

        message.textContent = "🟢 Гроші отримано. Проїзд дозволено!";

        paymentOptions.forEach((option) => {
            option.disabled = true;
        });

        console.log("✅ PROMISE FULFILLED");

    })
    .catch((error) => {
        if (decisionSettled) return;

        decisionSettled = true;

        console.error("Green error:", error);

        message.textContent = "Помилка запиту до сервера.";
    });

// ==========================================
// 6. RED PROMISE: REJECTED
// ==========================================

console.log("--- 3. RED PROMISE ---");

const redPromise = new Promise((resolve, reject) => {

    setTimeout(() => {

        if (decisionSettled) return;

        const selectedOption = document.querySelector(
            'input[name="payment"]:checked'
        );

        if (selectedOption.value === "nothing") {

            console.log("⏳ Час очікування завершився!");

            getColor("red")
                .then((color) => {

                    reject({
                        color: color,
                        message: "Хабар не отримано!"
                    });

                })
                .catch(reject);

        }

    }, 5000);

});

redPromise
    .catch((error) => {

        if (decisionSettled) return;

        decisionSettled = true;

        changeTrafficLight(error.color);

        message.textContent = "🔴 " + error.message +
            " Проїзд заборонено!";

        paymentOptions.forEach((option) => {
            option.disabled = true;
        });

        console.log("❌ PROMISE REJECTED");

    });