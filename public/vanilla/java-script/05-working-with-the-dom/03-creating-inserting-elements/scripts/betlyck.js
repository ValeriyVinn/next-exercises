const oneBetlyck = document.querySelectorAll(".grid-element");

const content = `
  <h3 class="subject">English</h3>
  <p class="practice">Phonetics</p>
  <p class="practice">Learning words</p>
  <p class="practice">Listening</p>
  <p class="practice">Shadowing</p>
  
  <p class="practice">Writing</p>
  <p class="practice">Conversation</p>
  <h3 class="subject"> Typing <span class="subject-span">EN__ UK__</span></h3>
  <h3 class="subject">IT</h3>
  <p class="practice">Vanilla</p>
  <p class="practice">React</p>
  <p class="practice">Node</p>
  <p class="practice">NextJS</p>
  <p class="practice bold">Projects</p>

`;

oneBetlyck.forEach((el) => {
  el.innerHTML = content;
});
