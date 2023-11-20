import Link from "next/link"
import { useRouter } from "next/router"
import { ISidebarItem } from "./types"
import { useState } from "react"

const SideBarItem = ({ href, title, children }: ISidebarItem) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  if (children && children.length > 0) {
    return (
      <li className="m-2">
        <button
          type="button"
          className="flex items-center w-full p-2 text-grey-200 transition duration-75 rounded-lg group hover:bg-amber-100 dark:text-white dark:hover:bg-amber-700"
          aria-controls={`dropdown-${title}`}
          data-collapse-toggle={`dropdown-${title}`}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`flex-1 ml-2 text-left whitespace-nowrap ${router.asPath === href && "text-red-50"}`}
            sidebar-toggle-item="true"
          >
            {title}
          </span>
          <svg
            sidebar-toggle-item="true"
            className={`w-6 h-6 ${open ? "" : "-rotate-90"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {open && (
          <ul id={`dropdown-${title}`} className={`${open ? "" : "hidden"} pl-4 py-2 space-y-2`}>
            {children.map((child) => (
              <SideBarItem {...child} href={`${href}${child.href}`} key={`${href}${child.href}`} />
            ))}
          </ul>
        )}
      </li>
    )
  }

  return (
    <li className="m-2" key={title}>
      <Link href={href}>
        <div
          className={`flex items-center w-full p-2 transition duration-75 rounded-lg group hover:bg-amber-100 dark:text-white dark:hover:bg-amber-700`}
        >
          <span className={`flex-1 ml-2 text-left whitespace-nowrap ${router.asPath === href && "font-bold"}`}>
            {title}
          </span>
        </div>
      </Link>
    </li>
  )
}

export default SideBarItem
