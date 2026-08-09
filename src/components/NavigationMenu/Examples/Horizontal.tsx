import { NavigationMenu } from "@/components/NavigationMenu/NavigationMenu"
import { Menu, SquareMousePointer, SquarePlus, TextCursorInput } from "lucide-react"

export const Horizontal = (
  <NavigationMenu>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={TextCursorInput} href="input">
          Input
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={SquarePlus} href="button">
          Button
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={Menu} href="navigation-menu">
          Navigation menu
        </NavigationMenu.Link>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link icon={SquareMousePointer} href="select">
          Select
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu>
)