export const ICON_CATEGORIES = ['needs', 'emotions', 'classroom'] as const;

export type IconCategory = (typeof ICON_CATEGORIES)[number];
