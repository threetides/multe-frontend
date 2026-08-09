import { type ComponentProps, type SVGProps, type ComponentType } from "react"
import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu"
import "./NavigationMenu.css"

type IconType = ComponentType<SVGProps<SVGSVGElement>>

type LinkProps = ComponentProps<typeof BaseNavigationMenu.Link> & {
  icon?: IconType
}

// your own object — safe to mutate
const Root = ({
  orientation,
  className,
  ...props
}: ComponentProps<typeof BaseNavigationMenu.Root>) => {
  return (
    <BaseNavigationMenu.Root
      {...props}
      className={className ? `navigation-menu ${className}` : "navigation-menu"}
      data-orientation={orientation}
    />
  )
}

const List = ({ className, ...props }: ComponentProps<typeof BaseNavigationMenu.List>) => {
  return (
    <BaseNavigationMenu.List
      {...props}
      className={className ? `navigation-menu__list ${className}` : "navigation-menu__list"}
    />
  )
}

const Item = ({ className, ...props }: ComponentProps<typeof BaseNavigationMenu.Item>) => {
  return (
    <BaseNavigationMenu.Item
      {...props}
      className={className ? `navigation-menu__item ${className}` : "navigation-menu__item"}
    />
  )
}

const Link = ({ icon: Icon, className, children, ...props }: LinkProps) => {
  return (
    <BaseNavigationMenu.Link
      {...props}
      className={className ? `navigation-menu__link ${className}` : "navigation-menu__link"}
    >
      {Icon && <Icon className="navigation-menu__icon" />}
      {children}
    </BaseNavigationMenu.Link>
  )
}

export const NavigationMenu = Object.assign(Root, {
  List: List,
  Item: Item,
  Link: Link
})