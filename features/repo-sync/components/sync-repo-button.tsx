"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon, CheckIcon } from "lucide-react";
import { githubRepoKeys } from "@/features/github/lib/repos-query";
import { syncRepoCodebase } from "../actions/repo-sync";
import { Button } from "@/components/ui/button";
import { RepoSyncStatus } from "../types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type SyncRepoButtonProps = {
    repoFullName: string;
    branch: string;
    syncStatus: RepoSyncStatus | null;
};

function isSyncing(status: RepoSyncStatus | null, mutationPending: boolean) {
    if (mutationPending) {
        return true;
    }

    return status === "pending" || status === "syncing";
}

function getButtonLabel(
    status: RepoSyncStatus | null,
    mutationPending: boolean,
) {
    if (isSyncing(status, mutationPending)) {
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

    const syncRepo = useMutation({
        mutationFn: () => syncRepoCodebase(repoFullName, branch),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: githubRepoKeys.all });
            toast.success(`Repo ${repoFullName} synced successfully`);
        },
        onError: (error) => {
            toast.error(
                `Failed to sync repo ${repoFullName}: ${error.message}`,
            );
        },
    });

    const syncing = isSyncing(syncStatus, syncRepo.isPending);
    const isSynced = syncStatus === "synced";

    return (
        <Button
            size="sm"
            variant={isSynced ? "ghost" : "outline"}
            disabled={syncing}
            onClick={() => syncRepo.mutate()}
            className={cn(
                "gap-1.5 text-xs",
                !isSynced && !syncing && "border-primary/30 text-primary hover:bg-primary/10 hover:text-primary",
            )}
        >
            {syncing ? (
                <RefreshCwIcon className="size-3.5 animate-spin" />
            ) : isSynced ? (
                <CheckIcon className="size-3.5 text-emerald-500" />
            ) : (
                <RefreshCwIcon className="size-3.5" />
            )}
            {getButtonLabel(syncStatus, syncRepo.isPending)}
        </Button>
    );
};

export default SyncRepoButton;
