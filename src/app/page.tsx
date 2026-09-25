"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/api-file/api";
import { Workout } from "@/type/workout";

type SortKey = "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getWorkouts()
      .then((data) => setWorkouts(data))
      .catch(() => setError("Could not load workouts. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const shown = workouts
    .filter((w) => {
      const text = (w.name + " " + w.muscleGroups.join(" ")).toLowerCase();
      return text.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });

  return (
    <>
      <Hero />
      <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-2xl uppercase sm:text-3xl">The Library</h2>
            <p className="text-sm text-gray-400 sm:text-base">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or tag"
              className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm outline-none focus:border-accent sm:w-auto"
            />
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort by"
                className="w-full appearance-none rounded-md border border-line bg-card py-2 pl-3 pr-9 text-sm outline-none focus:border-accent sm:w-auto"
              >
                <option value="duration">Sort By: Duration</option>
                <option value="calories">Sort By: Calories</option>
                <option value="rating">Sort By: Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
          </div>
        )}
        {error && <p className="py-10 text-center text-red-400">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {shown.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
        {!loading && !error && shown.length === 0 && (
          <p className="py-10 text-center text-gray-400">No workouts found.</p>
        )}
      </section>
    </>
  );
}