import Link from 'next/link'
import Image from 'next/image'
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
            <footer className="border-t border-border/40 bg-background">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="/logo2.svg"
                            alt="CodeRuby"
                            width={20}
                            height={20}
                            className="opacity-60"
                        />
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} CodeRuby. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-muted-foreground">
                        <Link href="#" className="transition-colors hover:text-primary">
                            Privacy
                        </Link>
                        <Link href="#" className="transition-colors hover:text-primary">
                            Terms
                        </Link>
                        <Link href="/sign-in" className="transition-colors hover:text-primary">
                            Login
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
