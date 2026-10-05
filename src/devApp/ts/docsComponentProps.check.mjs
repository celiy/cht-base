/**
 * Check: docs prop table rows and slug → component name resolution.
 * Run: node cht-base/src/devApp/ts/docsComponentProps.check.mjs
 */
import assert from "node:assert/strict";
import {
    formatAcceptedValues,
    parseNamedStringUnions,
    parseStringUnionMembers,
    propCommentFromSource,
    propTypeArgFromSource,
    propsTableRows,
    resolveDocsComponentNames,
    toKebabName
} from "./docsComponentProps.ts";

assert.equal(toKebabName("ProgressBar"), "progress-bar");
assert.equal(toKebabName("QrCode"), "qr-code");

const names = ["Button", "Badge", "Input", "InputOTP", "Modal", "ProgressBar", "Tooltip", "Checkbox", "CheckboxSwitch", "BarChart", "WaveChart", "FormRenderer"];

assert.deepEqual(resolveDocsComponentNames("buttons", names), ["Button"]);
assert.deepEqual(resolveDocsComponentNames("badges", names), ["Badge"]);
assert.deepEqual(resolveDocsComponentNames("inputs", names), ["Input", "InputOTP"]);
assert.deepEqual(resolveDocsComponentNames("progressbar", names), ["ProgressBar"]);
assert.deepEqual(resolveDocsComponentNames("qr-code", ["QrCode"]), ["QrCode"]);
assert.deepEqual(resolveDocsComponentNames("drawer", names), ["Modal"]);
assert.deepEqual(resolveDocsComponentNames("custom-tooltip", names), ["Tooltip"]);
assert.deepEqual(resolveDocsComponentNames("tooltip", names), []);
assert.deepEqual(resolveDocsComponentNames("checkbox", names), ["Checkbox", "CheckboxSwitch"]);
assert.deepEqual(resolveDocsComponentNames("charts", names), ["BarChart", "WaveChart"]);
assert.deepEqual(resolveDocsComponentNames("form-renderer", names), ["FormRenderer"]);
assert.deepEqual(resolveDocsComponentNames("colors", names), []);

assert.deepEqual(
    propsTableRows({
        props: {
            label: { type: String, required: false },
            shape: { type: String, default: "square", required: false },
            headers: { type: Array, required: true },
            count: { type: [String, Number], default: 0 },
            items: { type: Array, default: () => ["a"] },
            onClick: { type: Function, default: () => {} }
        }
    }),
    [
        { name: "label", comment: "", type: "String", values: "—", default: "—", required: "não" },
        { name: "shape", comment: "", type: "String", values: "—", default: "\"square\"", required: "não" },
        { name: "headers", comment: "", type: "Array", values: "—", default: "—", required: "sim" },
        { name: "count", comment: "", type: "String | Number", values: "—", default: "0", required: "não" },
        { name: "items", comment: "", type: "Array", values: "—", default: "[\"a\"]", required: "não" },
        { name: "onClick", comment: "", type: "Function", values: "—", default: "Function", required: "não" }
    ]
);

assert.deepEqual(propsTableRows({ props: ["open", "label"] }), [
    { name: "open", comment: "", type: "—", values: "—", default: "—", required: "não" },
    { name: "label", comment: "", type: "—", values: "—", default: "—", required: "não" }
]);

assert.deepEqual(propsTableRows({ props: { title: String } }), [
    { name: "title", comment: "", type: "String", values: "—", default: "—", required: "não" }
]);

assert.deepEqual(propsTableRows({}), []);

const buttonSource = `
export type ButtonVariants =
| "primary"
| "default"
| "secondary";

export const ButtonProps = {
    label: {
        type: String,
        required: false
    },
    shape: {
        type: String as PropType<"rounded" | "square">,
        default: "square",
        required: false
    },
    variant: {
        type: String as PropType<ButtonVariants>,
        default: "default",
        required: false
    }
};
`;

assert.deepEqual(parseStringUnionMembers('"rounded" | "square"'), ["rounded", "square"]);
assert.deepEqual(parseNamedStringUnions(buttonSource).ButtonVariants, [
    "primary",
    "default",
    "secondary"
]);
assert.equal(propTypeArgFromSource(buttonSource, "shape"), '"rounded" | "square"');
assert.equal(propTypeArgFromSource(buttonSource, "variant"), "ButtonVariants");
assert.equal(propTypeArgFromSource(buttonSource, "label"), null);

const rows = propsTableRows(
    {
        props: {
            label: { type: String, required: false },
            shape: { type: String, default: "square", required: false },
            variant: { type: String, default: "default", required: false }
        }
    },
    buttonSource
);

assert.equal(rows.find((row) => row.name === "shape")?.values, '"rounded" | "square"');
assert.equal(
    rows.find((row) => row.name === "variant")?.values,
    '"primary" | "default" | "secondary"'
);
assert.equal(rows.find((row) => row.name === "label")?.values, "—");
assert.equal(
    formatAcceptedValues("ButtonVariants", { ButtonVariants: ["primary", "outline"] }),
    '"primary" | "outline"'
);

const inputType = `type: {
            type: String as PropType<
                | "cpf"
                | "email"
                | "text"
            >,
            required: true
        }`;

assert.equal(
    propTypeArgFromSource(`{ ${inputType} }`, "type")?.replace(/\s+/g, " ").trim(),
    '| "cpf" | "email" | "text"'
);
assert.deepEqual(parseStringUnionMembers('| "cpf" | "email" | "text"'), ["cpf", "email", "text"]);

const commentedSource = `
    /**
     * The label of the button
     * @param {string} unused
     * @returns {void}
     */
    label: {
        type: String
    },

    /**
     * The shape of the button
     */
    shape: {
        type: String
    }
`;

assert.equal(
    propCommentFromSource(commentedSource, "label"),
    "The label of the button"
);
assert.equal(propCommentFromSource(commentedSource, "shape"), "The shape of the button");
assert.equal(propCommentFromSource(commentedSource, "missing"), "");

const commentedRows = propsTableRows(
    {
        props: {
            label: { type: String },
            shape: { type: String }
        }
    },
    commentedSource
);

assert.equal(commentedRows.find((row) => row.name === "label")?.comment, "The label of the button");
assert.equal(commentedRows.find((row) => row.name === "shape")?.comment, "The shape of the button");

console.log("docsComponentProps.check.mjs: ok");
