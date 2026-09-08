# 06. Images and Media

Зображення та мультимедіа — це важлива частина HTML-документа.

HTML дозволяє додавати:

- зображення;
- аудіо;
- відео;
- субтитри;
- SVG;
- адаптивні зображення;
- зображення різних форматів і розмірів;
- мультимедійний контент із зовнішніх джерел.

Головний принцип:

> HTML описує **структуру та зміст** медіа, а CSS відповідає переважно за його **відображення та layout**.

Для зображень основним елементом є `<img>`, для аудіо — `<audio>`, для відео — `<video>`.

---

## Ключові поняття

- `<img>` — зображення
- `src` — шлях до ресурсу
- `alt` — альтернативний текст
- `width` / `height` — розміри
- `<figure>` — самостійний медіа-контент
- `<figcaption>` — підпис до медіа
- `<picture>` — адаптивний вибір зображення
- `srcset` — набір варіантів зображення
- `sizes` — підказка браузеру щодо необхідного розміру
- `<audio>` — аудіо
- `<video>` — відео
- `<source>` — джерело медіа
- `<track>` — субтитри та текстові доріжки
- `controls` — стандартні елементи керування
- `autoplay` — автоматичне відтворення
- `muted` — без звуку
- `loop` — повторення
- `poster` — прев'ю відео
- `preload` — стратегія попереднього завантаження
- SVG — векторна графіка
- raster image — растрове зображення
- responsive image — адаптивне зображення
- lazy loading — відкладене завантаження
- MIME type — тип ресурсу
- fallback — запасний варіант

---

# 1. `<img>` — зображення

Базовий спосіб додати зображення:

    <img src="image.jpg" alt="Опис зображення">

`<img>` — це **void element**, тобто він не має закриваючого тегу.

Правильно:

    <img src="image.jpg" alt="Пейзаж у горах">

Неправильно:

    <img src="image.jpg" alt="Пейзаж у горах"></img>

---

# 2. Анатомія `<img>`

Типова конструкція:

    <img
        src="/images/mountains.jpg"
        alt="Гори на заході сонця"
        width="1200"
        height="800"
    >

Основні атрибути:

- `src` — де знаходиться зображення;
- `alt` — текстова альтернатива;
- `width` — ширина;
- `height` — висота.

---

# 3. `src`

`src` визначає адресу зображення.

## Абсолютний URL

    <img
        src="https://example.com/images/photo.jpg"
        alt="Photo"
    >

Використовується зовнішній ресурс.

---

## Root-relative path

    <img
        src="/images/photo.jpg"
        alt="Photo"
    >

Пошук починається від кореня сайту.

Якщо сайт:

    https://example.com

то:

    /images/photo.jpg

означає:

    https://example.com/images/photo.jpg

---

## Relative path

    <img
        src="images/photo.jpg"
        alt="Photo"
    >

Або:

    <img
        src="../images/photo.jpg"
        alt="Photo"
    >

Шлях визначається відносно поточного документа.

---

# 4. `alt` — альтернативний текст

`alt` — один із найважливіших атрибутів `<img>`.

Приклад:

    <img
        src="cat.jpg"
        alt="Рудий кіт сидить біля вікна"
    >

`alt` використовується, коли:

- зображення не завантажилося;
- користувач використовує screen reader;
- зображення недоступне;
- потрібно передати зміст зображення текстом.

---

# 5. Як писати хороший `alt`

Погано:

    <img src="cat.jpg" alt="image">

Також погано:

    <img src="cat.jpg" alt="photo">

Краще:

    <img
        src="cat.jpg"
        alt="Рудий кіт сидить біля вікна"
    >

`alt` повинен описувати **зміст або функцію** зображення.

---

# 6. Декоративні зображення

Якщо зображення не має інформаційної цінності, а використовується лише як декорація:

    <img src="decorative-line.svg" alt="">

Порожній `alt` означає:

> це зображення не потрібно озвучувати користувачу screen reader.

Не потрібно писати:

    alt="decorative image"

Краще:

    alt=""

---

# 7. `alt` залежить від контексту

Одне й те саме зображення може мати різний `alt`.

Наприклад, фотографія людини.

Якщо це просто фотографія:

    <img
        src="john.jpg"
        alt="Джон Сміт"
    >

Якщо фотографія є посиланням на профіль:

    <a href="/users/john">
        <img
            src="john.jpg"
            alt="Профіль Джона Сміта"
        >
    </a>

Тут важлива не тільки сама фотографія, а й функція посилання.

---

# 8. `alt` не повинен бути надто довгим

Погано:

    <img
        src="mountain.jpg"
        alt="На цій дуже красивій фотографії ми бачимо великі високі гори, які розташовані далеко на горизонті, а перед ними знаходиться зелена долина..."
    >

Краще:

    <img
        src="mountain.jpg"
        alt="Гірська долина на заході сонця"
    >

Опис повинен бути:

- точним;
- коротким;
- змістовним.

---

# 9. `width` і `height`

Можна вказати intrinsic dimensions зображення:

    <img
        src="photo.jpg"
        alt="Місто"
        width="1200"
        height="800"
    >

Це допомагає браузеру заздалегідь зарезервувати місце під зображення.

Це важливо для:

- стабільності layout;
- зменшення layout shift;
- кращого UX.

---

# 10. `width` і `height` не обов'язково означають фактичний CSS-розмір

Наприклад:

    <img
        src="photo.jpg"
        alt="Місто"
        width="1200"
        height="800"
    >

CSS може відобразити його меншим:

    img {
        max-width: 100%;
        height: auto;
    }

HTML:

    <img
        src="photo.jpg"
        alt="Місто"
        width="1200"
        height="800"
    >

може відображатися на екрані шириною 600px.

---

# 11. Співвідношення сторін

Якщо оригінальне зображення:

    1200 × 800

то його aspect ratio:

    3 : 2

Якщо вказати:

    width="1200"
    height="800"

браузер знає правильне співвідношення сторін.

Не варто без потреби вказувати неправильні пропорції:

    <img
        src="photo.jpg"
        alt="Photo"
        width="1200"
        height="400"
    >

Це може призвести до спотворення зображення залежно від CSS.

---

# 12. Формати зображень

Найпоширеніші формати:

- JPEG / JPG
- PNG
- GIF
- SVG
- WebP
- AVIF

---

## JPEG / JPG

Добре підходить для:

- фотографій;
- пейзажів;
- складних зображень із великою кількістю кольорів.

Приклад:

    <img
        src="photo.jpg"
        alt="Міський пейзаж"
    >

---

## PNG

Добре підходить для:

- прозорості;
- скріншотів;
- графіки;
- зображень, де важлива відсутність втрат.

Наприклад:

    <img
        src="logo.png"
        alt="Logo"
    >

---

## GIF

Підходить для простих анімацій.

    <img
        src="animation.gif"
        alt="Анімація"
    >

Для сучасних складних анімацій GIF часто не є найкращим варіантом.

---

# 13. SVG

SVG — векторний формат.

Наприклад:

    <img
        src="logo.svg"
        alt="Логотип компанії"
    >

SVG добре підходить для:

- логотипів;
- іконок;
- схем;
- графіки;
- простих ілюстрацій.

Перевага:

