import { HangarLoader } from "./hangar-loader";
import { HangarDependency } from "./hangar-dependency";
import { HangarVersionChannelFlag } from "./hangar-version-channel-flag";
import { HangarVersionPinnnedStatus } from "./hangar-version-pinned-status";
import { HangarVersionReviewState } from "./hangar-version-review-state";
import { HangarProjectVisibility as HangarVisibility } from "./hangar-visibility";
import { FileInfo } from "@/utils/io";

export interface HangarVersion {
    createdAt: string;
    name: string;
    visibility: HangarVisibility;
    description: string;
    stats: {
        totalDownloads: number;
        platformDownloads: {
            [platform: string]: number;
        }
    }
    author: string;
    reviewState: HangarVersionReviewState;
    channel: {
        createdAt: string;
        name: string;
        description: string;
        color: string;
        flags: HangarVersionChannelFlag[];
    },
    pinnedStatus: HangarVersionPinnnedStatus;
    downloads: {
        [P in HangarLoader]: {
            fileInfo: {
                name: string;
                sizeBytes: number;
                sha256Hash: string;
            } | null;
            externalUrl: string | null;
            downloadUrl: string | null;
        }
    }
    pluginDependencies: {
        [P in HangarLoader]: HangarDependency[];
    }
    platformDependencies: {
        [P in HangarLoader]: string[];
    }
    platformDependenciesFormatted: {
        [P in HangarLoader]: string;
    }
}

export interface HangarVersionInit {
    version: string;
    pluginDependencies: {
        [P in HangarLoader]: HangarDependency[];
    },
    platformDependencies: {
        [P in HangarLoader]: string[];
    },
    description: string | undefined;
    files: {
        platforms: HangarLoader[];
        externalUrl: string | null;
        url: boolean;
    }[];
    channel: string;
}

/**
 * The shape of the object that should be passed to the Hangar API when creating a new version.
 */
type HangarVersionInitForm = {
    /**
     * The version files to upload
     */
    files: FileInfo[];
} & {
    /**
     * The data needed to initialize the Hangar version.
     */
    versionUpload: HangarVersionInit;
};

/**
 * Returns the data and file information needed to create a new Hangar version.
 *
 * @param version - The options for the new version.
 *
 * @returns An object containing the data and file information for the new version.
 */
export function packHangarVersionInit(version: HangarVersionInit, files: FileInfo[]): HangarVersionInitForm {
    for (const platform in version.platformDependencies) {
        version.files[platform] = {
            platforms: version.platformDependencies,
            url: false
        }
    }

    const data: HangarVersionInitForm = {
        files,
        versionUpload: version
    };

    return data;
}