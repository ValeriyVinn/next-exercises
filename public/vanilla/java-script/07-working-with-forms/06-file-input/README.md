# 06. File Input

`<input type="file">` — HTML-елемент форми, який дозволяє користувачу вибрати один або декілька файлів зі свого пристрою.

JavaScript може отримати вибрані файли через:

    input.files

Об'єкт `File` містить інформацію про конкретний файл:

    name
    size
    type
    lastModified

File Input використовується, коли потрібно:

- вибрати зображення;
- завантажити документ;
- вибрати PDF;
- завантажити кілька файлів;
- перевірити файл перед upload;
- показати preview зображення;
- відправити файл на сервер;
- працювати з `FormData`.

---

# Ключові поняття

✔ `<input type="file">`  
✔ `File Input`  
✔ `File`  
✔ `FileList`  
✔ `input.files`  
✔ `multiple`  
✔ `accept`  
✔ `change` event  
✔ `name`  
✔ `size`  
✔ `type`  
✔ `lastModified`  
✔ `FileReader`  
✔ `URL.createObjectURL()`  
✔ `URL.revokeObjectURL()`  
✔ `FormData`  
✔ `multipart/form-data`  
✔ `file upload`  
✔ `preview`  
✔ `Blob`  
✔ `ArrayBuffer`  
✔ client-side validation  

---

# Що потрібно пам'ятати

• `<input type="file">` відкриває системний file picker.

• Вибрані файли доступні через:

    input.files

• `input.files` повертає `FileList`.

• Один елемент `FileList` — це об'єкт `File`.

• `File` містить метадані файлу.

• Основні властивості:

    file.name
    file.size
    file.type
    file.lastModified

• За замовчуванням користувач може вибрати один файл.

• Для вибору декількох файлів використовується:

    multiple

• `accept` дозволяє підказати браузеру, які типи файлів бажані.

• `accept` не є повноцінним security-механізмом.

• Перевіряти файл на клієнті зручно для UX.

• Остаточна перевірка файлу повинна виконуватися на сервері.

• `FileReader` дозволяє прочитати вміст файлу.

• `URL.createObjectURL()` дозволяє створити тимчасовий URL для локального preview.

• Для upload файлів часто використовується:

    FormData

• Файли відправляються на сервер як multipart form data.

---

# Basic File Input

Найпростіший File Input:

    <input type="file">

Браузер покаже стандартний елемент вибору файлу.

---

# id та label

Краще пов'язувати `input` з `label`.

    <label for="file">
        Choose file
    </label>

    <input
        id="file"
        type="file"
    >

Тепер натискання на label також відкриває file picker.

---

# name

Як і інші form controls, File Input може мати `name`.

    <input
        type="file"
        name="avatar"
    >

`name` особливо важливий при відправленні форми.

Наприклад:

    <form>
        <input
            type="file"
            name="avatar"
        >

        <button type="submit">
            Upload
        </button>
    </form>

---

# Отримання input

JavaScript:

    const fileInput = document.querySelector(
        'input[type="file"]'
    );

---

# input.files

Вибрані файли доступні через:

    fileInput.files

Тип:

    FileList

Наприклад:

    const files = fileInput.files;

    console.log(files);

---

# FileList

`FileList` — об'єкт, який містить вибрані файли.

Наприклад, якщо вибрано один файл:

    const files = fileInput.files;

    console.log(files.length);

Результат:

    1

---

# files.length

Кількість вибраних файлів:

    fileInput.files.length

Наприклад:

    if (fileInput.files.length > 0) {
        console.log("File selected");
    }

---

# Отримання першого файлу

Якщо дозволено вибрати тільки один файл:

    const file = fileInput.files[0];

Або:

    const [file] = fileInput.files;

---

# Перевірка на вибраний файл

Перед використанням потрібно перевірити, чи файл існує.

    const file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }

    console.log(file.name);

---

# File

`File` — об'єкт, який представляє конкретний файл.

Наприклад:

    const file = fileInput.files[0];

    console.log(file);

---

# File properties