> SVG можна масштабувати без типової для растрових зображень втрати якості.

---

# 14. WebP

WebP — сучасний формат зображень.

    <img
        src="photo.webp"
        alt="Гірський пейзаж"
    >

Може забезпечувати хороший баланс між:

- якістю;
- розміром файлу;
- продуктивністю.

---

# 15. AVIF

AVIF — сучасний формат із високою ефективністю стиснення.

    <img
        src="photo.avif"
        alt="Гірський пейзаж"
    >

Може бути дуже ефективним для оптимізації зображень.

---

# 16. Растрова та векторна графіка

## Raster

Приклади:

- JPG;
- PNG;
- WebP;
- AVIF.

Зображення складається з пікселів.

Добре для:

- фотографій;
- складних зображень;
- текстур.

---

## Vector

Приклад:

- SVG.

Зображення описується геометричними об'єктами.

Добре для:

- логотипів;
- іконок;
- схем;
- простих ілюстрацій.

---

# 17. `<figure>`

`<figure>` використовується для самостійного контенту:

    <figure>
        <img
            src="mountains.jpg"
            alt="Гори на заході сонця"
        >
    </figure>

Особливо корисний, коли зображення має власний підпис.

---

# 18. `<figcaption>`

`<figcaption>` — підпис до `<figure>`.

    <figure>
        <img
            src="mountains.jpg"
            alt="Гори на заході сонця"
        >

        <figcaption>
            Карпати на заході сонця
        </figcaption>
    </figure>

---

# 19. Коли використовувати `<figure>`

Наприклад:

- фотографія зі змістовним підписом;
- схема;
- діаграма;
- ілюстрація;
- фрагмент коду;
- самостійний медіа-контент.

Приклад:

    <figure>
        <img
            src="architecture.png"
            alt="Схема архітектури застосунку"
        >

        <figcaption>
            Архітектура frontend і backend
        </figcaption>
    </figure>

---

# 20. `<picture>`

`<picture>` дозволяє браузеру вибрати відповідне зображення.

Базова структура:

    <picture>
        <source srcset="image.avif" type="image/avif">
        <source srcset="image.webp" type="image/webp">

        <img
            src="image.jpg"
            alt="Гірський пейзаж"
        >
    </picture>

Тут:

- AVIF — перший варіант;
- WebP — другий;
- JPG — fallback.

---

# 21. Fallback

Fallback — запасний варіант.

У:

    <picture>
        <source srcset="image.webp" type="image/webp">

        <img
            src="image.jpg"
            alt="Пейзаж"
        >
    </picture>

`<img>` є fallback.

Якщо браузер не використовує `<source>`, він може використати `<img>`.

---

# 22. `srcset`

`srcset` дозволяє запропонувати браузеру кілька версій зображення.

Наприклад:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        alt="Гірський пейзаж"
    >

Браузер може вибрати відповідний ресурс залежно від:

- розміру viewport;
- pixel density;
- `sizes`;
- інших умов завантаження.

---

# 23. `sizes`

`sizes` повідомляє браузеру, яку приблизно ширину займає зображення в layout.

Наприклад:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 600px) 100vw,
            50vw
        "
        alt="Гірський пейзаж"
    >

У спрощеному вигляді:

    sizes="100vw"

означає:

> зображення приблизно займає всю ширину viewport.

---

# 24. `srcset` + `sizes`

Типовий responsive image:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w,
            photo-1600.jpg 1600w
        "
        sizes="
            (max-width: 600px) 100vw,
            (max-width: 1000px) 80vw,
            1200px
        "
        alt="Гірський пейзаж"
        width="1600"
        height="1067"
    >

Це дозволяє не завантажувати величезне зображення там, де достатньо маленького.

---

# 25. Pixel density

Сучасні екрани можуть мати різну pixel density.

Наприклад:

- 1x;
- 2x;
- 3x.

Для простих випадків можна використовувати descriptor `x`.

    <img
        src="logo.png"
        srcset="
            logo.png 1x,
            logo@2x.png 2x
        "
        alt="Логотип"
    >

Це відрізняється від `400w`, `800w`, `1200w`.

`w` описує ширину ресурсу в pixels.

`x` описує pixel density.

---

# 26. `loading="lazy"`

Для зображень, які знаходяться далеко нижче першого екрану, можна використовувати:

    <img
        src="gallery/photo.jpg"
        alt="Фото"
        loading="lazy"
    >

Браузер може відкласти завантаження зображення до моменту, коли воно стане потрібним.

Це називається:

> lazy loading.

---

# 27. Не потрібно робити все `lazy`

Не варто бездумно використовувати:

    loading="lazy"

для кожного зображення.

Наприклад, головне hero-зображення сторінки може бути критичним для першого екрану.

У такому випадку агресивне lazy loading може погіршити швидкість відображення.

---

# 28. `loading="eager"`

Можна явно вказати звичайне завантаження:

    <img
        src="hero.jpg"
        alt="Головне зображення"
        loading="eager"
    >

`eager` означає:

> не відкладати завантаження через lazy loading.

За замовчуванням поведінка для `<img>` — не `lazy`.

---

# 29. `decoding`

Можна вказати браузеру підказку щодо декодування:

    <img
        src="photo.jpg"
        alt="Фото"
        decoding="async"
    >

Можливі значення:

- `auto`;
- `sync`;
- `async`.

Для більшості випадків браузер сам вибирає оптимальну стратегію.

---

# 30. `<audio>`

Для аудіо використовується:

    <audio controls>
        <source src="audio.mp3" type="audio/mpeg">
    </audio>

`controls` додає стандартні елементи керування:

- play;
- pause;
- volume;
- progress.

---

# 31. Простий `<audio>`

Можна написати:

    <audio
        src="audio.mp3"
        controls
    ></audio>

Але `<source>` дозволяє надати декілька форматів.

---

# 32. `<source>` для audio

    <audio controls>
        <source
            src="audio.mp3"
            type="audio/mpeg"
        >

        <source
            src="audio.ogg"
            type="audio/ogg"
        >

        Ваш браузер не підтримує audio.
    </audio>

Браузер може вибрати підтримуваний формат.

---

# 33. `controls`

Без:

    <audio src="audio.mp3"></audio>

користувач не отримує стандартних елементів керування.

З:

    <audio
        src="audio.mp3"
        controls
    ></audio>

браузер показує audio controls.

---

# 34. `autoplay`

Можна вказати:

    <audio
        src="audio.mp3"
        autoplay
    ></audio>

Але автоматичне відтворення медіа часто обмежується браузерами.

Тому не варто будувати UX навколо гарантованого `autoplay`.

---

# 35. `muted`

Відео або аудіо можна початково вимкнути:

    <video
        src="video.mp4"
        autoplay
        muted
    ></video>

Комбінація:

    autoplay
    muted

часто використовується для автоматичного відтворення відео без звуку.

---

# 36. `loop`

Повторне відтворення:

    <audio
        src="music.mp3"
        controls
        loop
    ></audio>

Після завершення медіа відтворення може початися знову.

---

# 37. `preload`

`preload` — підказка браузеру щодо попереднього завантаження медіа.

Наприклад:

    <audio
        src="audio.mp3"
        controls
        preload="metadata"
    ></audio>

Можливі значення:

