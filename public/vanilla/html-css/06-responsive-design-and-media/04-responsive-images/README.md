# 04. Responsive Images

## 📌 Що таке Responsive Images

**Responsive Images** — це підхід до роботи із зображеннями, за якого браузер отримує і відображає оптимальний варіант зображення залежно від:

- ширини viewport;
- розміру зображення на сторінці;
- щільності пікселів екрана;
- формату зображення;
- підтримки браузером певного формату;
- умов responsive layout.

Головна мета:

> Завантажувати достатньо якісне зображення, але не завантажувати зайві мегабайти.

Наприклад, немає сенсу завантажувати:

    image-3000px.jpg

на телефон, якщо на екрані воно відображається шириною:

    350px

Responsive Images допомагають одночасно вирішувати дві задачі:

    якість
       +
    performance

---

# 1. Навіщо потрібні Responsive Images

Без оптимізації можна отримати ситуацію:

    Mobile
    ↓
    маленький екран
    ↓
    завантажується величезне зображення
    ↓
    зайвий трафік
    ↓
    повільніше завантаження

Responsive Images дозволяють зробити:

    Mobile
    ↓
    400px image

    Tablet
    ↓
    800px image

    Desktop
    ↓
    1200px image

Тобто браузер може вибрати ресурс, який краще відповідає ситуації.

---

# 2. Responsive Images ≠ просто `max-width: 100%`

Дуже важливо розрізняти два поняття.

### Responsive sizing

Зображення змінює свій розмір:

    img {
        max-width: 100%;
        height: auto;
    }

### Responsive image delivery

Браузер отримує відповідний файл:

    image-400.jpg
    image-800.jpg
    image-1200.jpg

Це вже:

    srcset
    sizes
    picture

Тому:

> `max-width: 100%` робить зображення responsive за розміром, але не обов'язково responsive за завантажуваним ресурсом.

---

# 3. Основні інструменти Responsive Images

У HTML/CSS найважливіші інструменти:

    <img>

    width
    height

    max-width: 100%
    height: auto

    srcset

    sizes

    <picture>

    <source>

    loading="lazy"

    decoding="async"

    fetchpriority

    object-fit

    object-position

Для responsive image delivery особливо важливі:

    srcset
    sizes
    picture

---

# 4. Базовий responsive `<img>`

Найпростіший варіант:

    <img
        src="images/photo.jpg"
        alt="Mountain landscape"
    >

CSS:

    img {
        max-width: 100%;
        height: auto;
    }

Якщо контейнер вузький, зображення не повинно виходити за його межі.

