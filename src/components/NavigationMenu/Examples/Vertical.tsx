import { NavigationMenu } from "@/components/NavigationMenu/NavigationMenu"
import { Menu, SquareMousePointer, SquarePlus, TextCursorInput } from "lucide-react"

export const Vertical = (
  <NavigationMenu orientation="vertical">
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={TextCursorInput} href="/components/input">
          Input
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={SquarePlus} href="/components/button">
          Button
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={Menu} href="/components/navigation-menu">
          Navigation menu
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={SquareMousePointer} href="/components/select">
          Select
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu>
)