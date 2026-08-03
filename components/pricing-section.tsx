import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    cadence: '/ month',
    description: 'For trying CodeRuby on a personal project.',
    features: [
      '5 reviews / month',
      '1 repository',
      'AI PR reviews',
      'Repository-aware context',
      'Community support',
    ],
    cta: 'Get started',
    href: '/dashboard',
    featured: false,
    comingSoon: false,
  },
  {
    name: 'Pro',
    price: '$19',
    cadence: '/ month',
    description: 'For developers and teams shipping every day.',
    features: [
      'Unlimited reviews',
      'More than 20 repositories',
      'Priority review processing',
      'RAG-powered context',
      'Review history & analytics',
      'Priority support',
    ],
    cta: 'Try CodeRuby',
    href: '/dashboard',
    featured: true,
    comingSoon: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    description: 'For organizations with advanced needs.',
    features: [
      'Unlimited repositories',
      'SSO & advanced security',
      'Dedicated support',
      'Custom integrations',
    ],
    cta: 'Coming soon',
    href: '#pricing',
    featured: false,
    comingSoon: true,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-16 border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Pricing
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Simple pricing that{' '}
            <span className="text-gradient-ruby">scales</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Start reviewing for free and upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'card-premium rounded-2xl p-7',
                plan.featured &&
                  'border-primary/30 ring-1 ring-primary/20 shadow-xl shadow-primary/5',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                {plan.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="size-3" />
                    Popular
                  </span>
                )}
                {plan.comingSoon && (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-light tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </div>

              <Button
                nativeButton={false}
                render={<Link href={plan.href} />}
                variant={plan.featured ? 'default' : 'outline'}
                size="lg"
                disabled={plan.comingSoon}
                className={cn(
                  'mt-7 h-11 w-full',
                  plan.featured && 'glow-ruby bg-primary text-primary-foreground hover:bg-primary/90',
                )}
              >
                {plan.cta}
              </Button>

              <ul className="mt-7 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3 shrink-0 text-primary" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
