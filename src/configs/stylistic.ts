import { interopDefault } from '../utils'
import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'
import { pluginTheWlabs } from '../plugins'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export interface StylisticOptions extends StylisticConfig, OptionsOverrides {
  lessOpinionated?: boolean
}

export async function stylistic(
  options: StylisticOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    lessOpinionated = false,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'thewlabs/stylistic/rules',
      plugins: {
        style: pluginStylistic,
        thewlabs: pluginTheWlabs,
      },
      rules: {
        ...config.rules,

        'thewlabs/consistent-list-newline': 'error',

        ...(lessOpinionated
          ? {
              curly: ['error', 'all'],
            }
          : {
              'thewlabs/curly': 'error',
              'thewlabs/top-level-function': 'error',
            }
        ),

        ...overrides,
      },
    },
  ]
}
