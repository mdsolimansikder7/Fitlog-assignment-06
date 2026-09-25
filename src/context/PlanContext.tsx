"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { Workout, PlanWorkout } from "@/type/workout";
import { PlanContextType } from "@/type/PlanContextType";

export const MAX_PLAN = 5;



const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]); 
  const [saved, setSaved] = useState<Workout[]>([]); 
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
    } catch (e) {}
    setLoaded(true);
  }, []);

  
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  function showToast(message: string) {
    toast(message);
  }

  function addToPlan(workout: Workout) {
    if (plan.some((w) => w.id === workout.id)) return showToast("Already in today's plan");
    if (plan.length >= MAX_PLAN) return showToast("Plan is full (max 5 lifts)");
    setPlan([...plan, { ...workout, done: false }]);
    showToast("Added to today's plan");
  }

  function saveForLater(workout: Workout) {
    if (saved.some((w) => w.id === workout.id)) return showToast("Already saved");
    setSaved([...saved, workout]);
    showToast("Saved for later");
  }

  function removeFromPlan(id: number) {
    setPlan(plan.filter((w) => w.id !== id));
    showToast("Removed from today's plan");
  }

  function removeFromSaved(id: number) {
    setSaved(saved.filter((w) => w.id !== id));
    showToast("Removed from saved");
  }

  function markDone(id: number) {
   
    setPlan(plan.filter((w) => w.id !== id));
    showToast("Marked as done");
  }

  return (
    <PlanContext.Provider
      value={{ plan, saved, loaded, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used inside PlanProvider");
  return context;
}