Основні властивості `File`:

    file.name
    file.size
    file.type
    file.lastModified

---

# file.name

Назва файлу:

    const file = fileInput.files[0];

    console.log(file.name);

Наприклад:

    photo.jpg

---

# file.size

Розмір файлу в bytes.

    console.log(file.size);

Наприклад:

    245760

Це означає:

    245760 bytes

---

# Перетворення bytes

Для KB:

    const sizeInKB = file.size / 1024;

Для MB:

    const sizeInMB = file.size / (1024 * 1024);

Наприклад:

    const sizeInMB =
        file.size / (1024 * 1024);

    console.log(sizeInMB);

---

# file.type

MIME type файлу:

    console.log(file.type);

Наприклад:

    image/jpeg

або:

    image/png

або:

    application/pdf

---

# MIME Type

MIME type описує тип даних.

Приклади:

    image/jpeg
    image/png
    image/webp
    application/pdf
    text/plain
    application/json

Для зображення:

    if (file.type.startsWith("image/")) {
        console.log("Image");
    }

---

# file.lastModified

Час останньої модифікації файлу у форматі timestamp.

    console.log(file.lastModified);

Наприклад:

    1758362400000

Можна створити `Date`:

    const date = new Date(file.lastModified);

    console.log(date);

---

# change event

File Input зазвичай обробляють через `change`.

    fileInput.addEventListener("change", () => {
        console.log("File selected");
    });

Event виникає, коли користувач змінює вибраний файл.

---

# Простий приклад

HTML:

    <input
        id="fileInput"
        type="file"
    >

JavaScript:

    const fileInput =
        document.querySelector("#fileInput");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
    });

---

# multiple

За замовчуванням можна вибрати один файл.

    <input type="file">

Щоб дозволити декілька:

    <input
        type="file"
        multiple
    >

Тепер:

    input.files

може містити декілька `File`.

---

# Multiple Files

HTML:

    <input
        id="fileInput"
        type="file"
        multiple
    >

JavaScript:

    const fileInput =
        document.querySelector("#fileInput");

    fileInput.addEventListener("change", () => {
        const files = fileInput.files;

        console.log(files.length);
    });

---

# Перебір файлів

Можна перебирати `FileList`.

    for (const file of fileInput.files) {
        console.log(file.name);
    }

Наприклад:

    photo.jpg
    document.pdf
    notes.txt

---

# Array.from()

За потреби `FileList` можна перетворити на масив:

    const files = Array.from(fileInput.files);

Тепер:

    files.map(...)
    files.filter(...)
    files.forEach(...)

можна використовувати як для звичайного масиву.

---

# FileList vs Array

`FileList`:

    fileInput.files

не є звичайним Array.

Наприклад:

    Array.isArray(fileInput.files);

Результат:

    false

Можна створити Array:

    const files = [...fileInput.files];

або:

    const files = Array.from(
        fileInput.files
    );

---

# accept

`accept` дозволяє вказати бажані типи файлів.

Наприклад, тільки images:

    <input
        type="file"
        accept="image/*"
    >

---

# accept для JPEG та PNG

    <input
        type="file"
        accept="image/jpeg, image/png"
    >

---

# accept для PDF

    <input
        type="file"
        accept="application/pdf"
    >

---

# accept для декількох типів

    <input
        type="file"
        accept="image/*, application/pdf"
    >

---

# accept за розширенням

Можна вказувати розширення:

    <input
        type="file"
        accept=".jpg,.jpeg,.png"
    >

Або:

    <input
        type="file"
        accept=".pdf"
    >

---

# Важливо про accept

`accept` — це підказка для file picker.

Він не повинен розглядатися як security validation.

Наприклад:

    accept="image/*"

не означає, що сервер гарантовано отримає безпечне зображення.

На сервері необхідно перевіряти:

    file type
    file size
    file content
    file extension
    security constraints

---

# Client-side Validation

Перед upload можна перевірити:

    чи вибрано файл
    розмір
    MIME type
    кількість файлів
    допустимі формати

Наприклад:

    const file = fileInput.files[0];

    if (!file) {
        console.log("Select a file");
        return;
    }

