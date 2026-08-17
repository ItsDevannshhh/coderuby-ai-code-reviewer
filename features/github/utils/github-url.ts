export function getGithubInstallUrl(userId: string) {
    const appName =
        process.env.NEXT_PUBLIC_GITHUB_APP_NAME ||
        process.env.GITHUB_APP_NAME ||
        "coderuby-development";
    const url = new URL(`https://github.com/apps/${appName}/installations/new`);
    // `state` round-trips through GitHub so we can link the installation to this user.
    url.searchParams.set("state", userId);
    return url.toString();
}
