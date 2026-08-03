import Link from 'next/link'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
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
      {/* Radial glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.65 0.2 15 / 10%) 0%, transparent 60%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.5 0 0 / 50%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0 0 / 50%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement badge */}
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Now available as a GitHub App
          </span>

          {/* Headline */}
          <h1 className="animate-slide-up mt-8 text-balance font-serif text-5xl leading-[1.05] font-light tracking-tight sm:text-6xl lg:text-7xl">
            AI code reviews that{' '}
            <span className="text-gradient-ruby">understand</span>{' '}
            your entire repository
          </h1>

          {/* Subheadline */}
          <p className="animate-slide-up delay-1 mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            CodeRuby reviews pull requests using full repository context instead of
            looking at changed files in isolation, so every comment actually
            understands your codebase.
          </p>

          {/* CTA buttons */}
          <div className="animate-slide-up delay-2 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<Link href="/dashboard" />}
              size="lg"
              className="glow-ruby h-12 px-7 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Try CodeRuby
              <ArrowRight className="size-4" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="#process" />}
              variant="outline"
              size="lg"
              className="h-12 px-7 text-sm"
            >
              See how it works
            </Button>
          </div>

          {/* Feature highlights */}
          <ul className="animate-slide-up delay-3 mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-3 text-primary" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dashboard preview */}
        <div className="animate-scale-in delay-4 relative mx-auto mt-20 max-w-4xl">
          <div className="card-premium rounded-2xl p-2">
            <div className="overflow-hidden rounded-xl border border-border/60">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-surface-1 px-4 py-3">
                <span className="size-2.5 rounded-full bg-red-500/40" />
                <span className="size-2.5 rounded-full bg-amber-500/40" />
                <span className="size-2.5 rounded-full bg-emerald-500/40" />
                <span className="ml-3 rounded-md bg-muted/50 px-3 py-0.5 text-[11px] text-muted-foreground">
                  app.coderuby.dev/dashboard
                </span>
              </div>
              {/* Mock dashboard content */}
              <div className="grid gap-4 bg-background p-5 sm:grid-cols-3">
                {[
                  { label: 'PRs reviewed', value: '128', color: 'bg-primary/80' },
                  { label: 'Repos synced', value: '14', color: 'bg-emerald-500/60' },
                  { label: 'Avg review time', value: '38s', color: 'bg-blue-500/60' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border/60 bg-card p-4 text-left transition-colors hover:border-border"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${stat.color}`} />
                      <span className="text-[11px] text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-bold tracking-tight">{stat.value}</p>
                  </div>
                ))}
                {/* Bar chart */}
                <div className="rounded-xl border border-border/60 bg-card p-4 sm:col-span-3">
                  <div className="flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-primary/60 to-primary/30 transition-all duration-500"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow effect behind the card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-30 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, oklch(0.65 0.2 15 / 20%), transparent 70%)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
