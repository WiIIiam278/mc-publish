/**
 * Represents the namespace of a Hangar project.
 */
export interface HangarProjectNamespace {
    /**
     * The username of the owner of the project.
     */
    owner: string;
    /**
     * A URL-friendly string that represents the project.
     */
    slug: string;
}