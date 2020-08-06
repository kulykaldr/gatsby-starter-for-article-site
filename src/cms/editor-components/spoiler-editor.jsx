const spoilerEditor = ({ title, text }) =>
  `<Spoiler title="${title}">${text}</Spoiler>`

export const spoilerEditorConfig = {
  // Internal id of the component
  id: "spoiler",
  // Visible label
  label: "Spoiler",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { label: "Title", name: "title", widget: "string" },
    { label: "Text", name: "text", widget: "string" },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /<Spoiler title="(.*)">(.*)<\/Spoiler>/g,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      title: match[1],
      text: match[2],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function(props) {
    return spoilerEditor(props)
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(props) {
    return spoilerEditor(props)
  },
}
