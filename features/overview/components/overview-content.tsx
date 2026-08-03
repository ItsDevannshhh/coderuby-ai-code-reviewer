/**
 * Dashboard Overview page body — stat cards, connect banner, and activity feed.
 *
 * Receives pre-fetched `OverviewData` from the server page and renders
 * four summary cards plus a list of recent AI review activity.
 */

import type { ComponentType } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
    FolderGit2Icon,
    GitPullRequestIcon,
    SparklesIcon,
    ArrowRightIcon,
    ActivityIcon,
    ZapIcon,
} from "lucide-react";

import { GithubIcon } from "@/features/dashboard/components/icons/github-icon";
import { DASHBOARD_ROUTES } from "@/features/dashboard/lib/routes";
import { statusBadge } from "@/features/dashboard/lib/status-style";
import type {
    OverviewActivityItem,
    OverviewData,
    OverviewRepoSummary,
} from "@/features/overview/types/overview";
import { PLAN_DETAILS } from "@/features/settings/lib/plan-details";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

/** Maps activity status values to badge label and color tone. */
const ACTIVITY_STATUS = {
    approved: { label: "Approved", tone: "success" as const },
    changes_requested: { label: "Changes requested", tone: "warning" as const },
    rate_limited: { label: "Rate limited", tone: "danger" as const },
};

/**
 * Builds the subtitle text under the Repositories stat value.
 *
 * @param repos - Repo summary counts, or empty state when total is zero.
 * @returns A short human-readable description string.
 */
function getRepoDescription(repos: OverviewRepoSummary): string {
    if (repos.totalCount === 0) {
        return "No repositories selected for the app";
    }

    if (repos.hasMorePages) {
        return `${repos.totalCount} repositories connected`;
    }

    return `${repos.publicCount} public · ${repos.privateCount} private`;
}

/**
 * Derives display value and description for the GitHub App stat card.
 *
 * @param installation - Connection status from `OverviewData`.
 * @returns Value string, description, and optional success accent.
 */
function getGithubStat(installation: OverviewData["installation"]) {
    if (!installation.connected) {
        return {
            value: "Not connected",
            description: "Install the GitHub App to start",
            accent: undefined,
        };
    }

    const account = installation.accountLogin
        ? `@${installation.accountLogin}`
        : "Installation active";

    return {
        value: "Connected",
        description: account,
        accent: "success" as const,
    };
}

/**
 * Derives display value for the Repositories stat card.
 *
 * @param repos - Repo summary or null when GitHub is not connected.
 * @returns Value, description, and optional info accent.
 */
function getRepositoriesStat(repos: OverviewRepoSummary | null) {
    if (!repos) {
        return {
            value: "—",
            description: "Connect GitHub App first",
            accent: undefined,
        };
    }

    return {
        value: String(repos.totalCount),
        description: getRepoDescription(repos),
        accent: "info" as const,
    };
}

/** Shape of one stat card in the top grid. */
type StatCard = {
    title: string;
    value: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    accent?: "success" | "info" | "ruby";
};

/**
 * Formats the "Reviews this month" stat for free vs Pro plans.
 *
 * @param overview - Full overview data including usage and plan.
 * @returns Value and description strings for the reviews stat card.
 */
function getReviewsStat(overview: OverviewData) {
    if (overview.reviewsLimit === null) {
        return {
            value: String(overview.reviewsUsed),
            description: "Unlimited reviews on Pro",
        };
    }

    return {
        value: `${overview.reviewsUsed} / ${overview.reviewsLimit}`,
        description: "AI reviews used this month",
    };
}

/**
 * Assembles all four stat cards from overview data.
 *
 * @param overview - Server-loaded overview payload.
 * @returns Array of stat card configs for rendering the grid.
 */
function buildStats(overview: OverviewData): StatCard[] {
    const repoStat = getRepositoriesStat(overview.repos);
    const githubStat = getGithubStat(overview.installation);
    const planLabel = PLAN_DETAILS[overview.plan].label;
    const reviewsStat = getReviewsStat(overview);

    return [
        {
            title: "Repositories",
            value: repoStat.value,
            description: repoStat.description,
            icon: FolderGit2Icon,
            accent: repoStat.accent,
        },
        {
            title: "Reviews this month",
            value: reviewsStat.value,
            description: reviewsStat.description,
            icon: GitPullRequestIcon,
            accent: "ruby",
        },
        {
            title: "GitHub App",
            value: githubStat.value,
            description: githubStat.description,
            icon: GithubIcon,
            accent: githubStat.accent,
        },
        {
            title: "Current plan",
            value: planLabel,
            description: "Manage in settings",
            icon: SparklesIcon,
            accent: overview.plan === "free" ? undefined : "success",
        },
    ];
}

