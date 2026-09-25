"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, Bookmark } from "lucide-react";
import { getWorkout } from "@/api-file/api";
import { usePlan, MAX_PLAN } from "@/context/PlanContext";
import { Workout } from "@/type/workout";

export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, saveForLater } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkout(id)
      .then((data) => setWorkout(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      </div>
    );
  }
  if (error || !workout || !workout.name) {
    return <p className="py-32 text-center text-gray-400">Workout not found.</p>;
  }

  const planFull = plan.length >= MAX_PLAN && !plan.some((w) => w.id === workout.id);

  const specs: [string, string | number][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:gap-8 sm:py-10 md:grid-cols-2">
      {/* Left: image */}
      <img src={workout.image} alt={workout.name} className="w-full rounded-xl object-cover md:h-full" />

      {/* Right: details */}
      <div>
        <h1 className="font-display text-3xl uppercase sm:text-4xl">{workout.name}</h1>
        <p className="mt-2 text-sm text-gray-400 sm:text-base">{workout.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-accent">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="mb-2 mt-5 font-display text-lg uppercase sm:mt-6 sm:text-xl">Key Specs</h2>
        <div className="divide-y divide-line rounded-lg border border-line bg-card">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-2 text-sm">
              <span className="uppercase text-gray-400">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-2 mt-5 font-display text-lg uppercase sm:mt-6 sm:text-xl">Instructions</h2>
        <ol className="space-y-3">
          {workout.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => addToPlan(workout)}
            disabled={planFull}
            className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={18} /> Add to today&apos;s plan
          </button>
          <button
            onClick={() => saveForLater(workout)}
            className="flex items-center justify-center gap-2 rounded-md border border-gray-500 px-6 py-3 font-semibold hover:border-accent"
          >
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}