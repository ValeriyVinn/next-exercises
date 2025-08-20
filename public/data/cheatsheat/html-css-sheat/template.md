# HTML `<template>` Cheat Sheet

## 🧾 Що таке `<template>`?
`<template>` — це спеціальний HTML-тег, який дозволяє зберігати шматок розмітки, що **не рендериться одразу**, але може бути **вставлений у DOM динамічно** за допомогою JavaScript.

---

## 📌 Основні властивості

- Код у `<template>` **не відображається** на сторінці автоматично.
- Вміст доступний через JavaScript як `template.content`.
- Застосовується для **повторюваних елементів**, які змінюються динамічно.

---

## ✅ Алгоритм використання

1. Створити шаблон у HTML із тегом `<template>`.
2. Отримати шаблон через `document.getElementById(...)`.
3. Клонувати вміст шаблону через `template.content.cloneNode(true)`.
4. Змінити вміст клонованих елементів у JS.
5. Вставити в DOM за допомогою `appendChild()` або іншого методу.

---

## 🔁 Приклад у трьох кроках

### HTML:
```html
<template id="msg-template">
  <div class="msg">
    <p class="text"></p>
  </div>
</template>

<div id="chat"></div>
```

### JavaScript:
```js
const template = document.getElementById('msg-template');
const chat = document.getElementById('chat');

// Клонуємо шаблон
const clone = template.content.cloneNode(true);

// Заповнюємо даними
clone.querySelector('.text').textContent = 'Привіт, це повідомлення!';

// Вставляємо в DOM
chat.appendChild(clone);
```

---

## 🧩 Приклад з масивом об'єктів

### HTML:
```html
<template id="product-template">
  <div class="product-card">
    <h3 class="name"></h3>
    <p class="price"></p>
  </div>
</template>

<div id="product-list"></div>
```

### JavaScript:
```js
const products = [
  { name: 'Ноутбук', price: '25 000 грн' },
  { name: 'Смартфон', price: '15 500 грн' },
  { name: 'Навушники', price: '1 800 грн' },
];

const template = document.getElementById('product-template');
const list = document.getElementById('product-list');

products.forEach(product => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('.name').textContent = product.name;
  clone.querySelector('.price').textContent = product.price;
  list.appendChild(clone);
});
```

---

## 📘 Поради

- Всередині `<template>` можна використовувати будь-які HTML-елементи.
- Шаблон зручно комбінувати з циклом, fetch-запитом або фільтрацією.
- Використання шаблонів — крок до компонентного підходу без фреймворків.

