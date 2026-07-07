import Link from 'next/link'
import { Check } from 'lucide-react'
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
    <section id="pricing" className="scroll-mt-16 border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Pricing
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Simple pricing that scales
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Start reviewing for free and upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl border p-6',
                plan.featured
                  ? 'border-primary bg-card shadow-xl shadow-primary/10 ring-1 ring-primary'
                  : 'border-border bg-card',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                    Popular
                  </span>
                )}
                {plan.comingSoon && (
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    Coming soon
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-serif text-4xl font-light">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </div>

              <Button
                nativeButton={false}
                render={<Link href={plan.href} />}
                variant={plan.featured ? 'default' : 'outline'}
                size="lg"
                disabled={plan.comingSoon}
                className="mt-6 h-11 w-full"
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
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
