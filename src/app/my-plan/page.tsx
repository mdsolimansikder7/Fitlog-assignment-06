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
    `rounded-md px-5 py-2 text-sm font-semibold ${
      tab === name ? "bg-accent text-black" : "border border-line text-gray-300"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl uppercase">My Plan</h1>
      <p className="text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-card p-4 text-center">
            <p className="font-display text-3xl text-accent">{value}</p>
            <p className="text-xs uppercase text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        <button onClick={() => setTab("plan")} className={tabClass("plan")}>Today&apos;s Plan</button>
        <button onClick={() => setTab("saved")} className={tabClass("saved")}>Saved</button>
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {!loaded && <p className="py-10 text-center text-gray-400">Loading workouts…</p>}

        {loaded && list.length === 0 && (
          <div className="rounded-xl border border-dashed border-line py-14 text-center">
            <h2 className="font-display text-2xl uppercase">Nothing here yet</h2>
            <p className="mt-2 text-gray-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-5 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-black">
              Go to workouts
            </Link>
          </div>
        )}

        {loaded &&
          list.map((w) => (
            <div
              key={w.id}
              className="flex flex-col gap-4 rounded-xl border border-line bg-card p-4 sm:flex-row sm:items-center"
            >
              <img src={w.image} alt={w.name} className="h-24 w-full rounded-lg object-cover sm:w-24" />
              <div className="flex-1">
                <h3 className="font-display text-lg uppercase">{w.name}</h3>
                <p className="text-sm text-gray-400">{w.equipment}</p>
                <div className="mt-1 flex gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1"><Clock size={14} /> {w.duration} min</span>
                  <span className="flex items-center gap-1"><Flame size={14} /> {w.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Star size={14} className="text-accent" /> {w.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/workout/${w.id}`} className="rounded-md border border-gray-500 px-3 py-2 text-sm hover:border-accent">
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => markDone(w.id)}
                    className="flex items-center gap-1 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black"
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