/**
 * The device performance score module
 * This module is responsible for a lightweight CPU benchmark and cached performance score of the project.
 */

const SLICE_MS = 12;
const SLICE_COUNT = 6;
const WARMUP_ITERATIONS = 20000;
const INNER_LOOP_ITERATIONS = 2000;
const BUFFER_LENGTH = 4096;

let cachedScore: Promise<number> | null = null;

type NavigatorWithMemory = Navigator & {
    deviceMemory?: number;
};

/**
 * Converts benchmark totals and hardware hints into the integer score scale.
 *
 * @param totalOps Operations counted across all slices
 * @param totalTime Elapsed milliseconds across slices
 * @param cores `navigator.hardwareConcurrency` (fallback 4)
 * @param memoryGb `navigator.deviceMemory` in GB (fallback 4)
 * @returns Integer score (approx. 0–300 weak, 300–700 mid, 700–1200 good, 1200+ fast)
 */
export function finalizeDevicePerformanceScore(
    totalOps: number,
    totalTime: number,
    cores: number,
    memoryGb: number
): number {
    const opsPerMs = totalOps / Math.max(totalTime, 1);
    let score = opsPerMs / 10;

    score *= 0.85 + Math.min(cores, 16) / 40 + Math.min(memoryGb, 8) / 80;

    return Math.max(1, Math.round(score));
}

function readHardwareConcurrency(): number {
    if (typeof navigator === "undefined") {
        return 4;
    }

    const cores = navigator.hardwareConcurrency;

    if (!cores || cores < 1) {
        return 4;
    }

    return cores;
}

function readDeviceMemoryGb(): number {
    if (typeof navigator === "undefined") {
        return 4;
    }

    const memory = (navigator as NavigatorWithMemory).deviceMemory;

    if (!memory || memory < 1) {
        return 4;
    }

    return memory;
}

function yieldToBrowser(): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, 0);
    });
}

/**
 * Runs a light benchmark (~100–150ms wall time) and returns an integer score.
 * Work is split into short slices so the main thread can breathe between them.
 * The result is cached in memory for the session.
 */
export function getDevicePerformanceScore(): Promise<number> {
    if (cachedScore) {
        return cachedScore;
    }

    if (typeof performance === "undefined") {
        cachedScore = Promise.resolve(1);

        return cachedScore;
    }

    cachedScore = (async () => {
        const now = () => performance.now();

        let sink = 0;

        for (let i = 0; i < WARMUP_ITERATIONS; i++) {
            sink += Math.sqrt(i) * Math.sin(i);
        }

        const buffer = new Float64Array(BUFFER_LENGTH);

        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = Math.random();
        }

        let totalOps = 0;
        let totalTime = 0;

        for (let slice = 0; slice < SLICE_COUNT; slice++) {
            const start = now();
            let ops = 0;

            while (now() - start < SLICE_MS) {
                for (let i = 0; i < INNER_LOOP_ITERATIONS; i++) {
                    const idx = (i * 31) & (BUFFER_LENGTH - 1);
                    const cell = buffer[idx] ?? 0;

                    sink +=
                        Math.sqrt(cell + i) * Math.sin(i) + Math.imul(i, 2654435761);
                    buffer[idx] = (cell * 1.0000001) % 1;
                }

                sink += (`x${ops}`).length;
                ops += INNER_LOOP_ITERATIONS;
            }

            totalOps += ops;
            totalTime += now() - start;
            await yieldToBrowser();
        }

        if (sink === Infinity) {
            console.debug(sink);
        }

        return finalizeDevicePerformanceScore(
            totalOps,
            totalTime,
            readHardwareConcurrency(),
            readDeviceMemoryGb()
        );
    })();

    return cachedScore;
}

/**
 * Clears the in-memory score cache (for tests).
 */
export function clearDevicePerformanceScoreCache(): void {
    cachedScore = null;
}
