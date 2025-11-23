import Menu from "@/components/Menu/Menu";
import css from "./page.module.css";
import nodejsMenuData from "@/data/menu/nodejs";

export default function NodeJs() {
  return (
    <div className={css.databasePage}>
      <Menu data={nodejsMenuData} />
    </div>
  );
}
