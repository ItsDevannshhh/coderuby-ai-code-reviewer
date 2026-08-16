"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { RefreshCwIcon, CheckIcon } from "lucide-react";
import { githubRepoKeys } from "@/features/github/lib/repos-query";
import {
    getRepoSyncStatus,
    syncRepoCodebase,
} from "../actions/repo-sync";
import { Button } from "@/components/ui/button";
import { RepoSyncStatus } from "../types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type SyncRepoButtonProps = {
    repoFullName: string;
    branch: string;
    syncStatus: RepoSyncStatus | null;
};

function isSyncing(
    status: RepoSyncStatus | null,
    mutationPending: boolean,
    polling: boolean,
) {
    if (mutationPending || polling) {
        return true;
    }

    return status === "pending" || status === "syncing";
}

function getButtonLabel(
    status: RepoSyncStatus | null,
    mutationPending: boolean,
    polling: boolean,
) {
    if (isSyncing(status, mutationPending, polling)) {
        return "Syncing…";
    }

    if (status === "synced") {
        return "Re-sync";
    }

    return "Sync";
}

const SyncRepoButton = ({
    repoFullName,
    branch,
    syncStatus,
}: SyncRepoButtonProps) => {
    const queryClient = useQueryClient();

    /**
     * Polling is OFF initially.
     * It starts only after the user clicks Sync.
     */
    const [polling, setPolling] = useState(false);

    /**
     * Poll the database every 3 seconds while
     * the Inngest background job is running.
     */
    const syncStatusQuery = useQuery({
        queryKey: [
            ...githubRepoKeys.all,
            "sync-status",
            repoFullName,
        ],

        queryFn: () => getRepoSyncStatus(repoFullName),

        enabled: polling,

        refetchInterval: (query) => {
            const status = query.state.data;

            /**
             * Stop polling when the background
             * sync has finished.
             */
            if (
                status === "synced" ||
                status === "failed"
            ) {
                return false;
            }

            /**
             * Continue polling every 3 seconds.
             */
            return 3000;
        },
    });

    const syncRepo = useMutation({
        mutationFn: () =>
            syncRepoCodebase(repoFullName, branch),

        onSuccess: () => {
            /**
             * The mutation only starts the Inngest job.
             * It does not mean the repo is synced yet.
             */
            setPolling(true);
        },

        onError: (error) => {
            setPolling(false);

            toast.error(
                `Failed to sync repo ${repoFullName}: ${error.message}`,
            );
        },
    });

    /**
     * Use the polled database status when available.
     *
     * Before the first poll returns, fall back to
     * the status received from RepoList.
     */
    const currentStatus =
        syncStatusQuery.data ?? syncStatus;

    /**
     * When Inngest changes Prisma status to "synced",
     * stop polling and refresh the repository list.
     */
    useEffect(() => {
        if (syncStatusQuery.data === "synced") {
            setPolling(false);

            toast.success(
                `Repo ${repoFullName} synced successfully`,
            );

            queryClient.invalidateQueries({
                queryKey: githubRepoKeys.all,
            });
        }

        if (syncStatusQuery.data === "failed") {
            setPolling(false);

            toast.error(
                `Failed to sync repo ${repoFullName}`,
            );
        }
    }, [
        syncStatusQuery.data,
        repoFullName,
        queryClient,
    ]);

    const syncing = isSyncing(
        currentStatus,
        syncRepo.isPending,
        polling,
    );

    const isSynced = currentStatus === "synced";

    return (
        <Button
            size="sm"
            variant={isSynced ? "ghost" : "outline"}
            disabled={syncing}
            onClick={() => syncRepo.mutate()}
            className={cn(
                "gap-1.5 text-xs",
                !isSynced &&
                !syncing &&
                "border-primary/30 text-primary hover:bg-primary/10 hover:text-primary",
            )}
        >
            {syncing ? (
                <RefreshCwIcon className="size-3.5 animate-spin" />
            ) : isSynced ? (
                <CheckIcon className="size-3.5 text-emerald-500" />
            ) : (
                <RefreshCwIcon className="size-3.5" />
            )}

            {getButtonLabel(
                currentStatus,
                syncRepo.isPending,
                polling,
            )}
        </Button>
    );
};

export default SyncRepoButton;