
import Link from "next/link";
import css from "./page.module.css";

const topics = [
  { slug: "html-css", label: "Html-Css" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "react", label: "React" },
  { slug: "redux", label: "Redux" },
  { slug: "react-native", label: "React-native" },
  { slug: "node-js", label: "Node.js" },
  { slug: "next-js", label: "Next.js" },
  { slug: "databases", label: "Databases" },
];

export default function HomePage() {
  return (
    <main className={css.main}>
      {/* <h1 className="text-3xl font-bold mb-4">Next Exercises</h1> */}
      <ul className={css.menuList}>
        {topics.map(({ slug, label }) => (
          <li key={slug} className={css.menuTitle}>
            <Link href={`/${slug}`} className={css.menuLink}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
   
    </main>
  );
}