---

# Перевірка розміру

Наприклад, максимальний розмір — 2 MB.

    const MAX_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        console.log("File is too large");
        return;
    }

---

# Перевірка MIME type

Наприклад, дозволяємо JPEG та PNG:

    const allowedTypes = [
        "image/jpeg",
        "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
        console.log("Invalid file type");
        return;
    }

---

# Перевірка extension

Можна отримати extension:

    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();

Наприклад:

    photo.JPG

дасть:

    jpg

Але extension не є достатньою перевіркою безпеки.

---

# Валідація файлу

Практичний приклад:

    const file = fileInput.files[0];

    if (!file) {
        console.log("Select a file");
        return;
    }

    const MAX_SIZE = 2 * 1024 * 1024;

    const allowedTypes = [
        "image/jpeg",
        "image/png"
    ];

    if (file.size > MAX_SIZE) {
        console.log("Maximum size is 2 MB");
        return;
    }

    if (!allowedTypes.includes(file.type)) {
        console.log("Only JPEG and PNG are allowed");
        return;
    }

    console.log("File is valid");

---

# File Preview

Одна з найпоширеніших задач — показати preview вибраного зображення.

Наприклад:

    <input
        id="fileInput"
        type="file"
        accept="image/*"
    >

    <img
        id="preview"
        alt="Preview"
    >

---

# Preview через URL.createObjectURL()

Для preview можна створити object URL:

    const file = fileInput.files[0];

    const url = URL.createObjectURL(file);

    preview.src = url;

---

# Повний Preview Example

    const fileInput =
        document.querySelector("#fileInput");

    const preview =
        document.querySelector("#preview");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        const url = URL.createObjectURL(file);

        preview.src = url;
    });

---

# URL.createObjectURL()

`URL.createObjectURL()` створює тимчасовий URL для `Blob` або `File`.

Наприклад:

    const url =
        URL.createObjectURL(file);

Потім:

    img.src = url;

---

# URL.revokeObjectURL()

Object URL потрібно звільняти, коли він більше не потрібен.

    URL.revokeObjectURL(url);

Наприклад:

    const url =
        URL.createObjectURL(file);

    preview.src = url;

    // пізніше
    URL.revokeObjectURL(url);

Це особливо важливо при багаторазовому створенні preview.

---

# Preview з очищенням старого URL

    let previewUrl = null;

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        previewUrl =
            URL.createObjectURL(file);

        preview.src = previewUrl;
    });

---

# FileReader

`FileReader` — API для асинхронного читання вмісту файлів у браузері.

Наприклад:

    const reader = new FileReader();

---

# readAsText()

Для текстового файлу:

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        console.log(reader.result);
    });

    reader.readAsText(file);

---

# Читання текстового файлу

    const fileInput =
        document.querySelector("#fileInput");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", () => {
            console.log(reader.result);
        });

        reader.readAsText(file);
    });

---

# FileReader та image

Для preview зображення історично часто використовували:

    reader.readAsDataURL(file);

Наприклад:

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        preview.src = reader.result;
    });

    reader.readAsDataURL(file);

Для простого preview зараз часто зручніше:

    URL.createObjectURL(file)

---

# Data URL

`readAsDataURL()` повертає data URL.

Наприклад, результат може виглядати приблизно так:

    data:image/png;base64,...

Це представлення вмісту файлу як data URL.

---

# createObjectURL vs FileReader

Для простого preview:

    URL.createObjectURL(file)

часто простіший.

`FileReader` корисний, коли потрібно саме прочитати вміст файлу.

Наприклад:

    text
    ArrayBuffer
    Data URL

Умовно:

    preview image
        → createObjectURL()

    read file contents
        → FileReader

---

# FileReader methods

Основні методи:

    readAsText()
    readAsDataURL()
    readAsArrayBuffer()
    readAsBinaryString()

На практиці найважливіші:

    readAsText()
    readAsDataURL()
    readAsArrayBuffer()

---

# FileReader events

Основні events:

    load
    error
    progress
    loadstart
    loadend
    abort

