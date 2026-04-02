//  @ts-check

import js from '@eslint/js'
import { tanstackConfig } from '@tanstack/eslint-config'
import reactPlugin from 'eslint-plugin-react'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export default [
  ...tanstackConfig,
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: '19.2.0',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'sort-imports': 'off',

      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      'no-console': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',

      'no-undef': 'off',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js', '.yarn', '.pnp.cjs'],
  },
]
