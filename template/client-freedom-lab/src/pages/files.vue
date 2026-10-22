<template>
    <main class="mx-auto flex max-w-3xl flex-col gap-4 p-6">
        <h1 class="text-2xl font-semibold">
            Arquivos locais
        </h1>

        <Card>
            <template #header>
                <h2 class="font-semibold">
                    Navegador: input e File System Access API
                </h2>
            </template>

            <template #body>
                <div class="flex flex-wrap items-center gap-2">
                    <label class="text-sm">
                        <span class="sr-only">Escolher arquivo</span>
                        <input
                            id="lab-file-input"
                            type="file"

                            @change="onFileInput"
                        >
                    </label>

                    <Button
                        label="Abrir arquivo (picker)"
                        left-icon="fa-solid fa-file"
                        :disabled="!hasFilePicker"

                        @click="openFilePicker"
                    />

                    <Button
                        label="Abrir pasta (picker)"
                        left-icon="fa-solid fa-folder-open"
                        :disabled="!hasDirectoryPicker"

                        @click="openDirectoryPicker"
                    />
                </div>

                <p
                    v-if="!hasFilePicker"
                    class="mt-2 text-sm text-muted-foreground"
                >
                    Este navegador não tem File System Access API; use o input.
                </p>

                <pre
                    v-if="browserOutput"
                    id="lab-browser-output"
                    class="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded border p-3 text-xs"
                >{{ browserOutput }}</pre>
            </template>
        </Card>

        <Card>
            <template #header>
                <h2 class="font-semibold">
                    Electron: Node fs pelo hook do cliente
                </h2>
            </template>

            <template #body>
                <p
                    v-if="!hasLabApi"
                    class="text-sm text-muted-foreground"
                >
                    Abra no app desktop (npx chtmain electron --client:__CLIENT_NAME__) para usar o labAPI.
                </p>

                <div
                    v-else
                    class="flex flex-wrap gap-2"
                >
                    <Button
                        label="Listar pasta (diálogo nativo)"
                        left-icon="fa-solid fa-folder-tree"

                        @click="pickNativeFolder"
                    />

                    <Button
                        label="Gravar e ler em userData"
                        left-icon="fa-solid fa-floppy-disk"

                        @click="nativeRoundTrip"
                    />
                </div>

                <pre
                    v-if="nativeOutput"
                    id="lab-native-output"
                    class="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded border p-3 text-xs"
                >{{ nativeOutput }}</pre>
            </template>
        </Card>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const PREVIEW_CHARS = 400;

/**
 * Describes a picked file with a short text preview.
 * @param file The file
 * @returns The description
 */
async function describeFile(file: File): Promise<string> {
    const preview = (await file.slice(0, PREVIEW_CHARS).text()).trimEnd();

    return `${file.name} (${file.size} bytes, ${file.type || "tipo desconhecido"})\n\n${preview}`;
}

export default defineComponent({
    name: "FilesPage",

    data() {
        return {
            browserOutput: "",
            nativeOutput: "",
            hasFilePicker: typeof window.showOpenFilePicker === "function",
            hasDirectoryPicker: typeof window.showDirectoryPicker === "function",
            hasLabApi: Boolean(window.labAPI)
        };
    },

    methods: {
        async onFileInput(event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0];

            if (file) {
                this.browserOutput = await describeFile(file);
            }
        },

        async openFilePicker() {
            try {
                const [handle] = (await window.showOpenFilePicker?.()) ?? [];

                if (handle) {
                    this.browserOutput = await describeFile(await handle.getFile());
                }
            } catch (error) {
                this.reportCancelOrError(error);
            }
        },

        async openDirectoryPicker() {
            try {
                const directory = await window.showDirectoryPicker?.();

                if (!directory) {
                    return;
                }

                const names: string[] = [];

                for await (const [name, handle] of directory) {
                    names.push(`${handle.kind === "directory" ? "📁" : "📄"} ${name}`);
                }

                this.browserOutput = `${directory.name}/\n${names.sort().join("\n")}`;
            } catch (error) {
                this.reportCancelOrError(error);
            }
        },

        async pickNativeFolder() {
            const result = await window.labAPI?.pickFolder();

            if (result) {
                this.nativeOutput = `${result.folder}\n${result.entries
                    .map((entry) => `${entry.dir ? "📁" : "📄"} ${entry.name}`)
                    .join("\n")}`;
            }
        },

        async nativeRoundTrip() {
            const result = await window.labAPI?.roundTrip(`Gravado em ${new Date().toLocaleString("pt-BR")}`);

            if (result) {
                this.nativeOutput = `${result.file}\n${result.text}`;
            }
        },

        reportCancelOrError(error: unknown) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }

            this.$toast.error(error instanceof Error ? error.message : "Falha ao abrir.");
        }
    }
});
</script>
