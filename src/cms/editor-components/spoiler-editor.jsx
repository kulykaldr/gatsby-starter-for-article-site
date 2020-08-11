const SpoilerEditor = ({ title, text }) =>
  `<Spoiler title="${title || ""}">\n${text || ""}\n</Spoiler>`

export const spoilerEditorConfig = {
  // Internal id of the component
  id: "spoiler",
  // Visible label
  label: "Spoiler",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: "Title",
      name: "title",
      widget: "string",
    },
    { label: "Text", name: "text", widget: "markdown" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Spoiler title="(.*)">([\w\W]*?)<\/Spoiler>/,
  // Function to extract data elements from the regexp match
  fromBlock: match => ({
    title: match[1],
    text: match[2].trim(),
  }),
  // Function to create a text block from an instance of this component
  toBlock: props => SpoilerEditor(props),
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: props => SpoilerEditor(props),
}
