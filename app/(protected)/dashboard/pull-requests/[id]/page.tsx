/**
 * Single pull request detail page (`/dashboard/pull-requests/[id]`).
 *
 * Shows PR metadata, links to GitHub, and the full AI review markdown.
 * Returns 404 when the PR does not exist or belongs to another installation.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {
    ArrowLeftIcon,
    BotIcon,
    ExternalLinkIcon,
    GitBranchIcon,
    GitPullRequestIcon,
    UserIcon,
    SparklesIcon,
    ClockIcon,
} from "lucide-react";

import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { statusBadge } from "@/features/dashboard/lib/status-style";
import { getUserInstallationId } from "@/features/github/server/installation";
import { AiReviewMarkdown } from "@/features/pull-requests/components/ai-review-markdown";
import { getPullRequestById } from "@/features/pull-requests/server/get-pull-request";
import type { PullRequestStatus } from "@/features/pull-requests/types/pull-request";
import {
    PR_STATUS_LABELS,
    getPrStatusTone,
} from "@/features/pull-requests/utils/status";
import { requireAuth } from "@/lib/auth-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Pull Request Review · Dashboard",
};

/**
 * Renders the AI review section based on status and available comment text.
 *
 * @param review - Markdown review comment or null if not ready.
 * @param status - PR lifecycle status (rate_limited shows upgrade message).
 * @returns Placeholder text or `AiReviewMarkdown` component.
 */
function ReviewBody({
    review,
    status,
}: {
    review: string | null;
    status: PullRequestStatus;
}) {
    if (status === "rate_limited") {
        return (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10">
                    <SparklesIcon className="size-6 text-amber-500" />
                </span>
                <div>
                    <p className="text-sm font-medium">
                        Monthly review limit reached
                    </p>
                    <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                        Upgrade to Pro for unlimited reviews, or wait until next
                        month when your limit resets.
                    </p>
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href={DASHBOARD_ROUTES.settings} />}
                    size="sm"
                >
                    Upgrade to Pro
                </Button>
            </div>
        );
    }

    if (!review) {
        return (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
                    <ClockIcon className="size-6 text-muted-foreground/50" />
                </span>
                <div>
                    <p className="text-sm font-medium">
                        Review in progress
                    </p>
                    <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                        The AI review is not ready yet. It will appear here once the
                        reviewer finishes processing.
                    </p>
                </div>
                {/* Skeleton progress indicator */}
                <div className="flex items-center gap-2">
                    <div className="skeleton-premium h-2 w-32 rounded-full" />
                </div>
            </div>
        );
    }

    return <AiReviewMarkdown review={review} />;
}

/**
 * Pull request detail view with metadata and AI review card.
 *
 * @param params - Async route params containing the PR database `id`.
 * @returns Full detail page or `notFound()` when unauthorized/missing.
 */
export default async function PullRequestDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await requireAuth();
    const installationId = await getUserInstallationId(session.user.id);

    if (!installationId) {
        notFound();
    }

    const pullRequest = await getPullRequestById(installationId, id);

    if (!pullRequest) {
        notFound();
    }

    const status = pullRequest.status as PullRequestStatus;
    const prUrl = `https://github.com/${pullRequest.repoFullName}/pull/${pullRequest.prNumber}`;
    const openedAgo = formatDistanceToNow(pullRequest.createdAt, {
        addSuffix: true,
    });

    return (
        <>
            <DashboardHeader
                title={`PR #${pullRequest.prNumber}`}
                description={pullRequest.repoFullName}
            />

            <div className="flex flex-col gap-5 p-6 lg:p-8">
                {/* Back navigation */}
                <div>
                    <Button
                        variant="ghost"
                        size="sm"
                        nativeButton={false}
                        render={<Link href={DASHBOARD_ROUTES.pullRequest} />}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeftIcon className="size-4" />
                        Back to pull requests
                    </Button>
                </div>

                {/* PR metadata card */}
                <Card className="card-premium">
                    <CardHeader>
                        <CardTitle className="flex flex-wrap items-center gap-2.5 text-sm">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                                <GitPullRequestIcon className="size-4 text-primary" />
                            </span>
                            <span className="font-semibold">
                                {pullRequest.title}
                            </span>
                            <span className="text-xs font-normal text-muted-foreground">
                                #{pullRequest.prNumber}
                            </span>
                            <span
                                className={statusBadge(
                                    getPrStatusTone(status),
                                    "ml-auto",
                                )}
                            >
                                {PR_STATUS_LABELS[status]}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <UserIcon className="size-3.5" />
                            {pullRequest.authorLogin ?? "unknown"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <GitBranchIcon className="size-3.5" />
                            <code className="rounded bg-muted/60 px-1.5 py-0.5 text-[11px]">
                                {pullRequest.baseBranch}
                            </code>
                        </span>
                        <span>opened {openedAgo}</span>
                        <Link
                            href={prUrl}
                            target="_blank"
                            className="ml-auto inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                        >
                            View on GitHub
                            <ExternalLinkIcon className="size-3" />
                        </Link>
                    </CardContent>
                </Card>

                {/* AI Review card */}
                <Card className="card-premium">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2.5 text-sm">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                                <BotIcon className="size-4 text-primary" />
                            </span>
                            <span className="font-semibold">AI Review</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReviewBody
                            review={pullRequest.reviewComment}
                            status={status}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
