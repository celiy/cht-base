import { compareSemver, normalizeCheckUrl, parseVersionInfo } from "./versionUtils";

export interface VersionCheckOptions {
    currentVersion?: string;
    checkUrl?: string;
    onWarn?: (message: string) => void;
    onReload?: (targetUrl: string) => void;
}

/**
 * Checks the running app version against the remote deploy version.
 * If the current app version is outdated, triggers a page reload with `?ver=<remoteVersion>`.
 */
export async function checkAppVersion(options: VersionCheckOptions = {}): Promise<void> {
    if (typeof window === "undefined") {
        return;
    }

    const currentVersion = options.currentVersion
        || import.meta.env.VITE_APP_VERSION
        || "1.0.0";

    const configuredCheckUrl = options.checkUrl
        || import.meta.env.VITE_VERSION_CHECK_URL
        || "";

    const onWarn = options.onWarn || ((msg: string) => console.warn(msg));

    // 1. Inspect the `ver` parameter in the current URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const urlVer = urlParams.get("ver");

    if (urlVer) {
        const comp = compareSemver(currentVersion, urlVer);

        if (comp < 0) {
            onWarn(
                `[VersionCheck] A versão atual do site (${currentVersion}) ainda é menor que a versão esperada na URL (${urlVer}) após o reload.`
            );
        }
    }

    if (!configuredCheckUrl) {
        return;
    }

    // 2. Fetch the remote version file
    const targetUrl = normalizeCheckUrl(configuredCheckUrl);
    const fetchUrl = `${targetUrl}${targetUrl.includes("?") ? "&" : "?"}_t=${Date.now()}`;

    try {
        const response = await fetch(fetchUrl, {
            cache: "no-store",
            headers: {
                Accept: "text/plain, application/json, */*"
            }
        });

        if (!response.ok) {
            return;
        }

        const text = await response.text();
        const remoteInfo = parseVersionInfo(text);
        const remoteVersion = remoteInfo.version;

        if (!remoteVersion) {
            return;
        }

        // 3. Compare current version against remote version
        const comp = compareSemver(currentVersion, remoteVersion);

        if (comp < 0) {
            // Avoid reload loops if the URL already specifies this remote version
            if (urlVer && compareSemver(urlVer, remoteVersion) === 0) {
                return;
            }

            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.set("ver", remoteVersion);

            const destination = nextUrl.toString();

            if (options.onReload) {
                options.onReload(destination);
            } else {
                window.location.href = destination;
            }
        }
    } catch (err) {
        console.warn("[VersionCheck] Falha ao verificar a versão remota:", err);
    }
}
