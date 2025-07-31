import React from "react";
import Link from "next/link";

type Task = {
  title: string;
  path: string;
};

type Child = {
  title: string;
  path?: string;
  tasks?: Task[];
  children?: Child[];
};

type Section = {
  title: string;
  path?: string;
  children?: Child[];
};

type MenuProps = {
  data: Section[];
};

const Menu: React.FC<MenuProps> = ({ data }) => {
  return (
    <nav className="p-4 space-y-2">
      {data.map((section, i) => (
        <div key={i}>
          <h2 className="text-xl font-bold mb-1">{section.title}</h2>
          <div className="pl-4 space-y-1">
            {section.children?.map((child, j) => (
              <div key={j}>
                {child.path ? (
                  <Link href={child.path} className="text-blue-600 hover:underline">
                    {child.title}
                  </Link>
                ) : (
                  <p className="font-semibold">{child.title}</p>
                )}
                {/* Tasks */}
                {child.tasks && (
                  <ul className="pl-4 list-disc text-sm text-gray-700">
                    {child.tasks.map((task, k) => (
                      <li key={k}>
                        <Link href={task.path} className="hover:underline">
                          {task.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Nested children */}
                {child.children && (
                  <div className="pl-4">
                    {child.children.map((sub, l) => (
                      <div key={l}>
                        <p className="text-gray-800">{sub.title}</p>
                        {sub.tasks && (
                          <ul className="pl-4 list-disc text-sm">
                            {sub.tasks.map((t, m) => (
                              <li key={m}>
                                <Link href={t.path}>{t.title}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Menu;
