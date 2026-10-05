# 08. Feedback

## Що таке Feedback

**Feedback (зворотний зв'язок)** — це реакція інтерфейсу на дію користувача, яка повідомляє:

- що система отримала дію;
- що зараз відбувається;
- чи виконана дія;
- чи виникла помилка;
- що користувачу робити далі.

Простіше:

> **Feedback відповідає на питання: "Що сталося після моєї дії?"**

Наприклад:

    Користувач
        ↓
    натискає [Зберегти]
        ↓
    система отримує дію
        ↓
    "Зберігаємо..."
        ↓
    "Збережено ✓"


Без feedback користувач може не знати:

    Чи спрацювала кнопка?
    ↓
    Чи система щось робить?
    ↓
    Чи потрібно чекати?
    ↓
    Чи збереглися дані?
    ↓
    Чи сталася помилка?


---

# 1. Чому Feedback важливий

Інтерфейс — це діалог між:

    User
      ↕
    Interface
      ↕
    System


Користувач виконує дію:

    click
    type
    select
    upload
    drag
    submit


Система повинна відповісти:

    visual change
    message
    state change
    animation
    result


Тому:

    User Action
        ↓
    System Response
        ↓
    User understands result


Без feedback interaction стає невизначеною.

---

# 2. Основний принцип

> **Every important user action should have an appropriate response.**

Користувач зробив щось важливе?

    ↓

Система повинна показати відповідну реакцію.


Наприклад:

    [Зберегти]
        ↓
    Saving...
        ↓
    Saved ✓


Або:

    [Видалити]
        ↓
    confirmation
        ↓
    Deleted ✓


Або:

    Upload
        ↓
    45%
        ↓
    100%
        ↓
    Upload complete ✓


---

# 3. Feedback ≠ Notification

Ці поняття пов'язані, але не однакові.

**Feedback** — ширше поняття.

Він може бути:

- зміною стану кнопки;
- loading indicator;
- error message;
- success message;
- validation message;
- progress bar;
- animation;
- toast;
- inline message;
- modal;
- зміною контенту.

**Notification** — лише один із способів повідомити користувача.

Тобто:

    Feedback
        ├── Button state
        ├── Loading
        ├── Validation
        ├── Error
        ├── Success
        ├── Progress
        ├── Toast
        ├── Modal
        └── Notification


---

# 4. Feedback і Affordance

Попередня тема:

**Affordance**

відповідає:

    "Що я можу зробити?"


Feedback відповідає:

    "Що сталося після моєї дії?"


Наприклад:

    [Зберегти]

    Affordance:
    → це кнопка
    → її можна натиснути


    Після click:

    "Збережено ✓"

    Feedback:
    → дія виконана.


Тому:

    Affordance
        ↓
    Action
        ↓
    Feedback


Це одна з найважливіших послідовностей у UI design.

---

# 5. Feedback і User Confidence

Хороший feedback створює:

    Action
        ↓
    Response
        ↓
    Confidence


Користувач розуміє:

    "Система працює."

    "Моя дія прийнята."

    "Дані збережені."

    "Можу рухатися далі."


Поганий feedback:

    click
      ↓
    нічого не відбулося


створює:

    uncertainty
        ↓
    repeated clicks
        ↓
    mistakes
        ↓
    frustration.


---

# 6. Feedback повинен бути своєчасним

Feedback має з'являтися в правильний момент.

Наприклад:

    User clicks Save
        ↓
    immediately:
    "Saving..."
        ↓
    after completion:
    "Saved ✓"


Погано:

    click
        ↓
    5 секунд нічого
        ↓
    "Saved"


За цей час користувач може подумати:

    "Кнопка не працює."


---

# 7. Immediate Feedback

Для швидкої дії:

    click
        ↓
    visual change


Наприклад:

    [Like ♡]

    click

    [Liked ♥]


Користувач одразу отримує feedback.

---

# 8. Delayed Feedback

Якщо операція довша:

    User action
        ↓
    Loading
        ↓
    Processing
        ↓
    Result


Наприклад:

    [Upload]

        ↓

    Uploading...
    35%

        ↓

    Upload complete ✓


---

# 9. Feedback за тривалістю

Можна умовно поділити операції:

    Instant
        ↓
    майже миттєва реакція


    Short
        ↓
    loading / progress може бути потрібним


    Long
        ↓
    progress + status + possibility to cancel


Чим довша операція, тим важливіше показувати:

- поточний стан;
- progress;
- очікування;
- можливість скасування, якщо це доречно.

---

# 10. Types of Feedback

Основні типи:

    1. Visual feedback
    2. Interaction feedback
    3. State feedback
    4. Validation feedback
    5. Loading feedback
    6. Progress feedback
    7. Success feedback
    8. Error feedback
    9. Confirmation feedback
    10. System status feedback
    11. Navigation feedback
    12. Accessibility feedback


---

# 11. Visual Feedback

Найпоширеніший тип.

Наприклад:

    button hover
    button active
    checkbox checked
    tab selected
    input focused
    menu opened
    modal appeared


Візуальна зміна повідомляє:

    "щось змінилося."


---

# 12. Hover Feedback

Desktop:

    Button
        ↓
    hover
        ↓
    visual change


Наприклад:

    Normal:
    [Зберегти]


    Hover:
    [Зберегти]
       ↑
    slightly different appearance


Hover допомагає підтвердити:

    "цей елемент interactive."


Але:

> Hover не повинен бути єдиним feedback mechanism.

---

# 13. Active Feedback

Коли користувач натискає кнопку:

    [Зберегти]

        ↓

    [Зберегти]
       active


Це може бути:

- slight scale;
- background change;
- shadow change;
- color change.

Мета:

    press
      ↓
    immediate visual confirmation.


---

# 14. Focus Feedback

Коли елемент отримує keyboard focus:

    Tab
      ↓
    Input focused


Наприклад:

    Email

    ┌──────────────────────────┐
    │ name@example.com         │
    └──────────────────────────┘
             ↑
           focus


Focus indicator повідомляє:

    "цей елемент зараз активний."


Це особливо важливо для:

- keyboard users;
- accessibility;
- forms;
- navigation.

---

# 15. Selection Feedback

Коли користувач щось вибирає:

    [ ] React

    click

    [✓] React


Feedback:

    checked state.


Або:

    Tabs

    [Overview] [Lessons] [Students]


Після вибору:

    [Overview] [Lessons] [Students]
                 ↑
               active


Selected state повинен бути очевидним.

---

# 16. Toggle Feedback

Наприклад:

    Notifications

    [────●] ON


Користувач перемикає:

    Notifications

    [●────] OFF


UI одразу показує новий state.

---

# 17. Form Feedback

Forms потребують багато feedback.

Наприклад:

    Email
    [valeriy@example.com]
             ↓
          valid ✓


Або:

    Email
    [valeriy@]
             ↓
    ⚠ Введіть повну email-адресу.


Користувач отримує інформацію:

    valid
    або
    invalid.


---

# 18. Inline Validation

**Inline validation** — feedback безпосередньо біля поля.

Наприклад:

    Password

    [123]

    ⚠ Пароль повинен містити щонайменше 8 символів.


Перевага:

    error
      ↓
    одразу біля причини
      ↓
    легко виправити.


---

# 19. Validation Timing

Не завжди потрібно показувати помилку одразу.

Наприклад:

    користувач тільки почав вводити:

    p


Не обов'язково одразу показувати:

    ❌ Password too short


Краще дочекатися:

- blur;
- submit;
- або достатньої кількості введених символів.

Мета:

> Feedback повинен допомагати, а не заважати.

---

# 20. Positive Validation Feedback

Не тільки помилки потребують feedback.

Наприклад:

    Password

    [MyStrongPassword123]

    ✓ Strong password


Або:

    Username

    [valeriy]

    ✓ Username available


Positive feedback допомагає користувачу зрозуміти:

    "Я все зробив правильно."


---

# 21. Loading Feedback

Коли система виконує операцію:

    [Зберегти]

        ↓

    [⏳ Зберігаємо...]


Користувач розуміє:

    action received
        +
    system working.


Без loading feedback:

    click
      ↓
    wait
      ↓
    uncertainty.


---

# 22. Spinner

Для коротких операцій можна використовувати spinner.

Наприклад:

    [⟳ Завантаження...]


Spinner показує:

    система працює.


Але spinner не пояснює:

    скільки залишилося.


Для довгих операцій краще використовувати progress.

---

# 23. Skeleton Loading

Для content-heavy UI:

    ┌──────────────────────────┐
    │ ███████████████          │
    │ ██████████               │
    │ ███████████████████      │
    └──────────────────────────┘


Skeleton показує структуру майбутнього content.

Він допомагає користувачу зрозуміти:

    "контент завантажується."


---

# 24. Progress Feedback

Для довгих операцій:

    Uploading

    ███████████░░░░░░░

    62%


Користувач розуміє:

    current state
        +
    approximate progress.


Progress особливо корисний для:

- upload;
- download;
- installation;
- import;
- export;
- long processing;
- multi-step processes.

---

# 25. Indeterminate Progress

Іноді система не знає точний progress.

Тоді:

    Loading...

    █████████████████


анімація може показувати:

    "операція виконується."


Не можна показувати:

    72%


якщо система насправді не знає, що залишилося 28%.

Feedback повинен бути правдивим.

---

# 26. Success Feedback

Після успішної дії:

    Saved ✓


або:

    Course created successfully.


або:

    ✓ Дані збережено.


Success feedback відповідає:

    "Операція завершена успішно."


---

# 27. Success Feedback не завжди потребує Toast

Наприклад:

    Profile

    Name
    [Valeriy]

    [Save]


Після save:

    ✓ Saved


може бути достатньо.

Не потрібно кожного разу показувати:

    Toast:
    "Your profile has been successfully saved."


Важливий принцип:

> **Use the least intrusive feedback that clearly communicates the result.**

---

# 28. Error Feedback

Error feedback повідомляє:

    щось пішло не так.


Наприклад:

    ❌ Не вдалося зберегти зміни.


Але хороша помилка повинна допомогти відповісти:

    Що сталося?
    ↓
    Чому?
    ↓
    Що робити?


---

# 29. Good Error Message

Погано:

    Error 422


Краще:

    Не вдалося зберегти профіль.


Ще краще:

    Не вдалося зберегти профіль.
    Перевірте email і спробуйте ще раз.


І якщо можливо:

    [Спробувати ще раз]


---

# 30. Error Feedback не повинен звинувачувати користувача

Погано:

    ❌ Ви неправильно заповнили форму.


Краще:

    ⚠ Email має бути у форматі
    name@example.com.


UI повинен пояснювати проблему, а не звинувачувати людину.

---

# 31. Confirmation Feedback

Для важливих дій:

    [Видалити курс]

може з'явитися:

    Ви впевнені?

    Курс буде видалено назавжди.

    [Скасувати] [Видалити]


Це feedback до виконання destructive action.

Він допомагає уникнути помилки.

---

# 32. Feedback після Destructive Action

Після підтвердження:

    [Видалити]

        ↓

    Курс видалено ✓


Користувач повинен розуміти:

    action completed.


---

# 33. Undo як Feedback

Для деяких дій корисний:

**Undo**

Наприклад:

    Курс видалено.

    [Скасувати]


Це одночасно:

- feedback;
- recovery;
- error prevention.


Користувач отримує можливість виправити помилку.

---

# 34. Toast Feedback

Toast — коротке повідомлення, яке тимчасово з'являється в інтерфейсі.

Наприклад:

    ┌──────────────────────────────┐
    │ ✓ Курс збережено             │
    └──────────────────────────────┘


Переваги:

- не займає багато місця;
- швидко повідомляє результат;
- не блокує interface.


Недоліки:

- може бути пропущений;
- погано підходить для важливої інформації;
- не повинен бути єдиним способом показати критичну помилку.

---

# 35. Toast vs Inline Feedback

## Toast

Добре для:

    "Збережено ✓"


## Inline

Добре для:

    Email
    [valeriy@]

    ⚠ Некоректний email.


Причина:

    error
        ↓
    безпосередньо біля field.


---

# 36. Modal Feedback

Modal доречний, коли користувач повинен звернути увагу на ситуацію.

Наприклад:

    Ви дійсно хочете видалити акаунт?

    [Скасувати] [Видалити]


Але:

> Не використовуй modal для кожної дрібної події.

Інакше:

    click
      ↓
    modal
      ↓
    confirm
      ↓
    modal
      ↓
    close


створює зайву friction.

---

# 37. Status Feedback

Іноді feedback — це постійний статус.

Наприклад:

    Course status:
    Published


або:

    Server
    ● Online


або:

    Payment
    ✓ Completed


Це не одноразове повідомлення.

Це:

    persistent system status.


---

# 38. System Status Visibility

Користувач повинен знати, коли система:

- loading;
- saving;
- syncing;
- offline;
- processing;
- connected;
- disconnected.

Наприклад:

    ✓ Saved


або:

    ⟳ Syncing...


або:

    ⚠ Offline


Це створює confidence.

---

# 39. Network Feedback

Для web applications особливо важливо показувати network state.

Наприклад:

    Internet connection lost.

    Your changes will be saved
    when connection is restored.


Це набагато краще, ніж:

    порожній екран.


---

# 40. Optimistic UI

**Optimistic UI** — інтерфейс одразу показує очікуваний результат, не чекаючи завершення server request.

Наприклад:

    Like ♡


Користувач натискає:

    Like ♥


Backend ще обробляє request.

Якщо все добре:

    Like ♥


Якщо помилка:

    Like ♡
    + повідомлення про помилку.


Це робить UI швидшим.

---

# 41. Optimistic UI — коли доречний

Добре підходить для:

- likes;
- follows;
- toggles;
- simple status changes;
- lightweight actions.

Обережніше з:

- payment;
- destructive actions;
- irreversible operations;
- критичними server operations.

---

# 42. Feedback і Latency

Навіть якщо backend працює правильно:

    request
       ↓
    network
       ↓
    server
       ↓
    database
       ↓
    response


користувач бачить тільки:

    click
       ↓
    wait


Тому frontend повинен перетворити:

    invisible waiting


на:

    visible state.


Наприклад:

    [Зберегти]
        ↓
    [Зберігаємо...]
        ↓
    [Збережено ✓]


---

# 43. Feedback і Button States

Button може мати:

    Default
    ↓
    Hover
    ↓
    Focus
    ↓
    Active
    ↓
    Loading
    ↓
    Success
    ↓
    Error


Наприклад:

    Default:
    [Зберегти]


    Loading:
    [⟳ Зберігаємо...]


    Success:
    [✓ Збережено]


    Error:
    [⚠ Помилка]


Не кожен продукт повинен буквально змінювати текст кнопки на success/error, але логіка станів повинна бути продуманою.

---

# 44. Feedback і Forms

Form feedback можна поділити:

    Field-level
        ↓
    помилка конкретного поля


    Form-level
        ↓
    проблема всієї форми


    Submission-level
        ↓
    результат відправлення.


Наприклад:

    Email
    [wrong@email]

    ⚠ Email вже використовується.


Це field-level feedback.


А:

    Не вдалося створити акаунт.
    Спробуйте ще раз.


це form/submission-level feedback.

---

# 45. Feedback і Passwords

Наприклад:

    Password

    [MyPassword123]

    Strength:

    ████████░░ Strong


Користувач отримує feedback ще до submit.

Це допомагає:

    дія
      ↓
    feedback
      ↓
    correction
      ↓
    successful submission.


---

# 46. Feedback і Search

Search теж потребує feedback.

Наприклад:

    Search
    [React]


Результат:

    24 results


Або:

    Nothing found.


Ще краще:

    Нічого не знайдено для "Reactt".

    Спробуйте:
    - React
    - React.js


Система допомагає користувачу продовжити.

---

# 47. Feedback і Empty State

Empty state — це теж форма feedback.

Наприклад:

    Courses

    У вас поки немає курсів.

    [Створити курс]


Система повідомляє:

    current state
        +
    next action.


---

# 48. Feedback і Navigation

Navigation також має feedback.

Наприклад:

    Courses
    Students
    Settings


Active:

    Courses
    ───────


Користувач отримує:

    "Я зараз знаходжусь у Courses."


Це **location feedback**.

---

# 49. Breadcrumb як Feedback

Наприклад:

    Home
      >
    Courses
      >
    JavaScript
      >
    Arrays


Breadcrumb показує:

    де я знаходжусь
        +
    як я сюди потрапив
        +
    який контекст.


---

# 50. Feedback і Pagination

Наприклад:

    Page 2 of 10


або:

    Showing 21–40 of 248 students


Це feedback про:

    current position
        +
    amount of content.


---

# 51. Feedback і Filters

Користувач вибрав:

    Status: Active


Система може показати:

    42 students


або:

    Active ×


Користувач розуміє:

    filter applied.


---

# 52. Feedback і Sorting

Наприклад:

    Sort by:
    [Newest first ▼]


Після вибору:

    Newest first
        ↓
    list changes.


Важливо, щоб зміна була помітною.

---

# 53. Feedback і Drag & Drop

При drag:

    Task 1
    Task 2
    Task 3


Користувач перетягує Task 2.

UI показує:

    Task 1

    ─────────
    Drop here

    Task 3


Це feedback:

    "сюди можна перемістити елемент."


---

# 54. Feedback і Animation

Animation може бути feedback.

Наприклад:

    accordion
        ↓
    expand animation
        ↓
    content visible.


Але animation повинна:

- бути короткою;
- мати функціональний сенс;
- не затримувати користувача;
- не створювати distraction.


---

# 55. Feedback і Microinteractions

**Microinteraction** — невелика interaction, яка має:

    Trigger
        ↓
    Rules
        ↓
    Feedback
        ↓
    Loops / Modes


Наприклад Like:

    Trigger:
    click

    Rule:
    toggle liked state

    Feedback:
    heart changes

    Result:
    user sees liked state.


Feedback є центральною частиною microinteractions.

---

# 56. Feedback і Sound

Feedback може бути не тільки visual.

Наприклад:

- notification sound;
- error sound;
- success sound.

Але:

> Sound повинен бути додатковим каналом, а не єдиним.

Користувач може:

- вимкнути звук;
- не чути звук;
- працювати в тихому середовищі.

---

# 57. Feedback і Accessibility

Feedback повинен бути доступним.

Не можна повідомляти:

    тільки зміною кольору.


Наприклад:

    поле стало червоним


недостатньо.

Краще:

    ⚠ Email має бути у форматі
    name@example.com.


Для screen readers важливі:

- semantic structure;
- accessible names;
- appropriate live regions;
- error associations;
- focus management.

---

# 58. Screen Reader Feedback

Якщо з'явився важливий status message:

    "Профіль збережено."


screen reader user також повинен отримати цю інформацію.

Для динамічних повідомлень можуть використовуватися accessibility mechanisms, наприклад appropriate live regions.

Але:

> ARIA не повинна замінювати правильну структуру HTML.

---

# 59. Focus Management

Після важливої interaction іноді потрібно перемістити focus.

Наприклад:

    Open Modal
        ↓
    focus → first relevant control


Після закриття:

    focus
        ↓
    returns to triggering button.


Це створює зрозумілий feedback для keyboard users.

---

# 60. Feedback і Error Recovery

Хороший error feedback повинен не просто сказати:

    Error.


Він повинен допомогти:

    Error
      ↓
    Explanation
      ↓
    Recovery


Наприклад:

    Не вдалося завантажити курси.

    [Спробувати ще раз]


Або:

    Email уже використовується.

    [Змінити email]


---

# 61. Feedback і Prevention

Найкращий error feedback іноді — це prevention.

Наприклад:

    Password requirements

    ✓ 8+ characters
    ✓ One number
    ✓ One uppercase letter


Користувач бачить вимоги до submit.

Тобто:

    prevent error
        >
    explain error later.


---

# 62. Feedback і Confirmation

Для дій з високим ризиком:

    action
        ↓
    confirmation
        ↓
    execution
        ↓
    result feedback.


Наприклад:

    Delete account

        ↓

    Are you sure?

        ↓

    Delete

        ↓

    Account deleted.


---

# 63. Feedback і Cognitive Load

Без feedback:

    Action
        ↓
    uncertainty
        ↓
    cognitive load ↑


З хорошим feedback:

    Action
        ↓
    response
        ↓
    understanding
        ↓
    confidence
        ↓
    cognitive load ↓


Тому feedback — важлива частина Simplicity.

---

# 64. Feedback і Consistency

Якщо success завжди показується однаково:

    ✓ Saved
    ✓ Updated
    ✓ Created


користувач навчається.

Якщо один раз:

    Toast


другий:

    Modal


третій:

    alert


четвертий:

    просто зміна тексту


без semantic reason — interface стає непередбачуваним.

---

# 65. Feedback Patterns

Корисно мати standard patterns.

Наприклад:

    Success
    ✓ Saved


    Warning
    ⚠ Check this information


    Error
    ✕ Something went wrong


    Info
    ℹ Additional information


    Loading
    ⟳ Loading...


Це може бути частиною Design System.

---

# 66. Feedback і Color

Колір може допомагати:

    Green
    → success

    Red
    → error

    Yellow / Amber
    → warning

    Blue
    → information


Але:

> Не можна передавати feedback тільки через колір.

Потрібні:

- icon;
- text;
- state;
- context.


Наприклад:

    ✓ Saved


краще, ніж:

    просто зелений background.


---

# 67. Feedback і Icons

Icons можуть підсилювати meaning:

    ✓ Success

    ⚠ Warning

    ✕ Error

    ℹ Information

    ⟳ Loading


Але icon повинна бути зрозумілою і consistent.

---

# 68. Feedback Hierarchy

Не всі feedback повідомлення однаково важливі.

Наприклад:

    Critical
        ↓
    blocking error


    High
        ↓
    important warning


    Medium
        ↓
    success message


    Low
        ↓
    subtle state change.


Feedback повинен відповідати важливості події.

---

# 69. Intrusive vs Non-intrusive Feedback

## Non-intrusive

- inline message;
- subtle state change;
- badge;
- small status;
- button state.

Добре для:

    "Saved"


## More intrusive

- toast;
- banner;
- modal;
- full-screen message.


Потрібні для:

    critical information
    або
    actions requiring attention.


---

# 70. Don't Interrupt unnecessarily

Погано:

    User saves profile
        ↓
    Modal:
    "Profile saved successfully!"
        ↓
    [OK]


Це зайвий крок.

Краще:

    ✓ Profile saved


Користувач продовжує роботу.

---

# 71. Don't Overuse Toasts

Якщо кожна дія створює toast:

    Click
      ↓
    Toast

    Click
      ↓
    Toast

    Click
      ↓
    Toast

інтерфейс стає шумним.

Feedback повинен бути:

    appropriate
        +
    proportional.


---

# 72. Feedback Frequency

Не кожна microinteraction потребує текстового повідомлення.

Наприклад:

    checkbox click
        ↓
    visual state change


цього достатньо.

А:

    payment completed
        ↓
    clear success state


потребує більш явного feedback.

---

# 73. Feedback Proportionality

Корисне правило:

    Small action
        ↓
    Small feedback


    Important action
        ↓
    Stronger feedback


Наприклад:

    Toggle
        ↓
    state change


    Delete account
        ↓
    confirmation
        +
    result
        +
    recovery if possible.


---

# 74. Feedback для Multi-step Processes

Наприклад:

    Step 1
      ↓
    Step 2
      ↓
    Step 3
      ↓
    Step 4


UI може показувати:

    ●────●────○────○

    Step 2 of 4


Користувач отримує feedback:

    де я?
    ↓
    скільки залишилося?
    ↓
    що вже зроблено?


---

# 75. Feedback і Wizard

Наприклад:

    Create course

    Step 2 of 4

    ● Basic information
    ● Content
    ○ Settings
    ○ Publish


Це зменшує uncertainty.

---

# 76. Feedback і Save State

У складних формах корисно показувати:

    Unsaved changes


або:

    Saving...


або:

    Saved


Наприклад:

    Course editor

    ✓ All changes saved


Користувач не повинен гадати:

    "Мої зміни збереглися?"


---

# 77. Auto-save Feedback

Наприклад:

    Course editor

    Saving...


через секунду:

    ✓ Saved


Це особливо важливо для:

- editors;
- documents;
- CMS;
- forms;
- notes.

---

# 78. Feedback і Offline Mode

Якщо застосунок підтримує offline:

    ⚠ You are offline

    Changes will be synced
    when connection is restored.


Після reconnect:

    ✓ Back online

    ✓ Changes synced


Це дуже хороший приклад system feedback.

---

# 79. Feedback і Sync

Наприклад:

    ⟳ Syncing...


Після завершення:

    ✓ Synced


Користувач розуміє:

    local state
        ↓
    synchronization
        ↓
    completed.


---

# 80. Feedback у React

React naturally працює зі state.

Наприклад:

    const [status, setStatus] =
        useState<"idle" | "loading" | "success" | "error">("idle");


UI:

    if (status === "loading") {
        return <p>Зберігаємо...</p>;
    }

    if (status === "success") {
        return <p>✓ Збережено</p>;
    }

    if (status === "error") {
        return <p>⚠ Не вдалося зберегти</p>;
    }


State:

    idle
      ↓
    loading
      ↓
    success


або:

    idle
      ↓
    loading
      ↓
    error


Це безпосередньо пов'язує UI design із frontend development.

---

# 81. React Button Feedback

Наприклад:

    function SaveButton({
        status,
    }: {
        status: "idle" | "loading" | "success" | "error";
    }) {
        if (status === "loading") {
            return (
                <button disabled>
                    Зберігаємо...
                </button>
            );
        }

        if (status === "success") {
            return (
                <button>
                    ✓ Збережено
                </button>
            );
        }

        return (
            <button>
                Зберегти
            </button>
        );
    }


У реальному production component може бути спроектований складніше, але принцип простий:

    state
      ↓
    visual feedback.


---

# 82. Feedback як Component State

Для Design System можна визначити:

    Button states:

    default
    hover
    active
    focus
    disabled
    loading


    Input states:

    default
    focus
    filled
    error
    success
    disabled


    Select states:

    default
    open
    selected
    error
    disabled


Це дозволяє систематично проектувати feedback.

---

# 83. Feedback і Component Composition

Наприклад:

    <FormField>
        <Label />
        <Input />
        <ErrorMessage />
    </FormField>


Feedback component може бути окремим reusable element.

Наприклад:

    <FieldError>
        Email має бути коректним.
    </FieldError>


Це дозволяє:

    consistent feedback
        ↓
    across entire application.


---

# 84. Feedback Design System

Design System може містити:

    Alert
    Toast
    Banner
    Spinner
    Progress
    Skeleton
    ErrorMessage
    SuccessMessage
    LoadingState
    EmptyState


Це дозволяє стандартизувати:

- appearance;
- semantics;
- spacing;
- colors;
- icons;
- behavior;
- accessibility.

---

# 85. Practical Example — LMS

Уявімо:

    Student opens lesson.

    ↓

    Loading...

    ↓

    Lesson loaded.


Користувач відповідає на питання:

    [Перевірити]


    ↓

    Checking...


    ↓

    ✓ Правильно!


Або:

    ✕ Неправильно.

    Правильна відповідь:
    ...

    [Спробувати ще раз]


Тут feedback є частиною самого навчального процесу.

---

# 86. Practical Example — File Upload

    Upload document

    ┌──────────────────────────────┐
    │ Перетягніть файл сюди        │
    │                              │
    │ [Вибрати файл]               │
    └──────────────────────────────┘


Після вибору:

    report.pdf

    Uploading...

    ███████████░░░░ 68%


Після завершення:

    ✓ report.pdf uploaded


При помилці:

    ⚠ Не вдалося завантажити файл.

    Підтримуються PDF, DOCX.

    [Спробувати ще раз]


Це повний feedback flow.

---

# 87. Practical Example — Form Submission

    Registration

    Email
    [name@example.com]

    Password
    [********]


    [Створити акаунт]


Click:

    [⟳ Створюємо акаунт...]


Success:

    ✓ Акаунт створено.


Error:

    ⚠ Не вдалося створити акаунт.
    Email уже використовується.


Це значно краще, ніж:

    click
      ↓
    nothing
      ↓
    eventually page changes.


---

# 88. Practical Example — Delete

    Course

    JavaScript

    [Delete]


Click:

    Ви впевнені?

    Видалення буде остаточним.

    [Скасувати] [Видалити]


Confirm:

    Видалення...


Success:

    ✓ Курс видалено.


Optional:

    [Скасувати]


Це:

    Affordance
        +
    Confirmation
        +
    Loading
        +
    Success feedback.


---

# 89. Feedback Audit

Для кожної важливої interaction перевір:

    User action
        ↓
    What happens immediately?
        ↓
    Is the action visible?
        ↓
    Is loading necessary?
        ↓
    Is success communicated?
        ↓
    Is error communicated?
        ↓
    Can user recover?
        ↓
    Is the feedback accessible?


---

# 90. Feedback Matrix

Корисно створювати таблицю:

    | Action | State | Feedback | Recovery |
    |--------|-------|----------|----------|
    | Save | Loading | Spinner | Retry |
    | Save | Success | Saved ✓ | — |
    | Save | Error | Error message | Retry |
    | Delete | Confirm | Modal | Cancel |
    | Upload | Progress | 68% | Cancel |
    | Search | Empty | No results | Change query |


Це дуже корисний підхід для реальних проектів.

---

# 91. Feedback Checklist

## General

- [ ] Кожна важлива дія має feedback.
- [ ] Feedback з'являється своєчасно.
- [ ] Feedback відповідає важливості дії.
- [ ] Feedback зрозумілий.
- [ ] Feedback consistent.

## Loading

- [ ] Довгі операції мають loading state.
- [ ] Користувач розуміє, що система працює.
- [ ] Якщо можливо, показується progress.
- [ ] Не показується фальшивий progress.

## Success

- [ ] Успішна важлива дія підтверджується.
- [ ] Повідомлення коротке.
- [ ] Не використовується зайвий modal.

## Error

- [ ] Помилка зрозуміла.
- [ ] Не використовується лише error code.
- [ ] Пояснено, що робити.
- [ ] Є recovery action, якщо можливо.

## Forms

- [ ] Є field-level validation.
- [ ] Error знаходиться біля проблемного field.
- [ ] Feedback не з'являється занадто рано.
- [ ] Success state зрозумілий.

## Accessibility

- [ ] Feedback не передається тільки кольором.
- [ ] Focus states видимі.
- [ ] Dynamic messages доступні.
- [ ] Keyboard users отримують потрібний feedback.

---

# 92. Common Mistakes

## 1. No feedback

    click
      ↓
    nothing


Користувач не знає, що сталося.

---

## 2. Too much feedback

    click
      ↓
    toast
      ↓
    modal
      ↓
    animation
      ↓
    sound
      ↓
    banner


Інтерфейс перевантажений.

---

## 3. Feedback arrives too late

    click
      ↓
    5 seconds
      ↓
    success


Користувач може подумати, що система зависла.

---

## 4. Feedback is too vague

    Something went wrong.


Користувачу не зрозуміло:

    що сталося?
    ↓
    що робити?


---

## 5. Technical error messages

    Error 500
    SQLException
    ValidationException


Це information для developer, а не для кінцевого user.

---

## 6. Feedback only through color

    red = error
    green = success


Не всі користувачі однаково сприймають color.

---

## 7. Toast for everything

Не кожна дія потребує toast.

---

## 8. Modal for everything

Modal створює interruption.

---

## 9. Fake progress

Не показуй:

    73%


якщо реального progress немає.

---

## 10. No recovery

    Error


без:

    Retry
    Edit
    Undo
    Go back


залишає користувача без наступного кроку.

---

# 93. Feedback і Simplicity

Feedback повинен робити interface простішим, а не складнішим.

Хороший:

    [Save]
       ↓
    Saved ✓


Поганий:

    [Save]
       ↓
    modal
       ↓
    "Are you sure?"
       ↓
    [OK]
       ↓
    toast
       ↓
    banner


якщо операція звичайна і безпечна.

Тому:

> **Use the smallest feedback that is sufficient.**

---

# 94. Feedback і Affordance

Зв'язок:

    Affordance
        ↓
    "Що можна зробити?"

    Action
        ↓
    "Я це зробив."

    Feedback
        ↓
    "Ось результат."


Разом вони створюють:

    Understand
        ↓
    Act
        ↓
    Confirm


---

# 95. Feedback і Consistency

Consistency означає:

    same action
        ↓
    same type of feedback.


Наприклад:

    Save
        ↓
    Saved ✓


скрізь.

А не:

    Save → modal

    Save → toast

    Save → inline

    Save → nothing


без причини.

---

# 96. Feedback і User Flow

Хороший flow:

    User starts task
        ↓
    UI shows available action
        ↓
    User acts
        ↓
    Immediate feedback
        ↓
    Processing feedback
        ↓
    Result feedback
        ↓
    Next step


Це створює безперервний interaction loop.

---

# 97. Interaction Loop

Запам'ятай:

    INTENTION
        ↓
    ACTION
        ↓
    SYSTEM RESPONSE
        ↓
    FEEDBACK
        ↓
    USER UNDERSTANDING
        ↓
    NEXT ACTION


Наприклад:

    Хочу зберегти
        ↓
    [Зберегти]
        ↓
    Saving...
        ↓
    Saved ✓
        ↓
    Розумію, що збережено
        ↓
    Продовжую роботу.


---

# 98. Core Level

Потрібно знати:

- що таке Feedback;
- навіщо він потрібен;
- Feedback vs Notification;
- loading;
- success;
- error;
- validation;
- progress;
- hover;
- active;
- focus;
- disabled;
- empty state;
- system status;
- feedback timing.

---

# 99. Junior Level

Потрібно вміти:

- створювати button states;
- робити form validation;
- показувати loading;
- показувати success/error;
- створювати empty states;
- використовувати toast доречно;
- створювати accessible feedback;
- проектувати recovery actions;
- не покладатися тільки на color.

---

# 100. Middle Level

Потрібно вміти:

- проектувати feedback system;
- працювати з async operations;
- проектувати loading/progress states;
- створювати optimistic UI;
- проектувати error recovery;
- працювати з Design System;
- проектувати accessibility feedback;
- визначати рівень intrusiveness;
- будувати consistent interaction patterns.

---

# 101. Senior-level Thinking

Senior designer/developer думає:

    "Що користувач очікує побачити
     після цієї дії?"


    "Чи потрібен тут взагалі
     текстовий feedback?"


    "Чи достатньо visual state?"


    "Наскільки важлива ця інформація?"


    "Чи повинен feedback
     interrupt workflow?"


    "Що станеться,
     якщо request буде дуже повільним?"


    "Що станеться,
     якщо request завершиться error?"


    "Як користувач відновиться?"


    "Чи доступний цей feedback
     keyboard і screen reader users?"


---

# 102. Interview Questions

## Що таке Feedback?

Feedback — це реакція системи на дію користувача, яка повідомляє про поточний або кінцевий результат interaction.

---

## Чому Feedback важливий?

Він зменшує uncertainty, допомагає користувачу зрозуміти стан системи та підтверджує результат дії.

---

## Які основні типи Feedback?

- visual;
- interaction;
- loading;
- progress;
- success;
- error;
- validation;
- confirmation;
- system status;
- navigation;
- accessibility feedback.

---

## Чим Feedback відрізняється від Notification?

Feedback — ширше поняття.

Notification — лише один із способів повідомити користувача.

---

## Коли використовувати Toast?

Для коротких, non-blocking повідомлень, коли користувачу не потрібно зупиняти workflow.

---

## Коли використовувати Modal?

Коли ситуація потребує явної уваги або confirmation, наприклад destructive action.

---

## Чому не можна використовувати тільки колір для Feedback?

Тому що color сам по собі може бути недостатнім для розуміння та недоступним для частини користувачів.

---

## Що робити при довгій операції?

Показати loading state, а якщо можливо — progress, current status і можливість cancel/retry.

---

# 103. Frontend Developer Connection

Для frontend developer Feedback дуже тісно пов'язаний із state management.

Наприклад:

    idle
      ↓
    loading
      ↓
    success


або:

    idle
      ↓
    loading
      ↓
    error


UI:

    state
      ↓
    render
      ↓
    visual feedback.


У React це природна модель:

    React state
        ↓
    component state
        ↓
    UI state
        ↓
    user feedback.


---

# 104. Mini Cheat Sheet

    FEEDBACK

    Питання:

    "Що сталося після моєї дії?"


    Основні принципи:

    1. Respond to important actions
    2. Respond quickly
    3. Show loading for long operations
    4. Show progress when possible
    5. Confirm important success
    6. Explain errors clearly
    7. Provide recovery actions
    8. Use proportional feedback
    9. Don't interrupt unnecessarily
    10. Don't rely only on color
    11. Keep feedback consistent
    12. Make feedback accessible
    13. Use optimistic UI where appropriate
    14. Don't use fake progress
    15. Don't overload users with notifications


---

# 105. Mental Model

Запам'ятай:

    USER ACTION
        ↓
    SYSTEM STATE
        ↓
    FEEDBACK
        ↓
    USER UNDERSTANDING
        ↓
    NEXT ACTION


Або:

    Affordance
        ↓
    Action
        ↓
    Feedback
        ↓
    Confidence


---

# 106. Головне

**Feedback — це спосіб, яким інтерфейс "відповідає" користувачу.**

Користувач:

    натискає
    вводить
    вибирає
    завантажує
    перетягує
    відправляє


Система:

    реагує
    показує стан
    повідомляє результат
    пояснює помилки
    пропонує наступний крок.


Найважливіша формула:

    User Action
        ↓
    System Response
        ↓
    Feedback
        ↓
    Understanding
        ↓
    Confidence


І головне правило:

> **Не залишай користувача гадати, що сталося.**

Але також:

> **Не змушуй користувача читати повідомлення, якщо проста зміна стану вже достатньо пояснює результат.**

Тобто хороший feedback — це не максимальна кількість повідомлень.

Це:

    потрібний feedback
        +
    у правильний момент
        +
    у правильній формі
        +
    відповідно до важливості дії.


---

# 107. Зв'язок з попередніми темами

Попередні принципи:

    Visual Hierarchy
        ↓
    показує, що важливо

    Design Principles
        ↓
    задають загальні правила

    Consistency
        ↓
    робить behavior передбачуваним

    Simplicity
        ↓
    прибирає unnecessary complexity

    Affordance
        ↓
    показує, що можна зробити


Тепер:

    Feedback
        ↓
    показує, що сталося після дії.


Разом:

    Hierarchy
        +
    Consistency
        +
    Simplicity
        +
    Affordance
        +
    Feedback
        ↓
    Predictable Interaction
        ↓
    Lower Cognitive Load
        ↓
    User Confidence
        ↓
    Better UX


---

# 108. Повний Interaction Model

Можна вже скласти першу цілісну модель UI interaction:

    1. Affordance
           ↓
       "Що я можу зробити?"

    2. Action
           ↓
       "Я це роблю."

    3. Immediate Feedback
           ↓
       "Система отримала дію."

    4. Loading / Processing
           ↓
       "Система працює."

    5. Result
           ↓
       Success / Error

    6. Recovery / Next Action
           ↓
       "Що робити далі?"


Це один із фундаментальних interaction loops у UI design.