- `none`;
- `metadata`;
- `auto`.

---

## `preload="none"`

    <audio
        src="audio.mp3"
        controls
        preload="none"
    ></audio>

Не потрібно заздалегідь завантажувати медіа.

---

## `preload="metadata"`

    <audio
        src="audio.mp3"
        controls
        preload="metadata"
    ></audio>

Можна завантажити метадані, наприклад тривалість.

---

## `preload="auto"`

    <audio
        src="audio.mp3"
        controls
        preload="auto"
    ></audio>

Браузер може попередньо завантажувати більше даних.

---

# 38. `<video>`

Для відео:

    <video
        src="video.mp4"
        controls
    ></video>

---

# 39. Video з `<source>`

Рекомендована структура для кількох форматів:

    <video controls>
        <source
            src="video.mp4"
            type="video/mp4"
        >

        <source
            src="video.webm"
            type="video/webm"
        >

        Ваш браузер не підтримує video.
    </video>

---

# 40. `width` і `height` для video

Можна вказати dimensions:

    <video
        src="video.mp4"
        controls
        width="1280"
        height="720"
    ></video>

Наприклад:

    1280 × 720

має aspect ratio:

    16 : 9

---

# 41. `poster`

`poster` — зображення, яке показується до початку відтворення відео.

    <video
        src="video.mp4"
        poster="preview.jpg"
        controls
    ></video>

Це особливо корисно для:

- preview;
- video archive;
- навчальних відео;
- сторінок із великою кількістю відео.

---

# 42. `video` + poster + dimensions

Приклад:

    <video
        width="1280"
        height="720"
        poster="/images/video-preview.jpg"
        controls
    >
        <source
            src="/videos/service.mp4"
            type="video/mp4"
        >
    </video>

---

# 43. `playsinline`

На мобільних пристроях можна вказати:

    <video
        src="video.mp4"
        controls
        playsinline
    ></video>

`playsinline` дозволяє відео відтворюватися inline замість примусового переходу в fullscreen у середовищах, де це має значення.

---

# 44. Video autoplay

Наприклад:

    <video
        src="background.mp4"
        autoplay
        muted
        loop
        playsinline
    ></video>

Це типовий патерн для background/video-preview.

Але:

> autoplay не слід вважати гарантованим для будь-якого сценарію.

---

# 45. `<track>` — субтитри

Для текстових доріжок використовується `<track>`.

Наприклад:

    <video
        src="lesson.mp4"
        controls
    >
        <track
            src="subtitles-en.vtt"
            kind="subtitles"
            srclang="en"
            label="English"
        >
    </video>

Файл:

    subtitles-en.vtt

містить текст субтитрів.

---

# 46. WebVTT

Для `<track>` часто використовується формат WebVTT.

Приклад структури:

    WEBVTT

    00:00.000 --> 00:04.000
    Welcome to the lesson.

    00:04.000 --> 00:08.000
    Today we will learn HTML.

Формат:

    start --> end
    text

---

# 47. `kind`

`track` може мати різні типи:

    kind="subtitles"

    kind="captions"

    kind="descriptions"

    kind="chapters"

    kind="metadata"

Наприклад:

    <track
        src="captions.vtt"
        kind="captions"
        srclang="uk"
        label="Українська"
    >

---

# 48. `srclang`

Вказує мову доріжки:

    srclang="uk"

або:

    srclang="en"

або:

    srclang="de"

---

# 49. `label`

Текст, який користувач може бачити у виборі доріжки:

    label="Українська"

Наприклад:

    <track
        src="subtitles-uk.vtt"
        kind="subtitles"
        srclang="uk"
        label="Українська"
    >

---

# 50. `<video>` з кількома субтитрами

    <video
        src="lesson.mp4"
        controls
    >
        <track
            src="subtitles-uk.vtt"
            kind="subtitles"
            srclang="uk"
            label="Українська"
        >

        <track
            src="subtitles-en.vtt"
            kind="subtitles"
            srclang="en"
            label="English"
        >
    </video>

---

# 51. Доступність мультимедіа

Мультимедіа повинно бути доступним.

Для video варто розглядати:

- субтитри;
- captions;
- текстову альтернативу;
- зрозумілий контент;
- доступне керування з клавіатури.

Для audio:

- transcript;
- текстовий опис;
- доступний player.

Наприклад:

    <audio controls>
        <source src="lecture.mp3" type="audio/mpeg">
    </audio>

    <p>
        <a href="/transcripts/lecture.html">
            Transcript of the lecture
        </a>
    </p>

---

# 52. Зображення як посилання

Зображення часто використовується всередині `<a>`:

    <a href="/products">
        <img
            src="/images/products.jpg"
            alt="Переглянути товари"
        >
    </a>

Якщо зображення є єдиним доступним ім'ям посилання, `alt` має описувати **дію або призначення**.

---

# 53. Зображення + текстове посилання

Наприклад:

    <a href="/articles/html">
        <img
            src="/images/html.jpg"
            alt=""
        >

        <span>
            HTML fundamentals
        </span>
    </a>

Тут текст уже називає посилання.

Тому декоративне зображення може мати:

    alt=""

---

# 54. `<figure>` не є просто контейнером

Не потрібно використовувати `<figure>` для будь-якого зображення.

Наприклад:

    <div>
        <img src="avatar.jpg" alt="John Smith">
    </div>

може бути цілком нормальним.

`<figure>` краще використовувати, коли контент є самостійним і має власний зв'язок із підписом або основним документом.

---

# 55. `<img>` vs CSS background-image

Зображення контенту:

    <img
        src="photo.jpg"
        alt="Міський пейзаж"
    >

Декоративне зображення:

    <div class="hero"></div>

    .hero {
        background-image: url("hero.jpg");
    }

Головна ідея:

> Якщо зображення є частиною контенту — зазвичай `<img>`.

> Якщо це лише декоративний фон — часто CSS `background-image`.

---

# 56. Не використовуй CSS для контентних зображень

Поганий підхід:

    .article-image {
        background-image: url("article.jpg");
    }

Якщо це важлива фотографія статті.

Краще:

    <img
        src="article.jpg"
        alt="Опис фотографії"
    >

Так браузер і assistive technologies краще розуміють роль контенту.

---

# 57. `<img>` vs `<picture>`

`<img>`:

    <img
        src="photo.jpg"
        alt="Пейзаж"
    >

Простий випадок.

`<picture>`:

    <picture>
        <source srcset="photo.avif" type="image/avif">
        <source srcset="photo.webp" type="image/webp">

        <img
            src="photo.jpg"
            alt="Пейзаж"
        >
    </picture>

Потрібен, коли потрібен вибір ресурсу.

---

# 58. `<img>` vs `<video>`

`<img>`:

    <img
        src="photo.jpg"
        alt="Пейзаж"
    >

Статичне зображення.

`<video>`:

    <video controls>
        <source src="video.mp4" type="video/mp4">
    </video>

Відеоконтент.

---

# 59. `<audio>` vs `<video>`

`<audio>`:

    <audio controls>
        <source src="audio.mp3" type="audio/mpeg">
    </audio>

Використовується для:

- музики;
- подкастів;
- лекцій;
- аудіозаписів.

