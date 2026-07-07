import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const highlights = [
  'GitHub App',
  'AI Powered',
  'Repository Aware',
  'Automatic Reviews',
]

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Now available as a GitHub App
          </span>

          <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] font-light tracking-tight sm:text-6xl lg:text-7xl">
            AI code reviews that understand your entire repository
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            CodeRuby reviews pull requests using full repository context instead of
            looking at changed files in isolation, so every comment actually
            understands your codebase.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/dashboard" />} size="lg" className="h-11 px-6">
              Try CodeRuby
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="#process" />}
              variant="outline"
              size="lg"
              className="h-11 px-6"
            >
              See how it works
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Check className="size-4 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-xl shadow-foreground/5">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="ml-3 text-xs text-muted-foreground">
                  app.coderuby.dev/dashboard
                </span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3">
                {[
                  { label: 'PRs reviewed', value: '128', tone: 'bg-primary' },
                  { label: 'Repos synced', value: '14', tone: 'bg-chart-3' },
                  { label: 'Avg review time', value: '38s', tone: 'bg-chart-2' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-background p-4 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${stat.tone}`} />
                      <span className="text-xs text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
                <div className="rounded-lg border border-border bg-background p-4 sm:col-span-3">
                  <div className="flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary/80"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
