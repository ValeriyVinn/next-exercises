import Link from "next/link";
import css from "./page.module.css";

const topics = [
  { slug: "html-css", label: "Html-Css" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "libraries", label: "Libraries" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "react", label: "React" },
  { slug: "redux", label: "Redux" },
  { slug: "nodejs", label: "Node.js" },
  { slug: "nextjs", label: "Next.js" },
  { slug: "nestjs", label: "Nest.js" },
  { slug: "databases", label: "Databases" },
];

export default function HomePage() {
  return (
    <main className={css.main}>
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
