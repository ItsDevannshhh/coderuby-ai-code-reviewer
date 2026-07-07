const steps = [
  { title: 'Install GitHub App', description: 'Add CodeRuby to your GitHub organization in a click.' },
  { title: 'Connect repository', description: 'Choose the repositories you want CodeRuby to review.' },
  { title: 'Sync repository', description: 'CodeRuby pulls in your codebase and keeps it up to date.' },
  { title: 'Chunk codebase', description: 'Your code is split into meaningful, reviewable chunks.' },
  { title: 'Generate embeddings', description: 'Each chunk is turned into embeddings for semantic search.' },
  { title: 'Store in Pinecone', description: 'Embeddings are indexed in Pinecone for fast retrieval.' },
  { title: 'Open pull request', description: 'You open a PR just like you always do.' },
  { title: 'GitHub webhook', description: 'A webhook instantly notifies CodeRuby of the new PR.' },
  { title: 'Retrieve relevant context', description: 'RAG pulls the most relevant code from your repository.' },
  { title: 'AI reviews PR', description: 'The model reviews your changes with full repository context.' },
  { title: 'Comment posted automatically', description: 'Review feedback is posted back on the pull request.' },
]

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-16 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light tracking-tight sm:text-5xl">
            From install to review, automatically
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            CodeRuby understands your repository before it ever reviews a line of
            your pull request.
          </p>
        </div>

        <ol className="relative mt-14 border-l border-border pl-8">
          {steps.map((item, index) => (
            <li key={item.title} className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[41px] flex size-8 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-primary"
              >
                {index + 1}
              </span>
              <h3 className="text-base font-semibold leading-none">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