Наприклад:

    reader.addEventListener("load", () => {
        console.log(reader.result);
    });

---

# FileReader result

Після завершення читання:

    reader.result

містить результат.

Наприклад:

    reader.readAsText(file);

після `load`:

    reader.result

буде текстом.

---

# FileReader error

Можна обробити помилку:

    reader.addEventListener("error", () => {
        console.log("Failed to read file");
    });

---

# File Upload

Вибрати файл — ще не означає завантажити його на сервер.

File Input:

    browser
        ↓
    selected File

Upload:

    browser
        ↓
    HTTP request
        ↓
    server

---

# FormData

Для відправлення файлів часто використовується:

    FormData

HTML:

    <form id="form">
        <input
            type="file"
            name="avatar"
        >

        <button type="submit">
            Upload
        </button>
    </form>

JavaScript:

    const form =
        document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData =
            new FormData(form);

        // send formData
    });

---

# FormData з File Input

Якщо File Input має `name`:

    <input
        type="file"
        name="avatar"
    >

то:

    const formData =
        new FormData(form);

автоматично включає вибраний файл.

---

# FormData та fetch

Приклад:

    const form =
        document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData =
            new FormData(form);

        const response = await fetch(
            "/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        console.log(result);
    });

---

# Не встановлювати Content-Type вручну

При використанні:

    FormData

з `fetch()` не потрібно вручну встановлювати:

    Content-Type: multipart/form-data

Браузер сам встановить правильний `Content-Type` разом із boundary.

Тому:

    fetch("/upload", {
        method: "POST",
        body: formData
    });

правильно.

А ручне:

    headers: {
        "Content-Type": "multipart/form-data"
    }

може зламати формування boundary.

---

# multipart/form-data

Файли зазвичай передаються через:

    multipart/form-data

Цей формат дозволяє передавати:

    text fields
    files

в одному HTTP request.

---

# FormData та append()

Можна додати File вручну:

    const formData = new FormData();

    formData.append("avatar", file);

Потім:

    fetch("/upload", {
        method: "POST",
        body: formData
    });

---

# FormData з текстом та файлом

    const formData = new FormData();

    formData.append(
        "username",
        "John"
    );

    formData.append(
        "avatar",
        file
    );

Тепер один request може містити:

    username
    avatar

---

# Multiple Files + FormData

HTML:

    <input
        type="file"
        id="files"
        name="files"
        multiple
    >

JavaScript:

    const filesInput =
        document.querySelector("#files");

    const formData = new FormData();

    for (const file of filesInput.files) {
        formData.append("files", file);
    }

---

# Перевірка файлів перед upload

Типовий flow:

    user selects file
            ↓
    change event
            ↓
    get File
            ↓
    validate
            ↓
    show preview
            ↓
    submit
            ↓
    FormData
            ↓
    fetch
            ↓
    server

---

# Drag and Drop

File Input часто комбінують з Drag and Drop API.

Користувач може:

    choose file

або:

    drag file
        ↓
    drop area

Drop event дає доступ до:

    event.dataTransfer.files

Наприклад:

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();

        const files =
            event.dataTransfer.files;

        console.log(files);
    });

---

# File Input та Drag & Drop

Обидва джерела можуть дати:

    FileList

File Input:

    input.files

Drag and Drop:

    event.dataTransfer.files

Після цього логіка обробки файлів може бути однаковою.

---

# File Object

Спрощено:

    File
      ↓
    Blob
      ↓
    binary data

`File` є спеціалізованим типом `Blob` і додає інформацію про файл, наприклад:

    name
    lastModified

---

# Blob

`Blob` — об'єкт, який представляє immutable raw data.

Наприклад:

    const blob = new Blob(
        ["Hello"],
        {
            type: "text/plain"
        }
    );

Blob можна використовувати з:

    URL.createObjectURL()

Наприклад:

    const url =
        URL.createObjectURL(blob);

---

# File vs Blob

`Blob`:

    raw data

`File`:

    Blob + file metadata

Спрощено:

    File
      ↓
    Blob + name + lastModified

