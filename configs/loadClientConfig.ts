/**
 * The client config file loader module
 * This module is responsible for re-exporting the cht-main client config loader of the project.
 */

export {
    CLIENT_CONFIG_FILENAMES,
    findClientConfigPath,
    clearClientConfigLoadCache,
    loadClientConfigFromDir
} from "../../scripts/lib/loadClientConfig.mjs";
