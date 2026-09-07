export interface ParsedVersionInfo {
    version?: string;
    versionCheckUrl?: string;
}

/**
 * Parses version file content supporting:
 * - Key-value lines: `version 1.0.0` and `versionCheckUrl https://...`
 * - JSON format: `{"version": "1.0.0", "versionCheckUrl": "..."}`
 * - Plain semver string: `1.0.0`
 */
export function parseVersionInfo(content: string): ParsedVersionInfo {
    if (!content || typeof content !== "string") {
        return {};
    }

    const trimmed = content.trim();

    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
            const parsed = JSON.parse(trimmed) as { version?: unknown; versionCheckUrl?: unknown };

            return {
                version: typeof parsed.version === "string" ? parsed.version.trim() : undefined,
                versionCheckUrl:
                    typeof parsed.versionCheckUrl === "string" ? parsed.versionCheckUrl.trim() : undefined
            };
        } catch {
            // Fallback to text parsing
        }
    }

    const result: ParsedVersionInfo = {};
    const lines = trimmed.split(/\r?\n/);

    for (const rawLine of lines) {
        const line = rawLine.trim();

        if (!line || line.startsWith("#") || line.startsWith("//")) {
            continue;
        }

        const matchVersion = line.match(/^version[:\s=]+(.+)$/i);
        const matchUrl = line.match(/^versionCheckUrl[:\s=]+(.+)$/i);

        if (matchVersion && matchVersion[1]) {
            result.version = matchVersion[1].trim();
        } else if (matchUrl && matchUrl[1]) {
            result.versionCheckUrl = matchUrl[1].trim();
        } else if (!result.version && /^\d+(\.\d+)+/.test(line)) {
            result.version = line.trim();
        }
    }

    return result;
}

/**
 * Normalizes GitHub web URLs to raw.githubusercontent.com for CORS and direct text fetching.
 */
export function normalizeCheckUrl(url: string): string {
    if (!url) {
        return "";
    }

    const trimmed = url.trim();
    const githubBlobRegex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/i;
    const match = trimmed.match(githubBlobRegex);

    if (match && match[1] && match[2] && match[3]) {
        return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${match[3]}`;
    }

    return trimmed;
}

/**
 * Compares two semantic version strings.
 * Returns:
 *   1 if v1 > v2
 *  -1 if v1 < v2
 *   0 if v1 === v2
 */
export function compareSemver(v1: string, v2: string): number {
    const clean = (v: string) => v.trim().replace(/^v/i, "");
    const parts1 = clean(v1).split(".").map((p) => parseInt(p, 10) || 0);
    const parts2 = clean(v2).split(".").map((p) => parseInt(p, 10) || 0);
    const maxLength = Math.max(parts1.length, parts2.length);

    for (let i = 0; i < maxLength; i++) {
        const num1 = parts1[i] ?? 0;
        const num2 = parts2[i] ?? 0;

        if (num1 > num2) {
            return 1;
        }

        if (num1 < num2) {
            return -1;
        }
    }

    return 0;
}
