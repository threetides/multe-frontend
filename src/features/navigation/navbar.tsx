import { type FC } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { isTheme, useTheme } from "@/components/theme-provider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Multe } from "@/assets/multe"

export const Navbar: FC = () => {
  const { theme, setTheme } = useTheme()

  const handleChange = (value: string | undefined) => {
    if (value && isTheme(value)) {
      setTheme(value)
    }
  }

  return (
    <nav className="border-b border-sidebar">
      <div className="flex items-center p-6 justify-between max-w-5xl m-auto">
        <div className="flex items-center gap-2">
          <Multe aria-hidden="true" className="h-8 w-8" />
          <span className="text-xl">Multe</span>
        </div>
        <ToggleGroup
          variant="outline"
          value={[theme]}
          onValueChange={(values) => handleChange(values[0])}
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <ToggleGroupItem value="light" aria-label="Toggle light">
                  <Sun />
                </ToggleGroupItem>
              }
            />
            <TooltipContent sideOffset={8}>Light mode</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToggleGroupItem value="dark" aria-label="Toggle dark">
                  <Moon />
                </ToggleGroupItem>
              }
            />
            <TooltipContent sideOffset={8}>Dark mode</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToggleGroupItem value="system" aria-label="Match system">
                  <Monitor />
                </ToggleGroupItem>
              }
            />
            <TooltipContent sideOffset={8}>Match system</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
    </nav>
  )
}
