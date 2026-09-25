import { ArrowDown } from "lucide-react";
import banner from "@/assets/banner.png"
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 md:pb-16 md:pt-10">
     
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-[#121317] p-6 sm:p-10 md:grid-cols-2 md:px-16 md:py-14">
        
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-accent">
            Workout Library
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>
          
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold tracking-wide text-black hover:opacity-90"
          >
            BROWSE WORKOUTS <ArrowDown size={14} />
          </a>
        </div>

       
        <div className="flex justify-center md:justify-end">
          <Image
            src={banner}
            alt="Gym banner"
            className="h-56 w-auto object-contain sm:h-72 md:h-80 md:pr-8"
          />
        </div>
      </div>
    </section>
  );
}