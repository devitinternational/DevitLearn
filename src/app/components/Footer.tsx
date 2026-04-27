import Link from "next/link";
import DevItLogo from "./DevItLogo";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Internships", href: "/internships" },
    { label: "Resources", href: "/resources" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Certificates", href: "/dashboard/certificate" },
  ],
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "/#faq" },
    { label: "Help Center", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socials = [
  { icon: Github, href: "#", label: "Github" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--black)] text-[var(--white)] border-t-4 border-[#FFC107] transition-colors duration-200">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <DevItLogo size="md" variant="white" showWordmark={true} />
            <p className="mt-4 text-sm text-[var(--gray-400)] leading-relaxed max-w-xs">
              Build real production-grade projects. Earn verifiable certificates.
              Launch your developer career with DevIt.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border-2 border-[rgba(var(--white-rgb),0.3)] flex items-center justify-center hover:border-[#FFC107] hover:text-[#FFC107] transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[#FFC107] mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--gray-400)] hover:text-[var(--white)] transition-colors hover:underline underline-offset-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(var(--white-rgb),0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--gray-500)]">
            © 2025 DevIt L.H.M.M. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full theme-fixed-yellow bg-[#FFC107] animate-pulse" />
            <span className="text-xs text-[var(--gray-500)] font-mono">
              Platform Status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
