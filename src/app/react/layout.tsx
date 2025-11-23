import Menu from "@/components/Menu/Menu";
import reactMenuData from "@/data/menu/react";
import css from "./layout.module.css";

export default function ReactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.wrapper}>
      <aside className={css.sidebar}>
        <Menu data={reactMenuData} />
      </aside>

      <main className={css.content}>
        {children}
      </main>
    </div>
  );
}
