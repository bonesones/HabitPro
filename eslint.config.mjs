import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import multilineSpacingPlugin from 'eslint-plugin-multiline-spacing';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
    plugins: {
      import: importPlugin,
      'multiline-spacing': multilineSpacingPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],

      'import/no-duplicates': 'error',

      'no-console': ['error', { allow: ['warn', 'error'] }],

      curly: 'error',

      'arrow-body-style': ['error', 'as-needed'],

      'multiline-spacing/multiline-padding': 'error',

      'import/order': [
        'error',

        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          pathGroups: [
            {
              pattern: '@/app/**',
              group: 'internal',
              position: 'before',
            },

            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },

            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'before',
            },

            {
              pattern: '../*/**',
              group: 'parent',
              position: 'after',
            },

            {
              pattern: './*/**',
              group: 'sibling',
              position: 'after',
            },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ['src/shared/generated/**/*.{js,ts}'], // Путь к файлам в папке generated
        rules: Object.fromEntries(
          Object.keys(require('eslint/conf/eslint-recommended')).map(rule => [
            rule,
            'off', // Отключаем все правила для этих файлов
          ]),
        ),
      },
    ],
  },
];

export default eslintConfig;