---

# ArrayBuffer

Для роботи з binary data можна використовувати:

    ArrayBuffer

Наприклад:

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        const buffer = reader.result;

        console.log(buffer);
    });

    reader.readAsArrayBuffer(file);

---

# File Input Security

Browser не дозволяє JavaScript довільно читати файли користувача.

JavaScript може отримати доступ до файлу після того, як користувач вибрав його через File Input або інший дозволений механізм.

Це важливий принцип безпеки браузера.

---

# Не можна просто вказати шлях до файлу

JavaScript не повинен отримувати реальний локальний шлях до файлу користувача для довільного доступу.

Наприклад, браузер може показувати:

    C:\fakepath\photo.jpg

замість реального шляху.

Головне для JavaScript:

    File object

а не фізичний шлях на диску.

---

# File Input value

Можна звернутися до:

    fileInput.value

Але для роботи з файлом набагато важливіше:

    fileInput.files

Не потрібно покладатися на `value` як на спосіб отримання локального шляху.

---

# Reset File Input

Після upload або при очищенні форми можна скинути File Input.

Наприклад:

    fileInput.value = "";

Після цього:

    fileInput.files

не міститиме вибраного файлу.

---

# Form reset

Якщо File Input знаходиться всередині форми:

    form.reset();

може очистити вибрані form controls, включаючи File Input.

---

# Типовий UI Flow

Наприклад, avatar upload:

    Choose image
          ↓
    File Input
          ↓
    validate type
          ↓
    validate size
          ↓
    preview
          ↓
    user confirms
          ↓
    FormData
          ↓
    fetch()
          ↓
    server
          ↓
    saved image

---

# Практичний приклад — Image Preview

HTML:

    <label for="avatar">
        Choose avatar
    </label>

    <input
        id="avatar"
        type="file"
        accept="image/*"
    >

    <img
        id="preview"
        alt="Avatar preview"
    >

JavaScript:

    const input =
        document.querySelector("#avatar");

    const preview =
        document.querySelector("#preview");

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            console.log("Select an image");
            return;
        }

        const url =
            URL.createObjectURL(file);

        preview.src = url;
    });

---

# Практичний приклад — Validation

    const input =
        document.querySelector("#avatar");

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) {
            return;
        }

        const maxSize =
            2 * 1024 * 1024;

        if (file.size > maxSize) {
            console.log(
                "Image must be smaller than 2 MB"
            );

            input.value = "";
            return;
        }

        if (!file.type.startsWith("image/")) {
            console.log(
                "Only images are allowed"
            );

            input.value = "";
            return;
        }

        console.log("Valid image");
    });

---

# Практичний приклад — Multiple Files

HTML:

    <input
        id="files"
        type="file"
        multiple
    >

JavaScript:

    const input =
        document.querySelector("#files");

    input.addEventListener("change", () => {
        const files = input.files;

        for (const file of files) {
            console.log(
                file.name,
                file.size,
                file.type
            );
        }
    });

---

# Практичний приклад — Text File

HTML:

    <input
        id="fileInput"
        type="file"
        accept=".txt"
    >

JavaScript:

    const input =
        document.querySelector("#fileInput");

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.addEventListener("load", () => {
            console.log(reader.result);
        });

        reader.addEventListener("error", () => {
            console.log("Read error");
        });

        reader.readAsText(file);
    });

---

# Практичний приклад — Upload

HTML:

    <form id="uploadForm">
        <input
            type="file"
            name="file"
        >

        <button type="submit">
            Upload
        </button>
    </form>

JavaScript:

    const form =
        document.querySelector("#uploadForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData =
            new FormData(form);

        const response = await fetch(
            "/upload",
            {
                method: "POST",
                body: formData
            }
        );

        console.log(
            await response.json()
        );
    });

---

# Типова структура File Upload

Frontend:

    input type="file"
          ↓
    File
          ↓
    validation
          ↓
    FormData
          ↓
    fetch()
          ↓
    HTTP POST

