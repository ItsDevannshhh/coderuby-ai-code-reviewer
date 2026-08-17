
import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: process.env.GITHUB_APP_NAME || "coderuby-development",
});