import { Link } from "wouter";

const FOOTER_LINKS = {
  Product: [
    { label: "How it works", href: "/how-to" },
    { label: "Resume AI", href: "/auth" },
    { label: "Dashboard", href: "/auth" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Help & FAQ", href: "/help" },
    { label: "Status", href: "/status" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal" },
    { label: "Terms of Service", href: "/legal" },
    { label: "Cookies", href: "/cookies" },
  ],
};

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function TelegramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

export default function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="font-semibold tracking-tight text-sm text-foreground block mb-2">Orvek Foundry</Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">Move with signal, not noise. The intelligent career system for engineers and product leaders.</p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://x.com/ovrefoundry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow @ovrefoundry on X"
              >
                <XIcon size={13} />
                <span>@ovrefoundry</span>
              </a>
              <a
                href="https://t.me/ovrekfoundry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Join Telegram channel"
              >
                <TelegramIcon size={13} />
                <span>Telegram</span>
              </a>
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">{group}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Orvek Foundry. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/ovrefoundry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Follow @ovrefoundry on X"
            >
              <XIcon size={12} />
              <span>@ovrefoundry</span>
            </a>
            <a
              href="https://t.me/ovrekfoundry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Join Telegram channel"
            >
              <TelegramIcon size={12} />
              <span>Telegram</span>
            </a>
            <span className="text-xs text-muted-foreground">Built for people who treat their career like a product.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