Backend:

    HTTP request
          ↓
    multipart parser
          ↓
    uploaded file
          ↓
    validation
          ↓
    storage
          ↓
    response

---

# Frontend vs Backend Validation

Frontend validation:

    size
    type
    extension
    number of files

Основна мета:

    UX

Backend validation:

    size
    MIME type
    actual file content
    extension
    filename
    permissions
    storage rules
    security

Основна мета:

    security + correctness

---

# Чому не можна довіряти file.type

`file.type` корисний для client-side validation, але не повинен бути єдиним security check.

Клієнтські дані потенційно можуть бути змінені або підроблені.

Тому сервер повинен сам перевіряти файл перед збереженням або обробкою.

---

# File Name

Не слід безпосередньо довіряти імені:

    file.name

Особливо при upload на сервер.

Наприклад:

    file.name

може містити небажані символи або несподівані значення.

На сервері часто генерують власне ім'я файлу.

Наприклад:

    random-id + extension

або:

    UUID + extension

---

# File Size

Client-side:

    file.size

дозволяє швидко відхилити занадто великий файл.

Наприклад:

    const MAX_SIZE =
        5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
        // reject
    }

Але сервер також повинен мати власний ліміт.

---

# File Input та Form

Приклад:

    <form id="form">
        <input
            type="text"
            name="username"
        >

        <input
            type="file"
            name="avatar"
        >

        <button type="submit">
            Submit
        </button>
    </form>

JavaScript:

    const form =
        document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData =
            new FormData(form);

        console.log(
            formData.get("username")
        );

        console.log(
            formData.get("avatar")
        );
    });

---

# FormData.get()

Якщо потрібно отримати файл із `FormData`:

    const file =
        formData.get("avatar");

`file` буде:

    File

якщо файл був вибраний.

---

# FormData.entries()

Можна переглянути всі поля:

    for (const [key, value]
        of formData.entries()) {

        console.log(key, value);
    }

Для File Input значенням буде `File`.

---

# FormData.has()

Перевірити наявність поля:

    if (formData.has("avatar")) {
        console.log("Avatar exists");
    }

---

# FormData.delete()

Видалити поле:

    formData.delete("avatar");

---

# FormData.set()

Встановити або замінити значення:

    formData.set("avatar", file);

---

# File Input + FormData

Типовий ланцюжок:

    <input type="file">

            ↓

    input.files

            ↓

    File

            ↓

    FormData

            ↓

    fetch()

            ↓

    server

Це один із базових frontend → backend workflows для upload.

---

# Типові помилки

❌ Забувати перевіряти, чи файл вибраний.

    const file = input.files[0];

    console.log(file.name);

Якщо файл не вибраний, `file` буде `undefined`.

Правильно:

    const file = input.files[0];

    if (!file) {
        return;
    }

---

❌ Плутати `FileList` та `Array`.

    input.files

не є звичайним Array.

За потреби:

    const files = [...input.files];

---

❌ Використовувати тільки extension для validation.

    file.name.endsWith(".jpg")

не є достатньою перевіркою.

---

❌ Вважати `accept` security-механізмом.

    accept="image/*"

не захищає сервер.

---

❌ Довіряти client-side validation.

Frontend validation потрібна для UX.

Server validation потрібна для security та correctness.

---

❌ Встановлювати `Content-Type` вручну при FormData.

Не потрібно:

    headers: {
        "Content-Type":
            "multipart/form-data"
    }

Браузер сам формує boundary.

---

❌ Забувати звільняти Object URL.

Якщо створюється багато preview:

    URL.createObjectURL(file)

потрібно очищати:

    URL.revokeObjectURL(url);

---

❌ Використовувати FileReader там, де достатньо Object URL.

Для простого image preview часто достатньо:

    URL.createObjectURL(file)

---

❌ Намагатися отримати реальний локальний шлях до файлу.

JavaScript працює з:

    File

а не з довільним фізичним шляхом користувача.

---

# File Input API — коротко

## HTML

    <input
        type="file"
    >

---

## Multiple

    <input
        type="file"
        multiple
    >

---

## Accept

    <input
        type="file"
        accept="image/*"
    >

