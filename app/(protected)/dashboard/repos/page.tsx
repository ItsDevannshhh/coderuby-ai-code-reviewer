import type { Metadata } from "next";
import Link from "next/link";
import { FolderGit2Icon, ArrowRightIcon } from "lucide-react";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";

import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { getInstallationStatus } from "@/features/github/server/installation";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/features/auth/actions";
import { RepoList } from "@/features/dashboard/components/repo-list";

export const metadata: Metadata = {
    title: "Repositories · Dashboard",
};

function ReposNotConnected() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-6">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
                <FolderGit2Icon className="size-8 text-muted-foreground/50" />
            </span>
            <div className="text-center">
                <p className="text-base font-medium">
                    No repositories available
                </p>
                <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
                    Install the GitHub App first to connect your repositories
                    and start reviewing pull requests with AI.
                </p>
            </div>
            <Button
                nativeButton={false}
                render={<Link href={DASHBOARD_ROUTES.github} />}
            >
                Connect GitHub App
                <ArrowRightIcon className="size-4" />
            </Button>
        </div>
    );
}

/**
 * Repositories list page with GitHub connection guard.
 *
 * @returns Header plus either connect prompt or interactive repo table.
 */
export default async function DashboardReposPage() {
    const session = await requireAuth();
    const installation = await getInstallationStatus(session.user.id);

    const header = (
        <DashboardHeader
            title="Repositories"
            description="All public and private repositories available to the GitHub App."
        />
    );

    if (!installation.connected) {
        return (
            <>
                {header}
                <ReposNotConnected />
            </>
        );
    }

    return (
        <>
            {header}
            <RepoList />
        </>
    );
}
