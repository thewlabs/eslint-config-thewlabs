import type { OptionsStylistic, TypedFlatConfigItem } from '../types'
import { pluginImport, pluginTheWlabs } from '../plugins'

export async function imports(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const { stylistic = true } = options

  return [
    {
      name: 'thewlabs/imports/rules',
      plugins: {
        import: pluginImport,
        thewlabs: pluginTheWlabs,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',

        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',
        'thewlabs/import-dedupe': 'error',
        'thewlabs/no-import-dist': 'error',
        'thewlabs/no-import-node-modules-by-path': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