Наприклад:

    .container {
        width: 100%;
        max-width: 800px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

---

# 5. Чому `height: auto`

Якщо змінюється тільки ширина:

    width: 100%;

але висота залишається фіксованою, можна отримати спотворення.

Правильно:

    img {
        width: 100%;
        height: auto;
    }

Або:

    img {
        max-width: 100%;
        height: auto;
    }

Браузер зберігає пропорції оригінального зображення.

---

# 6. `width: 100%` vs `max-width: 100%`

### `width: 100%`

Зображення намагається зайняти всю ширину контейнера.

    img {
        width: 100%;
        height: auto;
    }

### `max-width: 100%`

Зображення може бути меншим за контейнером, але не буде більшим за нього.

    img {
        max-width: 100%;
        height: auto;
    }

Для звичайного responsive image часто зручно використовувати:

    img {
        max-width: 100%;
        height: auto;
    }

---

# 7. Базовий reset для зображень

Часто використовують:

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

Навіщо `display: block`?

За замовчуванням `<img>` є inline-level element і може залишати невеликий простір під зображенням через поведінку inline content.

`display: block` робить поведінку більш передбачуваною.

---

# 8. `src`

Найпростіший `<img>`:

    <img
        src="images/photo.jpg"
        alt="Mountain landscape"
    >

`src` — основне джерело зображення.

Якщо `srcset` не використовується, браузер завантажує ресурс із `src`.

---

# 9. `srcset`

`srcset` дозволяє передати браузеру кілька варіантів одного зображення.

Наприклад:

    <img
        src="images/photo-800.jpg"
        srcset="
            images/photo-400.jpg 400w,
            images/photo-800.jpg 800w,
            images/photo-1200.jpg 1200w
        "
        alt="Mountain landscape"
    >

Тут:

    photo-400.jpg   → 400w
    photo-800.jpg   → 800w
    photo-1200.jpg  → 1200w

`w` означає:

> ширина ресурсу в CSS-independent pixels / image source width descriptor.

---

# 10. Як працює `srcset` з `w`

Уявімо:

    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "

Браузер знає:

    400w → маленький ресурс
    800w → середній ресурс
    1200w → великий ресурс

Але йому ще потрібно знати:

> Якого розміру зображення буде на сторінці?

Для цього використовується `sizes`.

---

# 11. `sizes`

`sizes` повідомляє браузеру приблизний розмір зображення в layout.

Наприклад:

    <img
        src="images/photo-800.jpg"
        srcset="
            images/photo-400.jpg 400w,
            images/photo-800.jpg 800w,
            images/photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 50vw,
            33vw
        "
        alt="Mountain landscape"
    >

Це означає приблизно:

    mobile
    → image ≈ 100vw

    tablet
    → image ≈ 50vw

    desktop
    → image ≈ 33vw

---

# 12. Що таке `vw`

`vw` — це 1% ширини viewport.

Наприклад:

    100vw = 100% viewport width
    50vw  = 50% viewport width
    33vw  ≈ 33% viewport width

Якщо viewport:

    1200px

то:

    50vw = 600px

---

# 13. `srcset` + `sizes`

Це одна з найважливіших конструкцій responsive images.

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 50vw,
            33vw
        "
        alt="Mountain landscape"
    >

Логіка:

    srcset
    ↓
    які файли доступні?

    sizes
    ↓
    якого розміру буде image?

    browser
    ↓
    вибирає відповідний ресурс

---

# 14. Чому `sizes` важливий

Розглянемо:

    srcset="
        photo-400.jpg 400w,
        photo-800.jpg 800w,
        photo-1200.jpg 1200w
    "

Якщо не вказати `sizes`, браузер не отримує точного опису того, скільки місця займає image у layout.

Тому для width descriptors:

    srcset + sizes

часто використовуються разом.

---

# 15. Простий приклад `srcset` + `sizes`

HTML:

    <img
        src="images/card-800.jpg"
        srcset="
            images/card-400.jpg 400w,
            images/card-800.jpg 800w,
            images/card-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 50vw,
            33vw
        "
        alt="Product"
    >

Уявімо layout:

    mobile:
    ┌─────────────────┐
    │      IMAGE      │
    └─────────────────┘

    tablet:
    ┌────────┬────────┐
    │ IMAGE  │ IMAGE  │
    └────────┴────────┘

    desktop:
    ┌──────┬──────┬──────┐
    │ IMG  │ IMG  │ IMG  │
    └──────┴──────┴──────┘

Тут `sizes` описує очікувану ширину image в кожному layout.

---

# 16. Два типи `srcset`

`srcset` може використовувати:

    width descriptors
    або
    pixel density descriptors

### Width descriptors

    400w
    800w
    1200w

### Density descriptors

    1x
    2x
    3x

Це два різні сценарії.

---

# 17. `srcset` з `1x`, `2x`

Приклад:

    <img
        src="logo.png"
        srcset="
            logo.png 1x,
            logo@2x.png 2x
        "
        alt="Company logo"
    >

Тут:

    1x → звичайна щільність
    2x → висока щільність

Це корисно для невеликих зображень, наприклад:

- logo;
- icons;
- UI graphics.

---

# 18. `1x`, `2x`, `3x`

Можна вказати:

    <img
        src="avatar.png"
        srcset="
            avatar.png 1x,
            avatar@2x.png 2x,
            avatar@3x.png 3x
        "
        alt="User avatar"
    >

Браузер може вибрати ресурс відповідно до device pixel ratio.

---

# 19. `w` vs `x`

### `w`

Описує фізичну ширину ресурсу:

    image-400.jpg 400w
    image-800.jpg 800w
    image-1200.jpg 1200w

Зазвичай використовується разом із:

    sizes

### `x`

Описує pixel density:

    image.jpg 1x
    image@2x.jpg 2x

Не потрібно використовувати `w` і `x` descriptors разом в одному `srcset`.

---

# 20. Коли використовувати `w`

Для content images, які мають різну ширину в layout:

    article image
    product image
    gallery image
    card image
    hero image

Наприклад:

    400w
    800w
    1200w
    1600w

---

# 21. Коли використовувати `x`

Для ресурсів, які мають фіксований CSS-розмір, але різну pixel density.

Наприклад:

    logo
    avatar
    icon

Якщо logo завжди має:

    width: 160px

можна підготувати:

    160px → 1x
    320px → 2x

---

# 22. `<picture>`

`<picture>` використовується, коли потрібно більше контролю над вибором image resource.

Наприклад, можна змінювати:

- формат;
- art direction;
- source;
- media condition.

Приклад:

    <picture>
        <source
            media="(min-width: 1200px)"
            srcset="hero-desktop.jpg"
        >

        <source
            media="(min-width: 768px)"
            srcset="hero-tablet.jpg"
        >

        <img
            src="hero-mobile.jpg"
            alt="Mountain landscape"
        >
    </picture>

---

# 23. `<picture>` vs `<img>`

`<img>`:

    <img
        src="photo.jpg"
        srcset="..."
        sizes="..."
        alt="..."
    >

добре підходить, коли:

> це те саме зображення, але потрібні різні розміри.

`<picture>`:

    <picture>
        <source ...>
        <img ...>
    </picture>

підходить, коли потрібно:

> вибрати різний source або різну композицію зображення.

---

# 24. Art Direction

**Art Direction** — це ситуація, коли для різних viewport потрібні не просто різні розміри, а **різні кадрування або навіть різні зображення**.

Наприклад:

Mobile:

    ┌───────────────┐
    │     PERSON    │
    │      FACE     │
    └───────────────┘

Desktop:

    ┌─────────────────────────┐
    │ PERSON        LANDSCAPE │
    └─────────────────────────┘

Одне і те саме source просто зменшити недостатньо.

Потрібні різні crops.

---

# 25. Art Direction через `<picture>`

    <picture>
        <source
            media="(max-width: 767px)"
            srcset="hero-mobile.jpg"
        >

        <source
            media="(min-width: 768px)"
            srcset="hero-desktop.jpg"
        >

        <img
            src="hero-desktop.jpg"
            alt="Mountain landscape"
        >
    </picture>

Mobile отримує:

    hero-mobile.jpg

Desktop отримує:

    hero-desktop.jpg

---

# 26. `<picture>` і формати зображень

`<picture>` також використовується для modern image formats.

Наприклад:

    <picture>
        <source
            srcset="photo.avif"
            type="image/avif"
        >

        <source
            srcset="photo.webp"
            type="image/webp"
        >

        <img
            src="photo.jpg"
            alt="Mountain landscape"
        >
    </picture>

Логіка:

    AVIF підтримується?
        ↓
    використовувати AVIF

    інакше WebP?
        ↓
    використовувати WebP

    інакше
        ↓
    JPEG

---

# 27. Чому `<img>` все одно потрібен всередині `<picture>`

У `<picture>` обов'язково потрібен fallback `<img>`.

Наприклад:

    <picture>
        <source
            srcset="photo.webp"
            type="image/webp"
        >

        <img
            src="photo.jpg"
            alt="Mountain landscape"
        >
    </picture>

`<img>`:

- є fallback;
- містить `alt`;
- є фактичним image element;
- може містити `width`, `height`, `loading` тощо.

---

# 28. `<picture>` для format switching

Зручна структура:

    <picture>
        <source
            srcset="image.avif"
            type="image/avif"
        >

        <source
            srcset="image.webp"
            type="image/webp"
        >

        <img
            src="image.jpg"
            alt="Description"
        >
    </picture>

Тут:

    AVIF
      ↓
    WebP
      ↓
    JPEG fallback

---

# 29. Responsive images + format switching

Можна комбінувати:

    format
    +
    width

Наприклад:

    <picture>
        <source
            type="image/avif"
            srcset="
                image-400.avif 400w,
                image-800.avif 800w,
                image-1200.avif 1200w
            "
            sizes="
                (max-width: 767px) 100vw,
                50vw
            "
        >

        <source
            type="image/webp"
            srcset="
                image-400.webp 400w,
                image-800.webp 800w,
                image-1200.webp 1200w
            "
            sizes="
                (max-width: 767px) 100vw,
                50vw
            "
        >

        <img
            src="image-800.jpg"
            srcset="
                image-400.jpg 400w,
                image-800.jpg 800w,
                image-1200.jpg 1200w
            "
            sizes="
                (max-width: 767px) 100vw,
                50vw
            "
            alt="Product"
        >
    </picture>

Це вже повноцінний responsive image pipeline.

---

# 30. `width` і `height` атрибути

Корисно вказувати intrinsic dimensions:

    <img
        src="photo.jpg"
        width="1200"
        height="800"
        alt="Mountain landscape"
    >

Це не означає, що image завжди буде показано саме:

    1200 × 800

CSS може змінити його display size.

Атрибути допомагають браузеру знати співвідношення сторін ще до завантаження ресурсу.

---

# 31. Навіщо потрібні `width` і `height`

Одна з важливих причин — зменшення layout shift.

Без dimensions браузер може ще не знати:

    скільки місця займе image

Після завантаження image:

    content moves

Це може спричиняти:

    layout shift

Якщо вказано:

    width="1200"
    height="800"

браузер знає aspect ratio.

---

# 32. `aspect-ratio`

Альтернативно або додатково CSS може визначати співвідношення:

    img {
        width: 100%;
        aspect-ratio: 16 / 9;
    }

Але для звичайних content images краще також передавати реальні `width` і `height` HTML-атрибути.

---

# 33. `object-fit`

Якщо image повинен заповнювати певний контейнер:

    .card__image {
        width: 100%;
        height: 240px;
        object-fit: cover;
    }

`cover` означає:

> image заповнює весь box, зберігаючи пропорції, частина може бути обрізана.

---

# 34. `object-fit: contain`

    .product-image {
        width: 100%;
        height: 240px;
        object-fit: contain;
    }

`contain`:

> усе зображення повинно поміститися всередині box.

Можуть залишатися вільні області.

---

# 35. `object-fit: cover`

    .hero-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }

