// import css from "./page.module.css";
import Menu from "@/components/Menu/Menu";
import htmlCssMenuData from "@/data/menu/html-css";

export default function HtmlCss() {
  return (
    <main className="max-w-4xl mx-auto mt-10">
      <Menu data={htmlCssMenuData} />
    </main>
  );
}