`<video>`:

    <video controls>
        <source src="video.mp4" type="video/mp4">
    </video>

Використовується для:

- відео;
- лекцій;
- записів подій;
- відеоархівів.

---

# 60. MIME type

`type` у `<source>` може повідомляти браузеру тип ресурсу.

Наприклад:

    type="image/avif"

    type="image/webp"

    type="image/jpeg"

    type="video/mp4"

    type="video/webm"

    type="audio/mpeg"

    type="audio/ogg"

---

# 61. Мультимедіа з fallback-текстом

Наприклад:

    <video controls>
        <source
            src="video.mp4"
            type="video/mp4"
        >

        <p>
            Ваш браузер не підтримує відтворення цього відео.
        </p>
    </video>

Fallback-текст може бути корисним для старих або несумісних середовищ.

---

# 62. Зображення та продуктивність

Великі зображення можуть сильно впливати на:

- швидкість завантаження;
- mobile performance;
- Core Web Vitals;
- bandwidth;
- UX.

Погано:

    <img
        src="original-8000x6000.jpg"
        alt="Photo"
    >

якщо на екрані реально потрібно лише 600px.

Краще мати оптимізовані версії.

---

# 63. Оптимізація зображень

Основні принципи:

1. використовувати правильний формат;
2. не завантажувати зображення значно більшого розміру, ніж потрібно;
3. використовувати responsive images;
4. задавати `width` і `height`;
5. використовувати `loading="lazy"` для нетермінових зображень;
6. оптимізувати compression;
7. не використовувати величезні PNG без необхідності.

---

# 64. Responsive images

Простий варіант:

    <img
        src="photo.jpg"
        alt="Пейзаж"
        width="1200"
        height="800"
    >

Більш просунутий:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="100vw"
        alt="Пейзаж"
        width="1200"
        height="800"
    >

---

# 65. Art direction

Іноді на mobile та desktop потрібні **різні композиції**, а не просто різні розміри.

Наприклад:

desktop:

    широке фото пейзажу

mobile:

    вертикально обрізане фото

Для цього використовується `<picture>`.

    <picture>
        <source
            media="(max-width: 600px)"
            srcset="mountains-mobile.jpg"
        >

        <img
            src="mountains-desktop.jpg"
            alt="Гірський пейзаж"
        >
    </picture>

---

# 66. `media` у `<source>`

Приклад:

    <picture>
        <source
            media="(max-width: 600px)"
            srcset="hero-mobile.jpg"
        >

        <source
            media="(min-width: 601px)"
            srcset="hero-desktop.jpg"
        >

        <img
            src="hero-desktop.jpg"
            alt="Головний пейзаж"
        >
    </picture>

Тут `<source>` вибирається залежно від media condition.

---

# 67. `<picture>` для формату та розміру

Можна комбінувати різні умови.

Наприклад:

    <picture>
        <source
            media="(max-width: 600px)"
            srcset="hero-mobile.webp"
            type="image/webp"
        >

        <source
            srcset="hero.webp"
            type="image/webp"
        >

        <img
            src="hero.jpg"
            alt="Гірський пейзаж"
            width="1600"
            height="900"
        >
    </picture>

---

# 68. SVG як `<img>`

SVG можна підключити як зовнішній файл:

    <img
        src="/icons/search.svg"
        alt="Пошук"
    >

Це зручно для:

- логотипів;
- іконок;
- декоративної графіки.

---

# 69. Inline SVG

SVG також може бути безпосередньо в HTML:

    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="..."></path>
    </svg>

Це вже не `<img>`.

Inline SVG дозволяє працювати з SVG безпосередньо через HTML/CSS.

---

# 70. SVG та accessibility

Якщо SVG декоративний:

    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        ...
    </svg>

Якщо SVG передає важливу інформацію, потрібно забезпечити доступну назву/текстову альтернативу відповідно до його ролі.

---

# 71. Іконка всередині посилання

Наприклад:

    <a href="/search">
        <svg aria-hidden="true">
            ...
        </svg>

        <span>Пошук</span>
    </a>

Текст:

    Пошук

є доступною назвою посилання.

---

# 72. Іконка без тексту

Якщо посилання складається лише з іконки:

    <a href="/search" aria-label="Пошук">
        <svg aria-hidden="true">
            ...
        </svg>
    </a>

Потрібно забезпечити доступну назву.

---

# 73. Не використовуй `alt` як заміну тексту всюди

Наприклад:

    <a href="/search">
        <img src="search.svg" alt="Пошук">
    </a>

може бути коректним.

Але якщо є видимий текст:

    <a href="/search">
        <img src="search.svg" alt="">
        <span>Пошук</span>
    </a>

то іконка є декоративною, тому:

    alt=""

---

# 74. `title` не є заміною `alt`

Не варто робити:

    <img
        src="photo.jpg"
        title="Гірський пейзаж"
        alt=""
    >

і вважати `title` альтернативним текстом.

Для контентного зображення використовується:

    alt="Гірський пейзаж"

---

# 75. Завантаження файлу через `<a>`

Атрибут `download` може запропонувати завантажити ресурс:

    <a
        href="/files/report.pdf"
        download
    >
        Завантажити PDF
    </a>

Можна вказати ім'я:

    <a
        href="/files/report.pdf"
        download="report-2026.pdf"
    >
        Завантажити звіт
    </a>

---

# 76. `<iframe>` і медіа

`<iframe>` дозволяє вбудовувати зовнішній документ або сервіс.

Наприклад:

    <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Відео"
    ></iframe>

Але `<iframe>` — це не те саме, що `<video>`.

`<video>`:

> браузер відтворює відеофайл безпосередньо.

`<iframe>`:

> вбудовується інший документ/плеєр.

---

# 77. `<video>` vs YouTube iframe

Локальне або власне відео:

    <video controls>
        <source
            src="/videos/lesson.mp4"
            type="video/mp4"
        >
    </video>

Зовнішній video platform player:

    <iframe
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="Lesson video"
    ></iframe>

Вибір залежить від архітектури та джерела відео.

---

# 78. Доступність `<iframe>`

Для iframe варто вказувати:

    title="Назва вбудованого контенту"

Наприклад:

    <iframe
        src="https://example.com"
        title="Карта розташування храму"
    ></iframe>

`title` допомагає assistive technologies зрозуміти призначення iframe.

---

# 79. Медіа та семантика

Не потрібно використовувати `<div>` замість спеціалізованих елементів.

Погано:

    <div class="video">
        ...
    </div>

як заміна реальному video player.

Краще:

    <video controls>
        ...
    </video>

HTML-елемент повинен описувати семантичну роль контенту.

---

# 80. `alt` і SEO

Якісний `alt`:

- покращує accessibility;
- допомагає зрозуміти зміст зображення;
- може допомагати пошуковим системам краще інтерпретувати зображення.

Але `alt` не потрібно перетворювати на список ключових слів.

Погано:

    alt="HTML CSS JavaScript frontend developer HTML course best HTML tutorial"

Краще:

    alt="HTML-код структури вебсторінки"

---

# 81. Типові помилки з `<img>`

## Помилка 1 — відсутній `alt`

    <img src="photo.jpg">

Краще:

    <img
        src="photo.jpg"
        alt="Міський пейзаж"
    >