---

## Files

    input.files

→ `FileList`

---

## First File

    input.files[0]

→ `File`

---

## File Name

    file.name

---

## File Size

    file.size

---

## File Type

    file.type

---

## Last Modified

    file.lastModified

---

## Change

    input.addEventListener(
        "change",
        handler
    );

---

## Preview

    const url =
        URL.createObjectURL(file);

    img.src = url;

---

## Cleanup

    URL.revokeObjectURL(url);

---

## Read Text

    reader.readAsText(file);

---

## Read Data URL

    reader.readAsDataURL(file);

---

## Upload

    const formData =
        new FormData(form);

    fetch("/upload", {
        method: "POST",
        body: formData
    });

---

# Питання зі співбесіди

Що таке `<input type="file">`?

Як отримати вибраний файл?

Що повертає `input.files`?

Що таке `FileList`?

Чим `FileList` відрізняється від Array?

Як отримати перший файл?

Що таке `File`?

Які основні властивості `File`?

Що містить `file.name`?

Що містить `file.size`?

Що містить `file.type`?

Що містить `file.lastModified`?

Що таке MIME type?

Як дозволити вибір декількох файлів?

Для чого потрібен `multiple`?

Для чого потрібен `accept`?

Чи є `accept` механізмом security validation?

Як перевірити розмір файлу?

Як перевірити MIME type?

Як отримати extension файлу?

Чому extension недостатньо для security validation?

Що таке `FileReader`?

Для чого потрібен `readAsText()`?

Для чого потрібен `readAsDataURL()`?

Для чого потрібен `readAsArrayBuffer()`?

Що таке `URL.createObjectURL()`?

Для чого потрібен `URL.revokeObjectURL()`?

Як показати preview зображення?

Що таке `Blob`?

Який зв'язок між `File` та `Blob`?

Що таке `ArrayBuffer`?

Як відправити файл на сервер?

Що таке `FormData`?

Як додати File до `FormData`?

Що таке `multipart/form-data`?

Чому не потрібно вручну встановлювати Content-Type для FormData?

Як відправити FormData через `fetch()`?

Як отримати файл через `formData.get()`?

Як працює `multiple` разом із `FormData`?

Чому client-side validation недостатньо?

Де повинна виконуватися остаточна validation файлу?

Чому не можна довіряти `file.name`?

Чому не можна довіряти `file.type` як єдиній security перевірці?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке:

    <input type="file">

`input.files`.

`FileList`.

`File`.

`change` event.

`multiple`.

`accept`.

Основні властивості:

    name
    size
    type
    lastModified

Перевірка:

    file exists
    file size
    file type

Перебір:

    for...of

Розуміння:

    File
    FileList

---

## 🔵 Junior

Робота з:

    File Input
    FileList
    File

Вміти:

    отримати файл
    отримати декілька файлів
    перевірити розмір
    перевірити MIME type
    перевірити extension
    показати preview
    очистити input

Розуміти:

    URL.createObjectURL()
    URL.revokeObjectURL()
    FileReader
    FormData
    multipart/form-data

Вміти:

    відправити File через fetch()
    працювати з FormData
    обробити image preview
    виконувати client-side validation

---

## 🟠 Middle

Глибше розуміти:

    File API
    Blob
    FileReader
    ArrayBuffer
    FormData
    multipart/form-data

Працювати з:

    multiple uploads
    drag & drop
    upload progress
    large files
    previews
    client-side validation

Розуміти:

    browser security model
    object URLs
    binary data
    file upload lifecycle

Розуміти різницю між:

    File
    Blob
    ArrayBuffer
    Data URL
    Object URL

Розуміти frontend/backend responsibilities.

---

## 🔴 Senior

Глибоке розуміння:

    File API
    Blob API
    Streams
    ArrayBuffer
    TypedArrays
    FormData
    multipart encoding
    upload streams

Працювати з:

    large file uploads
    chunked uploads
    resumable uploads
    upload progress
    parallel uploads
    cancellation
    streaming

