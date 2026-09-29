"use client";

import Link from "next/link";

// export default function ComponentsPage() {

//   return (
//     <div>
//       <Link href="/react/">Go to The Home →</Link>
//       <h1>Сonstruction site</h1>

//       <p>I will build here.</p>

//       <h2>Here we only build floors, walls and ceilings</h2>

//     </div>
//   );
// }
export default function Home() {
  const cards = Array.from({ length: 60 }, (_, i) => i + 1); // 12 x 5

  // індекси карток, які повинні бути вузькими
  const narrowCards = [2, 5, 8, 11];

  return (
    <>
      <Link href="/react/">Go to The Home →</Link>

      <h1>Сonstruction site</h1>
      <p>I will build here.</p>
      <h2>Here we only build floors, walls and ceilings</h2>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          gap: 0,
          width: "100%",
        }}
      >
        {cards.map((card, index) => {
          const isNarrow = narrowCards.includes((index % 12) + 1);

          return (
            <div
              key={card}
              style={{
                background: "#ddd",
                height: "120px",
                border: "1px solid #999",
                gridColumn: isNarrow ? "span 1" : "span 2",
              }}
            >
              Card {card}
            </div>
          );
        })}
      </div>
    </>
  );
}