/** Accent color mappings for stat cards. */
const ACCENT_STYLES = {
    success: {
        border: "border-emerald-500/20",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        valueColor: "text-emerald-700 dark:text-emerald-400",
    },
    info: {
        border: "border-blue-500/20",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600 dark:text-blue-400",
        valueColor: "text-blue-700 dark:text-blue-400",
    },
    ruby: {
        border: "border-primary/20",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        valueColor: "text-primary",
    },
} as const;

/**
 * A single premium stat card with icon, value, and description.
 */
function StatCardComponent({ stat }: { stat: StatCard }) {
    const accentStyle = stat.accent ? ACCENT_STYLES[stat.accent] : null;

    return (
        <Card
            className={cn(
                "card-premium group",
                accentStyle?.border,
            )}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground">
                    {stat.title}
                </CardTitle>
                <span
                    className={cn(
                        "flex size-9 items-center justify-center rounded-lg transition-colors",
                        accentStyle?.iconBg ?? "bg-muted/60",
                    )}
                >
                    <stat.icon
                        className={cn(
                            "size-4",
                            accentStyle?.iconColor ?? "text-muted-foreground",
                        )}
                    />
                </span>
            </CardHeader>
            <CardContent>
                <p
                    className={cn(
                        "text-2xl font-bold tracking-tight",
                        accentStyle?.valueColor,
                    )}
                >
                    {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                </p>
            </CardContent>
        </Card>
    );
}

/**
 * Prominent CTA shown when GitHub App is not connected.
 *
 * @returns A highlighted card linking to the GitHub App settings page.
 */
function ConnectGithubBanner() {
    return (
        <Card className="card-premium border-blue-500/20 bg-gradient-to-r from-blue-500/5 via-transparent to-primary/5">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                        <ZapIcon className="size-5 text-blue-500" />
                    </span>
                    <div>
                        <CardTitle className="text-sm">
                            Connect GitHub to get started
                        </CardTitle>
                        <CardDescription className="mt-1">
                            Install the GitHub App to list repositories and enable
                            AI reviews on pull requests.
                        </CardDescription>
                    </div>
                </div>
                <Button
                    nativeButton={false}
                    render={<Link href={DASHBOARD_ROUTES.github} />}
                    className="shrink-0"
                >
                    Connect GitHub
                    <ArrowRightIcon className="size-4" />
                </Button>
            </CardHeader>
        </Card>
    );
}

/**
 * Renders the recent activity list or an empty-state message.
 *
 * @param items - Recent review activity rows from the server.
 * @returns A vertical list of activity entries with status badges.
 */
function ActivityList({ items }: { items: OverviewActivityItem[] }) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-muted/60">
                    <ActivityIcon className="size-6 text-muted-foreground/60" />
                </span>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        No reviews yet
                    </p>
                    <p className="mt-1 max-w-xs text-xs text-muted-foreground/70">
                        Once AI PR reviews are enabled on a connected repository,
                        review summaries will appear here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {items.map((item) => {
                const config = ACTIVITY_STATUS[item.status];

                return (
                    <div
                        key={item.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-3 transition-colors hover:bg-muted/40"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                                <GitPullRequestIcon className="size-3.5 text-primary/70" />
                            </span>
                            <div>
                                <p className="text-sm font-medium">
                                    {item.repoFullName}{" "}
                                    <span className="text-muted-foreground">
                                        {item.prNumber}
                                    </span>
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(
                                        new Date(item.reviewedAt),
                                        {
                                            addSuffix: true,
                                        },
                                    )}
                                </p>
                            </div>
                        </div>
                        <span className={statusBadge(config.tone)}>
                            {config.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

type OverviewContentProps = {
    overview: OverviewData;
};

/**
 * Main Overview page content — stat grid, optional banner, activity card.
 *
 * @param overview - Pre-fetched data from `getOverview()`.
 * @returns The overview page body below `DashboardHeader`.
 */
export function OverviewContent({ overview }: OverviewContentProps) {
    const stats = buildStats(overview);
    const showConnectBanner = !overview.installation.connected;

    return (
        <div className="flex flex-1 flex-col gap-8 p-6 lg:p-8">
            {/* Stat cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, i) => (
                    <div
                        key={stat.title}
                        className={cn("animate-slide-up", `delay-${i + 1}`)}
                    >
                        <StatCardComponent stat={stat} />
                    </div>
                ))}
            </div>

            {/* GitHub connect banner */}
            {showConnectBanner ? (
                <div className="animate-slide-up delay-5">
                    <ConnectGithubBanner />
                </div>
            ) : null}

            {/* Recent activity */}
            <div className="animate-slide-up delay-6">
                <Card className="card-premium">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ActivityIcon className="size-4 text-muted-foreground" />
                            <CardTitle className="text-sm font-semibold">
                                Recent activity
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Latest AI review summaries from your repositories.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ActivityList items={overview.recentActivity} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
