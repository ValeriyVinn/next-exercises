# 04. Focus and Interaction

## Зміст

1. [Що таке Focus та Interaction](#що-таке-focus-та-interaction)
2. [Що таке Focus](#що-таке-focus)
3. [Focusable elements](#focusable-elements)
4. [Як працює Tab-навігація](#як-працює-tab-навігація)
5. [Keyboard focus](#keyboard-focus)
6. [Mouse focus та pointer interaction](#mouse-focus-та-pointer-interaction)
7. [`:focus`](#focus)
8. [`:focus-visible`](#focus-visible)
9. [`:focus-within`](#focus-within)
10. [`:focus` vs `:focus-visible` vs `:focus-within`](#focus-vs-focus-visible-vs-focus-within)
11. [`outline`](#outline)
12. [`outline-offset`](#outline-offset)
13. [Чому не потрібно прибирати focus outline](#чому-не-потрібно-прибирати-focus-outline)
14. [`tabindex`](#tabindex)
15. [`tabindex="0"`](#tabindex0)
16. [`tabindex="-1"`](#tabindex-1)
17. [Чому не рекомендується `tabindex="1"` і вище](#чому-не-рекомендується-tabindex1-і-вище)
18. [Programmatic focus](#programmatic-focus)
19. [`focus()`](#focus)
20. [`blur()`](#blur)
21. [`document.activeElement`](#documentactiveelement)
22. [HTML `autofocus`](#html-autofocus)
23. [Focus management](#focus-management)
24. [Focus trap](#focus-trap)
25. [Modal та focus](#modal-та-focus)
26. [Dropdown та focus](#dropdown-та-focus)
27. [Form controls та focus](#form-controls-та-focus)
28. [`:disabled` та focus](#disabled-та-focus)
29. [`:enabled`](#enabled)
30. [`:read-only` та `:read-write`](#read-only-та-read-write)
31. [`:checked`](#checked)
32. [`:indeterminate`](#indeterminate)
33. [`:placeholder-shown`](#placeholder-shown)
34. [`:valid` та `:invalid`](#valid-та-invalid)
35. [`:required` та `:optional`](#required-та-optional)
36. [`:default`](#default)
37. [`:target`](#target)
38. [`:active`](#active)
39. [`:hover`](#hover)
40. [`:focus` та `:active`](#focus-та-active)
41. [`pointer-events`](#pointer-events)
42. [`cursor`](#cursor)
43. [Keyboard interaction](#keyboard-interaction)
44. [Enter та Space](#enter-та-space)
45. [Escape](#escape)
46. [Arrow keys](#arrow-keys)
47. [Keyboard events у JavaScript](#keyboard-events-у-javascript)
48. [`keydown`](#keydown)
49. [`keyup`](#keyup)
50. [`event.key`](#eventkey)
51. [`event.code`](#eventcode)
52. [`event.preventDefault()`](#eventpreventdefault)
53. [Focus events у JavaScript](#focus-events-у-javascript)
54. [`focus`](#focus-1)
55. [`blur`](#blur-1)
56. [`focusin`](#focusin)
57. [`focusout`](#focusout)
58. [Event bubbling та focus](#event-bubbling-та-focus)
59. [Click та keyboard accessibility](#click-та-keyboard-accessibility)
60. [Native elements vs custom elements](#native-elements-vs-custom-elements)
61. [Чому `<button>` кращий за `<div>`](#чому-button-кращий-за-div)
62. [Custom interactive elements](#custom-interactive-elements)
63. [ARIA та focus](#aria-та-focus)
64. [`aria-disabled`](#aria-disabled)
65. [`aria-expanded`](#aria-expanded)
66. [`aria-haspopup`](#aria-haspopup)
67. [`aria-activedescendant`](#aria-activedescendant)
68. [Focus та accessibility](#focus-та-accessibility)
69. [Focus order](#focus-order)
70. [Візуальний focus indicator](#візуальний-focus-indicator)
71. [Skip links](#skip-links)
72. [Focus після navigation](#focus-після-navigation)
73. [Focus після відкриття/закриття UI](#focus-після-відкриттязакриття-ui)
74. [Типові помилки](#типові-помилки)
75. [Практичний приклад: accessible form](#практичний-приклад-accessible-form)
76. [Практичний приклад: modal](#практичний-приклад-modal)
77. [Практичний приклад: custom dropdown](#практичний-приклад-custom-dropdown)
78. [Що потрібно пам'ятати](#що-потрібно-памятати)
79. [Питання для співбесіди](#питання-для-співбесіди)
80. [Рівні знань](#рівні-знань)
81. [Міні-шпаргалка](#міні-шпаргалка)
82. [Головне](#головне)


# Що таке Focus та Interaction

**Focus** — це стан, коли HTML-елемент є поточною ціллю для keyboard interaction або програмної взаємодії.

Наприклад, користувач натиснув:

    Tab

і focus перемістився на:

    <input>

Тепер клавіатурне введення направлене до цього елемента.

**Interaction** — ширше поняття.

Воно включає:

- keyboard;
- mouse;
- touch;
- pointer;
- focus;
- click;
- hover;
- active state;
- form interaction;
- navigation;
- відкриття/закриття UI;
- keyboard shortcuts.

Для frontend developer важливо розуміти не тільки:

> "Як зробити елемент красивим?"

а й:

> "Як користувач може ним керувати?"


# Що таке Focus

Focus показує, який елемент зараз є активною точкою keyboard interaction.

Наприклад:

    <input type="text">

Користувач натиснув:

    Tab

Тепер input отримав focus.

Візуально браузер зазвичай показує focus indicator.

Наприклад:

    ┌─────────────────────────────┐
    │ User name                   │
    └─────────────────────────────┘
              ↑
            focus


## Як отримати focus

Focus може виникнути через:

- клавіатуру;
- mouse/pointer;
- touch;
- JavaScript;
- browser navigation;
- accessibility technology.


# Focusable elements

Типові focusable elements:

    <a href="/about">About</a>

    <button type="button">Save</button>

    <input type="text">

    <input type="email">

    <input type="checkbox">

    <input type="radio">

    <select>
        ...
    </select>

    <textarea>
        ...
    </textarea>

    <iframe>
        ...
    </iframe>

А також елементи, яким явно задано:

    tabindex="0"

або:

    tabindex="-1"

Але не кожен HTML-елемент автоматично є focusable.


# Як працює Tab-навігація

Користувач може переміщати focus:

    Tab

вперед:

    element 1
        ↓
    element 2
        ↓
    element 3
        ↓
    element 4


І:

    Shift + Tab

назад:

    element 4
        ↓
    element 3
        ↓
    element 2
        ↓
    element 1


## Чому це важливо

Користувач може використовувати сайт:

    без mouse

Тому кожна важлива interactive action повинна мати keyboard-доступ.


# Keyboard focus

Для accessibility keyboard focus — одна з фундаментальних речей.

Наприклад:

    <button>
        Save
    </button>

можна активувати клавіатурою.

А:

    <div>
        Save
    </div>

сам по собі не є повноцінною interactive control.

Якщо зробити:

    <div onclick="save()">
        Save
    </div>

mouse може працювати.

Але keyboard interaction не буде автоматично еквівалентною поведінці `<button>`.


# Mouse focus та pointer interaction

Mouse interaction може включати:

    click

    mousedown

    mouseup

    mouseenter

    mouseleave

Pointer API узагальнює різні способи взаємодії:

    mouse
    pen
    touch

Наприклад:

    button.addEventListener(
        "pointerdown",
        () => {
            console.log("Pointer down");
        }
    );


# :focus

`:focus` застосовується до елемента, який зараз має focus.

Наприклад:

    input:focus {
        border-color: blue;
    }

HTML:

    <input type="text">


Коли input отримує focus:

    input:focus

починає діяти.


## Простий приклад

    input {
        border: 1px solid #999;
    }

    input:focus {
        border-color: blue;
        outline: 2px solid lightblue;
    }


# :focus-visible

`:focus-visible` використовується для focus indicator тоді, коли браузер вважає, що користувачу потрібно візуально показати keyboard focus.

Типовий сценарій:

    користувач натискає Tab
            ↓
        element
            ↓
    :focus-visible


Приклад:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 2px;
    }


## Чому `:focus-visible` корисний

Можна мати різну поведінку:

    mouse click
        ↓
    focus

і:

    Tab
        ↓
    focus-visible


Це дозволяє не прибирати accessibility focus, але при цьому не створювати зайвий візуальний ефект для кожного mouse click.


# :focus-within

`:focus-within` застосовується до батьківського елемента, якщо сам він або будь-який його descendant має focus.

Наприклад:

    .field:focus-within {
        border-color: blue;
    }


HTML:

    <div class="field">

        <label for="email">
            Email
        </label>

        <input
            id="email"
            type="email"
        >

    </div>

Коли input отримує focus:

    .field:focus-within

також активується.


## Практичне використання

Це дуже корисно для:

- form groups;
- search boxes;
- navigation;
- custom controls;
- input wrappers.


Наприклад:

    .search {
        border: 1px solid #aaa;
    }

    .search:focus-within {
        border-color: blue;
    }


# :focus vs :focus-visible vs :focus-within

| Псевдоклас | Що означає |
|---|---|
| `:focus` | елемент має focus |
| `:focus-visible` | focus повинен бути візуально помітним |
| `:focus-within` | сам елемент або його descendant має focus |

Типовий сучасний pattern:

    button:focus-visible {
        outline: 2px solid blue;
    }

Для wrapper:

    .field:focus-within {
        border-color: blue;
    }


# outline

`outline` часто використовується для focus indicator.

Наприклад:

    button:focus-visible {
        outline: 3px solid blue;
    }

Відмінність від `border`:

    border

є частиною box model.

`outline`

не займає місце в layout.


## Чому outline зручний для focus

Focus indicator не повинен:

- змінювати layout;
- зрушувати сусідні елементи;
- ламати розміри компонента.

Тому:

    outline

часто кращий за:

    border


# outline-offset

`outline-offset` задає відстань між елементом і outline.

Наприклад:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }


Схематично:

    ┌───────────────────────┐
       ← offset →
      ┌─────────────────┐
      │     Button      │
      └─────────────────┘
    └───────────────────────┘
          outline


# Чому не потрібно прибирати focus outline

Одна з поширених помилок:

    *:focus {
        outline: none;
    }

Це може зробити сайт складним або неможливим для keyboard users.

Погано:

    outline: none;


Краще:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 2px;
    }

Правило:

> Не прибирай focus indicator, якщо не створив адекватну альтернативу.


# tabindex

`tabindex` контролює keyboard focus behavior.

Наприклад:

    <div tabindex="0">
        Focusable element
    </div>

Тепер `<div>` може отримати focus через Tab.


Основні значення:

    tabindex="0"

    tabindex="-1"


Також технічно існують:

    tabindex="1"
    tabindex="2"
    tabindex="3"

але їх використання зазвичай не рекомендується.


# tabindex="0"

`tabindex="0"` додає елемент до звичайного tab order.

Наприклад:

    <div tabindex="0">
        Custom control
    </div>

Focus буде рухатися разом з іншими звичайними focusable elements.


## Але

`tabindex="0"` не перетворює `<div>` автоматично на повноцінну button.

Наприклад:

    <div tabindex="0">
        Save
    </div>

не отримує автоматично:

- правильну семантику;
- button behavior;
- Enter/Space behavior;
- усі accessibility semantics.

Тому для кнопки потрібно:

    <button type="button">
        Save
    </button>


# tabindex="-1"

`tabindex="-1"` дозволяє отримати focus програмно, але прибирає елемент із звичайного Tab order.

Наприклад:

    <div
        id="message"
        tabindex="-1"
    >
        Error message
    </div>


JavaScript:

    const message =
        document.querySelector("#message");

    message.focus();


Це дуже корисно для:

- modal;
- dialogs;
- error messages;
- headings;
- dynamic content;
- SPA navigation;
- focus management.


# Чому не рекомендується tabindex="1" і вище

Наприклад:

    <button tabindex="3">
        Button 1
    </button>

    <button tabindex="1">
        Button 2
    </button>

    <button tabindex="2">
        Button 3
    </button>

Tab order може стати:

    Button 2
    Button 3
    Button 1

Це може суперечити природному порядку DOM.

Результат:

    DOM order ≠ keyboard order

Це погано для:

- accessibility;
- UX;
- maintenance;
- predictable navigation.


## Правило

У більшості випадків використовуй:

    tabindex="0"

або:

    tabindex="-1"

і уникай позитивних значень.


# Programmatic focus

JavaScript може встановити focus.

Наприклад:

    const input =
        document.querySelector("#email");

    input.focus();


Це називається:

**programmatic focus**.


# focus()

Метод:

    element.focus();

встановлює focus на елемент.


Наприклад:

    const input =
        document.querySelector("#username");

    input.focus();


## Практичний сценарій

Користувач натиснув:

    Submit

Форма має помилку.

Можна перевести focus на перше invalid field:

    const firstInvalid =
        form.querySelector(":invalid");

    firstInvalid?.focus();


Це може значно покращити UX.


# blur()

`blur()` прибирає focus з елемента.

Наприклад:

    input.blur();


Але зазвичай не потрібно вручну викликати `blur()` без конкретної причини.

Browser сам переміщує focus, коли користувач:

- переходить на інший елемент;
- натискає Tab;
- натискає іншу interactive control.


# document.activeElement

`document.activeElement` показує елемент, який зараз має focus.

Наприклад:

    console.log(document.activeElement);


Якщо focus на:

    <input id="email">

можна отримати:

    document.querySelector("#email")


## Практичний приклад

    document.addEventListener("keydown", () => {
        console.log(document.activeElement);
    });


Це корисно для:

- debugging;
- focus management;
- keyboard navigation;
- modal logic.


# HTML autofocus

HTML має атрибут:

    autofocus

Наприклад:

    <input
        type="text"
        autofocus
    >

Після завантаження сторінки браузер може автоматично поставити focus на цей input.


## Використовувати обережно

Автоматичний focus може:

- несподівано перемістити користувача;
- створити проблеми для screen reader;
- завадити нормальній navigation;
- змінити scroll position.


Тому `autofocus` краще використовувати тільки там, де це дійсно покращує UX.


# Focus management

**Focus management** — це контроль над тим, куди переміщується keyboard focus під час зміни UI.


Особливо важливо для:

- modal;
- dialog;
- dropdown;
- menu;
- tabs;
- SPA navigation;
- dynamic forms;
- error states.


Приклад:

    User clicks "Open"
            ↓
        Modal opens
            ↓
    Focus moves inside modal


Після закриття:

    Modal closes
            ↓
    Focus returns to "Open" button


Це правильний focus management.


# Focus trap

**Focus trap** — це механізм, при якому keyboard focus не може вийти за межі певного UI-контейнера.

Найчастіше використовується для:

    modal dialog


Схема:

    ┌───────────────────────────────┐
    │ Page                          │
    │                               │
    │   ┌───────────────────────┐   │
    │   │ Modal                 │   │
    │   │                       │   │
    │   │ Input                 │   │
    │   │ Button                │   │
    │   └───────────────────────┘   │
    │                               │
    └───────────────────────────────┘

Tab:

    Input
      ↓
    Button
      ↓
    Close
      ↓
    Input
      ↓
    Button


Focus залишається всередині modal.


# Modal та focus

Правильний modal workflow:

    1. User clicks Open
    2. Save current focus
    3. Open modal
    4. Move focus into modal
    5. Keep keyboard focus inside modal
    6. User presses Escape
    7. Close modal
    8. Restore focus


## Збереження попереднього focus

    const openButton =
        document.querySelector("#open");

    let previousFocus = null;

    openButton.addEventListener("click", () => {
        previousFocus = document.activeElement;

        modal.showModal();
        closeButton.focus();
    });


Після закриття:

    previousFocus?.focus();


# Native `<dialog>`

HTML має native dialog:

    <dialog id="dialog">
        <p>Hello</p>

        <button type="button">
            Close
        </button>
    </dialog>

Відкрити:

    dialog.showModal();

Закрити:

    dialog.close();


Native `<dialog>` може значно спростити правильну поведінку modal, але його все одно потрібно правильно використовувати з точки зору UX та accessibility.


# Dropdown та focus

Dropdown повинен мати зрозумілу keyboard interaction.

Наприклад:

    Button
       ↓
    Dropdown
       ↓
    Option
       ↓
    Option
       ↓
    Option


Користувач повинен мати можливість:

- відкрити dropdown;
- переміщатися keyboard;
- вибрати item;
- закрити Escape;
- повернути focus.


# Form controls та focus

У form elements focus є природною частиною interaction.

Наприклад:

    <label for="name">
        Name
    </label>

    <input
        id="name"
        name="name"
        type="text"
    >


Користувач:

    Tab
      ↓
    input
      ↓
    type text
      ↓
    Tab
      ↓
    next control


Це одна з причин використовувати native form controls замість повністю custom elements.


# :disabled та focus

Disabled element зазвичай не бере участі у звичайному focus/interaction workflow.

Наприклад:

    <button
        type="button"
        disabled
    >
        Save
    </button>

Користувач не може нормально взаємодіяти з ним як зі звичайною активною кнопкою.


## Важлива відмінність

`disabled`:

    <button disabled>

означає, що control реально disabled.

А:

    aria-disabled="true"

лише повідомляє accessibility semantics.

Це не одне й те саме.


# :enabled

`:enabled` вибирає enabled form controls.

Наприклад:

    button:enabled {
        cursor: pointer;
    }


Разом:

    button:disabled {
        cursor: not-allowed;
    }


# :read-only та :read-write

Для полів, які підтримують readonly behavior, можна використовувати:

    :read-only

та:

    :read-write


Наприклад:

    input:read-only {
        background: #eee;
    }


І:

    input:read-write {
        background: white;
    }


HTML:

    <input
        type="text"
        value="User name"
        readonly
    >


# :checked

`:checked` застосовується до checked controls.

Наприклад:

    input:checked {
        accent-color: green;
    }


HTML:

    <input
        type="checkbox"
        checked
    >


Також:

    input:checked + label {
        font-weight: bold;
    }


# :indeterminate

`:indeterminate` використовується для стану, коли control має проміжний стан.

Найвідоміший випадок — checkbox "select all".

Наприклад:

    const checkbox =
        document.querySelector("#select-all");

    checkbox.indeterminate = true;


CSS:

    #select-all:indeterminate {
        outline: 2px solid orange;
    }


Це корисно для:

    checked
    unchecked
    partially checked


# :placeholder-shown

`:placeholder-shown` застосовується, коли input показує placeholder.

Наприклад:

    input:placeholder-shown {
        background: #f5f5f5;
    }


HTML:

    <input
        type="text"
        placeholder="Enter your name"
    >


Цей псевдоклас часто використовується для:

- floating labels;
- form UI;
- empty input states.


# :valid та :invalid

Ці псевдокласи вже розглядалися у Form Validation.

Наприклад:

    input:invalid {
        border-color: red;
    }

    input:valid {
        border-color: green;
    }


У focus context часто комбінують:

    input:focus-visible {
        outline: 2px solid blue;
    }

    input:user-invalid {
        border-color: red;
    }


# :required та :optional

Обов'язкове поле:

    input:required {
        border-left: 3px solid blue;
    }


Необов'язкове:

    input:optional {
        border-left: 3px solid gray;
    }


# :default

`:default` може вибирати default form control.

Наприклад, для radio/checkbox, які мають початковий default state:

    input:default {
        outline: 1px dashed gray;
    }


Це менш поширений псевдоклас, але його варто знати.


# :target

`:target` не є focus state, але важливий для navigation interaction.

Він вибирає елемент, id якого відповідає fragment URL.

Наприклад:

    <a href="#contacts">
        Contacts
    </a>

    <section id="contacts">
        ...
    </section>


CSS:

    #contacts:target {
        outline: 3px solid blue;
    }


Це дозволяє створювати:

- anchor navigation;
- highlighted sections;
- simple CSS interactions.


# :active

`:active` застосовується в момент активної pointer interaction.

Наприклад:

    button:active {
        transform: scale(0.98);
    }


Це короткочасний стан:

    press
      ↓
    active
      ↓
    release


# :hover

`:hover` означає, що pointer знаходиться над елементом.

Наприклад:

    button:hover {
        background: darkblue;
    }


Але важливо:

> Hover не замінює keyboard interaction.

Не можна будувати критичну функціональність тільки на `:hover`.


# :focus та :active

Це різні стани.

`:focus`:

> елемент має focus.

`:active`:

> елемент зараз активується pointer interaction.


Наприклад:

    button:focus-visible {
        outline: 3px solid blue;
    }

    button:active {
        transform: scale(0.98);
    }


Кнопка може бути одночасно:

    :focus
    :active


# pointer-events

CSS:

    pointer-events

контролює, чи може елемент бути pointer target.

Наприклад:

    .overlay {
        pointer-events: none;
    }


Тоді pointer interaction може проходити крізь елемент до того, що знаходиться під ним.


## pointer-events: none ≠ disabled

Це дуже важливо.

    pointer-events: none;

не робить HTML element disabled.

Наприклад:

    <button class="button">
        Save
    </button>


CSS:

    .button {
        pointer-events: none;
    }

Це не те саме, що:

    <button disabled>
        Save
    </button>


`disabled` має native semantics.

`pointer-events` — CSS behavior.


# cursor

`cursor` змінює вигляд pointer.

Наприклад:

    button {
        cursor: pointer;
    }


Для disabled:

    button:disabled {
        cursor: not-allowed;
    }


Але:

    cursor: pointer;

не робить елемент interactive.

Наприклад:

    <div style="cursor: pointer;">
        Save
    </div>

залишається `<div>`.


# Keyboard interaction

Accessible interaction повинна враховувати keyboard.

Основні клавіші:

    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys
    Home
    End


Різні controls мають різні очікувані keyboard patterns.


# Enter та Space

Для native `<button>` браузер уже реалізує відповідну keyboard behavior.

Наприклад:

    <button type="button">
        Save
    </button>


Користувач може активувати кнопку keyboard.


## Чому це важливо

Якщо замість button:

    <div
        onclick="save()"
    >
        Save
    </div>

то потрібно вручну реалізувати keyboard behavior.

Це одна з причин:

> Use native HTML elements whenever possible.


# Escape

`Escape` часто використовується для:

- modal;
- dialog;
- dropdown;
- menu;
- popup;
- overlay.


Наприклад:

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });


# Arrow keys

Arrow keys часто використовуються для:

- menus;
- tabs;
- listbox;
- custom select;
- sliders;
- tree views;
- composite widgets.


Наприклад:

    if (event.key === "ArrowDown") {
        moveToNextItem();
    }


Але keyboard pattern потрібно вибирати відповідно до типу компонента, а не довільно.


# Keyboard events у JavaScript

Основні події:

    keydown

    keyup


Історично існувала:

    keypress

але для сучасного коду зазвичай використовують `keydown` і `keyup`.


# keydown

`keydown` виникає, коли клавіша натиснута.

Наприклад:

    document.addEventListener(
        "keydown",
        (event) => {
            console.log(event.key);
        }
    );


Якщо натиснути:

    Escape

можна отримати:

    "Escape"


# keyup

`keyup` виникає після відпускання клавіші.

Наприклад:

    document.addEventListener(
        "keyup",
        (event) => {
            console.log(event.key);
        }
    );


Типовий порядок:

    keydown
       ↓
    keyup


Для key repeat `keydown` може повторюватися, якщо клавішу утримувати.


# event.key

`event.key` описує логічне значення клавіші.

Наприклад:

    event.key === "Enter"

    event.key === "Escape"

    event.key === "Tab"

    event.key === "ArrowDown"


Приклад:

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            console.log("Close");
        }
    });


# event.code

`event.code` описує фізичну клавішу клавіатури.

Наприклад:

    event.code === "KeyA"

    event.code === "Enter"

    event.code === "ArrowDown"


Спрощено:

    event.key

→ що за символ/логічна клавіша.

    event.code

→ фізична клавіша.


Для більшості звичайних UI keyboard interactions достатньо:

    event.key


# event.preventDefault()

`preventDefault()` скасовує стандартну browser action.

Наприклад:

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                event.preventDefault();

                closeModal();
            }
        }
    );


Але використовувати `preventDefault()` потрібно обережно.

Не слід без причини блокувати:

- Tab;
- Enter;
- Space;
- scrolling;
- стандартні browser behaviors.


# Focus events у JavaScript

Основні focus-related events:

    focus
    blur
    focusin
    focusout


# focus

`focus` виникає, коли елемент отримує focus.

Наприклад:

    input.addEventListener(
        "focus",
        () => {
            console.log("Focused");
        }
    );


# blur

`blur` виникає, коли елемент втрачає focus.

Наприклад:

    input.addEventListener(
        "blur",
        () => {
            console.log("Blurred");
        }
    );


Це часто використовується для:

- validation;
- formatting;
- saving;
- UI feedback.


# focusin

`focusin` схожий на `focus`, але має важливу відмінність:

`focusin` може bubble.

Наприклад:

    form.addEventListener(
        "focusin",
        (event) => {
            console.log(
                "Focused:",
                event.target
            );
        }
    );


Це дуже зручно для event delegation.


# focusout

`focusout` схожий на `blur`, але також bubble.

Наприклад:

    form.addEventListener(
        "focusout",
        (event) => {
            console.log(
                "Focus left:",
                event.target
            );
        }
    );


# Event bubbling та focus

Важливо пам'ятати:

    focus
    blur

не bubble так само, як звичайні events.

Натомість:

    focusin
    focusout

підходять для bubbling/event delegation.


Наприклад:

    form.addEventListener(
        "focusin",
        (event) => {
            const field = event.target;

            if (
                field instanceof HTMLInputElement
            ) {
                console.log("Input focused");
            }
        }
    );


# Click та keyboard accessibility

Поганий custom component:

    <div onclick="openMenu()">
        Menu
    </div>


Mouse працює.

Keyboard:

    Tab
    Enter
    Space

не має native button behavior.


Краще:

    <button
        type="button"
        id="menu-button"
    >
        Menu
    </button>


Тоді browser вже надає:

- focus;
- keyboard interaction;
- semantics;
- accessibility behavior.


# Native elements vs custom elements

Найважливіше правило accessibility:

> Спочатку шукай native HTML element.

Наприклад:

| Потрібно | Краще використати |
|---|---|
| Button | `<button>` |
| Link | `<a href>` |
| Text input | `<input>` |
| Checkbox | `<input type="checkbox">` |
| Radio | `<input type="radio">` |
| Select | `<select>` |
| Text area | `<textarea>` |
| Form | `<form>` |
| Heading | `<h1>`–`<h6>` |


Не потрібно створювати custom component там, де native HTML вже вирішує проблему.


# Чому `<button>` кращий за `<div>`

Порівняй:

    <div onclick="save()">
        Save
    </div>


і:

    <button type="button">
        Save
    </button>


`button` має native:

- semantics;
- focus;
- keyboard behavior;
- disabled state;
- accessibility tree integration;
- browser behavior.


`div` має:

    generic container

і нічого цього автоматично не отримує.


# Custom interactive elements

Іноді native element недостатньо.

Наприклад:

- custom slider;
- custom listbox;
- complex menu;
- tree;
- date picker.

Тоді потрібно продумати:

1. semantic role;
2. keyboard interaction;
3. focus management;
4. visual states;
5. ARIA;
6. screen reader behavior.


Це значно складніше, ніж:

    <button>


Тому custom interaction потрібно створювати тільки за потреби.


# ARIA та focus

ARIA може описувати стан custom controls.

Наприклад:

    aria-expanded

    aria-disabled

    aria-haspopup

    aria-selected

    aria-activedescendant


Але важливе правило:

> ARIA не замінює native HTML.


Якщо можна використати:

    <button>

не потрібно створювати:

    <div
        role="button"
        tabindex="0"
    >


# aria-disabled

`aria-disabled="true"` повідомляє accessibility technology, що control є disabled.

Наприклад:

    <button
        type="button"
        aria-disabled="true"
    >
        Save
    </button>


Але це не те саме, що:

    <button
        type="button"
        disabled
    >
        Save
    </button>


Для native button краще використовувати:

    disabled


`aria-disabled` особливо корисний для custom widgets, де native `disabled` недоступний або не відповідає моделі компонента.


# aria-expanded

Показує, чи відкритий expandable control.

Наприклад:

    <button
        type="button"
        aria-expanded="false"
    >
        Menu
    </button>


Після відкриття:

    aria-expanded="true"


JavaScript:

    button.setAttribute(
        "aria-expanded",
        "true"
    );


Це часто використовується для:

- dropdown;
- accordion;
- menu;
- disclosure.


# aria-haspopup

Показує, що control відкриває popup-like UI.

Наприклад:

    <button
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
    >
        Menu
    </button>


Разом:

    aria-haspopup
    +
    aria-expanded

можуть описувати interactive relationship.


# aria-activedescendant

`aria-activedescendant` дозволяє зберігати DOM focus на одному елементі, але повідомляти accessibility technology, який descendant зараз є active.

Це складніший pattern.

Часто використовується для:

- listbox;
- combobox;
- tree;
- grid;
- custom keyboard navigation.


Приклад:

    <div
        role="listbox"
        tabindex="0"
        aria-activedescendant="option-2"
    >
        ...
    </div>

Тут focus залишається на listbox, а active option визначається через:

    aria-activedescendant


# Focus та accessibility

Accessibility focus має бути:

- видимим;
- передбачуваним;
- логічним;
- керованим keyboard;
- не заблокованим;
- пов'язаним із поточним UI state.


Користувач повинен розуміти:

> Де я зараз знаходжусь?


Наприклад:

    Header
      ↓
    Navigation
      ↓
    Main
      ↓
    Form
      ↓
    Submit


# Focus order

Focus order повинен відповідати логіці сторінки.

Наприклад:

    Name
    Email
    Password
    Submit


не повинно перетворюватися на:

    Submit
    Password
    Name
    Email


Без причини не потрібно використовувати позитивний:

    tabindex


Краще організувати правильний порядок через:

    DOM order


# Візуальний focus indicator

Focus indicator повинен бути:

- видимим;
- достатньо контрастним;
- не надто маленьким;
- не перекритим;
- стабільним;
- зрозумілим.


Приклад:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }


Не потрібно робити:

    button:focus {
        outline: none;
    }


якщо немає іншого якісного focus indicator.


# Skip links

**Skip link** дозволяє keyboard users швидко перейти до основного контенту.

Наприклад:

    <a
        class="skip-link"
        href="#main"
    >
        Skip to main content
    </a>


Потім:

    <main id="main">
        ...
    </main>


CSS:

    .skip-link {
        position: absolute;
        left: 0;
        top: -100px;
    }

    .skip-link:focus {
        top: 0;
    }


Тепер keyboard user може:

    Tab
      ↓
    Skip to main content
      ↓
    Enter
      ↓
    Main content


Це особливо корисно на сторінках із великою navigation.


# Focus після navigation

У звичайному multi-page HTML переході браузер зазвичай сам керує document navigation.

У SPA може виникнути проблема:

    URL changed
        ↓
    content changed
        ↓
    focus залишився не там, де очікує користувач


Тому SPA часто потребує explicit focus management.

Наприклад:

    navigation
        ↓
    page changed
        ↓
    focus main heading


У JavaScript можна:

    const heading =
        document.querySelector("h1");

    heading.setAttribute(
        "tabindex",
        "-1"
    );

    heading.focus();


Це дозволяє keyboard/screen reader user зрозуміти, що сторінка змінилася.


# Focus після відкриття/закриття UI

Типовий pattern:

    Open button
        ↓
    Dialog opens
        ↓
    Focus inside dialog
        ↓
    User interacts
        ↓
    Dialog closes
        ↓
    Focus returns to Open button


Наприклад:

    const openButton =
        document.querySelector("#open");

    const dialog =
        document.querySelector("#dialog");

    const closeButton =
        document.querySelector("#close");


    openButton.addEventListener("click", () => {
        dialog.showModal();

        closeButton.focus();
    });


    closeButton.addEventListener("click", () => {
        dialog.close();

        openButton.focus();
    });


# Типові помилки

## Помилка 1 — `outline: none`

Погано:

    * {
        outline: none;
    }

Це може знищити keyboard accessibility.


Краще:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 2px;
    }


# Помилка 2 — використовувати `<div>` замість button

Погано:

    <div onclick="save()">
        Save
    </div>


Краще:

    <button type="button">
        Save
    </button>


# Помилка 3 — позитивний tabindex

Погано:

    tabindex="1"
    tabindex="2"
    tabindex="3"


Краще:

    tabindex="0"

або:

    tabindex="-1"


А ще краще — використовувати native interactive element.


# Помилка 4 — interaction тільки через hover

Погано:

    .menu:hover .dropdown {
        display: block;
    }


Якщо dropdown критичний для navigation, keyboard user повинен мати еквівалентний спосіб interaction.


# Помилка 5 — `pointer-events: none` замість disabled

Погано:

    button {
        pointer-events: none;
    }


як заміна:

    <button disabled>


Це різні механізми.


# Помилка 6 — focus губиться після modal

Поганий workflow:

    Open modal
        ↓
    Modal
        ↓
    Close
        ↓
    Focus disappears


Краще:

    Open
      ↓
    Modal
      ↓
    Close
      ↓
    Focus → Open


# Помилка 7 — не обробляти Escape

Для dialog/dropdown/menu користувач очікує можливість закрити UI через:

    Escape


# Помилка 8 — блокувати Tab

Не потрібно без причини:

    event.preventDefault();

на Tab.

Це може зламати keyboard navigation.


# Помилка 9 — змінювати DOM order тільки заради дизайну

CSS layout може візуально переміщувати елементи.

Але потрібно перевіряти, чи keyboard/focus order залишається логічним.

Пам'ятай:

    visual order

не завжди дорівнює:

    DOM order


# Помилка 10 — custom widget без keyboard support

Створити:

    <div role="button">

недостатньо.

Потрібно врахувати:

- focus;
- keyboard;
- state;
- semantics;
- activation;
- disabled state;
- accessibility.


# Практичний приклад: accessible form

HTML:

    <form id="contact-form">

        <div class="field">
            <label for="name">
                Name
            </label>

            <input
                id="name"
                name="name"
                type="text"
                required
            >
        </div>

        <div class="field">
            <label for="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                required
            >
        </div>

        <button type="submit">
            Send
        </button>

    </form>


CSS:

    .field {
        border: 1px solid #999;
        padding: 8px;
    }

    .field:focus-within {
        border-color: blue;
    }

    input:focus-visible {
        outline: 3px solid lightblue;
        outline-offset: 2px;
    }


Тут:

    :focus-within

підсвічує весь field.

А:

    :focus-visible

показує keyboard focus на input.


# Практичний приклад: first invalid field

HTML:

    <form id="form">

        <input
            name="username"
            required
        >

        <input
            name="email"
            type="email"
            required
        >

        <button type="submit">
            Submit
        </button>

    </form>


JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();

            const firstInvalid =
                form.querySelector(":invalid");

            firstInvalid?.focus();
        }
    });


Тепер keyboard focus переходить до першого invalid field.


# Практичний приклад: modal

HTML:

    <button
        id="open-modal"
        type="button"
    >
        Open modal
    </button>


    <dialog id="modal">

        <h2>Contact form</h2>

        <form method="dialog">

            <label for="modal-email">
                Email
            </label>

            <input
                id="modal-email"
                type="email"
                required
            >

            <button
                id="close-modal"
                type="submit"
            >
                Close
            </button>

        </form>

    </dialog>


JavaScript:

    const openModal =
        document.querySelector("#open-modal");

    const modal =
        document.querySelector("#modal");

    const email =
        document.querySelector("#modal-email");


    openModal.addEventListener("click", () => {
        modal.showModal();

        email.focus();
    });


Після закриття можна повернути focus:

    modal.addEventListener("close", () => {
        openModal.focus();
    });


Основний принцип:

    Open
      ↓
    Modal
      ↓
    Focus inside
      ↓
    Close
      ↓
    Focus back


# Практичний приклад: custom dropdown

HTML:

    <button
        id="dropdown-button"
        type="button"
        aria-expanded="false"
        aria-haspopup="menu"
    >
        Options
    </button>

    <ul
        id="dropdown-menu"
        hidden
    >
        <li>
            <button type="button">
                Edit
            </button>
        </li>

        <li>
            <button type="button">
                Delete
            </button>
        </li>
    </ul>


JavaScript:

    const button =
        document.querySelector("#dropdown-button");

    const menu =
        document.querySelector("#dropdown-menu");


    function openMenu() {
        menu.hidden = false;

        button.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeMenu() {
        menu.hidden = true;

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.focus();
    }


    button.addEventListener("click", () => {
        if (menu.hidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });


    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !menu.hidden
        ) {
            closeMenu();
        }
    });


Це лише спрощений приклад.

Повноцінний accessible menu має значно більше правил keyboard interaction залежно від того, чи це menu, listbox, select-like component або звичайний disclosure.


# Native controls — перший вибір

Перед створенням custom component запитай:

    Чи існує native HTML element?


Якщо потрібна кнопка:

    <button>

Якщо посилання:

    <a href>

Якщо checkbox:

    <input type="checkbox">

Якщо select:

    <select>


Native HTML дає величезну кількість behavior без додаткового JavaScript.


# Focus management у сучасному frontend

У простому HTML:

    browser

значною мірою керує focus.

У складному application:

    React
    Next.js
    SPA
    Modal
    Dropdown
    Tabs
    Dynamic forms

розробник часто повинен явно керувати focus.


Тому потрібно розуміти:

    DOM
      ↓
    focus
      ↓
    keyboard
      ↓
    UI state
      ↓
    accessibility


# Що потрібно пам'ятати

## 1. Focus — це не decoration

Focus — частина interaction model.


## 2. Keyboard users повинні мати доступ

Основний інструмент:

    Tab


Назад:

    Shift + Tab


## 3. Не прибирай focus indicator

Погано:

    outline: none;


Краще:

    :focus-visible


## 4. Використовуй native HTML

Для кнопки:

    <button>


Для link:

    <a href>


Для input:

    <input>


## 5. `tabindex="0"`

Додає елемент у природний tab order.


## 6. `tabindex="-1"`

Дозволяє programmatic focus без додавання до Tab order.


## 7. Уникай позитивного tabindex

Не використовуй без дуже конкретної причини:

    tabindex="1"


## 8. `focus()`

Переміщує focus:

    element.focus();


## 9. `blur()`

Знімає focus:

    element.blur();


## 10. `document.activeElement`

Показує поточний focused element.


## 11. `:focus`

Елемент має focus.


## 12. `:focus-visible`

Focus indicator для interaction, де він потрібен візуально.


## 13. `:focus-within`

Батьківський елемент має descendant із focus.


## 14. `:active`

Pointer interaction у активній фазі.


## 15. `:hover`

Pointer знаходиться над елементом.

Не замінює keyboard interaction.


## 16. `pointer-events`

Керує pointer interaction.

Не замінює `disabled`.


## 17. `keydown`

Основна keyboard event для interaction logic.


## 18. `event.key`

Використовується для перевірки:

    Enter
    Escape
    Tab
    ArrowDown


## 19. `focusin` та `focusout`

Зручні для bubbling/event delegation.


## 20. Focus management

Особливо важливий для:

    modal
    dropdown
    SPA navigation
    dynamic UI


# Питання для співбесіди

### 1. Що таке focus?

Стан, коли елемент є поточною ціллю keyboard або programmatic interaction.


### 2. Яка різниця між `:focus` та `:focus-visible`?

`:focus` застосовується, коли елемент має focus.

`:focus-visible` дозволяє показувати focus indicator тоді, коли він потрібен для видимого keyboard-oriented feedback.


### 3. Що робить `:focus-within`?

Вибирає елемент, якщо сам він або його descendant має focus.


### 4. Що робить `tabindex="0"`?

Додає елемент до природного keyboard tab order.


### 5. Що робить `tabindex="-1"`?

Дозволяє programmatic focus, але прибирає елемент із звичайного Tab navigation.


### 6. Чому не рекомендується `tabindex="1"`?

Він створює штучний focus order, який може не відповідати DOM order.


### 7. Як програмно встановити focus?

    element.focus();


### 8. Як дізнатися, який елемент зараз має focus?

    document.activeElement


### 9. Чому `<button>` кращий за `<div onclick>`?

Тому що `<button>` має native semantics, focus behavior і keyboard interaction.


### 10. Чому не можна просто зробити `outline: none`?

Тому що можна втратити видимий focus indicator для keyboard users.


### 11. Для чого потрібен `:focus-visible`?

Для створення focus indicator, орієнтованого на accessibility та keyboard interaction.


### 12. Чим `focus` відрізняється від `focusin`?

`focusin` підтримує bubbling, а `focus` — ні в типовій моделі event propagation.


### 13. Чим `blur` відрізняється від `focusout`?

`focusout` bubble, а `blur` — ні.


### 14. Що таке focus trap?

Механізм, який утримує keyboard focus всередині певного UI, найчастіше modal.


### 15. Що має відбуватися з focus після закриття modal?

У більшості випадків focus потрібно повернути на елемент, який відкрив modal.


### 16. Для чого використовується `aria-expanded`?

Для опису стану expandable control:

    true
    false


### 17. Чи замінює `aria-disabled="true"` атрибут `disabled`?

Ні.

Це різні механізми.


### 18. Чому hover недостатньо для accessibility?

Hover недоступний або незручний для keyboard-only та деяких touch users.


### 19. Що таке focus management?

Свідоме керування переміщенням focus під час зміни UI.


### 20. Чому native HTML важливий для accessibility?

Тому що browser уже реалізує велику частину semantics, focus behavior та keyboard interaction.


# Рівні знань

## 🟢 Core

Потрібно знати:

    focus
    Tab
    Shift + Tab
    :focus
    :focus-visible
    :focus-within
    outline
    tabindex


Розуміти:

    button
    input
    select
    textarea
    a


як native interactive elements.


## 🟡 Junior

Потрібно вміти:

- зробити keyboard-friendly form;
- не прибирати focus indicator;
- використовувати `:focus-visible`;
- працювати з `tabindex`;
- використовувати `focus()`;
- знаходити `document.activeElement`;
- обробляти `keydown`;
- реагувати на Escape;
- використовувати `:focus-within`;
- створювати accessible button;
- розуміти різницю між native і custom controls.


## 🟠 Middle

Потрібно розуміти:

- focus management;
- modal focus;
- focus restoration;
- keyboard navigation;
- focus trap;
- `focusin` / `focusout`;
- ARIA states;
- custom widgets;
- SPA navigation;
- dynamic content;
- accessibility testing.


## 🔴 Senior

Потрібно розуміти:

- accessibility interaction patterns;
- WAI-ARIA design patterns;
- composite widgets;
- roving tabindex;
- `aria-activedescendant`;
- focus architecture у великих SPA;
- keyboard interaction contracts;
- screen reader interaction;
- progressive enhancement;
- native HTML vs custom components;
- focus behavior під час routing;
- accessibility regression testing.


# Міні-шпаргалка

## CSS focus

    :focus

    :focus-visible

    :focus-within


## CSS interaction

    :hover

    :active

    :checked

    :disabled

    :enabled

    :required

    :optional

    :valid

    :invalid

    :placeholder-shown

    :target


## Focus outline

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 2px;
    }


## tabindex

    tabindex="0"

→ normal tab order.


    tabindex="-1"

→ programmatic focus.


Уникай:

    tabindex="1"


## JavaScript

    element.focus();

    element.blur();

    document.activeElement;


## Keyboard

    event.key === "Tab"

    event.key === "Enter"

    event.key === "Escape"

    event.key === "ArrowDown"

    event.key === "ArrowUp"


## Events

    focus
    blur
    focusin
    focusout
    keydown
    keyup
    click


## ARIA

    aria-expanded

    aria-haspopup

    aria-disabled

    aria-activedescendant


# Focus checklist

Перед завершенням interactive component перевір:

    [ ] Чи можна дістатися до нього через Tab?

    [ ] Чи видно focus indicator?

    [ ] Чи працює Enter?

    [ ] Чи працює Space, якщо це потрібно?

    [ ] Чи працює Escape, якщо UI можна закрити?

    [ ] Чи працюють Arrow keys, якщо вони потрібні компоненту?

    [ ] Чи логічний focus order?

    [ ] Чи не використовується позитивний tabindex?

    [ ] Чи повертається focus після закриття modal?

    [ ] Чи не губиться focus після navigation?

    [ ] Чи використовується native HTML там, де це можливо?

    [ ] Чи є accessibility semantics?

    [ ] Чи не залежить функціональність тільки від hover?

    [ ] Чи не використовується pointer-events як заміна disabled?

    [ ] Чи зрозумілий стан компонента keyboard user?


# Головне

Focus — це одна з основ accessibility та interaction design.

Користувач повинен мати можливість працювати із сайтом не тільки через mouse, а й через:

    Keyboard
    ↓
    Tab
    ↓
    Enter
    ↓
    Space
    ↓
    Escape
    ↓
    Arrow keys


Основна модель:

    Native HTML
        ↓
    правильна semantics
        ↓
    browser focus behavior
        ↓
    keyboard interaction
        ↓
    CSS focus states
        ↓
    JavaScript focus management


Для CSS найважливіші:

    :focus
    :focus-visible
    :focus-within


Для keyboard navigation:

    tabindex
    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys


Для JavaScript:

    focus()
    blur()
    document.activeElement
    keydown
    keyup
    focusin
    focusout


Для accessibility:

    видимий focus
    логічний focus order
    keyboard support
    native HTML
    правильна ARIA semantics
    focus management


Найважливіше правило:

> Не створюй custom interaction, якщо native HTML уже вирішує задачу.

І друге:

> Якщо користувач може виконати дію mouse, він повинен мати еквівалентний спосіб виконати її keyboard.

Правильний interactive component — це не просто:

    красиво виглядає

а:

    видно
      +
    focusable
      +
    keyboard accessible
      +
    predictable
      +
    semantic
      +
    accessible


Саме тому **Focus and Interaction** — це міст між HTML/CSS layout та справжнім accessibility-friendly UI.