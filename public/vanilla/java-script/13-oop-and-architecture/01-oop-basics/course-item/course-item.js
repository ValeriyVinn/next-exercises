// class Counter {
//   constructor({ step = 1 } = {}) {
//     this.step = step;
//   }
//   value = 0; // поле класу

//   increment() {
//     this.value += this.step;
//   }
// }

// const c = new Counter({ step: 2 });
// console.log(c.value);
// c.increment();
// console.log(c.value);

// const d = new Counter({step: 5});
// console.log(d.value);
// d.increment();
// console.log(d.value);

// const e = new Counter ()
// e.increment()
// console.log(e.value)
// e.increment()
// console.log(e.value)

// ?----------------------------------------

// const titleEl = document.querySelector(".title");
// const durationEl = document.querySelector(".duration");
// const statusEl = document.querySelector(".status");
// const completeBtnEl = document.querySelector(".complete-btn");
// const uncompleteBtnEl = document.querySelector(".uncomplete-btn");
// const statusBtnEl = document.querySelector(".status-btn");
// class Lesson {
//   constructor({ title, duration }) {
//     this.title = title;
//     this.duration = duration;
//     this.completed = false;
//   }
//   markCompleted() {
//     this.completed = true;
//   }
//   markUncompleted() {
//     this.completed = false;
//   }
//   getStatus() {
//     return this.completed;
//   }
// }
// const lesson = new Lesson({ title: "JavaScript Classes", duration: "15 min" });
// function renderLesson(lesson) {
//   titleEl.textContent = lesson.title;
//   durationEl.textContent = lesson.duration;
//   titleEl.className = lesson.getStatus() ? "green" : "red";
//   statusEl.textContent = lesson.getStatus() ? "Completed" : "Uncompleted";
// }
// renderLesson(lesson);
// completeBtnEl.addEventListener("click", () => {
//   lesson.markCompleted();
//   renderLesson(lesson);
// });
// uncompleteBtnEl.addEventListener("click", () => {
//   lesson.markUncompleted();
//   renderLesson(lesson);
// });
// statusBtnEl.addEventListener("click", () => {
//   alert(lesson.getStatus() ? "Курс закінчено" : "Курс не закінчено");
// });
// ?------------------------------------
const courses = [
  { title: "Html", duration: 10 },
  { title: "Css", duration: 20 },
  { title: "Java-Script", duration: 30 },
  { title: "React", duration: 40 },
];

class Lesson {
  constructor({ title, duration }) {
    this.title = title;
    this.duration = duration;
    this.completed = false;
  }
  markCompleted() {
    this.completed = true;
  }
  markUncompleted() {
    this.completed = false;
  }
  getStatus() {
    return this.completed ? "Completed" : "Uncompleted";
  }
}

const lessons = courses.map((course) => new Lesson(course));
const container = document.getElementById("courses");

function renderLessons() {
  container.innerHTML = lessons
    .map(
      (lesson, index) => `
      <div class="card" data-index="${index}">
        <h3 class="header">${lesson.title}</h3>
        <p>Тривалість: ${lesson.duration} годин</p>
        <p class="status">${lesson.getStatus()}</p>
        <div class="button-wrapper">
          <button data-action="complete">Completed</button>
          <button data-action="uncomplete">Uncomplete</button>
          <button data-action="show">Show Status</button>
        </div>
      </div>
    `,
    )
    .join("");
}

renderLessons();

const header = document.querySelectorAll(".header");
header.forEach((header) => (header.className = "header red"));

container.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const card = e.target.closest(".card");
  const index = card.dataset.index;
  const lesson = lessons[index];
  const statusEl = card.querySelector(".status");
  const headerEl = card.querySelector(".header");

  switch (e.target.dataset.action) {
    case "complete":
      lesson.markCompleted();
      headerEl.className = "header green";
      statusEl.textContent = lesson.getStatus();
      break;
    case "uncomplete":
      lesson.markUncompleted();
      headerEl.className = "header red";
      statusEl.textContent = lesson.getStatus();
      break;
    case "show":
      alert(`Статус курсу "${lesson.title}": ${lesson.getStatus()}`);
      break;
  }
});
