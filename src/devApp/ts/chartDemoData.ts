/**
 * The chart demo data module
 * This module is responsible for the sample series shown on the chart docs pages of the project.
 */

import type { ChartItem, ChartSeries } from "@design/components/custom/charts/chartModel";

const MONTHS = [0, 1, 2, 3, 4, 5].map((month) => new Date(2024, month, 1));

/**
 * One value per month, January to June 2024.
 * @param values Six values
 * @returns Dated items
 */
function monthly(values: number[]): ChartItem[] {
    return MONTHS.map((date, index) => ({ date, value: values[index] ?? 0 }));
}

export const desktopSeries: ChartSeries = {
    label: "Desktop",
    color: "chart-2",
    items: monthly([186, 305, 237, 73, 209, 214])
};

export const mobileSeries: ChartSeries = {
    label: "Mobile",
    color: "chart-3",
    items: monthly([80, 200, 120, 190, 130, 140])
};

export const otherSeries: ChartSeries = {
    label: "Other",
    color: "chart-5",
    items: monthly([45, 100, 150, 50, 100, 160])
};

/** Visitors per browser, each bar with its own palette color. */
export const browserSeries: ChartSeries = {
    label: "Visitantes",
    items: [
        { group: "Chrome", value: 275, color: "chart-1" },
        { group: "Safari", value: 200, color: "chart-2" },
        { group: "Firefox", value: 187, color: "chart-3", highlight: true },
        { group: "Edge", value: 173, color: "chart-4" },
        { group: "Other", value: 90, color: "chart-5" }
    ]
};

export const balanceSeries: ChartSeries = {
    label: "Saldo",
    displayAs: "currency",
    items: monthly([186, 205, -207, 173, -209, 214])
};

/**
 * Daily points over a few months, for the date filter.
 * @returns The series
 */
export function dailySeries(): ChartSeries {
    const start = new Date(2024, 2, 1);
    const items: ChartItem[] = [];

    for (let day = 0; day < 120; day += 3) {
        const date = new Date(start);

        date.setDate(start.getDate() + day);
        items.push({ date, value: Math.round(40 + 25 * Math.sin(day / 9) + day / 4) });
    }

    return { label: "Acessos", items };
}

/**
 * Same series with new random values (keeps dates/groups), to show the update animation.
 * @param series The series
 * @returns A shuffled copy
 */
export function randomize(series: ChartSeries): ChartSeries {
    return {
        ...series,
        items: series.items.map((item) => ({
            ...item,
            value: Math.round(item.value * (0.4 + Math.random() * 1.2))
        }))
    };
}
