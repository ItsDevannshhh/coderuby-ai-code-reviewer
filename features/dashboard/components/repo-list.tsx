"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    SearchIcon,
    FolderGit2Icon,
    GitBranchIcon,
    CodeIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { githubReposInfiniteQuery } from "@/features/github/lib/repos-query";
import { DashboardRepo } from "../lib/types";
import { statusBadge } from "../lib/status-style";
import { LockIcon, LockKeyOpenIcon, StarIcon } from "@phosphor-icons/react";
import SyncRepoButton from "@/features/repo-sync/components/sync-repo-button";

type Filter = "all" | "public" | "private";

/** Premium skeleton row for loading state */
function SkeletonRow() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex flex-col gap-2">
                    <div className="skeleton-premium h-4 w-36" />
                    <div className="skeleton-premium h-3 w-48" />
                </div>
            </TableCell>
            <TableCell>
                <div className="skeleton-premium h-5 w-16 rounded-full" />
            </TableCell>
            <TableCell>
                <div className="skeleton-premium h-4 w-14" />
            </TableCell>
            <TableCell>
                <div className="skeleton-premium h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
                <div className="skeleton-premium ml-auto h-4 w-8" />
            </TableCell>
            <TableCell className="text-right">
                <div className="skeleton-premium ml-auto h-4 w-20" />
            </TableCell>
            <TableCell className="text-right">
                <div className="skeleton-premium ml-auto h-8 w-16 rounded-lg" />
            </TableCell>
        </TableRow>
    );
}

/** Empty state for no repositories */
function EmptyRepoState({ hasSearch }: { hasSearch: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
                <FolderGit2Icon className="size-7 text-muted-foreground/50" />
            </span>
            <div>
                <p className="text-sm font-medium">
                    {hasSearch
                        ? "No matching repositories"
                        : "No repositories found"}
                </p>
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    {hasSearch
                        ? "Try adjusting your search query or filter."
                        : "Repositories from your GitHub App installation will appear here."}
                </p>
            </div>
        </div>
    );
}

export function RepoList() {
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
    } = useInfiniteQuery(githubReposInfiniteQuery);

    const loading = isPending && !data;

    const repos = useMemo(() => {
        if (!data) {
            return [];
        }

        const loaded = data.pages.flatMap((page) => page.repos);
        return [...loaded].sort(
            (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
        );
    }, [data]);

    const totalCount = data?.pages[0]?.totalCount ?? 0;

    const counts = {
        all: totalCount,
        public: repos.filter((repo) => repo.visibility === "public").length,
        private: repos.filter((repo) => repo.visibility === "private").length,
    };

    const visibleRepos = useMemo(() => {
        const query = search.toLowerCase();

        return repos.filter((repo) => {
            if (filter !== "all" && repo.visibility !== filter) {
                return false;
            }

            if (query && !repo.fullName.toLowerCase().includes(query)) {
                return false;
            }

            return true;
        });
    }, [repos, filter, search]);

    useEffect(() => {
        const element = loadMoreRef.current;

        if (!element || !hasNextPage || isFetchingNextPage) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    fetchNextPage();
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    let footer: string | null = null;

    if (isFetchingNextPage) {
        footer = "Loading more repositories…";
    } else if (hasNextPage) {
        footer = `Showing ${repos.length} of ${totalCount}`;
    } else if (repos.length > 0) {
        footer = `All ${repos.length} repositories loaded`;
    }

    let tableContent;

    if (loading) {
        tableContent = (
            <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
            </>
        );
    } else if (isError) {
        tableContent = (
            <TableRow>
                <TableCell
                    colSpan={7}
                    className="h-32 text-center"
                >
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-destructive">
                            Failed to load repositories
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Please check your connection and try again.
                        </p>
                    </div>
                </TableCell>
            </TableRow>
        );
    } else if (visibleRepos.length === 0) {
        tableContent = (
            <TableRow>
                <TableCell colSpan={7} className="border-0">
                    <EmptyRepoState hasSearch={search.length > 0 || filter !== "all"} />
                </TableCell>
            </TableRow>
        );
    } else {
        tableContent = visibleRepos.map((repo) => (
            <RepoRow key={repo.id} repo={repo} />
        ));
    }

    return (
        <div className="flex flex-1 flex-col gap-5 p-6 lg:p-8">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs
                    value={filter}
                    onValueChange={(value) => setFilter(value as Filter)}
                >
                    <TabsList>
                        <TabsTrigger value="all">
                            All ({counts.all})
                        </TabsTrigger>
                        <TabsTrigger value="public">
                            Public ({counts.public})
                        </TabsTrigger>
                        <TabsTrigger value="private">
                            Private ({counts.private})
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="relative max-w-xs">
                    <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search repositories…"
                        className="pl-9"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border/60 bg-muted/30 hover:bg-muted/30">
                            <TableHead className="font-medium">Repository</TableHead>
                            <TableHead className="font-medium">Visibility</TableHead>
                            <TableHead className="font-medium">Branch</TableHead>
                            <TableHead className="font-medium">Language</TableHead>
                            <TableHead className="text-right font-medium">Stars</TableHead>
                            <TableHead className="text-right font-medium">
                                Updated
                            </TableHead>
                            <TableHead className="text-right font-medium">
                                Codebase
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>{tableContent}</TableBody>
                </Table>
            </div>

            {/* Footer */}
            <div
                ref={loadMoreRef}
                className="py-2 text-center text-xs text-muted-foreground"
            >
                {footer}
            </div>
        </div>
    );
}

function RepoRow({ repo }: { repo: DashboardRepo }) {
    const tone = repo.visibility === "public" ? "info" : "warning";

    return (
        <TableRow className="table-row-hover border-border/40">
            <TableCell>
                <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-muted/50">
                        <CodeIcon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{repo.name}</span>
                        <span className="text-xs text-muted-foreground">
                            {repo.fullName}
                        </span>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <span className={statusBadge(tone, "gap-1")}>
                    {repo.visibility === "private" ? (
                        <LockIcon className="size-3" />
                    ) : (
                        <LockKeyOpenIcon className="size-3" />
                    )}
                    {repo.visibility}
                </span>
            </TableCell>
            <TableCell>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <GitBranchIcon className="size-3" />
                    {repo.defaultBranch}
                </span>
            </TableCell>
            <TableCell>
                <span className="text-sm">{repo.language ?? "—"}</span>
            </TableCell>
            <TableCell className="text-right">
                <span className="inline-flex items-center justify-end gap-1 text-sm text-muted-foreground">
                    <StarIcon className="size-3.5 text-amber-500" weight="fill" />
                    {repo.stars}
                </span>
            </TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(repo.updatedAt), {
                    addSuffix: true,
                })}
            </TableCell>
            <TableCell className="text-right">
                <SyncRepoButton
                    repoFullName={repo.fullName}
                    branch={repo.defaultBranch}
                    syncStatus={repo.syncStatus ?? null}
                />
            </TableCell>
        </TableRow>
    );
}
