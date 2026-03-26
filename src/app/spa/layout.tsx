import Menu from "@/components/Menu/Menu";
import reactMenuData from "@/data/menu/spa";
import css from "./layout.module.css";
import Link from "next/link";

export default function ReactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <div className={css.backMenuWrapper}>
          <Link href="/" className={css.backMenuItem}>
            Home
          </Link>
          <Link href="/spa" className={css.backMenuItem}>
            SPA
          </Link>
        </div>

        <Menu data={reactMenuData} />
      </aside>

      <main className={css.content}>{children}</main>
    </div>
  );
}
