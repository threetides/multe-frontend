import { Button } from "@/components/Button/Button"
import "./Examples.css"

export const Disabled = (
  <div className="button-examples">
    <Button disabled>Solid</Button>
    <Button variant="outline" disabled>
      Outline
    </Button>
    <Button variant="ghost" disabled>
      Ghost
    </Button>
  </div>
)