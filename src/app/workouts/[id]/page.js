import WorkoutDetail from "./WorkoutDetail";

async function getWorkout(id) {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const workouts = await res.json();

  return workouts.find(
    (workout) => String(workout.id) === String(id)
  );
}

export default async function WorkoutPage({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0f13] px-6 py-20 text-white">
        <div className="mx-auto max-w-[1450px]">
          <h1 className="text-3xl font-bold">
            Workout not found
          </h1>

          <p className="mt-3 text-[#858b97]">
            The workout you are looking for could not be found.
          </p>
        </div>
      </main>
    );
  }

  return <WorkoutDetail workout={workout} />;
}