/**
 * The primes worker module
 * This module is responsible for counting primes off the main thread.
 */

self.onmessage = (event: MessageEvent<number>) => {
    let count = 0;

    for (let n = 2; n <= event.data; n++) {
        let prime = true;

        for (let d = 2; d * d <= n; d++) {
            if (n % d === 0) {
                prime = false;
                break;
            }
        }

        if (prime) {
            count++;
        }
    }

    self.postMessage(count);
};
