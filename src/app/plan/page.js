"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getPlan,
  getSaved,
  removeFromPlan,
  removeFromSaved,
} from "../lib/storage";

export default function Home() {
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("Duration");
  // anik

const [plan, setPlan] = useState([]);
const [saved, setSaved] = useState([]);
const [doneItems, setDoneItems] = useState([]);


useEffect(() => {
  function handleStorageUpdate() {
    setPlan(getPlan());
    setSaved(getSaved());
  }

  handleStorageUpdate();

  window.addEventListener("fitlog-storage", handleStorageUpdate);

  return () => {
    window.removeEventListener(
      "fitlog-storage",
      handleStorageUpdate
    );
  };
}, []);



  function handleRemovePlan(id) {
    const newPlan = removeFromPlan(id);
    setPlan(newPlan);
  }

  function handleRemoveSaved(id) {
    const newSaved = removeFromSaved(id);
    setSaved(newSaved);
  }

  function handleDone(id) {
    setDoneItems((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  }

  function sortExercises(items) {
    const sorted = [...items];

    if (sortBy === "Duration") {
      sorted.sort(
        (a, b) => Number(a.duration || 0) - Number(b.duration || 0)
      );
    }

    if (sortBy === "Calories") {
      sorted.sort(
        (a, b) =>
          Number(a.caloriesBurned || 0) -
          Number(b.caloriesBurned || 0)
      );
    }

    if (sortBy === "Rating") {
      sorted.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return sorted;
  }

  const currentItems =
    activeTab === "today" ? plan : saved;

  const sortedItems = sortExercises(currentItems);

  const totalMinutes = plan.reduce(
    (total, item) => total + Number(item.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, item) =>
      total + Number(item.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#0d0f13] px-6 py-10 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1450px]">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight">
            My Plan
          </h1>

          <p className="mt-2 text-base text-[#858b97]">
            Cap of twelve lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#242933] bg-[#12151b]">

          <div className="border-r border-[#20242c] px-7 py-8">
            <p className="text-sm text-[#858b97]">
              Exercises
            </p>

            <h2 className="mt-2 text-4xl font-extrabold text-[#c8ff00]">
              {plan.length}
            </h2>
          </div>

          <div className="border-r border-[#20242c] px-7 py-8">
            <p className="text-sm text-[#858b97]">
              Minutes
            </p>

            <h2 className="mt-2 text-4xl font-extrabold text-white">
              {totalMinutes}
            </h2>
          </div>

          <div className="px-7 py-5">
            <p className="text-sm text-[#858b97]">
              Calories
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-white">
              {totalCalories}
            </h2>
          </div>

        </div>

        <div className="mt-9 flex items-center justify-between">

          {/* TABS */}
          <div className="flex rounded-xl border border-[#242933] bg-[#12151b] p-1">

            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-7 py-2.5 text-sm font-medium transition ${
                activeTab === "today"
                  ? "bg-[#1c212a] text-white"
                  : "text-[#858b97] hover:text-white"
              }`}
            >
              Todays Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${
                activeTab === "saved"
                  ? "bg-[#20252f] text-white shadow-inner"
                  : "text-[#858b97] hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex items-center gap-3">

            <span className="text-sm text-[#858b97]">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-[#303641] bg-[#151920] px-2 py-1.5 text-sm text-white outline-none"
            >
              <option>Duration</option>
              <option>Calories</option>
              <option>Rating</option>
            </select>

          </div>

        </div>

        {sortedItems.length === 0 ? (

          <div className="mt-7 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#292e38] bg-[#0e1014]">

            <h2 className="text-2xl font-extrabold uppercase tracking-wide">
              Nothing Here Yet
            </h2>

            <p className="mt-2 text-sm text-[#858b97]">
              {activeTab === "today"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout for later to see it here."}
            </p>

            <Link
              href="/"
              className="mt-7 rounded-full bg-[#c8ff00] px-8 py-3 text-sm font-bold text-black transition hover:bg-[#baff00]"
            >
              Go to workouts
            </Link>

          </div>

        ) : (

          <div className="mt-7 space-y-5">

            {sortedItems.map((exercise) => (

              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                activeTab={activeTab}
                done={doneItems.includes(exercise.id)}
                onDone={() => handleDone(exercise.id)}
                onRemove={() =>
                  activeTab === "today"
                    ? handleRemovePlan(exercise.id)
                    : handleRemoveSaved(exercise.id)
                }
              />

            ))}

          </div>

        )}

      </div>
    </main>
  );
}


function ExerciseCard({
  exercise,
  activeTab,
  done,
  onDone,
  onRemove,
}) {
  return (
    <div className="flex min-h-[138px] items-center gap-5 rounded-2xl border border-[#252b35] bg-[#12151b] px-5 py-5">

      {/* IMAGE */}
      <div className="h-[96px] w-[178px] shrink-0 overflow-hidden rounded-xl">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1">

        <h3 className="text-xl font-extrabold uppercase">
          {exercise.name}
        </h3>

        <p className="mt-1 text-sm text-[#858b97]">
          {exercise.equipment}
        </p>

        <div className="mt-3 flex items-center gap-4 text-sm text-[#a7adb7]">

          <span>
            <span className="mr-1.5 text-[#c8ff00]">
              ◷
            </span>
            {exercise.duration} min
          </span>

          <span>
            <span className="mr-1.5 text-[#c8ff00]">
              ♨
            </span>
            {exercise.caloriesBurned} kcal
          </span>

          <span>
            <span className="mr-1.5 text-[#c8ff00]">
              ☆
            </span>
            {exercise.rating}
          </span>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <Link
          href={`/workouts/${exercise.id}`}
          className="rounded-full border border-[#343a46] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#1b2028]"
        >
          View Details
        </Link>

      
        {activeTab === "today" && (
          <button
            onClick={onDone}
            className={`rounded-full px-6 py-2.5 text-sm font-bold text-black transition ${
              done
                ? "bg-[#a8d900]"
                : "bg-[#c8ff00] hover:bg-[#baff00]"
            }`}
          >
            ✓ {done ? "Completed" : "Mark as Done"}
          </button>
        )}

       
        <button
          onClick={onRemove}
          className="px-1 text-2xl text-[#737984] transition hover:text-white"
        >
          ×
        </button>

      </div>

    </div>
  );
}