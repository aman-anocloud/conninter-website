import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/admin',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string || 'production',
  schema,
  plugins: [
    structureTool(),
  ],
})
