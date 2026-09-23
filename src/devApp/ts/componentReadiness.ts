import readinessMap from "../data/componentReadiness.json";

export type ComponentReadinessStatus = "success" | "info" | "warning" | "destructive";

type ReadinessMeta = {
    variant: ComponentReadinessStatus;
    label: string;
    description: string;
    icon: string;
};

const READINESS_META: Record<ComponentReadinessStatus, ReadinessMeta> = {
    success: {
        variant: "success",
        label: "Pronto para uso",
        description: "Implementado, testado e pronto para uso.",
        icon: "fa-circle-check"
    },
    info: {
        variant: "info",
        label: "Implementado",
        description:
            "Implementado corretamente, mas ainda não validado em um caso de uso real. Pode mudar ou não cobrir todos os cenários.",
        icon: "fa-circle-info"
    },
    warning: {
        variant: "warning",
        label: "Em evolução",
        description:
            "Base sólida, mas faltam partes e ainda não foi testado em uso real para ser considerado completo.",
        icon: "fa-triangle-exclamation"
    },
    destructive: {
        variant: "destructive",
        label: "Em implementação",
        description: "Componente em implementação e não está pronto para uso.",
        icon: "fa-circle-xmark"
    }
};

const SLUG_TO_STATUS = readinessMap as Record<string, ComponentReadinessStatus>;

export function getComponentDocSlug(path: string): string | null {
    const componentMatch = path.match(/^\/docs\/components\/([^/]+)\/?$/);

    if (componentMatch?.[1]) {
        return componentMatch[1];
    }

    const systemMatch = path.match(/^\/docs\/(websocket|dev-mode)\/?$/);

    if (systemMatch?.[1]) {
        return systemMatch[1];
    }

    return null;
}

export function getComponentReadiness(slug: string): ReadinessMeta | null {
    const status = SLUG_TO_STATUS[slug];

    if (!status) {
        return null;
    }

    return READINESS_META[status];
}