Зображення заповнює весь контейнер.

Але частина може бути обрізана.

---

# 36. `object-position`

Можна контролювати, яку частину зображення залишити видимою:

    .hero-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        object-position: center;
    }

Наприклад:

    object-position: top;

або:

    object-position: center right;

---

# 37. `object-fit` ≠ Responsive Image Delivery

Це важлива різниця.

    object-fit
        ↓
    як image відображається в box

    srcset / sizes
        ↓
    який файл завантажується

Наприклад:

    object-fit: cover;

не означає:

> браузер завантажить маленьке зображення.

Він може все одно завантажити величезний файл.

---

# 38. `loading="lazy"`

Для зображень, які не знаходяться одразу у viewport, можна використовувати:

    <img
        src="photo.jpg"
        alt="Mountain landscape"
        loading="lazy"
    >

Це дозволяє браузеру відкласти завантаження image, поки воно не стане потрібним.

---

# 39. Не роби все `lazy`

Не варто бездумно ставити:

    loading="lazy"

на кожне image.

Особливо обережно потрібно ставитися до:

- hero image;
- LCP image;
- головного banner;
- зображення, яке одразу видно користувачу.

Для таких ресурсів lazy loading може бути небажаним.

---

# 40. Above the Fold vs Below the Fold

**Above the fold**:

> частина сторінки, яку користувач бачить одразу.

Наприклад:

    hero image

Часто таке image не повинно завантажуватися lazy.

**Below the fold**:

> контент нижче початкового viewport.

