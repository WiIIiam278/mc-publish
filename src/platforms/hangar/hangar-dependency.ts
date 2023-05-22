import { HangarLoader } from "./hangar-loader";
import { HangarProjectNamespace } from "./hangar-project-namespace";

/**
 * Represents a dependency on a plugin.
 */
export interface HangarDependency {
    /**
     * The name of the dependency.
     */
    name: string;

    /**
     * Whether the dependency is required.
     */
    required: boolean;

    /**
     * The plugin's Hangar project namespace, or `null` for an externally linked dependency
     */
    namespace:  HangarProjectNamespace | null;
    
    /**
     * An external URL to the dependency, or `null` for a dependency specifeid by namespace on Hangar.
     */
    externalUrl: string | null;

    /**
     * The platform the dependency is on.
     */
    platform: HangarLoader;
}