import { HangarProjectCategory } from "./hangar-project-category";
import { HangarProjectNamespace } from "./hangar-project-namespace";
import { HangarProjectVisibility } from "./hangar-visibility";

/**
 * Represents a Hangar project.
 */
export interface HangarProject {
    /**
     * A string representing the date when the project was created.
     */
    createdAt: string;

    /**
     * The name of the project.
     */
    name: string;

    /**
     * The namespace of the project, composed of the owner's username and a slug.
     */
    namespace: HangarProjectNamespace;

    /**
     * An object representing statistics about the project.
     */
    stats: {
        /**
         * The number of views the project has.
         */
        views: number;
        
        /**
         * The number of downloads the project has, across all versions.
         */
        downloads: number;

        /**
         * The number of "recent" views the project has.
         */
        recentViews: number;
        
        /**
         * The number of "recent" downloads the project has, across all versions.
         */
        recentDownloads: number;

        /**
         * The number of stars the project has received.
         */
        stars: number;
        
        /**
         * The number of people watching the project to receive notifications about updates.
         */
        watchers: number;
    }

    /**
     * The category the project is in.
     */
    category: HangarProjectCategory | undefined;
    
    /**
     * A string representing the date when the project was last updated.
     */
    lastUpdated: string;

    /**
     * The visibility of the project.
     */
    visibility: HangarProjectVisibility;
    
    /**
     * The URL to the project's icon.
     */
    avatarUrl: string;

    /**
     * The brief description of the project.
     */
    description: string;

    /**
     * An object representing actions the currently authenticated user has performed on the project
     */
    userActions: {
        /**
         * Whether the user has starred the project.
         */
        starred: boolean;

        /**
         * Whether the user is watching the project.
         */
        watching: boolean;

        /**
         * Whether the user has flagged the project.
         */
        flagged: boolean;
    }

    /**
     * An object representing project settings
     */
    settings: {
        /**
         * A list of sections containing relevant project links.
         */
        links: {
            /**
             * The unique identifier of the link section.
             */
            id: number;

            /**
             * The display type of the link section ("Top" or "Sidebar", but can legally be any string per the spec)
             */
            type: string;

            /**
             * The title of the link section.
             */
            title: string;

            /**
             * The list of URL links in the section.
             */
            links: {
                /**
                 * The unique identifier of the link.
                 */
                id: number;

                /**
                 * The display label name of the link in the section.
                 */
                name: string;
                
                /**
                 * The URL of the link.
                 */
                url: string;
            }[];

        }[];

        /**
         * A list of tags that describe the project.
         */
        tags: string[];

        /**
         * An object representing the license of the project.
         */
        license: {
            /**
             * The full name of the license.
             */
            name: string;
            
            /**
             * The URL of the license's official website.
             */
            url: string;

            /**
             * The SPDX-compliant identifier of the license.
             */
            type: string;
        }

        /**
         * A list of keywords that describe the project.
         */
        keywords: string[];

        /**
         * The markdown-formatted content of the project's sponsor section.
         */
        sponsors: string;

        /**
         * An object representing the donation settings of the project. Unused.
         */
        donation: {
            /**
             * Whether donations are enabled. Unused; currently always returns false.
             */
            enable: boolean;

            /**
             * The subject of project donations. Unused; currently always returns an empty string.
             */
            subject: string;
        }
    }
}
