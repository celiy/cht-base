/**
 * Default electron-builder skeleton.
 * The CLI (`scripts/electron.mjs`) writes a client-specific config to
 * `electron-dist/electron-builder.json` before packaging.
 */
module.exports = {
    appId: "dev.cht.app",
    productName: "CHT",
    directories: {
        output: "release"
    },
    files: ["dist/**/*", "electron-dist/**/*", "package.json"],
    extraMetadata: {
        main: "electron-dist/main.cjs"
    },
    linux: {
        target: ["AppImage", "deb", "dir"],
        category: "Utility"
    },
    win: {
        target: ["nsis", "portable"]
    },
    mac: {
        target: ["dmg", "zip"]
    }
};
