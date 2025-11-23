
    const form = document.getElementById("myForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // не перезавантажуємо сторінку
      const formData = new FormData(form);

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      alert("Сервер відповів: " + JSON.stringify(result));
    });
