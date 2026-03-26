Чек‑лист для стабільного білду Next.js на Vercel

1. Залежності

Завжди тримай next, react, react-dom на останніх patch/minor версіях (npm install next@latest).

Перевіряй package.json на старі або вразливі пакети.

Використовуй npm audit або pnpm audit для швидкої перевірки.

2. Environment Variables

Усі ключі (MONGODB_URI, NEXTAUTH_SECRET, API‑tokens) мають бути додані у Vercel → Project → Settings → Environment Variables.

Локально тримай .env.local, але не коміть його в git.

Перевіряй, щоб у коді не було throw new Error("MONGODB_URI is missing...") без fallback.

3. Route Handlers

Використовуй офіційну сигнатуру:

export async function GET(
  request: Request,
  context: { params: Record<string, string | string[]> }
) { ... }

Якщо роут ще не готовий — постав заглушку:

import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ message: "Not implemented yet" }, { status: 501 });
}

4. ESLint / TypeScript

Не залишай змінні типу any → оголошуй типи або використовуй unknown.

Якщо параметр у catch не використовується → назви його _error або прибери.

Використовуй globalThis замість (global as any).

5. Build & Deploy

Перед пушем роби локально:

npm run lint
npm run build

Перевіряй, щоб не було помилок типів (tsc --noEmit).

Якщо білд падає на Vercel → дивись логи, часто причина у відсутніх env‑змінних або у версії Next.js.