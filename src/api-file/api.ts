import { Workout } from "@/types/workout";


const BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to load workouts");
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Workout not found");
  return res.json();
}