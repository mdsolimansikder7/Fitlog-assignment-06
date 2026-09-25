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
    `btn btn-sm rounded-full font-medium ${
      active ? "btn-primary text-black" : "btn-ghost text-gray-400 hover:text-white"
    }`;

  return (
    <div className="navbar sticky top-0 z-40 border-b border-line bg-base-100/95 px-4 backdrop-blur">
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog" className="h-8 w-8" />
          <span className="hidden font-display text-xl tracking-wide sm:block">FITLOG</span>
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

      <div className="navbar-end gap-2 text-xs font-semibold sm:text-sm">
        <Link href="/my-plan" className="badge badge-lg border-none bg-accent px-3 text-black">
          Plan {plan.length}
        </Link>
        <Link href="/my-plan" className="badge badge-lg badge-outline px-3 text-gray-300">
          Saved {saved.length}
        </Link>
      </div>
    </div>
  );
}