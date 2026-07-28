import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { SparklesIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"
import { navGroups } from "@/config/nav"
import { useUiStore } from "@/store/uiStore"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUiStore()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 76 : 248 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="glass sticky top-0 z-30 hidden h-svh shrink-0 flex-col border-r md:flex"
    >
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-white shadow-lg shadow-primary/30">
          <SparklesIcon className="h-5 w-5" />
        </div>
        {!sidebarCollapsed && (
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            Agentic Banking
          </span>
        )}
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!sidebarCollapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gradient-to-r from-primary/15 to-chart-2/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )
                  }
                  title={item.label}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="flex h-11 items-center justify-center gap-2 border-t text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronDoubleLeftIcon className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
        {!sidebarCollapsed && <span className="text-xs">Collapse</span>}
      </button>
    </motion.aside>
  )
}
