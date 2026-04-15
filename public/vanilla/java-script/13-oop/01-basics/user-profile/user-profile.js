const makeAdmin = document.getElementById("make-admin");
const makeUser = document.getElementById("make-user");
const showInfo = document.getElementById("show-info");

const statusBadge = document.querySelector(".status-badge");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

class User {
  constructor({ name, email, role }) {
    this.name = name;
    this.email = email;
    this.role = role;
  }

  changeRole(newRole) {
    this.role = newRole;
  }

  getInfo() {
    return {
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }

  isAdmin() {
    return this.role === "Admin";
  }
}

const diego = new User({
  name: "Diego",
  email: "diego@arg.com",
  role: "User",
});

// renderBadge(diego);
function renderBadge(user) {
  const { role } = user;

  statusBadge.textContent = role;
  statusBadge.classList.remove("admin", "user");

  if (user.isAdmin()) {
    statusBadge.classList.add("admin");
  } else {
    statusBadge.classList.add("user");
  }
}
function renderInfo(user) {
  const { email, name } = user;
  userName.textContent = name;
  userEmail.textContent = email;
}

renderUser(diego, { showBadge: true });
function renderUser(user, options = {}) {
  const { showBadge = true, showInfo = false } = options;

  if (showBadge) renderBadge(user);
  if (showInfo) renderInfo(user);
}

makeAdmin.addEventListener("click", () => {
  diego.changeRole("Admin");
  // renderBadge(diego);
  renderUser(diego, { showBadge: true });
});

makeUser.addEventListener("click", () => {
  diego.changeRole("User");
  // renderBadge(diego);
  renderUser(diego, { showBadge: true });
});

showInfo.addEventListener("click", () => {
  // renderInfo(diego);
  renderUser(diego, { showInfo: true });
});
