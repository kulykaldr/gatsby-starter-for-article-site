import { MdxControl, setupPreview } from "netlify-cms-widget-mdx"
import CMS from "netlify-cms-app"
import PostPreview from "./preview-templates/post-preview-template"
import withStyled from './with-styled'
import { components } from "../components/render-mdx"
import Spoiler from "../components/ui/spoiler"
import Attention from "../components/ui/attention"
import { attentionEditorConfig } from "./editor-components/attention-editor"
import { spoilerEditorConfig } from "./editor-components/spoiler-editor"

// Register mdx widget
CMS.registerWidget(
  'mdx',
  MdxControl,
  setupPreview({
      components,
      scope: {
        Spoiler,
        Attention,
      },
    }
  )
)

// Add Previews
CMS.registerPreviewTemplate('post', withStyled(PostPreview))

// Extend editor
CMS.registerEditorComponent(attentionEditorConfig)
CMS.registerEditorComponent(spoilerEditorConfig)

CMS.init()
