import Link from "next/link";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--black)] flex flex-col">
      <Navbar variant="dark" />
      
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background "404" text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-[30vw] font-black font-mono text-[var(--white)] leading-none">
            404
          </span>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="theme-fixed-yellow bg-[#FFC107] text-[var(--black)] border-4 border-white shadow-[8px_8px_0px_rgba(var(--white-rgb),0.2)] p-12 text-center transform -rotate-1">
            <div className="inline-block bg-[var(--black)] text-[#FFC107] px-4 py-1 border-2 border-[var(--black)] font-mono text-sm font-black uppercase tracking-[0.2em] mb-6">
              Error_404
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black uppercase text-[var(--black)] mb-4 leading-[1.1]">
              System Error:
              <br/>
              Module Not Found
            </h1>
            
            <p className="text-[rgba(var(--black-rgb),0.8)] font-bold max-w-md mx-auto mb-10 text-lg">
              The endpoint you&apos;re trying to hit doesn&apos;t exist. Our developers have been notified of this broken reference.
            </p>

            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--black)] text-[var(--white)] font-black uppercase tracking-widest text-sm border-2 border-[var(--black)] shadow-[4px_4px_0px_var(--black)] hover:shadow-[6px_6px_0px_var(--black)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
