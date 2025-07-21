'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: 'dbbeg558', // 🔥 Hardcoded value here
  dataset: 'production', // 🔥 And here
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2023-10-01'}),
  ],
})