Або для декоративного:

    <img
        src="decoration.svg"
        alt=""
    >

---

## Помилка 2 — `alt="image"`

    <img src="photo.jpg" alt="image">

Це не описує зміст.

---

## Помилка 3 — величезний файл

    <img
        src="photo-original-8000x6000.jpg"
        alt="Photo"
    >

якщо реально потрібна маленька версія.

---

## Помилка 4 — відсутні dimensions

    <img
        src="photo.jpg"
        alt="Photo"
    >

Краще, коли відомі intrinsic dimensions:

    <img
        src="photo.jpg"
        alt="Photo"
        width="1200"
        height="800"
    >

---

# 82. Типові помилки з `<video>`

Погано:

    <video src="video.mp4"></video>

Користувач може не отримати controls.

Краще:

    <video
        src="video.mp4"
        controls
    ></video>

---

# 83. Не покладайся на autoplay

Погано будувати важливий UX тільки на:

    autoplay

Користувач повинен мати зрозумілий спосіб:

- запустити;
- зупинити;
- змінити гучність;
- переглянути контент.

---

# 84. Не забувай про субтитри

Погано:

    <video
        src="lesson.mp4"
        controls
    ></video>

якщо відео містить важливу усну інформацію і немає доступної текстової альтернативи.

Краще:

    <video controls>
        <source
            src="lesson.mp4"
            type="video/mp4"
        >

        <track
            src="lesson-uk.vtt"
            kind="subtitles"
            srclang="uk"
            label="Українська"
        >
    </video>

---

# 85. Lazy loading для gallery

Наприклад:

    <section>
        <img
            src="photo-1.jpg"
            alt="Фото 1"
            width="800"
            height="600"
            loading="lazy"
        >

        <img
            src="photo-2.jpg"
            alt="Фото 2"
            width="800"
            height="600"
            loading="lazy"
        >

        <img
            src="photo-3.jpg"
            alt="Фото 3"
            width="800"
            height="600"
            loading="lazy"
        >
    </section>

Для довгих галерей це може суттєво зменшити початкові витрати завантаження.

---

# 86. Hero image

Головне зображення сторінки часто називають:

> hero image

Наприклад:

    <section>
        <img
            src="/images/hero.jpg"
            alt="Храм у Вінниці"
            width="1600"
            height="900"
        >

        <h1>
            Храм прп. Серафіма Саровського
        </h1>
    </section>

Таке зображення може бути важливим для першого екрану, тому не потрібно автоматично робити його `loading="lazy"`.

---

# 87. Галерея

Семантично проста галерея:

    <section aria-labelledby="gallery-title">
        <h2 id="gallery-title">
            Фотогалерея
        </h2>

        <figure>
            <img
                src="photo-1.jpg"
                alt="Храм взимку"
                width="800"
                height="600"
                loading="lazy"
            >

            <figcaption>
                Храм взимку
            </figcaption>
        </figure>

        <figure>
            <img
                src="photo-2.jpg"
                alt="Храм навесні"
                width="800"
                height="600"
                loading="lazy"
            >

            <figcaption>
                Храм навесні
            </figcaption>
        </figure>
    </section>

---

# 88. Video archive

Приклад структури відеоархіву:

    <section aria-labelledby="videos-title">
        <h2 id="videos-title">
            Відеоархів
        </h2>

        <article>
            <h3>
                Божественна літургія
            </h3>

            <video
                controls
                width="1280"
                height="720"
                poster="/images/liturgy-preview.jpg"
            >
                <source
                    src="/videos/liturgy.mp4"
                    type="video/mp4"
                >

                <track
                    src="/subtitles/liturgy-uk.vtt"
                    kind="subtitles"
                    srclang="uk"
                    label="Українська"
                >
            </video>
        </article>
    </section>

---

# 89. Медіа всередині `<article>`

Якщо медіа є частиною самостійної статті:

    <article>
        <h2>
            Історія храму
        </h2>

        <figure>
            <img
                src="church.jpg"
                alt="Храм у сонячний день"
                width="1200"
                height="800"
            >

            <figcaption>
                Храм прп. Серафіма Саровського
            </figcaption>
        </figure>

        <p>
            Текст статті...
        </p>
    </article>

---

# 90. Медіа та `<main>`

Приклад структури сторінки:

    <body>

        <header>
            <h1>Мій сайт</h1>
        </header>

        <main>
            <article>
                <h2>Стаття</h2>

                <figure>
                    <img
                        src="photo.jpg"
                        alt="Опис фотографії"
                        width="1200"
                        height="800"
                    >

                    <figcaption>
                        Підпис
                    </figcaption>
                </figure>
            </article>
        </main>

        <footer>
            ...
        </footer>

    </body>

---

# 91. Медійні формати — практичний вибір

У спрощеному вигляді:

    Фотографія
        ↓
    JPEG / WebP / AVIF

    Прозора графіка
        ↓
    PNG / WebP / SVG

    Логотип
        ↓
    SVG

    Іконка
        ↓
    SVG

    Відео
        ↓
    MP4 / WebM

    Аудіо
        ↓
    MP3 / OGG / інші підтримувані формати

Не потрібно запам'ятовувати всі формати напам'ять.

Важливіше розуміти:

> який формат відповідає конкретному типу контенту.

---

# 92. `src` та `srcset`

`src`:

    src="photo.jpg"

означає:

> основне джерело.

`srcset`:

    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "

означає:

> браузеру доступні різні варіанти.

---

# 93. `srcset` не замінює `src`

Практична конструкція:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        alt="Пейзаж"
    >

`src` залишається fallback/default source.

---

# 94. `sizes` — важлива частина responsive images

Якщо є:

    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "

але немає правильного `sizes`, браузеру може бути складніше визначити, який ресурс оптимальний для layout.

Наприклад:

    sizes="
        (max-width: 768px) 100vw,
        50vw
    "

означає приблизно:

- до 768px — зображення займає весь viewport;
- на більших екранах — приблизно половину viewport.

---

# 95. `loading`, `width`, `height` — три важливі атрибути

Для сучасного HTML часто варто думати про:

    <img
        src="photo.jpg"
        alt="Пейзаж"
        width="1200"
        height="800"
        loading="lazy"
    >

Але:

- `alt` — accessibility/content;
- `width` + `height` — dimensions/layout stability;
- `loading` — loading strategy.

Це різні проблеми.

---

# 96. Медіа та клавіатура

Вбудовані:

    <audio controls>
    </audio>

та:

    <video controls>
    </video>

повинні забезпечувати доступне керування.

Не потрібно створювати власний player на JavaScript, якщо стандартних browser controls достатньо.

На ранньому етапі:

> спочатку використовуй нативний HTML.

Потім, коли буде потреба, можна створити custom controls через JavaScript.

---

# 97. Progressive enhancement

Хороший принцип:

    HTML
      ↓
    базова функціональність
      ↓
    CSS
      ↓
    візуальне оформлення
      ↓
    JavaScript
      ↓
    додаткові можливості

Наприклад:

    <video controls>
        <source src="video.mp4" type="video/mp4">
    </video>

Спочатку працює native video.

Пізніше JavaScript може додати:

- custom controls;
- playlist;
- bookmarks;
- speed control;
- analytics.

---

