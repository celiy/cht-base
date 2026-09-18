<template>
    <span
        v-if="isElectron"

        class="inline-flex"
        :title="tooltip"
    >
        <Button
            :disabled="isDisabled"
            :variant="variant"
            :left-icon="icon"
            :label="label"
            size="small"
            content-position="start"

            @click="onClick"
        />
    </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "@design/components/Button.vue";
import { project, projectActions } from "@base/project";
import type { ButtonVariants } from "@shared/constants/ButtonTypes";

const isElectron = computed(() => project.electron.isElectron);

const isDisabled = computed(() => {
    const state = project.update.status;

    return (
        !project.update.supported ||
        state === "checking" ||
        state === "downloading" ||
        state === "not-available"
    );
});

const icon = computed(() => {
    switch (project.update.status) {
        case "checking":
        case "downloading":
            return "fa-spinner fa-spin";
        case "available":
            return "fa-circle-down";
        case "downloaded":
            return "fa-rotate-right";
        case "error":
            return "fa-triangle-exclamation";
        case "not-available":
            return "fa-circle-check";
        default:
            return "fa-rotate";
    }
});

const variant = computed<ButtonVariants>(() => {
    switch (project.update.status) {
        case "available":
            return "primary";
        case "downloaded":
            return "success";
        case "error":
            return "bordered";
        default:
            return "transparent";
    }
});

const label = computed(() => {
    const { status, availableVersion, percent } = project.update;

    switch (status) {
        case "checking":
            return "Verificando...";
        case "available":
            return `Atualizar para ${availableVersion}`;
        case "downloading":
            return `Baixando ${percent ?? 0}%`;
        case "downloaded":
            return "Reiniciar e instalar";
        case "error":
            return "Tentar novamente";
        case "not-available":
            return "Atualizado";
        default:
            return "Verificar atualizações";
    }
});

const tooltip = computed(() => {
    if (!project.update.supported) {
        return "Disponível apenas na versão instalada.";
    }

    return project.update.message || "Verificar se há uma nova versão do aplicativo.";
});

function onClick() {
    const { status } = project.update;

    if (status === "available") {
        void projectActions.downloadUpdate();

        return;
    }

    if (status === "downloaded") {
        void projectActions.installUpdate();

        return;
    }

    void projectActions.checkForUpdates();
}
</script>
