const attentionEditor = ({ type, text }) =>
  `<Attention type="${type || ""}">\n${text || ""}\n</Attention>`

export const attentionEditorConfig = {
  // Internal id of the component
  id: "attention",
  // Visible label
  label: "Attention",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: "Type",
      name: "type",
      widget: "select",
      options: ["quote", "check", "info", "warning", "danger"],
      default: "quote"
    },
    { label: "Text", name: "text", widget: "markdown" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Attention type="(.*)">([\w\W]*?)<\/Attention>/,
  // Function to extract data elements from the regexp match
  fromBlock: match => ({
      type: match[1],
      text: match[2].trim(),
  }),
  // Function to create a text block from an instance of this component
  toBlock: props => attentionEditor(props),
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: props => attentionEditor(props),
}
