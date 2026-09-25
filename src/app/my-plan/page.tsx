"use client";
import { useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { PlanWorkout } from "@/type/workout";

export default function MyPlan() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markDone } = usePlan();
  const [tab, setTab] = useState<"plan" | "saved">("plan");

  const list: PlanWorkout[] = tab === "plan" ? plan : saved.map((w) => ({ ...w, done: false }));
  const minutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const calories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const stats: [string, number][] = [
    ["Exercises", plan.length],
    ["Minutes", minutes],
    ["Calories", calories],
  ];

  const tabClass = (name: "plan" | "saved") =>
    `rounded-md px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm ${
      tab === name ? "bg-accent text-black" : "border border-line text-gray-300"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-10">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">My Plan</h1>
      <p className="text-sm text-gray-400 sm:text-base">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-card p-3 text-center sm:p-4">
            <p className="font-display text-2xl text-accent sm:text-3xl">{value}</p>
            <p className="text-[10px] uppercase text-gray-400 sm:text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-2 sm:mt-6">
        <button onClick={() => setTab("plan")} className={tabClass("plan")}>Today&apos;s Plan</button>
        <button onClick={() => setTab("saved")} className={tabClass("saved")}>Saved</button>
      </div>

      {/* List */}
      <div className="mt-5 space-y-4 sm:mt-6">
        {!loaded && <p className="py-10 text-center text-gray-400">Loading workouts…</p>}

        {loaded && list.length === 0 && (
          <div className="rounded-xl border border-dashed border-line px-4 py-12 text-center sm:py-14">
            <h2 className="font-display text-xl uppercase sm:text-2xl">Nothing here yet</h2>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="mt-5 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-black">
              Go to workouts
            </Link>
          </div>
        )}

        {loaded &&
          list.map((w) => (
            <div
              key={w.id}
              className="flex flex-col gap-4 rounded-xl border border-line bg-card p-3 sm:flex-row sm:items-center sm:p-4"
            >
              <img src={w.image} alt={w.name} className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-24" />
              <div className="flex-1">
                <h3 className="font-display text-base uppercase sm:text-lg">{w.name}</h3>
                <p className="text-sm text-gray-400">{w.equipment}</p>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-300 sm:gap-4 sm:text-sm">
                  <span className="flex items-center gap-1"><Clock size={14} /> {w.duration} min</span>
                  <span className="flex items-center gap-1"><Flame size={14} /> {w.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-accent" /> {w.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/workout/${w.id}`} className="rounded-md border border-gray-500 px-3 py-2 text-xs hover:border-accent sm:text-sm">
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => markDone(w.id)}
                    className="flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-xs font-semibold text-black sm:text-sm"
                  >
                    <Check size={16} /> Mark as Done
                  </button>
                )}
                <button
                  onClick={() => (tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id))}
                  aria-label="Remove"
                  className="rounded-md border border-line p-2 hover:border-red-400 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}