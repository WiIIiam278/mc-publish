import { Fetch, HttpRequest, HttpResponse, createFetch, defaultResponse, simpleCache, throwOnError } from "@/utils/net";
import { HangarProject } from "./hangar-project";
import { HangarVersion, HangarVersionInit, packHangarVersionInit } from "./hangar-version";
import { HangarProjectNamespace } from "./hangar-project-namespace";
import { hangarAuthenticator } from "./hangar-authenticator";
import { FileInfo } from "@/utils/io";

/**
 * The API version used for making requests to the Hangar API.
 */
const HANGAR_API_VERSION = 1;

/**
 * The base URL for the Hangar API.
 */
export const HANGAR_API_URL = `https://hangar.papermc.io/api/v${HANGAR_API_VERSION}` as const;

/**
 * Describes the configuration options for the Hangar API client.
 */
export interface HangarApiOptions {
    /**
     * The Fetch implementation used for making HTTP requests.
     */
    fetch?: Fetch;

    /**
     * The base URL for the Hangar API.
     *
     * Defaults to {@link HANGAR_API_URL}.
     */
    baseUrl?: string | URL;

    /**
     * The API key to be used to authenticate to get a token from the Hangar API.
     */
    apiKey?: string;
}

/**
 * A client for interacting with the Hangar API.
 */
export class HangarApiClient {
    /**
     * The Fetch implementation used for making HTTP requests.
     */
    private readonly _fetch: Fetch;

    /**
     * Creates a new {@link HangarApiClient} instance.
     *
     * @param options - The configuration options for the client.
     */
    constructor(options?: HangarApiOptions) {
        const URL = options?.baseUrl || options?.fetch?.["baseUrl"] || HANGAR_API_URL;
        this._fetch = createFetch({ handler: options?.fetch, baseUrl: URL })
        .use(simpleCache())
        .use(hangarAuthenticator(options?.apiKey, createFetch({ handler: options?.fetch, baseUrl: URL }).use(simpleCache())))
        .use(defaultResponse({ response: r => HttpResponse.json(null, r) }))
        .use(throwOnError({ filter: x => !x.ok && x.status !== 404 }));
    }

    /**
     * Fetches a project by its author and slug.
     *
     * @param authorName - The author name.
     * @param projectSlug - The project slug.
     *
     * @returns The project, or `undefined` if not found.
     */
    async getProject(namespace : HangarProjectNamespace): Promise<HangarProject | undefined> {
        const response = await this._fetch(`/projects/${namespace.owner}/${namespace.slug}`, HttpRequest.get());
        return (await response.json()) ?? undefined;
    }

    /**
     * Fetches a version by its id.
     *
     * @param name - The version name.
     *
     * @returns The version, or `undefined` if not found.
     */
    async getVersion(projectNamespace : HangarProjectNamespace, versionName: string): Promise<HangarVersion | undefined> {
        const response = await this._fetch(`/projects/${projectNamespace.owner}/${projectNamespace.slug}/versions/${versionName}`);
        return (await response.json()) ?? undefined;
    }

    /**
     * Creates a new version.
     *
     * @param version - The version data.
     *
     * @returns The created version.
     */
    async createVersion(projectNamespace : HangarProjectNamespace, version: HangarVersionInit, files: FileInfo[]): Promise<HangarVersion> {
        const form = packHangarVersionInit(version, files);
        const response = await this._fetch(`/projects/${projectNamespace.owner}/${projectNamespace.slug}/versions`, HttpRequest.post().with(form));
        return await response.json();
    }

}