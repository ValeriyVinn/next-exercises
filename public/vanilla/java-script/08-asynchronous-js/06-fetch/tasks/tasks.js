    const list = document.getElementById("task-list");

    // Load tasks
    document.getElementById("load").addEventListener("click", async () => {
      const res = await fetch("/api/tasks");
      const tasks = await res.json();

      list.innerHTML = tasks
        .map(
          t => `
          <li>
            <strong>${t.title}</strong><br>
            ${t.description}<br>
            <small>ID: ${t._id}</small><br><br>
            <button onclick="deleteTask('${t._id}')">Delete</button>
            <button onclick="toggleTask('${t._id}', ${t.completed})">
              Mark ${t.completed ? "Incomplete" : "Complete"}
            </button>
          </li>
        `
        )
        .join("");
    });

    // Create task
    document.getElementById("create").addEventListener("click", async () => {
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();

      if (!title) {
        alert("Title is required");
        return;
      }

      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      alert("Task created!");
    });

    // Delete task
    async function deleteTask(id) {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      alert("Task deleted!");
    }

    // Toggle complete status
    async function toggleTask(id, completed) {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
      });

      alert("Updated!");
    }