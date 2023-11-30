import Link from "next/link";
import { useRouter } from "next/router";
import SideBarItem from "./SidebarItem";
import { ISidebarItem } from "./types";

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/",
      title: "Homepage",
    },
    {
      href: "/clientes",
      title: "Clientes",
    },
    {
      href: "/usuarios",
      title: "Usuarios",
    },
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/soporte",
      title: "Soporte",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-sky-500 sticky top-0 h-14 flex  justify-between p-4 items-center font-semibold uppercase text-white">
        <h1>PSA</h1>
        <ul className="flex">
          <li>
            <Link className="hover:bg-sky-700 px-4 py-4" href="/proyectos">
              PROYECTOS
            </Link>
          </li>
          <li>
            <Link className="hover:bg-sky-700 px-4 py-4" href="/soporte">
              SOPORTE
            </Link>
          </li>
        </ul>
      </header>
      <div className="flex justify-center flex-1">
        {/*<aside className="bg-grey-100 w-full md:w-60">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.title} />
              ))}
            </ul>
          </nav>
        </aside>*/}
        <main className="flex-1 max-w-4xl flex justify-center py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
