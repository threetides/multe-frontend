import { useState, type FC } from "react"
import logodark from "@/assets/logo-dark.svg"
import { useQuery } from "@tanstack/react-query"
import type { Item, Response } from "@/shared/types"
import { Dot, Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
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
  const [itemsOwned, setItemsOwned] = useState<number>(0)
  const [valueOwned, setValueOwned] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useQuery({
    queryKey: ["getItemsTopbarMobile"],
    queryFn: async () => {
      setLoading(true)
      setItemsOwned(0)
      setValueOwned(0)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/items`, {
        credentials: "include"
      })
      const data: Response<Item[]> = await res.json()

      for (const item of data.data) {
        if (item.status === "owned") setItemsOwned((prev) => prev + 1)
        if (item.status === "owned") setValueOwned((prev) => prev + item.price)
      }

      setLoading(false)
      return data
    }
  })

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
      {loading ? (
        <Skeleton>
          <div className="flex text-sm text-muted-foreground opacity-0">
            <p>100 owned</p>
            <Dot className="text-primary" />
            <p>1000 kr owned</p>
          </div>
        </Skeleton>
      ) : (
        <div className="flex text-sm text-muted-foreground">
          <p>{itemsOwned} owned</p>
          <Dot className="text-primary-foreground" />
          <p>{valueOwned} kr owned</p>
        </div>
      )}
    </nav>
  )
}