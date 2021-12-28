module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/contracts/",
        "apps/web/",
        "apps/backend",
        "packages/config/",
        "packages/tsconfig/",
      ],
    },
  },
};
