import Link from 'next/link'
import { SiteNavbar } from '@/components/site-navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { ProcessSection } from '@/components/process-section'
import { PricingSection } from '@/components/pricing-section'
import { SocialSection } from '@/components/social-section'

export default function Page() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteNavbar />
            <main>
                <HeroSection />
                <FeaturesSection />
                <ProcessSection />
                <PricingSection />
                <SocialSection />
            </main>
            <footer className="border-t border-border bg-background">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} CodeRuby. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link href="#" className="transition-colors hover:text-foreground">
                            Privacy
                        </Link>
                        <Link href="#" className="transition-colors hover:text-foreground">
                            Terms
                        </Link>
                        <Link href="/sign-in" className="transition-colors hover:text-foreground">
                            Login
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
