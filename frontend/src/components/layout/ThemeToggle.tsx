import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { useThemeStore } from "@/store/themeStore"

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </Button>
  )
}
