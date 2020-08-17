import CMS from "netlify-cms-app"
import { MdxControl, setupPreview } from "netlify-cms-widget-mdx"
import PostPagePreview from "./preview-templates/post-page-preview-template"
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

// Register color picker widget
const WidgetColor = require('netlify-cms-widget-color/dist/es/color')
CMS.registerWidget('color', WidgetColor.default.Control)

// Add Previews
CMS.registerPreviewTemplate('post', withStyled(PostPagePreview))
CMS.registerPreviewTemplate('page', withStyled(PostPagePreview))

// Extend editor
CMS.registerEditorComponent(attentionEditorConfig)
CMS.registerEditorComponent(spoilerEditorConfig)

CMS.init()
