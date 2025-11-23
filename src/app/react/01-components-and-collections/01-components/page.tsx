"use client";

import Link from "next/link";

export default function ComponentsPage() {
  const fruits = ["Apple", "Banana", "Orange"];

  return (
    <div>
      <h1>Components — Demo Page</h1>

      <p>This is a simple test page to verify that your React section works correctly.</p>

      <h2>Example list rendered by a component:</h2>
      <ul>
        {fruits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Practice Tasks</h2>
      <ul>
        <li>
          <Link href="/react/01-components-and-collections/components/task-1">
            Go to Task 1 →
          </Link>
        </li>
      </ul>
    </div>
  );
}