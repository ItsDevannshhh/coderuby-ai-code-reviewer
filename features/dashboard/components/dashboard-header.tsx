/**
 * Top bar shown on every dashboard page.
 *
 * Contains the sidebar toggle (for mobile/collapsed mode) and the page
 * title + optional description passed by each route's `page.tsx`.
 */

"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type DashboardHeaderProps = {
    title: string;
    description?: string;
};

/**
 * Renders the sticky dashboard page header with sidebar trigger.
 *
 * @param title - Primary heading (e.g. "Repositories").
 * @param description - Optional subtitle shown below the title.
 * @returns A `<header>` element with sidebar trigger and title block.
 */
export function DashboardHeader({ title, description }: DashboardHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border/60 px-6">
            {/* Opens/closes the sidebar on smaller screens or icon-collapsed mode */}
            <SidebarTrigger className="-ml-1.5" />
            <Separator orientation="vertical" className="mr-1 h-5" />
            <div className="flex min-w-0 flex-col gap-0.5">
                <h1 className="truncate text-base font-semibold tracking-tight">
                    {title}
                </h1>
                {description ? (
                    <p className="truncate text-xs text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </div>
        </header>
    );
}