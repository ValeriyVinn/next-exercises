
import Link from "next/link";


const topics = [
  { slug: "html-css", label: "HTML + CSS" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "react", label: "React" },
  { slug: "redux", label: "Redux" },
  { slug: "node-js", label: "Node.js" },
  { slug: "next-js", label: "Next.js" },
  { slug: "databases", label: "Databases" },
];

export default function HomePage() {
  return (
    <main className="p-8">
      {/* <h1 className="text-3xl font-bold mb-4">Next Exercises</h1> */}
      <ul className="space-y-2">
        {topics.map(({ slug, label }) => (
          <li key={slug}>
            <Link href={`/${slug}`} className="text-blue-600 hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
   
    </main>
  );
}
