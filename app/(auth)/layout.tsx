import { requireUnauth } from "@/features/auth/actions";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireUnauth();
    return (
        <div className="relative flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
            {/* Radial glow behind the card */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse 50% 40% at 50% 40%, oklch(0.65 0.2 15 / 6%) 0%, transparent 70%)',
                }}
            />
            {/* Subtle grid pattern */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(oklch(0.5 0 0 / 50%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0 0 / 50%) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />
            <div className="relative w-full max-w-sm">{children}</div>
        </div>
    );
}