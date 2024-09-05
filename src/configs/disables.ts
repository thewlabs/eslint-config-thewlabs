import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { TypedFlatConfigItem } from '../types'

export async function disables(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      files: [`scripts/${GLOB_SRC}`],
      name: 'thewlabs/disables/scripts',
      rules: {
        'no-console': 'off',
        'ts/explicit-function-return-type': 'off',
        'unicorn/consistent-function-scoping': 'off',
      },
    },
    {
      files: [`cli/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      name: 'thewlabs/disables/cli',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'thewlabs/disables/bin',
      rules: {
        'thewlabs/no-import-dist': 'off',
        'thewlabs/no-import-node-modules-by-path': 'off',
      },
    },
    {
      files: ['**/*.d.?([cm])ts'],
      name: 'thewlabs/disables/dts',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.([tj])s?(x)'],
      name: 'thewlabs/disables/test',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'thewlabs/disables/cjs',
      rules: {
        'ts/no-require-imports': 'off',
      },
    },
  ]
}
