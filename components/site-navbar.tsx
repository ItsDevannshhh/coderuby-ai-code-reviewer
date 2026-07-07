import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Social", href: "#social" },
];

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2">
          <span aria-hidden="true" className="flex size-7 items-center justify-center">
            <Image
              src="/logo2.svg"
              alt="CodeRuby Logo"
              width={28}
              height={28}
              priority
            />
          </span>
          <span className="text-lg font-semibold tracking-tight">CodeRuby</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            nativeButton={false}
            render={<Link href="/sign-in" />}
            variant="ghost"
            size="lg"
            className="hidden sm:inline-flex"
          >
            Login
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/dashboard" />}
            size="lg"
          >
            Try CodeRuby
          </Button>
        </div>
      </nav>
    </header>
  );
}