import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/type/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block overflow-hidden rounded-xl border border-line bg-card transition hover:border-accent"
    >
      <img src={workout.image} alt={workout.name} className="h-52 w-full object-cover" />
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold uppercase text-accent">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl uppercase">{workout.name}</h3>
        <p className="text-sm text-gray-400">{workout.equipment}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-300">
          <span className="flex items-center gap-1"><Clock size={14} /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><Flame size={14} /> {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><Star size={14} className="text-accent" /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}