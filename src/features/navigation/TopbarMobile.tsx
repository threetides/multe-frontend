import { type FC } from "react"
import logodark from "@/assets/logo-dark.svg"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"

export const TopbarMobile: FC = () => {
  return (
    <nav className="p-4 flex flex-col gap-2 items-start">
      <div className="flex items-center justify-between w-full">
        <Link to="/">
          <img src={logodark} alt="Multe logo" className="h-10" />
        </Link>
        <Drawer>
          <DrawerTrigger
            render={
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings />
              </Button>
            }
          />
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">{/* Content here */}</div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  )
}