import { Accordion } from "@/components/Accordion/Accordion"
import "./Examples.css"

export const MultiplePanels = (
  <Accordion multiple>
    <Accordion.Item>
      <Accordion.Trigger>How do I reset my password?</Accordion.Trigger>
      <Accordion.Panel>
        Go to Settings → Security and click "Reset password". You'll get an email with a link valid
        for 15 minutes.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>Can I change my plan later?</Accordion.Trigger>
      <Accordion.Panel>
        Yes. Upgrades take effect immediately; downgrades apply at the start of your next billing
        cycle.
      </Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>Do you offer refunds?</Accordion.Trigger>
      <Accordion.Panel>
        Refunds are available within 14 days of purchase, no questions asked.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
)