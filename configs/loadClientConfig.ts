/**
 * The client config file loader module
 * This module is responsible for re-exporting the cht-main client config loader.
 */

export {
    CLIENT_CONFIG_FILENAMES,
    findClientConfigPath,
    clearClientConfigLoadCache,
    loadClientConfigFromDir
} from "../../scripts/lib/loadClientConfig.mjs";
