"use client";

import {
    ArrowSquareOut,
    GithubLogo,
    Plugs,
    CheckCircle,
    PlugsConnected,
} from "@phosphor-icons/react";

import type { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import {
    statusBadge,
    statusButtonClass,
} from "@/features/dashboard/lib/status-style";
import { getGithubInstallUrl } from "@/features/github/utils/github-url";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { disconnectGithubApp } from "../actions";


type GithubConnectCardProps = {
    userId: string;
    installation: GithubInstallationStatus;
};



function ConnectedDetails({ accountLogin }: { accountLogin: string | null }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2.5">
                <CheckCircle className="size-4 text-emerald-500" weight="fill" />
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Installed for{" "}
                    <span className="font-semibold">
                        @{accountLogin}
                    </span>
                </p>
            </div>
            <p className="text-xs text-muted-foreground">
                The app can read repository metadata and post review comments on pull
                requests.
            </p>
        </div>
    );
}

function DisconnectedDetails() {
    return (
        <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-muted/60">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                </span>
                Access public and private repositories you select
            </li>
            <li className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-muted/60">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                </span>
                Receive webhooks for pull request events
            </li>
            <li className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded bg-muted/60">
                    <span className="size-1.5 rounded-full bg-primary/60" />
                </span>
                Post AI-generated review comments on PRs
            </li>
        </ul>
    );
}

function ConnectedActions() {
    return (
        <form action={disconnectGithubApp}>
            <Button
                type="submit"
                variant="outline"
                className={statusButtonClass.danger}
            >
                <Plugs />
                Disconnect GitHub App
            </Button>
        </form>
    );
}

function DisconnectedActions({ installUrl }: { installUrl: string }) {
    return (
        <Button
            nativeButton={false}
            render={<a href={installUrl} />}
            className={statusButtonClass.success}
        >
            <GithubLogo weight="bold" />
            Install GitHub App
            <ArrowSquareOut className="size-3 opacity-80" />
        </Button>
    );
}



function ConnectionDetails({
    connected,
    accountLogin,
}: {
    connected: boolean;
    accountLogin: string | null;
}) {
    if (connected) {
        return <ConnectedDetails accountLogin={accountLogin} />;
    }

    return <DisconnectedDetails />;
}


function ConnectionActions({
    connected,
    installUrl,
}: {
    connected: boolean;
    installUrl: string;
}) {
    if (connected) {
        return <ConnectedActions />;
    }

    return <DisconnectedActions installUrl={installUrl} />;
}

export function GithubConnectCard({
    userId,
    installation,
}: GithubConnectCardProps) {
    const { connected, accountLogin } = installation;
    // Install URL encodes userId so the callback can associate the installation
    const installUrl = getGithubInstallUrl(userId);

    // Default to neutral styling; switch to green when connected
    let cardBorderClass = "";
    let iconWrapperClass = "bg-muted/60 text-muted-foreground";
    let statusTone: "success" | "neutral" = "neutral";
    let statusLabel = "Not connected";

    if (connected) {
        cardBorderClass = "border-emerald-500/20";
        iconWrapperClass =
            "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
        statusTone = "success";
        statusLabel = "Connected";
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 lg:p-8">
            <Card className={cn("card-premium max-w-2xl", cardBorderClass)}>
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span
                                className={cn(
                                    "flex size-11 items-center justify-center rounded-xl border border-border/50 transition-colors",
                                    iconWrapperClass
                                )}
                            >
                                {connected ? (
                                    <PlugsConnected className="size-5" weight="duotone" />
                                ) : (
                                    <GithubLogo className="size-5" />
                                )}
                            </span>
                            <div>
                                <CardTitle>GitHub App</CardTitle>
                                <CardDescription className="mt-0.5">
                                    Install the CodeRuby AI Code reviewer app on your GitHub account or
                                    organization to access public and private repositories.
                                </CardDescription>
                            </div>
                        </div>
                        <span className={statusBadge(statusTone)}>{statusLabel}</span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ConnectionDetails connected={connected} accountLogin={accountLogin} />
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2">
                    <ConnectionActions connected={connected} installUrl={installUrl} />
                </CardFooter>
            </Card>
        </div>
    );
}