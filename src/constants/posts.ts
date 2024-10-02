import PostProps from "../types/post";

const posts: PostProps[] = [
  {
    id: "1",
    title: "React",
    description:
      "React is a JavaScript library for building dynamic and interactive user interfaces. It focuses on component-based architecture, making it easier to manage complex UIs by breaking them down into smaller, reusable parts.",
    favorite: 12,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
    reading_time: 85,
    category: "Frontend",
    create_at: "2021-06-01",
    fk_user_id: "38ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "2",
    title: "Vue.js",
    description:
      "Vue.js is a progressive JavaScript framework for building user interfaces. Unlike monolithic frameworks, Vue is designed from the ground up to be incrementally adaptable. It also integrates well with modern tooling and libraries.",
    favorite: 28,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png",
    reading_time: 72,
    category: "Frontend",
    create_at: "2021-07-02",
    fk_user_id: "28ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "3",
    title: "Node.js",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enables developers to use JavaScript to write server-side code, making it possible to run full-stack applications using a single programming language.",
    favorite: 45,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    reading_time: 90,
    category: "Backend",
    create_at: "2021-08-03",
    fk_user_id: "48ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "4",
    title: "Angular",
    description:
      "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.",
    favorite: 33,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    reading_time: 80,
    category: "Frontend",
    create_at: "2021-09-04",
    fk_user_id: "58ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "5",
    title: "Python",
    description:
      "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Python is widely used for web development, automation, and data analysis.",
    favorite: 61,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    reading_time: 60,
    category: "Backend",
    create_at: "2021-10-05",
    fk_user_id: "68ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "6",
    title: "Django",
    description:
      "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development, so you can focus on writing your app.",
    favorite: 74,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg",
    reading_time: 95,
    category: "Backend",
    create_at: "2021-11-06",
    fk_user_id: "78ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "7",
    title: "GraphQL",
    description:
      "GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with your existing data. It provides a more efficient, powerful, and flexible alternative to REST.",
    favorite: 27,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
    reading_time: 75,
    category: "API",
    create_at: "2021-12-07",
    fk_user_id: "88ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "8",
    title: "TypeScript",
    description:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It is a syntactical superset of JavaScript, and adds optional static typing to the language. It is designed for the development of large applications.",
    favorite: 53,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    reading_time: 65,
    category: "Frontend",
    create_at: "2021-12-08",
    fk_user_id: "98ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "9",
    title: "Next.js",
    description:
      "Next.js is a React framework that enables functionality such as server-side rendering and static site generation. It simplifies building web applications with features like file-based routing, API routes, and much more.",
    favorite: 48,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
    reading_time: 92,
    category: "Fullstack",
    create_at: "2021-12-09",
    fk_user_id: "18ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
  {
    id: "10",
    title: "Flutter",
    description:
      "Flutter is an open-source UI software development kit created by Google. It is used to develop cross platform applications for Android, iOS, Linux, Mac, Windows, Google Fuchsia, and the web from a single codebase.",
    favorite: 64,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png",
    reading_time: 70,
    category: "Mobile",
    create_at: "2021-12-10",
    fk_user_id: "28ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
  },
];

export default posts;
