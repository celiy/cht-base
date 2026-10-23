<template>
    <main class="mx-auto max-w-3xl p-6">
        <h1 class="text-2xl font-semibold">
            three.js + WebGPU
        </h1>

        <p
            id="lab-renderer"
            class="mt-1 text-muted-foreground"
            role="status"
        >
            {{ status }}
        </p>

        <div
            ref="stage"
            class="mt-4 aspect-video w-full overflow-hidden rounded border"
        />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    SRGBColorSpace,
    TextureLoader,
    WebGPURenderer
} from "three/webgpu";

export default defineComponent({
    name: "GraphicsPage",

    data() {
        return {
            status: "Iniciando renderer…",
            // three objects live in this closure, so Vue never proxies them.
            cleanup: null as (() => void) | null,
            unmounted: false
        };
    },

    async mounted() {
        const stage = this.$refs.stage as HTMLDivElement;
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        // WebGPURenderer falls back to WebGL 2 when the GPU or the browser has no WebGPU.
        const renderer = new WebGPURenderer({ antialias: true });

        renderer.setSize(width, height);
        stage.appendChild(renderer.domElement);
        await renderer.init();

        if (this.unmounted) {
            renderer.dispose();
            return;
        }

        const texture = await new TextureLoader().loadAsync(
            `${import.meta.env.BASE_URL}textures/checker.png`
        );

        texture.colorSpace = SRGBColorSpace;

        const scene = new Scene();
        const camera = new PerspectiveCamera(60, width / height, 0.1, 100);
        const cube = new Mesh(new BoxGeometry(1.4, 1.4, 1.4), new MeshBasicMaterial({ map: texture }));

        camera.position.z = 3;
        scene.add(cube);

        renderer.setAnimationLoop(() => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.013;
            renderer.render(scene, camera);
        });

        const isWebGPU = (renderer.backend as { isWebGPUBackend?: boolean }).isWebGPUBackend === true;

        this.status = isWebGPU ? "Backend: WebGPU" : "Backend: WebGL 2 (fallback)";
        this.cleanup = () => {
            renderer.setAnimationLoop(null);
            texture.dispose();
            cube.geometry.dispose();
            cube.material.dispose();
            renderer.dispose();
        };
    },

    beforeUnmount() {
        this.unmounted = true;
        this.cleanup?.();
    }
});
</script>
