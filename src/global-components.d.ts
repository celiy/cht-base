type DesignSystemComponents = {
    Accordion: typeof import("@design/components/Accordion.vue").default;
    Avatar: typeof import("@design/components/Avatar.vue").default;
    Badge: typeof import("@design/components/Badge.vue").default;
    Button: typeof import("@design/components/Button.vue").default;
    Card: typeof import("@design/components/Card.vue").default;
    Carousel: typeof import("@design/components/Carousel.vue").default;
    Checkbox: typeof import("@design/components/Checkbox.vue").default;
    CheckboxSwitch: typeof import("@design/components/CheckboxSwitch.vue").default;
    Dropdown: typeof import("@design/components/Dropdown.vue").default;
    Example: typeof import("@design/components/Example.vue").default;
    Image: typeof import("@design/components/Image.vue").default;
    Input: typeof import("@design/components/Input.vue").default;
    Item: typeof import("@design/components/Item.vue").default;
    Marker: typeof import("@design/components/Marker.vue").default;
    MediaUploader: typeof import("@design/components/MediaUploader.vue").default;
    Modal: typeof import("@design/components/Modal.vue").default;
    Option: typeof import("@design/components/Option.vue").default;
    Popover: typeof import("@design/components/Popover.vue").default;
    ProgressBar: typeof import("@design/components/ProgressBar.vue").default;
    QrCode: typeof import("@design/components/QrCode.vue").default;
    Radio: typeof import("@design/components/Radio.vue").default;
    Select: typeof import("@design/components/Select.vue").default;
    Skeleton: typeof import("@design/components/Skeleton.vue").default;
    Table: typeof import("@design/components/Table.vue").default;
    Tabs: typeof import("@design/components/Tabs.vue").default;
    Toast: typeof import("@design/components/Toast.vue").default;
    ViewportCenter: typeof import("@design/components/ViewportCenter.vue").default;
    BarChart: typeof import("@design/components/custom/charts/BarChart.vue").default;
    WaveChart: typeof import("@design/components/custom/charts/WaveChart.vue").default;
    Chat: typeof import("@design/components/custom/Chat.vue").default;
    ConfirmationModal: typeof import("@design/components/custom/ConfirmationModal.vue").default;
    ContextMenu: typeof import("@design/components/custom/ContextMenu.vue").default;
    CustomAvatar: typeof import("@design/components/custom/Avatar.vue").default;
    CustomSkeleton: typeof import("@design/components/custom/Skeleton.vue").default;
    Navigator: typeof import("@design/components/custom/Navigator.vue").default;
    Pagination: typeof import("@design/components/custom/Pagination.vue").default;
    Resizable: typeof import("@design/components/custom/Resizable.vue").default;
    Sidebar: typeof import("@design/components/custom/Sidebar.vue").default;
    Steps: typeof import("@design/components/custom/Steps.vue").default;
    TableCharts: typeof import("@design/components/custom/TableCharts.vue").default;
};

declare module "vue" {
    export interface GlobalComponents extends DesignSystemComponents {}
}

declare module "@vue/runtime-core" {
    export interface GlobalComponents extends DesignSystemComponents {}
}

export {};