Наприклад:

    article images
    gallery images
    products below first screen

Для них `loading="lazy"` часто доречний.

---

# 41. `decoding="async"`

Можна вказати:

    <img
        src="photo.jpg"
        alt="Mountain landscape"
        decoding="async"
    >

Це підказка браузеру щодо декодування image.

`async` може допомагати не блокувати інші роботи браузера декодуванням зображення.

Це підказка, а не гарантія конкретної поведінки.

---

# 42. `fetchpriority`

Для важливого image можна вказати:

    <img
        src="hero.jpg"
        alt="Mountain landscape"
        fetchpriority="high"
    >

Для менш важливих:

    <img
        src="thumbnail.jpg"
        alt="Article thumbnail"
        fetchpriority="low"
    >

Це hint для пріоритизації завантаження.

Не потрібно виставляти `high` для всіх images.

---

# 43. Hero image

Наприклад:

    <img
        src="hero.jpg"
        alt="Mountain landscape"
        width="1600"
        height="900"
        fetchpriority="high"
    >

Hero image:

- видно одразу;
- може бути важливим для LCP;
- не завжди варто lazy-load;
- потребує правильного розміру і формату.

---

# 44. Нижні images

Наприклад:

    <article class="card">
        <img
            src="product.jpg"
            alt="Product"
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
        >
    </article>

Для контенту нижче viewport це може бути хорошим варіантом.

---

# 45. Responsive images і performance

Завантаження image залежить від:

    file size
    +
    dimensions
    +
    format
    +
    compression
    +
    network
    +
    viewport
    +
    device pixel ratio

Тому оптимізація image — це не тільки CSS.

---

# 46. Не завантажуй 3000px image для 300px card

Поганий варіант:

    <img
        src="huge-image-3000.jpg"
        alt="Product"
    >

якщо card на mobile має:

    width: 300px

Краще мати:

    product-400.jpg
    product-800.jpg
    product-1200.jpg

і:

    srcset

---

# 47. Приклад оптимізації Card

HTML:

    <article class="card">
        <img
            src="product-800.jpg"
            srcset="
                product-400.jpg 400w,
                product-800.jpg 800w,
                product-1200.jpg 1200w
            "
            sizes="
                (max-width: 767px) 100vw,
                (max-width: 1199px) 50vw,
                33vw
            "
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            alt="Product"
        >

        <h2>Product</h2>
    </article>

CSS:

    .card img {
        display: block;
        width: 100%;
        height: auto;
    }

---

# 48. Responsive background images

Responsive image delivery також може стосуватися background images.

Наприклад:

    .hero {
        background-image: url("hero-mobile.jpg");
    }

    @media (min-width: 768px) {
        .hero {
            background-image: url("hero-desktop.jpg");
        }
    }

Але тут є важлива різниця:

> CSS background image не має `alt` як `<img>`.

Тому background images краще використовувати для:

- декоративних backgrounds;
- декоративних gradients;
- purely visual elements.

Для meaningful content image краще використовувати `<img>`.

---

# 49. `<img>` vs `background-image`

Використовуй `<img>`, коли image є частиною контенту.

Наприклад:

    product photo
    article image
    portrait
    diagram
    illustration

Використовуй `background-image`, коли image є декоративним.

Наприклад:

    decorative background
    texture
    abstract visual
    decorative hero background

---

# 50. Accessibility і `alt`

Responsive image не скасовує accessibility.

Правильно:

    <img
        src="saint.jpg"
        alt="Святий Пантелеймон"
    >

`alt` повинен описувати зміст зображення, якщо image має змістове значення.

---

# 51. Decorative image

Якщо image не має змістового значення:

    <img
        src="decorative-line.svg"
        alt=""
    >

Порожній `alt` повідомляє screen reader:

> це декоративне зображення, його можна пропустити.

Не потрібно:

    alt="image"

або:

    alt="photo"

якщо це не дає корисної інформації.

---

# 52. `alt` не залежить від responsive version

Якщо є:

    mobile-image.jpg
    desktop-image.jpg

але вони показують той самий зміст:

    <picture>
        <source
            media="(max-width: 767px)"
            srcset="mobile-image.jpg"
        >

        <img
            src="desktop-image.jpg"
            alt="Mountain landscape"
        >
    </picture>

`alt` описує зміст, а не filename.

---

# 53. Responsive Images і SEO

Для content images важливі:

- правильний `alt`;
- зрозумілий контекст;
- правильний HTML;
- оптимізований ресурс;
- відповідні dimensions.

Не потрібно жертвувати accessibility заради performance.

---

# 54. Image formats

Основні формати, які варто знати:

    JPEG / JPG
    PNG
    WebP
    AVIF
    SVG

### JPEG

Добре підходить для:

- photographs;
- complex images;
- gradients.

### PNG

Корисний для:

- transparency;
- graphics;
- images, де потрібне lossless compression.

### WebP

Сучасний формат із хорошим compression/quality ratio.

### AVIF

Сучасний формат із потенційно дуже хорошим compression.

### SVG

Векторний формат:

- icons;
- logos;
- diagrams;
- simple illustrations.

---

# 55. Не використовуй PNG для всього

Наприклад:

    photo.png

може бути значно більшим за:

    photo.webp

або:

    photo.avif

Формат потрібно вибирати відповідно до типу контенту.

---

# 56. SVG і Responsive Images

SVG є векторним.

