module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/contracts/",
        "apps/web/",
        "packages/config/",
        "packages/tsconfig/",
      ],
    },
  },
};
