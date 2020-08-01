import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx"
import CMS from "netlify-cms-app"

CMS.registerWidget('mdx', MdxControl, MdxPreview);