Розуміти:

    memory implications
    browser storage
    object URL lifecycle
    binary protocols
    server-side validation
    content sniffing
    upload security
    storage architecture

Розуміти trade-offs між:

    FileReader
    Object URLs
    ArrayBuffer
    Streams

---

# Міні-шпаргалка

## File Input

    <input
        type="file"
    >

---

## Multiple

    <input
        type="file"
        multiple
    >

---

## Accept

    <input
        type="file"
        accept="image/*"
    >

---

## Files

    input.files

    → FileList

---

## File

    const file =
        input.files[0];

---

## File properties

    file.name
    file.size
    file.type
    file.lastModified

---

## Check

    if (!file) {
        return;
    }

---

## Multiple files

    for (const file of input.files) {
        console.log(file.name);
    }

---

## Convert to Array

    const files = [
        ...input.files
    ];

---

## Preview

    const url =
        URL.createObjectURL(file);

    preview.src = url;

---

## Cleanup

    URL.revokeObjectURL(url);

---

## Read text

    const reader =
        new FileReader();

    reader.addEventListener("load", () => {
        console.log(reader.result);
    });

    reader.readAsText(file);

---

## FormData

    const formData =
        new FormData(form);

---

## Append File

    formData.append(
        "file",
        file
    );

---

## Upload

    fetch("/upload", {
        method: "POST",
        body: formData
    });

---

## File validation

    if (file.size > MAX_SIZE) {
        // reject
    }

    if (!allowedTypes.includes(file.type)) {
        // reject
    }

---

## Основний flow

    File Input
        ↓
    input.files
        ↓
    File
        ↓
    validation
        ↓
    preview
        ↓
    FormData
        ↓
    fetch()
        ↓
    multipart/form-data
        ↓
    server

---

# Головне:

• `<input type="file">` дозволяє користувачу вибрати файл.

• Вибрані файли доступні через:

    input.files

• `input.files` повертає `FileList`.

• Один елемент `FileList` — це `File`.

• Основні властивості:

    file.name
    file.size
    file.type
    file.lastModified

• `multiple` дозволяє вибрати декілька файлів.

• `accept` визначає бажані типи файлів для file picker.

• `accept` не є security validation.

• `file.size` вимірюється в bytes.

• `file.type` містить MIME type.

• Для client-side validation можна перевіряти:

    size
    type
    extension
    number of files

• Остаточну validation потрібно виконувати на сервері.

• Для image preview можна використовувати:

    URL.createObjectURL(file)

• Object URL після використання можна звільнити:

    URL.revokeObjectURL(url)

• `FileReader` використовується для читання вмісту файлів.

• Найважливіші методи:

    readAsText()
    readAsDataURL()
    readAsArrayBuffer()

• `File` є спеціалізованим типом `Blob`.

• `FormData` дозволяє передавати form fields разом із файлами.

• Для upload файлів зазвичай використовується:

    multipart/form-data

• При `fetch()` + `FormData` не потрібно вручну встановлювати:

    Content-Type

• Browser сам створює правильний `Content-Type` разом із boundary.

• Типовий upload workflow:

    input
      ↓
    File
      ↓
    validation
      ↓
    FormData
      ↓
    fetch
      ↓
    server

• Client-side validation потрібна насамперед для UX.

• Server-side validation потрібна для security та correctness.

• Не слід довіряти:

    file.name
    file.type
    file extension

як єдиному джерелу security validation.

• Для простого preview зображення часто достатньо:

    URL.createObjectURL(file)

• Для читання вмісту файлу використовують:

    FileReader

• `FileList` — не звичайний Array.

• За потреби його можна перетворити:

    const files = [...input.files];

• Основна модель роботи з файлами:

    SELECT
      ↓
    FILE
      ↓
    VALIDATE
      ↓
    PREVIEW
      ↓
    FORMDATA
      ↓
    UPLOAD
      ↓
    SERVER

• Найважливіше для Junior Full Stack:

    File Input
    File
    FileList
    File validation
    FormData
    fetch()
    multipart/form-data
    server-side validation

• File Input — це перший крок до повного frontend → backend upload workflow.