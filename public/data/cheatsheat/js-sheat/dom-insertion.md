# 🧩 Алгоритм додавання елементів у DOM (шпаргалка)

## 1. 🔍 Вибір елемента в DOM
Вибираємо елемент, у який або біля якого будемо вставляти новий вміст:

```js
const container = document.querySelector('#myDiv');
```

---

## 2. 🛠 Створення нового елемента (якщо не рядок)
```js
const p = document.createElement('p');
p.textContent = 'Привіт, світ!';
```

---

## 3. 📌 Вибір методу вставки

### Залежить від:
- **Типу вмісту**:
  - HTML як рядок → `insertAdjacentHTML`, `innerHTML`
  - Node (елемент) → `append`, `appendChild`, `prepend`

- **Позиції вставки**:
  - `append()` — в кінець
  - `prepend()` — на початок
  - `insertAdjacentHTML(position, html)`:
    - `'beforebegin'` — перед елементом
    - `'afterbegin'` — на початок всередину
    - `'beforeend'` — в кінець всередину
    - `'afterend'` — після елемента

- **Безпеки**:
  - уникай `innerHTML` при вставці динамічних даних (XSS)
  - використовуй `textContent` або `createElement` для безпечного виводу

---

## 4. 🧩 Додавання в DOM

### Якщо вставляєш елемент:
```js
container.append(p);
```

### Якщо вставляєш HTML:
```js
container.insertAdjacentHTML('beforeend', '<p>Привіт!</p>');
```

---

## ✅ Підсумок

| Метод                 | Приймає | Зберігає вміст? | HTML? | Безпечний? |
|-----------------------|---------|------------------|--------|-------------|
| `append`              | Node/текст | ✅             | ❌ (рядок як текст) | ✅ |
| `appendChild`         | лише Node | ✅             | ❌      | ✅ |
| `prepend`             | Node/текст | ✅             | ❌      | ✅ |
| `innerHTML`           | рядок    | ❌ (перезаписує) | ✅     | ❌ (XSS) |
| `insertAdjacentHTML`  | рядок    | ✅             | ✅     | ❌ (XSS) |
| `textContent`         | рядок    | ✅             | ❌ (як текст) | ✅ |

---

🧠 **Порада:** якщо ти часто працюєш з HTML-рядками — можеш використовувати шаблони або `<template>` у HTML.

