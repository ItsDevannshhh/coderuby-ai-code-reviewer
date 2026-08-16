"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "../../auth/actions";
import { getUserInstallationId } from "../../github/server/installation";
import { DASHBOARD_ROUTES } from "../../dashboard/lib/routes";
import {
    getRepoSyncStatuses,
    triggerRepoSync,
} from "../server/repo-sync";
import { RepoSyncStatus } from "../types";
import { repoSyncRateLimit } from "@/features/redis/rate-limit";

export async function syncRepoCodebase(
    repoFullName: string,
    branch: string,
) {
    const session = await getServerSession();

    if (!session) {
        redirect("/sign-in");
    }

    const installationId = await getUserInstallationId(
        session.user.id,
    );

    if (!installationId) {
        redirect(DASHBOARD_ROUTES.github);
    }

    /**
     * Maximum 4 repository syncs per minute
     * for each authenticated user.
     */
    const { success, reset } =
        await repoSyncRateLimit.limit(session.user.id);

    if (!success) {
        const retryAfterSeconds = Math.max(
            1,
            Math.ceil((reset - Date.now()) / 1000),
        );

        throw new Error(
            `Sync limit reached. You can sync up to 4 repositories per minute. Try again in ${retryAfterSeconds} seconds.`,
        );
    }

    await triggerRepoSync(
        installationId,
        repoFullName,
        branch,
    );
}

export async function getRepoSyncStatus(
    repoFullName: string,
): Promise<RepoSyncStatus | null> {
    const statuses = await getRepoSyncStatuses([repoFullName]);

    return (statuses[repoFullName] as RepoSyncStatus) ?? null;
}