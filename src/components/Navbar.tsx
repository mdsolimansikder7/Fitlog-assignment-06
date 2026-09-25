"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (active: boolean) =>
    `btn btn-xs sm:btn-sm rounded-full font-medium ${
      active ? "btn-primary text-black" : "btn-ghost text-gray-400 hover:text-white"
    }`;

  return (
    <div className="navbar sticky top-0 z-40 border-b border-line bg-base-100/95 px-3 py-2 backdrop-blur sm:px-4">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog" className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="hidden font-display text-lg tracking-wide sm:block sm:text-xl">FITLOG</span>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="flex gap-1">
          <Link href="/" className={linkClass(pathname === "/" || pathname.startsWith("/workout"))}>
            Workout
          </Link>
          <Link href="/my-plan" className={linkClass(pathname === "/my-plan")}>
            My Plan
          </Link>
        </div>
      </div>
      <div className="navbar-end gap-1.5 sm:gap-2">
        <Link
          href="/my-plan"
          className="badge badge-sm border-none bg-accent px-2 text-[11px] font-semibold text-black sm:px-2.5 sm:text-xs"
        >
          Plan {plan.length}
        </Link>
        <Link
          href="/my-plan"
          className="badge badge-sm badge-outline px-2 text-[11px] font-semibold text-gray-300 sm:px-2.5 sm:text-xs"
        >
          Saved {saved.length}
        </Link>
      </div>
    </div>
  );
}