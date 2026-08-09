interface props {
  name: string
  description: string
  type: string
  fullType: string
  default?: string
}

interface dataAttributes {
  name: string
  description: string
}

interface api {
  name: string
  props: props[]
  dataAttributes: dataAttributes[]
}

const accordionAPI: api[] = [
  {
    name: "Accordion",
    props: [
      {
        name: "defaultValue",
        description:
          "The uncontrolled value of the item(s) that should be initially expanded. To render a controlled accordion, use the value prop instead.",
        type: "Value[]",
        fullType: "Value[] | undefined"
      }
    ],
    dataAttributes: [
      {
        name: "data-orientation",
        description: "Indicates the orientation of the accordion."
      }
    ]
  }
]

console.log(accordionAPI)