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

  const linkClass = (active: boolean, mobile = false) =>
    `btn ${mobile ? "btn-sm w-full justify-start" : "btn-xs sm:btn-sm"} rounded-full font-medium ${
      active ? "btn-primary text-black" : "btn-ghost text-gray-400 hover:text-white"
    }`;

  const PlanBadge = (size: "sm" | "lg") => (
    <>
      <Link
        href="/my-plan"
        className={`badge ${size === "lg" ? "badge-lg px-3 text-sm" : "badge-sm px-2 text-[11px]"} border-none bg-accent font-semibold text-black`}
      >
        Plan {plan.length}
      </Link>
      <Link
        href="/my-plan"
        className={`badge ${size === "lg" ? "badge-lg px-3 text-sm" : "badge-sm px-2 text-[11px]"} badge-outline font-semibold text-gray-300`}
      >
        Saved {saved.length}
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-2">

        <div className="hidden items-center justify-between sm:flex">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="FitLog" className="h-8 w-8" />
            <span className="font-display text-xl tracking-wide">FITLOG</span>
          </Link>
          <div className="flex gap-1">
            <Link href="/" className={linkClass(pathname === "/" || pathname.startsWith("/workout"))}>
              Workout
            </Link>
            <Link href="/my-plan" className={linkClass(pathname === "/my-plan")}>
              My Plan
            </Link>
          </div>
          <div className="flex items-center gap-2">{PlanBadge("lg")}</div>
        </div>

        <div className="flex items-center justify-between sm:hidden">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image src={logo} alt="FitLog" className="h-7 w-7" />
          </Link>

          <div className="flex flex-1 items-center justify-center gap-1.5">{PlanBadge("sm")}</div>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="btn btn-ghost btn-sm px-2"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-2 border-t border-line pb-3 pt-3 sm:hidden">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={linkClass(pathname === "/" || pathname.startsWith("/workout"), true)}
            >
              Workout
            </Link>
            <Link href="/my-plan" onClick={() => setOpen(false)} className={linkClass(pathname === "/my-plan", true)}>
              My Plan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}