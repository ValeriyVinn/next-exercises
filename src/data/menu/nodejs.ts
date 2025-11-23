const nodejsMenuData = [
  {
    title: "Node.js Fundamentals",
    children: [
      {
        title: "Basics",
        tasks: [
          { title: "What is Node.js", path: "/nodejs/01-fundamentals/01-Basics/what-is" },
          { title: "Sync vs Async", path: "/practice/node/01-basics/task2" },
          { title: "Process & Global", path: "/practice/node/01-basics/task3" },
          { title: "npm and package.json", path: "/practice/node/01-basics/task4" },
        ],
      },
    ],
  },
  {
    title: "Modules",
    children: [
      {
        title: "CommonJS and ES Modules",
        tasks: [
          { title: "require / module.exports", path: "/practice/node/02-modules/task1" },
          { title: "import / export", path: "/practice/node/02-modules/task2" },
          { title: "Custom Modules", path: "/practice/node/02-modules/task3" },
        ],
      },
    ],
  },
  {
    title: "File System",
    children: [
      {
        title: "Working with Files",
        tasks: [
          { title: "Read / Write Files", path: "/practice/node/03-file-system/task1" },
          { title: "Async fs.promises", path: "/practice/node/03-file-system/task2" },
          { title: "Path and URL", path: "/practice/node/03-file-system/task3" },
          { title: "Logger Example", path: "/practice/node/03-file-system/task4" },
        ],
      },
    ],
  },
  {
    title: "Events and Streams",
    children: [
      {
        title: "EventEmitter",
        tasks: [
          { title: "Create Custom Events", path: "/practice/node/04-events-and-streams/task1" },
        ],
      },
      {
        title: "Streams",
        tasks: [
          { title: "Readable & Writable Streams", path: "/practice/node/04-events-and-streams/task2" },
          { title: "Pipe Example", path: "/practice/node/04-events-and-streams/task3" },
        ],
      },
    ],
  },
  {
    title: "HTTP Server",
    children: [
      {
        title: "Core HTTP Module",
        tasks: [
          { title: "Create Basic Server", path: "/practice/node/05-http-server/task1" },
          { title: "Routing", path: "/practice/node/05-http-server/task2" },
          { title: "POST and Body Parsing", path: "/practice/node/05-http-server/task3" },
          { title: "Mini REST Server", path: "/practice/node/05-http-server/task4" },
        ],
      },
    ],
  },
  {
    title: "Express.js",
    children: [
      {
        title: "Setup and Middleware",
        tasks: [
          { title: "Install Express", path: "/practice/node/06-express/task1" },
          { title: "Middleware Basics", path: "/practice/node/06-express/task2" },
        ],
      },
      {
        title: "Routing and Requests",
        tasks: [
          { title: "Routes and Params", path: "/practice/node/06-express/task3" },
          { title: "Mini Notes API", path: "/practice/node/06-express/task4" },
        ],
      },
    ],
  },
  {
    title: "REST API",
    children: [
      {
        title: "CRUD and MongoDB",
        tasks: [
          { title: "Connect Mongoose", path: "/practice/node/07-rest-api/task1" },
          { title: "CRUD Operations", path: "/practice/node/07-rest-api/task2" },
          { title: "Validation and Errors", path: "/practice/node/07-rest-api/task3" },
        ],
      },
    ],
  },
  {
    title: "Authentication",
    children: [
      {
        title: "JWT and bcrypt",
        tasks: [
          { title: "Register / Login API", path: "/practice/node/08-authentication/task1" },
          { title: "Auth Middleware", path: "/practice/node/08-authentication/task2" },
        ],
      },
    ],
  },
  {
    title: "File Upload",
    children: [
      {
        title: "Multer and Sharp",
        tasks: [
          { title: "File Upload Endpoint", path: "/practice/node/09-file-upload/task1" },
          { title: "Optimize Images", path: "/practice/node/09-file-upload/task2" },
        ],
      },
    ],
  },
  {
    title: "Mail and WebSockets",
    children: [
      {
        title: "Email Sending",
        tasks: [
          { title: "Nodemailer Setup", path: "/practice/node/10-mail-and-websockets/task1" },
          { title: "HTML Templates", path: "/practice/node/10-mail-and-websockets/task2" },
        ],
      },
      {
        title: "WebSockets",
        tasks: [
          { title: "Socket.io Basics", path: "/practice/node/10-mail-and-websockets/task3" },
          { title: "Real-time Chat", path: "/practice/node/10-mail-and-websockets/task4" },
        ],
      },
    ],
  },
  {
    title: "Additional Topics",
    children: [
      {
        title: "Advanced Tools",
        tasks: [
          { title: "Axios & Fetch", path: "/practice/node/11-additional/task1" },
          { title: "node-cron", path: "/practice/node/11-additional/task2" },
          { title: "Logging (Winston, Pino)", path: "/practice/node/11-additional/task3" },
          { title: "Project Structure (MVC)", path: "/practice/node/11-additional/task4" },
          { title: "Docker Setup", path: "/practice/node/11-additional/task5" },
        ],
      },
    ],
  },
];

export default nodejsMenuData;
