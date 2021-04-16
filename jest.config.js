module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/src/**/*.spec.[jt]s?(x)',
  ],
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy',
  },
};
