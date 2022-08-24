module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint/eslint-plugin'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',

    // 其余配置项自行添加
  },
};
