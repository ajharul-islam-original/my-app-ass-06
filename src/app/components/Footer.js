import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1b1d21] bg-black">
      <div className="mx-auto flex min-h-[120px] max-w-[1500px] items-center justify-between gap-6 px-6 md:px-8">

        {/* Logo */}
        <div className="flex items-center gap-3">

          {/* এখানে তোমার Logo বসাবে */}
          <div className="flex h-8 w-8 items-center justify-center">
            
                <Image src="/logo.png"alt="FitLog" width={32} height={32} className="h-8 w-8 object-contain"/>
                      
          </div>

          <span className="text-[17px] font-extrabold tracking-tight text-white">
            FITLOG
          </span>

        </div>

        {/* Copyright */}
        <p className="text-right text-[13px] font-medium text-[#555860]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}