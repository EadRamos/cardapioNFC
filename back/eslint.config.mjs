import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    },
    env: {
      node: true,
    },
    rules: {
      'no-process-env': 'off',
    }
  },
  {
    languageOptions: { globals: globals.node }
  },
  pluginJs.configs.recommended,
];