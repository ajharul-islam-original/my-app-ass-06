"use client";

import { useEffect, useState } from "react";

import {
  getPlan,
  getSaved,
  addToPlan,
  addToSaved,
} from "../../lib/storage";

export default function WorkoutDetail({ workout }) {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState("");
/* eslint-disable react-hooks/set-state-in-effect */
useEffect(() => {
  const plan = getPlan();
  const savedItems = getSaved();

  const alreadyAdded = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  const alreadySaved = savedItems.some(
    (item) => String(item.id) === String(workout.id)
  );

  setAdded(alreadyAdded);
  setSaved(alreadySaved);
}, [workout.id]);
  


  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }


  function handleAddToPlan() {
    const result = addToPlan(workout);

    if (result.success) {
      setAdded(true);
      showToast("Added successfully");
      return;
    }

    if (result.reason === "already-added") {
      setAdded(true);
      showToast("Already added");
      return;
    }

    if (result.reason === "limit") {
      showToast(
        "Today's Plan is full. Maximum 12 exercises."
      );
    }
  }


  function handleSave() {
    const result = addToSaved(workout);

    if (result.success) {
      setSaved(true);
      showToast("Saved successfully");
      return;
    }

    if (result.reason === "already-saved") {
      setSaved(true);
      showToast("Already saved");
    }
  }

  return (
    <>
    

      {toast && (
        <div className="fixed right-5 top-5 z-[9999] flex items-center gap-2 rounded-xl border border-[#303641] bg-[#151922] px-5 py-3 text-sm font-semibold text-white shadow-2xl">
          <span className="text-[#c8ff00]">
            ✓
          </span>

          {toast}
        </div>
      )}

      <main className="min-h-screen bg-[#0d0f13] px-4 py-8 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px]">

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:gap-14">

          

            <div className="relative h-[500px] overflow-hidden rounded-2xl border border-[#242833] sm:h-[600px] lg:h-[650px]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full w-full object-cover"
              />
            </div>

          

            <div className="flex flex-col">

        

              <div>
                <h1 className="text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-[30px]">
                  {workout.name}
                </h1>

                <p className="mt-5 max-w-[680px] text-base leading-7 text-[#9da3af] sm:text-lg">
                  {workout.description ||
                    `A focused ${workout.name} exercise designed to build strength, improve performance, and support your training goals.`}
                </p>
              </div>

        

              <div className="mt-6 flex flex-wrap gap-3">
                {workout.muscleGroups?.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-[#c8ff00] px-5 py-1.5 text-sm font-bold text-black"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

      

              <div className="mt-5 overflow-hidden rounded-2xl border border-[#282d37] bg-[#151922]">

                <InfoRow
                  title="Equipment"
                  value={workout.equipment || "—"}
                />

                <InfoRow
                  title="Difficulty"
                  value={workout.difficulty || "Intermediate"}
                />

                <InfoRow
                  title="Sets"
                  value={workout.sets || "4"}
                />

                <InfoRow
                  title="Reps"
                  value={workout.reps || "6-8"}
                />

                <InfoRow
                  title="Duration"
                  value={
                    workout.duration
                      ? `${workout.duration} min`
                      : "—"
                  }
                />

                <InfoRow
                  title="Calories"
                  value={
                    workout.caloriesBurned
                      ? `${workout.caloriesBurned} kcal`
                      : "—"
                  }
                />

                <InfoRow
                  title="Rating"
                  value={workout.rating || "—"}
                  last
                />

              </div>


              <div className="mt-4">

                <h2 className="text-xl font-bold uppercase tracking-wide">
                  Instructions
                </h2>

                <ol className="mt-4 space-y-5 text-[15px] leading-6 text-[#b3b7c0]">

                  {(workout.instructions || [
                    "Set up your position correctly and keep your body stable.",
                    "Perform the movement with controlled form.",
                    "Keep the target muscles engaged throughout the movement.",
                    "Return to the starting position and repeat.",
                  ]).map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-2"
                    >
                      <span className="font-semibold text-white">
                        {index + 1}.
                      </span>

                      <span>
                        {instruction}
                      </span>
                    </li>
                  ))}

                </ol>

              </div>


              <div className="mt-10 flex flex-col gap-4 sm:flex-row">


                <button
                  onClick={handleAddToPlan}
                  className={`flex h-14 items-center justify-center gap-3 rounded-xl px-7 font-semibold transition-all duration-200 sm:min-w-[235px] ${
                    added
                      ? "bg-[#20252f] text-[#858b97]"
                      : "bg-[#c8ff00] text-black hover:bg-[#baff00]"
                  }`}
                >
                  <CalendarIcon />

                  {added
                    ? "Already added"
                    : "Add to today's plan"}
                </button>


                <button
                  onClick={handleSave}
                  className="flex h-14 items-center justify-center gap-3 rounded-xl border border-[#303641] bg-transparent px-7 font-medium text-white transition hover:bg-[#171b23] sm:min-w-[190px]"
                >
                  <BookmarkIcon filled={saved} />

                  {saved
                    ? "Already saved"
                    : "Save for later"}
                </button>

              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}

function InfoRow({ title, value, last }) {
  return (
    <div
      className={`flex min-h-[40px] items-center justify-between px-7 ${
        !last
          ? "border-b border-[#282d37]"
          : ""
      }`}
    >
      <span className="text-sm font-semibold uppercase tracking-wide text-[#858c99]">
        {title}
      </span>

      <span className="text-base font-medium text-[#e4e6eb]">
        {value}
      </span>
    </div>
  );
}



function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
      />

      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
      />

      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
      />

      <line
        x1="3"
        y1="10"
        x2="21"
        y2="10"
      />

      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  );
}

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}