# 98. Безпечне поводження із зовнішніми ресурсами

Не варто бездумно вставляти будь-які URL, отримані від користувача:

    <img src="USER_INPUT">

У динамічному застосунку URL потрібно коректно обробляти та валідувати.

Особливо це важливо для:

- SVG;
- iframe;
- зовнішніх ресурсів;
- URL, які контролює користувач.

Це вже перетинається з темами:

- XSS;
- Content Security Policy;
- URL validation;
- web security.

---

# 99. Зображення з CMS

У реальному застосунку URL зображення часто приходить із backend/CMS.

Наприклад:

    <img
        src={product.image}
        alt={product.name}
    >

Але frontend не повинен автоматично вважати будь-який URL безпечним.

У production-системах важливо контролювати:

- дозволені домени;
- формати;
- розміри;
- MIME type;
- оптимізацію;
- CDN.

---

# 100. Зовнішній CDN

Зображення можуть зберігатися не поруч із HTML, а на CDN.

Наприклад:

    <img
        src="https://cdn.example.com/images/photo.webp"
        alt="Пейзаж"
    >

HTML не цікавить, де фізично лежить файл.

Йому важлива URL-адреса ресурсу.

---

# 101. Що HTML робить із медіа

HTML відповідає переважно за:

- структуру;
- семантику;
- джерело ресурсу;
- альтернативний текст;
- доступність;
- native controls;
- responsive image selection;
- media sources.

CSS відповідає переважно за:

- розмір відображення;
- позиціонування;
- layout;
- object-fit;
- object-position;
- рамки;
- тіні;
- адаптивне оформлення.

JavaScript відповідає за:

- інтерактивність;
- custom controls;
- playlist;
- завантаження даних;
- dynamic media;
- складну логіку player.

---

# 102. HTML + CSS: базовий responsive image

HTML:

    <img
        src="photo.jpg"
        alt="Пейзаж"
        width="1200"
        height="800"
    >

CSS:

    img {
        max-width: 100%;
        height: auto;
    }

Ідея:

> зображення не повинно виходити за межі свого контейнера.

---

# 103. `object-fit`

Це вже CSS, але важливо знати назву.

Наприклад:

    img {
        width: 300px;
        height: 200px;
        object-fit: cover;
    }

`object-fit: cover` дозволяє зображенню заповнити заданий контейнер із можливим обрізанням.

Це належить до CSS, а не HTML.

---

# 104. Медіа в `<figure>` — хороший семантичний патерн

    <figure>
        <picture>
            <source
                srcset="photo.webp"
                type="image/webp"
            >

            <img
                src="photo.jpg"
                alt="Гірський пейзаж"
                width="1200"
                height="800"
                loading="lazy"
            >
        </picture>

        <figcaption>
            Гірський пейзаж
        </figcaption>
    </figure>

Це вже хороший фундамент для production HTML.

---

# 105. Практичний шаблон `<img>`

    <img
        src="/images/photo-800.webp"
        alt="Опис зображення"
        width="800"
        height="533"
        loading="lazy"
    >

---

# 106. Практичний шаблон responsive image

    <img
        src="/images/photo-800.webp"
        srcset="
            /images/photo-400.webp 400w,
            /images/photo-800.webp 800w,
            /images/photo-1200.webp 1200w
        "
        sizes="
            (max-width: 600px) 100vw,
            800px
        "
        alt="Опис зображення"
        width="1200"
        height="800"
        loading="lazy"
    >

---

# 107. Практичний шаблон `<picture>`

    <picture>
        <source
            srcset="/images/photo.avif"
            type="image/avif"
        >

        <source
            srcset="/images/photo.webp"
            type="image/webp"
        >

        <img
            src="/images/photo.jpg"
            alt="Опис зображення"
            width="1200"
            height="800"
            loading="lazy"
        >
    </picture>

---

# 108. Практичний шаблон `<audio>`

    <audio
        controls
        preload="metadata"
    >
        <source
            src="/audio/lecture.mp3"
            type="audio/mpeg"
        >

        <source
            src="/audio/lecture.ogg"
            type="audio/ogg"
        >

        Ваш браузер не підтримує audio.
    </audio>

---

# 109. Практичний шаблон `<video>`

    <video
        controls
        width="1280"
        height="720"
        poster="/images/video-preview.jpg"
        preload="metadata"
        playsinline
    >
        <source
            src="/videos/lesson.mp4"
            type="video/mp4"
        >

        <source
            src="/videos/lesson.webm"
            type="video/webm"
        >

        <track
            src="/subtitles/lesson-uk.vtt"
            kind="subtitles"
            srclang="uk"
            label="Українська"
        >

        Ваш браузер не підтримує video.
    </video>

---

# 110. `<link>` vs `<a>` для ресурсів

Не плутай:

    <a href="/image.jpg">
        Відкрити зображення
    </a>

і:

    <link
        rel="preload"
        href="/image.jpg"
        as="image"
    >

`<a>` — навігаційне посилання для користувача.

`<link>` — зв'язок документа з зовнішнім ресурсом/метаданими.

---

# 111. `<img>` не є `<a>`

Зображення:

    <img
        src="photo.jpg"
        alt="Пейзаж"
    >

Посилання на зображення:

    <a href="/gallery">
        <img
            src="photo.jpg"
            alt="Відкрити галерею"
        >
    </a>

`<img>` показує ресурс.

`<a>` забезпечує навігацію.

---

# 112. Доступність: головні правила

Для `<img>`:

    alt="змістовний опис"

або:

    alt=""

для декоративного зображення.

Для `<video>`:

    controls

і, коли потрібно:

    <track ...>

Для `<audio>`:

    controls

і, коли потрібно:

    transcript

Для iframe:

    title="опис вбудованого контенту"

---

# 113. Що запам'ятати про `alt`

Запам'ятай правило:

> `alt` описує не файл, а роль і зміст зображення в конкретному контексті.

Наприклад:

    alt="Рудий кіт"

або:

    alt="Відкрити профіль Джона"

або:

    alt=""

залежно від контексту.

---

# 114. Що запам'ятати про `<picture>`

`<picture>` потрібен не просто для того, щоб "показати картинку".

Він дозволяє реалізувати:

- art direction;
- різні формати;
- різні джерела;
- responsive image strategy.

Основна структура:

    <picture>
        <source ...>
        <source ...>

        <img ...>
    </picture>

---

# 115. Що запам'ятати про `<source>`

`<source>` сам по собі не є заміною `<img>`.

Він використовується всередині:

    <picture>

або:

    <audio>

або:

    <video>

---

# 116. Що запам'ятати про `srcset`

`srcset`:

> пропонує браузеру кілька варіантів ресурсу.

Наприклад:

    srcset="
        image-400.jpg 400w,
        image-800.jpg 800w,
        image-1200.jpg 1200w
    "

Це один із фундаментів responsive images.

---

# 117. Що запам'ятати про `sizes`

`sizes`:

> описує, яку приблизну ширину має займати зображення в layout.

Наприклад:

    sizes="
        (max-width: 600px) 100vw,
        50vw
    "

`sizes` має сенс насамперед разом із `srcset` з `w` descriptors.

---

# 118. Що запам'ятати про `loading`

Для зображень нижче першого екрану:

    loading="lazy"