Наприклад:

    <img
        src="logo.svg"
        alt="Company logo"
    >

SVG добре масштабується без втрати якості.

Для logos та icons SVG часто є кращим вибором, ніж PNG/JPEG.

---

# 57. SVG не замінює `srcset`

Для фотографій:

    srcset
    sizes
    picture

мають сенс.

Для SVG logo часто достатньо:

    logo.svg

тому що SVG є векторним і не має тієї самої проблеми raster dimensions.

---

# 58. Responsive Images і `picture`

Корисний шаблон:

    <picture>

        <source
            media="(max-width: 767px)"
            srcset="hero-mobile.webp"
            type="image/webp"
        >

        <source
            media="(min-width: 768px)"
            srcset="hero-desktop.webp"
            type="image/webp"
        >

        <img
            src="hero-desktop.jpg"
            alt="Mountain landscape"
            width="1600"
            height="900"
        >

    </picture>

---

# 59. Responsive Images і `srcset`

Корисний шаблон:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 50vw,
            33vw
        "
        width="1200"
        height="800"
        alt="Mountain landscape"
    >

---

# 60. Повний приклад Responsive Product Card

HTML:

    <article class="product-card">

        <picture>
            <source
                type="image/avif"
                srcset="
                    product-400.avif 400w,
                    product-800.avif 800w,
                    product-1200.avif 1200w
                "
                sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1199px) 50vw,
                    33vw
                "
            >

            <source
                type="image/webp"
                srcset="
                    product-400.webp 400w,
                    product-800.webp 800w,
                    product-1200.webp 1200w
                "
                sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1199px) 50vw,
                    33vw
                "
            >

            <img
                src="product-800.jpg"
                srcset="
                    product-400.jpg 400w,
                    product-800.jpg 800w,
                    product-1200.jpg 1200w
                "
                sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1199px) 50vw,
                    33vw
                "
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                alt="Product"
            >
        </picture>

        <div class="product-card__content">
            <h2>Product</h2>
            <p>Description</p>
            <button>Buy</button>
        </div>

    </article>

CSS:

    .product-card {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .product-card img {
        display: block;
        width: 100%;
        height: auto;
    }

    .product-card__content {
        padding: 16px;
    }

---

# 61. Responsive Hero

HTML:

    <section class="hero">

        <picture>

            <source
                media="(max-width: 767px)"
                srcset="
                    hero-mobile-400.jpg 400w,
                    hero-mobile-800.jpg 800w
                "
                sizes="100vw"
            >

            <source
                media="(min-width: 768px)"
                srcset="
                    hero-desktop-1200.jpg 1200w,
                    hero-desktop-1600.jpg 1600w
                "
                sizes="100vw"
            >

            <img
                src="hero-desktop-1200.jpg"
                alt="Mountain landscape"
                width="1600"
                height="900"
                fetchpriority="high"
            >

        </picture>

    </section>

CSS:

    .hero img {
        display: block;
        width: 100%;
        height: auto;
    }

---

# 62. Hero з `object-fit`

Якщо hero повинен мати фіксовану висоту:

    .hero {
        height: 500px;
    }

    .hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

Mobile:

    .hero {
        height: 320px;
    }

Desktop:

    @media (min-width: 768px) {
        .hero {
            height: 500px;
        }
    }

---

# 63. Responsive Image + Art Direction + Object Fit

Можна комбінувати:

    <picture>
        <source
            media="(max-width: 767px)"
            srcset="hero-mobile.jpg"
        >

        <img
            src="hero-desktop.jpg"
            alt="Mountain landscape"
        >
    </picture>

CSS:

    .hero img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        object-position: center;
    }

Тут:

    <picture>
        → вибирає source

    object-fit
        → визначає поведінку image всередині box

---

# 64. Responsive Image Pipeline

Корисно мислити про image як про pipeline:

    Original image
          ↓
    Resize
          ↓
    Compress
          ↓
    Generate formats
          ↓
    Generate sizes
          ↓
    srcset / picture
          ↓
    Browser
          ↓
    Correct resource
          ↓
    Correct display size

Тобто оптимізація починається не з CSS.

---

# 65. Image generation

Наприклад, для одного original:

    original.jpg
    2400 × 1600

можна створити:

    400w
    800w
    1200w
    1600w

і формати:

    JPG
    WebP
    AVIF

У production це часто робиться автоматично image optimization pipeline.

---

# 66. Не створюй сотні варіантів

Не потрібно генерувати:

    301px
    302px
    303px
    304px
    ...

Достатньо кількох добре підібраних widths.

Наприклад:

    400
    800
    1200
    1600

Точний набір залежить від layout.

---

# 67. Що таке `sizes` на практиці

Приклад:

    sizes="
        (max-width: 767px) 100vw,
        (max-width: 1199px) 50vw,
        33vw
    "

Читається зверху вниз.

Якщо:

    viewport <= 767px

тоді:

    image ≈ 100vw

Якщо:

    viewport <= 1199px

тоді:

    image ≈ 50vw

Інакше:

    image ≈ 33vw

---

# 68. Порядок умов у `sizes`

Умови перевіряються послідовно.

Наприклад:

    sizes="
        (max-width: 1200px) 50vw,
        (max-width: 768px) 100vw,
        33vw
    "

це може бути помилкою логіки.

На `700px` перша умова:

    max-width: 1200px

вже true.

Тому друга умова не буде використана.

