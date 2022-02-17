module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: __dirname + '/tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'simple-import-sort',
        'sonarjs',
        'unicorn',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unicorn/filename-case': ['error', { case: 'camelCase' }],
        'unicorn/no-null': 'off',
    },
}
