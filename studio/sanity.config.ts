import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "polish-station-blog",
  title: "Polish Station Blog",

  // Fill these in after creating a project at sanity.io/manage (or run
  // `npx sanity init` from this folder and let the CLI fill them in for
  // you). See README.md for the full setup walkthrough.
  projectId: "REPLACE_WITH_PROJECT_ID",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
