import { cn } from "@/lib/utils";

/** Background, border, and text colors for inline status badges. */
export const statusBadgeClass = {
    success:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-400",
    warning:
        "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-400",
    danger:
        "border-red-500/30 bg-red-500/10 text-red-700 dark:border-red-400/25 dark:bg-red-400/10 dark:text-red-400",
    info:
        "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-400",
    neutral:
        "border-border bg-muted/60 text-muted-foreground",
} as const;

/** Button variants for primary actions like "Install" or "Disconnect". */
export const statusButtonClass = {
    success:
        "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-500/50 dark:bg-emerald-600 dark:hover:bg-emerald-500",
    danger:
        "border-red-500/40 bg-red-500/10 text-red-700 hover:bg-red-500/15 dark:text-red-400 dark:hover:bg-red-500/15",
    warning:
        "border-amber-500/40 bg-amber-500/10 text-amber-800 hover:bg-amber-500/15 dark:text-amber-400",
} as const;

/**
 * Builds a complete className string for a small status badge pill.
 *
 * @param tone - Semantic color from `statusBadgeClass` keys.
 * @param className - Optional extra classes (e.g. `gap-1` when an icon is inside).
 * @returns A merged Tailwind class string ready for a `<span>`.
 */
export function statusBadge(
    tone: keyof typeof statusBadgeClass,
    className?: string
) {
    return cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize tracking-wide",
        statusBadgeClass[tone],
        className
    );
}