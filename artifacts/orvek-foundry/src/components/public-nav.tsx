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

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
        <div className="flex items-center gap-1">
          <a
            href="https://x.com/ovrefoundry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            aria-label="Follow @ovrefoundry on X"
          >
            <XIcon size={16} />
          </a>
          <a
            href="https://t.me/ovrekfoundry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            aria-label="Join Telegram channel"
          >
            <TelegramIcon size={16} />
          </a>
          <div className="w-px h-4 bg-border mx-2" />
          <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2">Sign in</Link>
          <Link href="/auth" className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90 transition-opacity font-medium ml-1">Get access</Link>
        </div>
      </div>
    </nav>
  );
}

export { LogoMark };
