import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Star, Users, Award, Code2 } from "lucide-react";

const domains = [
  { icon: "🐍", label: "Python", tag: "Beginner Friendly" },
  { icon: "☕", label: "Java", tag: "OOP & Enterprise" },
  { icon: "⚙️", label: "C++", tag: "Systems & Performance" },
  { icon: "🎨", label: "Front-End", tag: "React & Next.js" },
  { icon: "🔧", label: "Back-End", tag: "Node & APIs" },
  { icon: "📱", label: "Full Stack", tag: "Complete Path" },
  { icon: "🗄️", label: "Database", tag: "SQL & NoSQL" },
  { icon: "🛡️", label: "Cybersecurity", tag: "Coming Soon" },
];

const steps = [
  { num: "01", title: "Apply", desc: "Choose your domain and duration. Fill a quick enrollment form." },
  { num: "02", title: "Assess", desc: "Complete a short baseline assessment so we understand your starting point." },
  { num: "03", title: "Build", desc: "Work through 5–8 project-based tasks with real-world application." },
  { num: "04", title: "Certify", desc: "Pass your quizzes, submit your projects, download your certificate." },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE @ TechCorp",
    text: "The DevIt internship was the turning point. I built a full REST API that I still show in interviews. Got hired within 3 months.",
    track: "Back-End",
  },
  {
    name: "Ali Hassan",
    role: "Frontend Dev @ Startup",
    text: "Real projects, real feedback. The curriculum is tough but fair. My certificate has credibility because the work proves it.",
    track: "Front-End",
  },
  {
    name: "Sarah Chen",
    role: "Python Dev @ Analytics Co.",
    text: "I came in knowing basic Python. The structured projects and quizzes forced me to level up fast. Highly recommended.",
    track: "Python",
  },
];

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "Not necessarily. We have tracks for beginners (Python, Front-End basics) and advanced learners. The baseline assessment helps us place you correctly.",
  },
  {
    q: "How does the certificate work?",
    a: "After completing all tasks and passing quizzes, a verifiable certificate with a unique ID is generated. You can download a PDF or add it directly to LinkedIn.",
  },
  {
    q: "What is the nominal fee?",
    a: "Fees depend on the track and duration — 1-month Essential or 3-month Intensive. Check our Pricing section for current rates.",
  },
  {
    q: "Is there mentorship?",
    a: "Yes. The Intensive plan includes weekly mentor check-ins and async chat support. All plans include the community and ticket support.",
  },
  {
    q: "Can I learn at my own pace?",
    a: "Absolutely. Once enrolled, you have 24/7 access to resources and tasks. You just need to complete everything within your chosen duration.",
  },
];

