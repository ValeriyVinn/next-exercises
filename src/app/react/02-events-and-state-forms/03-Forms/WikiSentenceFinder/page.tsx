// "use client";
// import React, { useState } from "react";
// import styles from "./page.module.css";

// type BookSnippet = {
//   text: string;
//   source: string;
// };

// // Функція для очищення snippet і обрізання до початку речення
// function normalizeSnippet(snippet: string, query: string): string {
//   // Прибираємо HTML-теги та спецсимволи
//   const cleanSnippet = snippet
//     .replace(/<[^>]+>/g, "")
//     .replace(/&nbsp;/g, " ")
//     .trim();

//   // Знаходимо позицію слова
//   const idx = cleanSnippet.toLowerCase().indexOf(query.toLowerCase());
//   if (idx === -1) return cleanSnippet;

//   // Шукаємо початок речення (крапка, ?, !)
//   let start = idx;
//   while (start > 0 && !/[.!?]/.test(cleanSnippet[start])) {
//     start--;
//   }

//   // Якщо знайшли розділовий знак, рухаємося ще на один символ вперед
//   if (/[.!?]/.test(cleanSnippet[start])) {
//     start++;
//   }

//   // Вирізаємо від початку речення
//   return cleanSnippet.slice(start).trim();
// }

// const BookExamples: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [snippets, setSnippets] = useState<BookSnippet[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchExamples = async () => {
//     if (!query) return;
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//           query
//         )}&maxResults=20&printType=books`
//       );
//       const data = await res.json();

//       const results: BookSnippet[] = data.items
//         ?.map((item: any) => {
//           const rawSnippet =
//             item.searchInfo?.textSnippet ||
//             item.volumeInfo?.description?.slice(0, 200);

//           return {
//             text: normalizeSnippet(rawSnippet || "", query),
//             source: item.volumeInfo?.title || "Unknown",
//           };
//         })
//         .filter((s: BookSnippet) => s.text)
//         .slice(0, 20);

//       setSnippets(results || []);
//     } catch (err) {
//       console.error("Error fetching examples:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2>Literary Examples Finder</h2>
//       <div className={styles.controls}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Enter word or phrase"
//           className={styles.input}
//         />
//         <button onClick={fetchExamples} className={styles.button}>
//           Search in Books
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}

//       <div className={styles.results}>
//         {snippets.length > 0 ? (
//           snippets.map((s, i) => (
//             <p key={i}>
//               <b>{s.source}:</b> {s.text}
//             </p>
//           ))
//         ) : (
//           !loading && <p>No examples found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookExamples;

"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

type Sentence = {
  text: string;
  source: string;
};

type WikiSearchResponse = {
  query: {
    search: { title: string }[];
  };
};

type WikiPageResponse = {
  query: {
    pages: {
      [key: string]: {
        extract: string;
        title: string;
      };
    };
  };
};

// Підсвічування слова у реченні, без використання JSX.Element у типі
function highlightWord(sentence: string, word: string): React.ReactNode {
  if (!word.trim()) return sentence;
  // Екрануємо спецсимволи у слові для RegExp
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Розбиваємо на частини, зберігаючи збіги завдяки захоплюючій групі
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = sentence.split(regex);
  // Частини з індексом 1,3,5,... — це збіги групи
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className={styles.highlight}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const WikiExamples: React.FC = () => {
  const [query, setQuery] = useState("");
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWikiExamples = async () => {
    if (!query) return;
    setLoading(true);
    try {
      // Пошук релевантних статей
      const searchRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          query
        )}&format=json&origin=*`
      );
      const searchData: WikiSearchResponse = await searchRes.json();

      const pageTitles: string[] = searchData.query.search
        .map((item) => item.title)
        .slice(0, 5);

      const results: Sentence[] = [];

      for (const title of pageTitles) {
        const pageRes = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&titles=${encodeURIComponent(
            title
          )}&format=json&origin=*`
        );
        const pageData: WikiPageResponse = await pageRes.json();
        const pages = pageData.query.pages;
        const page = pages[Object.keys(pages)[0]];
        const text: string = page.extract || "";

        // Розбиваємо текст на речення. Використовуємо позитивний lookbehind по розділових знаках.
        const sentenceList = text.split(/(?<=[.!?])\s+/);

        const matched = sentenceList
          .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
          .map((s) => ({ text: s.trim(), source: title }));

        results.push(...matched);
      }

      setSentences(results.slice(0, 20));
    } catch (err) {
      console.error("Error fetching Wikipedia examples:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Wikipedia Sentence Finder</h2>
      <div className={styles.controls}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter word or phrase"
          className={styles.input}
        />
        <button onClick={fetchWikiExamples} className={styles.button}>
          Search in Wikipedia
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className={styles.results}>
        {sentences.length > 0 ? (
          sentences.map((s, i) => (
            <p key={i}>
              <b>{s.source}:</b> {highlightWord(s.text, query)}
            </p>
          ))
        ) : (
          !loading && <p>No examples found.</p>
        )}
      </div>
    </div>
  );
};

export default WikiExamples;