Для критичного зображення не потрібно автоматично використовувати lazy loading.

Головне:

> lazy loading — це стратегія завантаження, а не універсальна властивість кожного зображення.

---

# 119. Що запам'ятати про dimensions

Добра практика:

    width="1200"
    height="800"

Це допомагає браузеру знати співвідношення сторін ще до повного завантаження зображення.

---

# 120. Міні-приклад повноцінної сторінки

    <!DOCTYPE html>
    <html lang="uk">

    <head>
        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>Images and Media</title>
    </head>

    <body>

        <header>
            <h1>Медіагалерея</h1>
        </header>

        <main>

            <section aria-labelledby="photos-title">

                <h2 id="photos-title">
                    Фотографії
                </h2>

                <figure>
                    <picture>

                        <source
                            srcset="/images/mountains.avif"
                            type="image/avif"
                        >

                        <source
                            srcset="/images/mountains.webp"
                            type="image/webp"
                        >

                        <img
                            src="/images/mountains.jpg"
                            alt="Гірський пейзаж на заході сонця"
                            width="1200"
                            height="800"
                            loading="lazy"
                        >

                    </picture>

                    <figcaption>
                        Гірський пейзаж
                    </figcaption>
                </figure>

            </section>

            <section aria-labelledby="audio-title">

                <h2 id="audio-title">
                    Аудіо
                </h2>

                <audio
                    controls
                    preload="metadata"
                >
                    <source
                        src="/audio/lecture.mp3"
                        type="audio/mpeg"
                    >

                    Ваш браузер не підтримує audio.
                </audio>

            </section>

            <section aria-labelledby="video-title">

                <h2 id="video-title">
                    Відео
                </h2>

                <video
                    controls
                    width="1280"
                    height="720"
                    poster="/images/video-preview.jpg"
                    preload="metadata"
                    playsinline
                >
                    <source
                        src="/videos/lesson.mp4"
                        type="video/mp4"
                    >

                    <track
                        src="/subtitles/lesson-uk.vtt"
                        kind="subtitles"
                        srclang="uk"
                        label="Українська"
                    >

                    Ваш браузер не підтримує video.
                </video>

            </section>

        </main>

        <footer>
            <p>
                © 2026
            </p>
        </footer>

    </body>

    </html>

---

# 121. Типова структура media-папок

Для невеликого проєкту:

    public/
    ├── images/
    │   ├── logo.svg
    │   ├── hero.webp
    │   ├── photo-400.webp
    │   ├── photo-800.webp
    │   └── photo-1200.webp
    │
    ├── videos/
    │   ├── lesson.mp4
    │   └── lesson.webm
    │
    ├── audio/
    │   └── lecture.mp3
    │
    └── subtitles/
        ├── lesson-uk.vtt
        └── lesson-en.vtt

---

# 122. Практична модель

Корисно мислити так:

    IMAGE
      │
      ├── content?
      │     └── <img>
      │
      ├── decorative?
      │     └── CSS background / alt=""
      │
      ├── multiple formats?
      │     └── <picture>
      │
      ├── multiple sizes?
      │     └── srcset + sizes
      │
      └── caption?
            └── <figure> + <figcaption>


    AUDIO
      │
      └── <audio>
            └── <source>


    VIDEO
      │
      ├── <video>
      │
      ├── <source>
      │
      ├── poster
      │
      └── <track>


    EXTERNAL PLAYER
      │
      └── <iframe>

---

# 123. Core — що потрібно знати обов'язково

На базовому рівні потрібно впевнено знати:

- `<img>`;
- `src`;
- `alt`;
- `width`;
- `height`;
- `<figure>`;
- `<figcaption>`;
- `<audio>`;
- `<video>`;
- `<source>`;
- `controls`;
- `poster`;
- `loading="lazy"`;
- основні формати зображень;
- raster vs vector;
- SVG;
- accessibility для зображень.

---

# 124. Junior — наступний рівень

Потрібно знати:

- `<picture>`;
- `srcset`;
- `sizes`;
- responsive images;
- art direction;
- WebP;
- AVIF;
- `preload`;
- `muted`;
- `autoplay`;
- `loop`;
- `playsinline`;
- `<track>`;
- WebVTT;
- captions;
- video accessibility;
- media performance;
- image optimization.

---

# 125. Middle — поглиблення

Варто розуміти:

- image loading strategy;
- responsive image selection;
- pixel density;
- `w` vs `x` descriptors;
- art direction;
- CDN;
- image transformation;
- caching;
- compression;
- Core Web Vitals;
- LCP та hero images;
- media performance;
- external media;
- iframe security;
- Content Security Policy;
- custom media controls;
- progressive enhancement.

---

# 126. Senior — системний рівень

Потрібно розуміти:

- media delivery architecture;
- CDN strategy;
- responsive image pipeline;
- automatic image transformation;
- caching strategy;
- content negotiation;
- performance budgets;
- LCP optimization;
- media accessibility;
- captions/transcripts;
- cross-origin media;
- CORS;
- CSP;
- security implications of SVG;
- third-party embeds;
- video streaming;
- adaptive bitrate streaming;
- media analytics.

---

# 127. Питання для співбесіди

### 1. Що таке `<img>`?

Елемент для відображення зображення.

---

### 2. Для чого потрібен `alt`?

Для текстової альтернативи зображенню та accessibility.

---

### 3. Коли `alt=""`?

Коли зображення є декоративним і не має інформаційного значення.

---

### 4. Чим `<img>` відрізняється від CSS background image?

`<img>` використовується для контентного зображення.

`background-image` переважно використовується для декоративного оформлення.

---

### 5. Що таке `<figure>`?

Семантичний контейнер для самостійного контенту, зокрема зображень, схем та ілюстрацій.

---

### 6. Для чого `<figcaption>`?

Для підпису `<figure>`.

---

### 7. Для чого `<picture>`?

Для вибору відповідного джерела/версії зображення.

---

### 8. Що таке `srcset`?

Набір альтернативних ресурсів для responsive images.

---

### 9. Для чого `sizes`?

Щоб описати браузеру приблизний розмір зображення в layout.

---

### 10. Що таке lazy loading?

Відкладене завантаження ресурсу до моменту, коли він стає потрібним.

---

### 11. Для чого `width` і `height` у `<img>`?

Щоб браузер знав intrinsic dimensions/aspect ratio і міг заздалегідь зарезервувати місце.

---

### 12. Для чого `<source>`?

Для альтернативних джерел у `<picture>`, `<audio>` та `<video>`.

---

### 13. Для чого `poster`?

Для preview-зображення відео до початку відтворення.

---

### 14. Для чого `<track>`?

Для текстових доріжок: subtitles, captions, chapters тощо.

---

### 15. Що таке WebVTT?

Формат текстових доріжок, який використовується, зокрема, разом із `<track>`.

---

### 16. Чому не потрібно всюди використовувати `loading="lazy"`?

Тому що критичні зображення, особливо для першого екрану, можуть потребувати швидкого завантаження.

---

### 17. Що таке responsive image?

Зображення, для якого браузер може вибрати відповідний ресурс залежно від умов відображення.

---

### 18. Чим `srcset` з `400w` відрізняється від `2x`?

