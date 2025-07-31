// src/app/javascript/page.tsx
import fs from "fs";
import path from "path";
// import Link from "next/link";

export default async function JavaScriptPage() {
  const dirPath = path.join(process.cwd(), "public", "vanilla", "javascript");
  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".html"));

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">JavaScript Tasks</h1>
      <ul className="list-disc list-inside space-y-1">
        {files.map((file) => (
          <li key={file}>
            <a
              href={`/vanilla/javascript/${file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {file}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

