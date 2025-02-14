// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: "expo",
  ignorePatterns: ["/dist/*"],
  rules: {
    "@typescript-eslint/no-empty-object-type": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-console": "warn",
    "no-undef": "off",
    "no-debugger": "warn",
  },
};
