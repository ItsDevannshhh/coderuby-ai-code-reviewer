import {
  GitBranch,
  RefreshCw,
  GitPullRequest,
  BrainCircuit,
  Database,
  Cpu,
  ShieldCheck,
  History,
  BarChart3,
  Zap,
  Users,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: GitBranch,
    title: 'GitHub App integration',
    description:
      'Install once and CodeRuby connects directly to your GitHub organization and repositories.',
  },
  {
    icon: RefreshCw,
    title: 'Repository sync',
    description:
      'Keep your codebase in sync so reviews always reflect the latest state of your repository.',
  },
  {
    icon: GitPullRequest,
    title: 'AI PR reviews',
    description:
      'Every pull request is reviewed automatically with actionable, context-aware feedback.',
  },
  {
    icon: BrainCircuit,
    title: 'RAG-powered context',
    description:
      'Retrieval-augmented generation pulls in the exact code that matters before reviewing.',
  },
  {
    icon: Database,
    title: 'Pinecone vector search',
    description:
      'Embeddings stored in Pinecone let CodeRuby find relevant context across your whole repo.',
  },
  {
    icon: Cpu,
    title: 'Background processing',
    description:
      'Chunking, embedding, and indexing run in the background so your workflow is never blocked.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure authentication',
    description:
      'Secure OAuth-based auth keeps access to your repositories and reviews locked down.',
  },
  {
    icon: History,
    title: 'Review history',
    description:
      'Browse every past review and comment so nothing gets lost between pull requests.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard analytics',
    description:
      'Track reviewed PRs, synced repositories, and review activity from a single dashboard.',
  },
  {
    icon: Zap,
    title: 'Fast review generation',
    description:
      'Reviews are generated in seconds so feedback lands while the code is still fresh.',
  },
  {
    icon: Users,
    title: 'Team friendly',
    description:
      'Works across your entire team and every repository they contribute to.',
  },
  {
    icon: Sparkles,
    title: 'Modern UI',
    description:
      'A clean, fast interface that makes managing repositories and reviews effortless.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Features
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Everything you need for smarter reviews
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            A production-ready platform built to review pull requests with full
            repository context.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
