import Menu from "@/components/Menu/Menu";
import reactMenuData from "@/data/menu/react";
import css from "./page.module.css";

export default function ReactPage() {
  return (
    <div className={css.databasePage}>
      <Menu data={reactMenuData} />
    </div>
  );
}
