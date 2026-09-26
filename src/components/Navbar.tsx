"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [open, setOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `btn btn-xs sm:btn-sm rounded-full font-medium ${
      active
        ? "btn-primary text-black"
        : "btn-ghost text-gray-400 hover:text-white"
    }`;

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-base-100/95 backdrop-blur">
      <div className="relative mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="btn btn-ghost btn-sm px-2 sm:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Image
                src={logo}
                alt="FitLog"
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="font-display text-lg tracking-wide sm:text-xl">
                FITLOG
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:gap-1">
            <Link
              href="/"
              className={linkClass(
                pathname === "/" || pathname.startsWith("/workout"),
              )}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              className={linkClass(pathname === "/my-plan")}
            >
              My Plan
            </Link>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/my-plan?tab=plan"
              className="badge badge-sm sm:badge-lg border-none bg-accent px-2 text-[11px] font-semibold text-black sm:px-3 sm:text-sm"
            >
              Plan {plan.length}
            </Link>
            <Link
              href="/my-plan?tab=saved"
              className="badge badge-sm sm:badge-lg badge-outline px-2 text-[11px] font-semibold text-gray-300 sm:px-3 sm:text-sm"
            >
              Saved {saved.length}
            </Link>
          </div>
        </div>
        {open && (
          <div className="absolute left-4 top-full z-50 mt-2 w-40 rounded-lg border border-line bg-card p-1.5 shadow-lg sm:hidden">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`mb-1 block ${linkClass(pathname === "/" || pathname.startsWith("/workout"))}`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className={`block ${linkClass(pathname === "/my-plan")}`}
            >
              My Plan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