`400w` — ширина ресурсу в CSS pixels.

`2x` — pixel density descriptor.

---

### 19. Чим `<video>` відрізняється від `<iframe>`?

`<video>` відтворює media resource через native video element.

`<iframe>` вбудовує інший документ або зовнішній player.

---

### 20. Чому важливі captions?

Вони роблять відеоконтент доступнішим, зокрема для людей, які не можуть або не хочуть сприймати аудіо.

---

# 128. Практичне завдання №1 — Image

Створи сторінку:

    images.html

Додай:

- заголовок;
- одну фотографію;
- `alt`;
- `width`;
- `height`.

---

# 129. Практичне завдання №2 — Figure

Створи:

    <figure>

з:

- `<img>`;
- `<figcaption>`.

---

# 130. Практичне завдання №3 — Gallery

Створи галерею з 6 фотографій.

Кожна фотографія повинна мати:

- `alt`;
- `width`;
- `height`;
- `loading="lazy"`.

---

# 131. Практичне завдання №4 — Responsive images

Для однієї фотографії створи:

- 400px;
- 800px;
- 1200px.

Потім:

    srcset

і:

    sizes

---

# 132. Практичне завдання №5 — Picture

Створи:

    <picture>

з:

- AVIF;
- WebP;
- JPG fallback.

---

# 133. Практичне завдання №6 — Audio player

Створи audio player:

    <audio controls>

Додай:

- MP3;
- другий fallback source;
- fallback-текст.

---

# 134. Практичне завдання №7 — Video player

Створи:

    <video controls>

Додай:

- MP4;
- WebM;
- poster;
- width;
- height.

---

# 135. Практичне завдання №8 — Subtitles

Додай до відео:

    <track>

з:

- українськими субтитрами;
- `kind`;
- `srclang`;
- `label`.

---

# 136. Практичне завдання №9 — Media page

Створи повноцінну сторінку:

    Media Gallery

Структура:

    Header
      ↓
    Main
      ↓
    Photo Gallery
      ↓
    Audio
      ↓
    Video
      ↓
    Footer

Використай семантичні HTML-елементи.

---

# 137. Практичне завдання №10 — Video archive

Створи простий відеоархів:

    Відеоархів
        │
        ├── Відео 1
        ├── Відео 2
        ├── Відео 3
        └── Відео 4

Кожен елемент повинен містити:

- title;
- poster;
- video;
- controls;
- dimensions;
- subtitles.

---

# 138. Чекліст перед завершенням HTML

Для кожного `<img>` перевір:

    [ ] Є src
    [ ] Є правильний alt
    [ ] alt описує зміст або функцію
    [ ] Для декоративного зображення alt=""
    [ ] Є width
    [ ] Є height
    [ ] Lazy loading використовується доречно
    [ ] Формат зображення оптимальний

Для `<video>`:

    [ ] Є controls
    [ ] Є source
    [ ] Є type
    [ ] Є poster, якщо потрібен preview
    [ ] Є width/height
    [ ] Є subtitles/captions, якщо потрібні

Для `<audio>`:

    [ ] Є controls
    [ ] Є source
    [ ] Є type
    [ ] Є transcript, якщо потрібен

---

# 139. Міні-шпаргалка

## Image

    <img
        src="photo.jpg"
        alt="Опис"
        width="1200"
        height="800"
    >

## Decorative image

    <img
        src="decoration.svg"
        alt=""
    >

## Lazy image

    <img
        src="photo.jpg"
        alt="Опис"
        loading="lazy"
    >

## Figure

    <figure>
        <img
            src="photo.jpg"
            alt="Опис"
        >

        <figcaption>
            Підпис
        </figcaption>
    </figure>

## Picture

    <picture>
        <source
            srcset="photo.webp"
            type="image/webp"
        >

        <img
            src="photo.jpg"
            alt="Опис"
        >
    </picture>

## Responsive image

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="100vw"
        alt="Опис"
    >

## Audio

    <audio controls>
        <source
            src="audio.mp3"
            type="audio/mpeg"
        >
    </audio>

## Video

    <video controls>
        <source
            src="video.mp4"
            type="video/mp4"
        >
    </video>

## Video + poster

    <video
        controls
        poster="preview.jpg"
    >
        <source
            src="video.mp4"
            type="video/mp4"
        >
    </video>

## Video + subtitles

    <video controls>
        <source
            src="video.mp4"
            type="video/mp4"
        >

        <track
            src="subtitles-uk.vtt"
            kind="subtitles"
            srclang="uk"
            label="Українська"
        >
    </video>

---

# 140. Найважливіші правила

1. `<img>` — для зображень.
2. `alt` — для текстової альтернативи.
3. `alt=""` — для декоративних зображень.
4. `<figure>` — для самостійного медіа-контенту.
5. `<figcaption>` — для підпису.
6. `<picture>` — для вибору джерела/формату/композиції.
7. `srcset` — для різних варіантів ресурсу.
8. `sizes` — для опису розміру зображення в layout.
9. `loading="lazy"` — для доречної відкладеної загрузки.
10. `width` + `height` — допомагають браузеру зарезервувати правильний простір.
11. `<audio>` — для аудіо.
12. `<video>` — для відео.
13. `<source>` — альтернативне джерело медіа.
14. `poster` — preview відео.
15. `<track>` — subtitles/captions та інші текстові доріжки.
16. WebVTT — формат текстових доріжок.
17. Не використовуй CSS background замість `<img>`, якщо зображення є контентом.
18. Не використовуй `autoplay` без необхідності.
19. Мультимедіа повинно бути доступним.
20. Оптимізація зображень — важлива частина frontend performance.

---

# 141. Головна ментальна модель

Запам'ятай:

    CONTENT
       │
       ├── Image
       │     └── <img>
       │
       ├── Image + caption
       │     └── <figure>
       │           └── <figcaption>
       │
       ├── Responsive image
       │     ├── <picture>
       │     ├── <source>
       │     ├── srcset
       │     └── sizes
       │
       ├── Audio
       │     └── <audio>
       │
       ├── Video
       │     └── <video>
       │           ├── <source>
       │           └── <track>
       │
       └── External player/document
             └── <iframe>

---

# 142. Головне, що потрібно винести з теми

HTML-медіа — це не просто:

    <img src="...">

Правильна робота із зображеннями включає:

    SEMANTICS
        ↓
    ACCESSIBILITY
        ↓
    PERFORMANCE
        ↓
    RESPONSIVENESS
        ↓
    USER EXPERIENCE

Тому хороший HTML повинен не просто показати картинку, а правильно описати:

- що це;
- для чого вона;
- чи є вона декоративною;
- який її альтернативний текст;
- який ресурс краще завантажити;
- коли його завантажити;
- як зберегти layout стабільним.

Для мультимедіа аналогічно:

    AUDIO
      ↓
    <audio>
      ↓
    controls
      ↓
    source
      ↓
    accessibility


    VIDEO
      ↓
    <video>
      ↓
    controls
      ↓
    source
      ↓
    poster
      ↓
    track
      ↓
    accessibility

Найважливіша ідея цієї теми:

> **HTML повинен описувати медіаконтент семантично, доступно та з урахуванням продуктивності, а CSS і JavaScript вже доповнюють його presentation та behavior.**