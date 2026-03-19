import Link from "next/link";
import Navbar from "./components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar variant="dark" />
      
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background "404" text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-[30vw] font-black font-mono text-white leading-none">
            404
          </span>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="bg-[#FFC107] border-4 border-white shadow-[8px_8px_0px_rgba(255,255,255,0.2)] p-12 text-center transform -rotate-1">
            <div className="inline-block bg-[#0A0A0A] text-[#FFC107] px-4 py-1 border-2 border-[#0A0A0A] font-mono text-sm font-black uppercase tracking-[0.2em] mb-6">
              Error_404
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black uppercase text-[#0A0A0A] mb-4 leading-[1.1]">
              System Error:
              <br/>
              Module Not Found
            </h1>
            
            <p className="text-[#0A0A0A]/80 font-bold max-w-md mx-auto mb-10 text-lg">
              The endpoint you&apos;re trying to hit doesn&apos;t exist. Our developers have been notified of this broken reference.
            </p>

            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white font-black uppercase tracking-widest text-sm border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_#0A0A0A] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