const pricingFeatures = {
  essential: [
    "5 project-based tasks",
    "Domain resource library",
    "5 module quizzes",
    "DevIt internship certificate",
    "Community access",
    "Email support",
  ],
  intensive: [
    "8 project-based tasks",
    "Domain resource library",
    "10 module quizzes + final exam",
    "DevIt internship certificate",
    "Weekly mentor sessions",
    "Priority review & feedback",
    "LinkedIn endorsement",
    "Alumni network access",
  ],
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="relative bg-[#FFC107] min-h-[90vh] flex items-center overflow-hidden border-b-4 border-[#0A0A0A]">
        {/* Dot-grid background */}
        <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-4xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-[#0A0A0A] text-[#FFC107] px-4 py-2 border-2 border-[#0A0A0A] shadow-[3px_3px_0px_rgba(0,0,0,0.3)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.15em]">
                Now Enrolling — Batch 2025
              </span>
            </div>

            <h1
              className="text-6xl md:text-8xl font-black uppercase leading-[1.0] tracking-tight text-[#0A0A0A] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              BUILD REAL.
              <br />
              <span className="relative inline-block">
                GROW FAST.
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#0A0A0A] opacity-10" />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#0A0A0A]/80 max-w-xl mb-10 leading-relaxed font-medium">
              Join DevIt&apos;s internship platform. Choose your domain, complete hands-on
              projects, ace the quizzes, and earn a certificate that actually proves your skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/internships"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white text-sm font-black uppercase tracking-widest border-2 border-[#0A0A0A] shadow-[5px_5px_0px_rgba(0,0,0,0.4)] hover:shadow-[7px_7px_0px_rgba(0,0,0,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Start Your Internship <ArrowRight size={18} />
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A0A0A] text-sm font-black uppercase tracking-widest border-2 border-[#0A0A0A] shadow-[5px_5px_0px_#0A0A0A] hover:shadow-[7px_7px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                View Curriculum
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t-2 border-[#0A0A0A]/20">
              {[
                { icon: Users, value: "2,400+", label: "Interns Enrolled" },
                { icon: Code2, value: "8 Domains", label: "& Growing" },
                { icon: Award, value: "94%", label: "Placement Rate" },
                { icon: Star, value: "4.9 / 5", label: "Avg. Rating" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0A0A0A] flex items-center justify-center">
                    <Icon size={16} className="text-[#FFC107]" />
                  </div>
                  <div>
                    <p className="text-[#0A0A0A] font-black text-lg leading-none">{value}</p>
                    <p className="text-[#0A0A0A]/60 text-xs font-semibold">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative geometric shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-[40%] hidden lg:flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0A0A0A] border-4 border-[#0A0A0A] shadow-[8px_8px_0px_rgba(0,0,0,0.3)] rotate-12 animate-float">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="text-[#FFC107] font-mono text-xs font-bold">
                  <p>{"// DevIt Intern Task #4"}</p>
                  <p className="mt-1 text-white/50">{"// REST API Design"}</p>
                </div>
                <div className="font-mono text-xs text-white space-y-1">
                  <p className="text-[#FFC107]">{"const api = new Express()"}</p>
                  <p>{"api.get('/users', auth,"}</p>
                  <p className="pl-4">{"async (req, res) => {"}</p>
                  <p className="pl-8 text-green-400">{"// ✓ Submitted"}</p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-20 right-10 w-36 h-36 bg-white border-4 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] -rotate-6 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-black text-[#FFC107]">68%</div>
                <div className="text-xs font-bold uppercase">Progress</div>
              </div>
            </div>
            <div className="absolute top-16 right-24 bg-[#FFC107] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] px-4 py-2 rotate-3">
              <p className="text-xs font-black uppercase">🏆 Task Complete!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <div className="ticker-wrap py-3 overflow-hidden">
        <div className="ticker-content">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 pr-8">
              {["Python Intern", "Java Intern", "C++ Intern", "Front-End Intern", "Back-End Intern", "Full Stack", "Data Science", "DevIt 2025"].map(
                (item) => (
                  <span key={item} className="text-sm font-black uppercase tracking-widest text-[#0A0A0A] whitespace-nowrap">
                    ◆ {item}
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section id="how-it-works" className="section-pad bg-white border-b-4 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-14">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107] mb-2">
                ◆ How It Works
              </p>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#0A0A0A]">
                Four Simple<br />Steps to Success
              </h2>
            </div>
            <p className="md:ml-auto md:max-w-xs text-sm text-gray-500 leading-relaxed">
              From enrollment to certificate — a clear, structured path with zero ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`border-2 border-[#0A0A0A] p-6 shadow-[4px_4px_0px_#0A0A0A] ${i % 2 === 0 ? "bg-white" : "bg-[#FFC107]"}`}
              >
                <div className="text-5xl font-black font-mono text-[#0A0A0A]/10 mb-3 leading-none">
                  {step.num}
                </div>
                <h3 className="text-xl font-black uppercase text-[#0A0A0A] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#0A0A0A]/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DOMAINS ══════════ */}
      <section id="domains" className="section-pad bg-[#F5F5F0] border-b-4 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107] mb-2">
              ◆ Internship Domains
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#0A0A0A]">
              Choose Your Domain
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {domains.map((domain) => (
              <Link
                key={domain.label}
                href={domain.tag === "Coming Soon" ? "#" : "/internships"}
                className={`group border-2 border-[#0A0A0A] bg-white p-6 shadow-[4px_4px_0px_#0A0A0A] flex flex-col gap-3 transition-all duration-150 hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] ${domain.tag === "Coming Soon" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-3xl">{domain.icon}</span>
                <div>
                  <h3 className="font-black text-[#0A0A0A] text-lg uppercase">{domain.label}</h3>
                  <span className="text-xs text-gray-500 font-semibold">{domain.tag}</span>
                </div>
                {domain.tag !== "Coming Soon" && (
                  <ArrowRight
                    size={16}
                    className="text-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-opacity mt-auto"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section id="pricing" className="section-pad bg-white border-b-4 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107] mb-2">
              ◆ Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#0A0A0A]">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
              Nominal fee. Real investment in your career. No hidden costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Essential */}
            <div className="border-2 border-[#0A0A0A] bg-white shadow-[6px_6px_0px_#0A0A0A] p-8">
              <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-2">1 Month</p>
                <h3 className="text-2xl font-black uppercase">Essential</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-black">₹1,999</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pricingFeatures.essential.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-5 h-5 bg-[#FFC107] border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
                      <Check size={12} className="font-black" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/internships"
                className="block w-full text-center py-3 px-6 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all bg-white"
              >
                Get Started
              </Link>
            </div>

            {/* Intensive */}
            <div className="border-2 border-[#0A0A0A] bg-[#FFC107] shadow-[6px_6px_0px_#0A0A0A] p-8 relative">
              <div className="absolute -top-4 left-6 bg-[#0A0A0A] text-[#FFC107] text-xs font-black uppercase tracking-widest px-4 py-1.5 border-2 border-[#0A0A0A]">
                Most Popular
              </div>
              <div className="border-b-2 border-[#0A0A0A] pb-6 mb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0A0A0A]/60 mb-2">3 Months</p>
                <h3 className="text-2xl font-black uppercase">Intensive</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-5xl font-black">₹4,499</span>
                  <span className="text-[#0A0A0A]/60 text-sm">/3 months</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {pricingFeatures.intensive.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-5 h-5 bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
                      <Check size={12} className="text-[#FFC107]" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/internships"
                className="block w-full text-center py-3 px-6 font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-[3px_3px_0px_rgba(0,0,0,0.4)] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.4)] hover:-translate-x-[1px] hover:-translate-y-[1px] transition-all"
              >
                Enroll Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section id="about" className="section-pad bg-[#0A0A0A] border-b-4 border-[#FFC107]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107] mb-2">
              ◆ Success Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-white">
              From Interns to<br />Developers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="border-2 border-white/20 bg-white/5 p-6 hover:border-[#FFC107]/60 transition-colors">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-9 h-9 bg-[#FFC107] border-2 border-[#FFC107] flex items-center justify-center font-black text-[#0A0A0A] text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] bg-[#FFC107] text-[#0A0A0A] px-2 py-0.5 font-black uppercase">
                      {t.track}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" className="section-pad bg-[#F5F5F0] border-b-4 border-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC107] mb-2">
              ◆ FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase text-[#0A0A0A]">
              Got Questions?
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border-2 border-[#0A0A0A] bg-white shadow-[3px_3px_0px_#0A0A0A]">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none font-bold text-sm uppercase tracking-wide select-none">
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className="shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 pt-2 border-t-2 border-[#0A0A0A] text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA BANNER ══════════ */}
      <section className="bg-[#FFC107] border-b-4 border-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-[#0A0A0A] mb-6">
            Ready to Start<br />Building?
          </h2>
          <p className="text-[#0A0A0A]/70 max-w-md mx-auto mb-10 font-medium">
            Join 2,400+ students who have turned their DevIt internship into a career.
          </p>
          <Link
            href="/internships"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#0A0A0A] text-white font-black uppercase tracking-widest text-base border-2 border-[#0A0A0A] shadow-[6px_6px_0px_rgba(0,0,0,0.4)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.4)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"
          >
            Start Your Internship Today <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
