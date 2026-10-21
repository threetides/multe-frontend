import { type FC } from "react"
import { Lottie } from "lottie-react"
import { Navbar } from "@/features/navigation/navbar"
import { Footer } from "@/features/navigation/footer"
import slothSleeping from "@/assets/sloth-sleeping.json"
import { Separator } from "@/components/ui/separator"

export const App: FC = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <Navbar />
      <main className="flex flex-col gap-10 mt-10 max-w-5xl m-auto p-6">
        <Lottie src={slothSleeping} autoplay loop className="aspect-square w-full max-w-md" />
      </main>
      <Separator />
      <Footer />
    </div>
  )
}
