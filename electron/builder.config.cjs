/**
 * Default electron-builder skeleton.
 * The CLI (`scripts/electron.mjs`) writes a client-specific config to
 * `electron-dist/electron-builder.json` before packaging, including the app
 * version, the update feed and the bundled backend/node runtime.
 */
module.exports = {
    appId: "dev.cht.app",
    productName: "CHT",
    directories: {
        output: "release"
    },
    files: ["dist/**/*", "electron-dist/**/*", "package.json", "!node_modules/**/*"],
    extraMetadata: {
        main: "electron-dist/main.cjs"
    },
    linux: {
        target: ["AppImage", "deb", "dir"],
        category: "Utility"
    },
    win: {
        target: ["nsis"]
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true
    },
    mac: {
        target: ["dmg", "zip"]
    }
};
