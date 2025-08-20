// import menu from "/public/data/menu/html-css.json" assert { type: "json" };

// const container = document.getElementById("menu-container");

// function createLink(title, path) {
//   const link = document.createElement("a");
//   link.textContent = title;
//   link.href = path || "#";
//   if (!path) link.style.opacity = "0.5";
//   return link;
// }

// function renderMenu(data) {
//   const ol = document.createElement("ol");

//   data.forEach((topic) => {
//     const li = document.createElement("li");
//     const topicTitle = document.createElement("div");
//     topicTitle.textContent = topic.title;
//     topicTitle.classList.add("topic-title");
//     li.appendChild(topicTitle);

//     if (topic.children && topic.children.length > 0) {
//       const ul = document.createElement("ul");

//       topic.children.forEach((sub) => {
//         const subLi = document.createElement("li");
//         const subTitle = document.createElement("div");
//         subTitle.classList.add("subtopic-title");

//         if (sub.path) {
//           const link = createLink(sub.title, sub.path);
//           subTitle.appendChild(link);
//         } else {
//           subTitle.textContent = sub.title;
//         }

//         subLi.appendChild(subTitle);

//         if (sub.tasks && sub.tasks.length > 0) {
//           const taskList = document.createElement("ul");
//           sub.tasks.forEach((task) => {
//             const taskLi = document.createElement("li");
//             const link = createLink(task.title, task.path);
//             taskLi.appendChild(link);
//             taskList.appendChild(taskLi);
//           });
//           subLi.appendChild(taskList);
//         }

//         ul.appendChild(subLi);
//       });

//       li.appendChild(ul);
//     }

//     ol.appendChild(li);
//   });

//   return ol;
// }

// container.appendChild(renderMenu(menu));
// --------------------------------------------------------------------------------
// export async function loadMenu(section = "html-css") {
//   try {
//     const res = await fetch(`http://localhost:5000/api/menu/${section}`);
//     const data = await res.json();
//     renderMenu(data);
//   } catch (error) {
//     console.error("Menu fetch error:", error);
//   }
// }

// function renderMenu(menuData) {
//   const container = document.getElementById("menu-container");
//   if (!container || !Array.isArray(menuData)) {
//     console.error("Invalid menu data:", menuData);
//     return;
//   }

//   const menuHTML = `<nav class="menu">
//     <ol class="menu-list">
//       ${menuData
//         .map(
//           (group) => `
//         <li class="menu-group">
//           <span class="menu-title">${group.title}</span>
//           ${
//             group.children && group.children.length > 0
//               ? `
//             <ul class="submenu">
//               ${group.children
//                 .map(
//                   (child) => `
//                 <li class="submenu-item">
//                   ${
//                     child.path
//                       ? `<a href="${child.path}" class="submenu-link">${child.title}</a>`
//                       : `<span class="submenu-title">${child.title}</span>`
//                   }
//                   ${
//                     child.tasks && child.tasks.length > 0
//                       ? `
//                     <ul class="task-list">
//                       ${child.tasks
//                         .map(
//                           (task) => `
//                         <li class="task-item">
//                           <a href="${task.path || "#"}" class="task-link">${
//                             task.title
//                           }</a>
//                         </li>
//                       `
//                         )
//                         .join("")}
//                     </ul>
//                   `
//                       : ""
//                   }
//                 </li>
//               `
//                 )
//                 .join("")}
//             </ul>
//           `
//               : ""
//           }
//         </li>
//       `
//         )
//         .join("")}
//     </ol>
//   </nav>`;

//   container.innerHTML = menuHTML;
// }

export async function loadMenu(section = "html-css") {
  const LOCAL_API_URL = "http://localhost:5000/api/menu";
  const REMOTE_API_URL = "https://exercises-backend.onrender.com/api/menu";
  const isLocalhost =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const API_URL = `${isLocalhost ? LOCAL_API_URL : REMOTE_API_URL}/${section}`;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderMenu(data);
  } catch (error) {
    console.error("Menu fetch error:", error);
  }
}

function renderMenu(menuData) {
  const container = document.getElementById("menu-container");
  if (!container || !Array.isArray(menuData)) {
    console.error("Invalid menu data:", menuData);
    return;
  }

  const menuHTML = `<nav class="menu">
    <ol class="menu-list">
      ${menuData
        .map(
          (group) => `
        <li class="menu-group">
          <span class="menu-title">${group.title}</span>
          ${
            group.children && group.children.length > 0
              ? `
            <ul class="submenu">
              ${group.children
                .map(
                  (child) => `
                <li class="submenu-item">
                  ${
                    child.path
                      ? `<a href="${child.path}" class="submenu-link">${child.title}</a>`
                      : `<span class="submenu-title">${child.title}</span>`
                  }
                  ${
                    child.tasks && child.tasks.length > 0
                      ? `
                    <ul class="task-list">
                      ${child.tasks
                        .map(
                          (task) => `
                        <li class="task-item">
                          <a href="${task.path || "#"}" class="task-link">${
                            task.title
                          }</a>
                        </li>
                      `
                        )
                        .join("")}
                    </ul>
                  `
                      : ""
                  }
                </li>
              `
                )
                .join("")}
            </ul>
          `
              : ""
          }
        </li>
      `
        )
        .join("")}
    </ol>
  </nav>`;

  container.innerHTML = menuHTML;
}
