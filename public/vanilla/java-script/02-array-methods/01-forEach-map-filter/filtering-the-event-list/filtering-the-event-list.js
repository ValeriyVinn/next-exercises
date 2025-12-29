  const events = [
    { title: "AI Conference", category: "tech" },
    { title: "Music Festival", category: "entertainment" },
    { title: "Frontend Meetup", category: "tech" },
  ];

  const techEvents = events.filter(event => event.category === "tech");

  const list = document.getElementById("eventsList");

  techEvents.forEach(event => {
    const li = document.createElement("li");
    li.textContent = event.title;
    list.appendChild(li);
  });