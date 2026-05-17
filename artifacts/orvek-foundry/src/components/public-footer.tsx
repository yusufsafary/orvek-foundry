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

export default function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="font-semibold tracking-tight text-sm text-foreground block mb-2">Orvek Foundry</Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">Move with signal, not noise. The intelligent career system for engineers and product leaders.</p>
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
          <span className="text-xs text-muted-foreground">Built for people who treat their career like a product.</span>
        </div>
      </div>
    </footer>
  );
}