Краще розташовувати більш вузькі умови перед ширшими:

    sizes="
        (max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw
    "

---

# 69. `sizes` не задає CSS width

Це дуже важливо.

`sizes`:

    не встановлює фактичний CSS width

Воно повідомляє браузеру:

> Якого приблизно розміру image буде в layout.

CSS все одно визначає реальний display size.

---

# 70. CSS визначає layout, HTML допомагає вибрати ресурс

У responsive images можна розділити відповідальність:

    CSS
    ↓
    layout / display size

    HTML
    ↓
    image candidates / source selection

Наприклад:

    CSS:
    width: 100%;

    HTML:
    srcset + sizes

Це хороша модель мислення.

---

# 71. Common mistake: тільки `srcset`

Можна написати:

    <img
        src="image-800.jpg"
        srcset="
            image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w
        "
        alt="Image"
    >

Але для складного responsive layout потрібно також подумати про:

    sizes

Якщо browser не знає, якого розміру image буде в layout, його вибір ресурсу може бути не таким оптимальним, як ви очікуєте.

---

# 72. Common mistake: `sizes="100vw"` всюди

Наприклад:

    sizes="100vw"

Це правильно тільки якщо image фактично займає приблизно всю ширину viewport.

Якщо на desktop image займає третину viewport:

    sizes="100vw"

буде неточним описом layout.

Краще:

    sizes="
        (max-width: 767px) 100vw,
        50vw
    "

---

# 73. Common mistake: великий `src`

Не варто ставити:

    src="original-5000px.jpg"

як fallback для маленької card, якщо є оптимізовані ресурси.

Підготуй відповідні candidate images.

---

# 74. Common mistake: `width` і `height` тільки через CSS

Наприклад:

    img {
        width: 100%;
        height: auto;
    }

це добре для layout.

Але також корисно передавати intrinsic dimensions:

    <img
        src="photo.jpg"
        width="1200"
        height="800"
        alt="..."
    >

Це допомагає браузеру заздалегідь зарезервувати правильне співвідношення сторін.

---

# 75. Common mistake: `loading="lazy"` для Hero

Не потрібно автоматично робити:

    loading="lazy"

для головного image, який видно одразу.

Наприклад:

    hero image

може бути критичним для initial render.

---

# 76. Common mistake: усі images у `<picture>`

`<picture>` не потрібно використовувати просто тому, що він "сучасний".

Якщо потрібен лише різний розмір одного image:

    <img srcset="..." sizes="...">

може бути достатньо.

`<picture>` використовуй, коли потрібні:

- різні формати;
- art direction;
- різні sources.

---

# 77. Common mistake: background image для content

Не варто робити:

    .product {
        background-image: url("product.jpg");
    }

якщо image є важливою частиною контенту.

Краще:

    <img
        src="product.jpg"
        alt="Product"
    >

Це краще для:

- accessibility;
- semantics;
- SEO;
- image tooling.

---

# 78. Common mistake: відсутній `alt`

Погано:

    <img src="photo.jpg">

Краще:

    <img
        src="photo.jpg"
        alt="Mountain landscape"
    >

Для декоративного image:

    <img
        src="decorative.svg"
        alt=""
    >

---

# 79. Common mistake: image distortion

Погано:

    img {
        width: 100%;
        height: 300px;
    }

якщо співвідношення сторін не контролюється.

Image може бути розтягнуто.

Варіанти:

    height: auto;

або, якщо потрібен crop:

    object-fit: cover;

---

# 80. Common mistake: надто маленький source

Наприклад:

    image-400.jpg 400w

але image реально відображається:

    1000px

Browser не зможе отримати достатньо великий ресурс із цього candidate.

Тому `srcset` повинен містити достатні розміри.

---

# 81. Common mistake: надто багато великих sources

Наприклад:

    400w
    600w
    800w
    1000w
    1200w
    1400w
    1600w
    1800w
    2000w
    2200w
    2400w

Це не завжди необхідно.

Потрібно знайти баланс між:

    якістю
    +
    кількістю resources
    +
    складністю pipeline

---

# 82. Responsive Images і DPR

DPR — Device Pixel Ratio.

Наприклад:

    CSS width = 400px

але device має:

    DPR = 2

Фізично екран може використовувати приблизно:

    800 physical pixels

Тому browser може вибрати image candidate більшої роздільності.

Саме тому responsive image selection не можна будувати тільки на:

    viewport width

---

# 83. DPR не означає "завжди завантажуй 2x"

Browser враховує багато факторів:

- viewport;
- image display size;
- DPR;
- available candidates;
- network conditions;
- browser decisions.

Тому не потрібно вручну створювати JS-логіку:

    if (DPR === 2) {
        load @2x
    }

Для звичайних responsive images браузер уже має механізм вибору.

---

# 84. `srcset` + `sizes` — головна пара

Запам'ятай:

    srcset
    =
    які ресурси доступні

    sizes
    =
    який розмір image у layout

    browser
    =
    вибирає candidate

Це одна з найважливіших моделей у Responsive Images.

---

# 85. `<picture>` — коли потрібен контроль

Запам'ятай:

    <img>
        ↓
    різні розміри

    <picture>
        ↓
    різні sources / formats / art direction

Приклад:

    <picture>
        <source
            media="..."
            srcset="..."
        >

        <img
            src="..."
            alt="..."
        >
    </picture>

---

# 86. Mobile First + Responsive Images

Ці дві теми добре працюють разом.

Mobile First:

    mobile layout
    ↓
    tablet
    ↓
    desktop

Responsive Images:

    small image
    ↓
    medium image
    ↓
    large image

Наприклад:

    Mobile
    ├── layout: 1 column
    └── image: 400w

    Tablet
    ├── layout: 2 columns
    └── image: 800w

    Desktop
    ├── layout: 3 columns
    └── image: 1200w

---

# 87. Повний Mobile First + Responsive Images

HTML:

    <section class="gallery">

        <article class="card">

            <img
                src="photo-800.jpg"
                srcset="
                    photo-400.jpg 400w,
                    photo-800.jpg 800w,
                    photo-1200.jpg 1200w
                "
                sizes="
                    (max-width: 767px) 100vw,
                    (max-width: 1199px) 50vw,
                    33vw
                "
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
                alt="Mountain landscape"
            >

            <h2>Mountain</h2>

        </article>

    </section>

CSS:

    .gallery {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

    .card img {
        display: block;
        width: 100%;
        height: auto;
    }

    @media (min-width: 768px) {
        .gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }
    }

    @media (min-width: 1200px) {
        .gallery {
            grid-template-columns: repeat(3, 1fr);
        }
    }

---

# 88. Performance Checklist

Для важливих content images перевір:

    [ ] правильний формат
    [ ] правильний dimensions
    [ ] compressed file
    [ ] srcset
    [ ] sizes
    [ ] width
    [ ] height
    [ ] правильний alt
    [ ] loading strategy
    [ ] decoding strategy
    [ ] не завантажується надто великий файл

---

# 89. Accessibility Checklist

Перевір:

    [ ] informative image має meaningful alt
    [ ] decorative image має alt=""
    [ ] image не є єдиним способом передачі інформації
    [ ] text contrast не залежить тільки від image
    [ ] interactive image accessible з keyboard
    [ ] image не ламає zoom
    [ ] crop не приховує важливу інформацію

---

# 90. DevTools: як перевіряти Responsive Images

У браузері можна перевірити:

    DevTools
        ↓
    Network
        ↓
    Img

і подивитися:

- який файл завантажився;
- його розмір;
- формат;
- час завантаження.

Також можна змінювати viewport:

    mobile
    ↓
    tablet
    ↓
    desktop

і дивитися, чи змінюється candidate.

---

# 91. Як перевірити `srcset`

Наприклад:

    <img
        src="photo-800.jpg"
        srcset="
            photo-400.jpg 400w,
            photo-800.jpg 800w,
            photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            50vw
        "
        alt="Photo"
    >

У DevTools → Network → Img можна перевірити фактичний ресурс.

Це важливо, тому що:

> написати `srcset` недостатньо — потрібно перевірити реальну поведінку.

---

# 92. Шлях до оптимального Responsive Image

Можна використовувати такий алгоритм:

    1. Визначити display size
          ↓
    2. Підготувати кілька image sizes
          ↓
    3. Вибрати формат
          ↓
    4. Додати srcset
          ↓
    5. Додати sizes
          ↓
    6. Додати width/height
          ↓
    7. Визначити loading strategy
          ↓
    8. Перевірити Network
          ↓
    9. Перевірити mobile/tablet/desktop
          ↓
    10. Перевірити accessibility

---

# 93. Рівні знань

## 🟢 Core

Потрібно знати:

- `<img>`;
- `src`;
- `alt`;
- `width`;
- `height`;
- `max-width: 100%`;
- `height: auto`;
- `object-fit`;
- `object-position`;
- базове розуміння image formats.

---

## 🟡 Junior

Потрібно вміти:

- використовувати `srcset`;
- використовувати `sizes`;
- розуміти `400w`, `800w`, `1200w`;
- розуміти `1x`, `2x`;
- використовувати `<picture>`;
- робити art direction;
- використовувати WebP/AVIF;
- використовувати `loading="lazy"`;
- перевіряти images через DevTools.

---

## 🟠 Middle

Потрібно розуміти:

- image candidate selection;
- DPR;
- `srcset + sizes`;
- format switching;
- art direction;
- LCP;
- layout shift;
- image dimensions;
- preload/fetch priority;
- image performance;
- responsive image pipeline;
- CMS/image optimization.

---

## 🔴 Senior

Потрібно вміти:

- проектувати image delivery strategy;
- автоматично генерувати image variants;
- оптимізувати LCP images;
- будувати CDN/image transformation pipeline;
- визначати responsive breakpoints для images;
- працювати з modern formats;
- оптимізувати image caching;
- аналізувати Core Web Vitals;
- інтегрувати image optimization у frontend architecture.

---

# 94. Питання зі співбесіди

### 1. Що таке Responsive Images?

Підхід, за якого браузеру надаються різні варіанти image, а він може вибрати ресурс, що краще відповідає layout і device.

---

### 2. Чим `max-width: 100%` відрізняється від `srcset`?

`max-width: 100%` змінює display size.

`srcset` допомагає вибрати відповідний image resource.

---

### 3. Що робить `srcset`?

Надає браузеру набір image candidates.

---

### 4. Що робить `sizes`?

Описує браузеру, яку ширину image займає в layout за різних умов.

---

### 5. Для чого потрібен `<picture>`?

Для вибору між різними sources:

- formats;
- art direction;
- media conditions.

---

### 6. Що таке `400w`?

Width descriptor, який повідомляє, що ресурс має intrinsic width приблизно 400 CSS pixels.

---

### 7. Чим `400w` відрізняється від `2x`?

`400w` описує ширину ресурсу.

`2x` описує pixel density multiplier.

---

### 8. Коли потрібен `sizes`?

Коли `srcset` використовує width descriptors (`w`) і потрібно описати display size image.

---

### 9. Чому потрібно вказувати `width` і `height`?

Щоб браузер знав intrinsic dimensions/aspect ratio заздалегідь і міг зарезервувати місце для image.

---

### 10. Чим `object-fit: cover` відрізняється від `srcset`?

`object-fit` визначає, як image заповнює box.

`srcset` допомагає вибрати, який файл завантажити.

---

### 11. Коли використовувати `loading="lazy"`?

Для images, які не потрібні одразу і знаходяться нижче initial viewport.

---

### 12. Чому не варто робити hero image lazy?

Hero image може бути важливою частиною initial rendering і LCP.

---

### 13. Коли використовувати `<img>`, а коли `background-image`?

`<img>` — для content images.

`background-image` — переважно для decorative visuals.

---

### 14. Що таке Art Direction?

Використання різних image crops/sources для різних viewport або layout.

---

# 95. Міні-шпаргалка

## Базовий responsive image

    <img
        src="image.jpg"
        alt="Description"
    >

CSS:

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

---

## `srcset`

    <img
        src="image-800.jpg"
        srcset="
            image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w
        "
        alt="Description"
    >

---

## `srcset + sizes`

    <img
        src="image-800.jpg"
        srcset="
            image-400.jpg 400w,
            image-800.jpg 800w,
            image-1200.jpg 1200w
        "
        sizes="
            (max-width: 767px) 100vw,
            (max-width: 1199px) 50vw,
            33vw
        "
        alt="Description"
    >

---

## Density descriptors

    <img
        src="logo.png"
        srcset="
            logo.png 1x,
            logo@2x.png 2x
        "
        alt="Company logo"
    >

---

## `<picture>`

    <picture>
        <source
            media="(max-width: 767px)"
            srcset="mobile.jpg"
        >

        <img
            src="desktop.jpg"
            alt="Description"
        >
    </picture>

---

## Format switching

    <picture>
        <source
            srcset="image.avif"
            type="image/avif"
        >

        <source
            srcset="image.webp"
            type="image/webp"
        >

        <img
            src="image.jpg"
            alt="Description"
        >
    </picture>

---

## Lazy loading

    <img
        src="image.jpg"
        loading="lazy"
        alt="Description"
    >

---

## Image dimensions

    <img
        src="image.jpg"
        width="1200"
        height="800"
        alt="Description"
    >

---

## `object-fit`

    img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

---

## `object-position`

    img {
        object-fit: cover;
        object-position: center;
    }

---

# 96. Головна модель мислення

Не думай:

    "Як зробити картинку меншою на mobile?"

Думай:

    "Який image resource потрібен
     для цього display size?"

Тобто:

    viewport
        ↓
    layout
        ↓
    display size
        ↓
    srcset / sizes
        ↓
    browser chooses resource
        ↓
    image displayed

---

# 97. Головне

1. **Responsive image — це не тільки `max-width: 100%`.**

2. **`max-width: 100%` змінює display size, але не обов'язково розмір завантаженого файлу.**

3. **`srcset` дає браузеру набір image candidates.**

4. **`sizes` описує очікуваний display size image.**

5. **`srcset + sizes` — основна конструкція для responsive image delivery.**

6. **`w` описує ширину image candidate.**

7. **`1x`, `2x`, `3x` описують pixel density.**

8. **`<picture>` потрібен для різних sources, форматів і art direction.**

9. **`width` і `height` допомагають браузеру заздалегідь визначити aspect ratio і зменшити layout shift.**

10. **`object-fit` керує відображенням image всередині box, але не вибором файлу.**

11. **`loading="lazy"` підходить переважно для images нижче viewport.**

12. **Не роби hero/LCP image lazy без причини.**

13. **Content images краще робити через `<img>`, а decorative visuals — через `background-image`.**

14. **Не забувай про `alt`.**

15. **Responsive Images — це одночасно accessibility + performance + responsive design.**

---

# 98. Формула Responsive Images

    IMAGE
      ↓
    correct format
      ↓
    correct dimensions
      ↓
    multiple image sizes
      ↓
    srcset
      ↓
    sizes
      ↓
    browser selection
      ↓
    correct display size
      ↓
    optimized performance

---

# 99. Що потрібно вміти після цієї теми

Після вивчення `04-responsive-images` ти повинен уміти:

    1. Зробити звичайний responsive <img>
              ↓
    2. Використати width / height
              ↓
    3. Використати srcset
              ↓
    4. Використати sizes
              ↓
    5. Розуміти 400w / 800w / 1200w
              ↓
    6. Розуміти 1x / 2x
              ↓
    7. Використати <picture>
              ↓
    8. Реалізувати art direction
              ↓
    9. Використати WebP / AVIF
              ↓
    10. Налаштувати loading strategy
              ↓
    11. Перевірити фактичний resource у DevTools
              ↓
    12. Створити швидкий і доступний responsive image

І головний принцип:

> **Responsive Images — це не просто зробити картинку меншою. Це правильно підібрати ресурс для конкретного layout, viewport і device, не втрачаючи якість і не завантажуючи зайві дані.**