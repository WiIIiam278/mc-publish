/**
 * Represents the visibility state of a Hangar project or version.
 */
export enum HangarProjectVisibility {
    PUBLIC = "public",
    NEW = "new",
    NEEDS_CHANGES = "needsChanges",
    NEEDS_APPROVAL = "needsApproval",
    SOFT_DELETE = "softDelete"
}