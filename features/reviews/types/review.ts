
export type PrFile = {
  /** Repository-relative path, e.g. `src/app/page.tsx` */
  filePath: string;
  /** Unified diff patch from the GitHub API (`file.patch`) */
  patch: string;
};


export type CodeChunk = {
  /** Unique id used as the Pinecone record id, e.g. `pr-42--src/foo.ts--part-0` */
  id: string;
  /** Source file path this chunk came from */
  filePath: string;
  /** Raw text stored in Pinecone and searched at review time */
  text: string;
};


export type PullRequestWebhookPayload = {
  /** Webhook action, e.g. `opened`, `synchronize`, `reopened` */
  action: string;
  /** GitHub App installation that received the event */
  installation: { id: number };
  repository: { full_name: string };
  pull_request: {
    number: number;
    title: string;
    user: { login: string } | null;
    head: { sha: string };
    base: { ref: string };
  };
};