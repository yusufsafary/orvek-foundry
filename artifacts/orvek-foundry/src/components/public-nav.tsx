import { Link } from "wouter";

function LogoMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="50" stroke="currentColor" strokeWidth="16" fill="none"/>
      <line x1="90" y1="52" x2="90" y2="72" stroke="hsl(220 15% 10%)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="90" y1="108" x2="90" y2="128" stroke="hsl(220 15% 10%)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="52" y1="90" x2="72" y2="90" stroke="hsl(220 15% 10%)" strokeWidth="4" strokeLinecap="round"/>
      <line x1="108" y1="90" x2="128" y2="90" stroke="hsl(220 15% 10%)" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="90" cy="90" r="7" fill="currentColor"/>
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

export default function PublicNav() {
  return (
    <nav className="border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-accent hover:opacity-80 transition-opacity">
          <LogoMark size={20} />
          <span className="font-semibold tracking-tight text-sm text-foreground">Orvek Foundry</span>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="https://x.com/orvekfoundry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Follow @orvekfoundry on X"
          >
            <XIcon size={16} />
          </a>
          <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
          <Link href="/auth" className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90 transition-opacity font-medium">Get access</Link>
        </div>
      </div>
    </nav>
  );
}

export { LogoMark };
