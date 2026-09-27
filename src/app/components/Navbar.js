"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  getPlan,
  getSaved,
} from "../lib/storage";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    function updateCounts() {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    }

    updateCounts();

    window.addEventListener(
      "fitlog-storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "fitlog-storage",
        updateCounts
      );
    };
  }, []);

  const isWorkouts = pathname === "/";
  const isMyPlan = pathname === "/plan";

  return (
    <header className="border-b border-[#1b1d21] bg-[#090a0d]">
      <div className="mx-auto flex h-[104px] max-w-[1500px] items-center justify-between px-6 md:px-8">

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>

          <span className="text-[20px] font-extrabold tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">

          <Link
            href="/"
            className={`rounded-full px-5 py-2.5 text-[14px] font-semibold transition ${
              isWorkouts
                ? "bg-[#19220b] text-[#b7ff00]"
                : "text-[#858891] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/plan"
            className={`rounded-full px-5 py-2.5 text-[14px] font-semibold transition ${
              isMyPlan
                ? "bg-[#19220b] text-[#b7ff00]"
                : "text-[#858891] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

        <div className="hidden items-center gap-7 md:flex">

          <Link
            href="/plan"
            className="flex items-center gap-2 text-[14px] text-[#858891] transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#b7ff00] px-1.5 text-[12px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/plan"
            className="flex items-center gap-2 text-[14px] text-[#858891] transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#27292e] px-1.5 text-[12px] text-[#858891]">
              {savedCount}
            </span>
          </Link>

        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#27292e] text-white md:hidden"
          aria-label="Open menu"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-white"></span>
            <span className="block h-0.5 w-5 bg-white"></span>
            <span className="block h-0.5 w-5 bg-white"></span>
          </div>
        </button>

      </div>

      {menuOpen && (
        <div className="border-t border-[#1b1d21] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 font-semibold transition ${
                isWorkouts
                  ? "bg-[#19220b] text-[#b7ff00]"
                  : "text-[#858891] hover:bg-[#111317] hover:text-white"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/plan"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 font-semibold transition ${
                isMyPlan
                  ? "bg-[#19220b] text-[#b7ff00]"
                  : "text-[#858891] hover:bg-[#111317] hover:text-white"
              }`}
            >
              My Plan
            </Link>
            <div className="mt-3 flex items-center justify-between border-t border-[#1b1d21] pt-4">

              <Link
                href="/plan"
                className="flex items-center gap-2 text-[14px] text-[#858891] transition hover:text-white"
              >
                <span>Plan</span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#b7ff00] px-1.5 text-[12px] font-bold text-black">
                  {planCount}
                </span>
              </Link>

              <Link
                href="/plan"
                className="flex items-center gap-2 text-[14px] text-[#858891] transition hover:text-white"
              >
                <span>Saved</span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-[#27292e] px-1.5 text-[12px] text-[#858891]">
                  {savedCount}
                </span>
              </Link>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}