// eslint.config.js for ESLint 8.x (using flat config opt-in)
const jsPlugin = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  // Base JavaScript recommended rules
  jsPlugin.configs.recommended,
  
  {
    ignores: [
      'build/**',
      'node_modules/**',
      'static/**',
      '*.config.js',
    ],
  },
  
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Turn off strict rules from the original config
      'class-methods-use-this': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/iframe-has-title': 'off',
      'react/jsx-filename-extension': 'off',
      'no-unused-vars': 'off',
      'react/destructuring-assignment': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/no-multi-comp': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prefer-stateless-function': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off', // Not needed for React 17+
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];

