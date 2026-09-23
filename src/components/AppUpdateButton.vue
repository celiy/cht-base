<template>
    <span
        v-if="isElectron"

        v-tooltip="tooltip"
        class="inline-flex"
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
        return "Atualizações automáticas estão disponíveis apenas na versão instalada do aplicativo.";
    }

    const { status, message, currentVersion, availableVersion, percent } = project.update;

    switch (status) {
        case "checking":
            return "Consultando o servidor de atualizações. Aguarde um instante.";
        case "available":
            if (availableVersion) {
                return `Versão ${availableVersion} disponível. Clique para baixar a atualização.`;
            }

            return "Há uma atualização disponível. Clique para iniciar o download.";
        case "downloading":
            if (percent != null) {
                return `Baixando a atualização (${percent}% concluído). Não feche o aplicativo.`;
            }

            return message || "Baixando a atualização. Não feche o aplicativo.";
        case "downloaded":
            if (availableVersion) {
                return `Versão ${availableVersion} pronta para instalar. Clique para reiniciar o aplicativo.`;
            }

            return "A atualização foi baixada. Clique para reiniciar e instalar.";
        case "error":
            if (message) {
                return `${message} Clique para tentar novamente.`;
            }

            return "Não foi possível verificar ou baixar a atualização. Clique para tentar novamente.";
        case "not-available":
            if (currentVersion) {
                return `Você já está na versão mais recente (${currentVersion}).`;
            }

            return message || "Você já está na versão mais recente.";
        default:
            if (currentVersion) {
                return `Verificar se há uma nova versão do aplicativo. Versão instalada: ${currentVersion}.`;
            }

            return "Verificar se há uma nova versão do aplicativo.";
    }
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
