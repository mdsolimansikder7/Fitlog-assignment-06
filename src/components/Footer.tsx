import logo from "@/assets/logo.png";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm text-gray-400 md:flex-row md:text-left">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog" className="h-7 w-7" />
          <span className="font-display text-lg tracking-wide text-white">FITLOG</span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}