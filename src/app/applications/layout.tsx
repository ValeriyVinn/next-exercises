import Menu from "@/components/Menu/Menu";
import appMenuData from "@/data/menu/app";
import css from "./layout.module.css";
import Link from "next/link";

export default function AppLayout({
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
          <Link href="/applications" className={css.backMenuItem}>
            APP
          </Link>
        </div>

        <Menu data={appMenuData} />
      </aside>

      <main className={css.content}>{children}</main>
    </div>
  );
}
