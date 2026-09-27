import WorkoutCard from "./components/WorkoutCard";

async function getWorkouts() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      <main className="min-h-screen bg-[#0d0e11] px-4 py-4 sm:px-6 lg:px-10">
        <section className="mx-auto max-w-[1450px] overflow-hidden rounded-2xl border border-[#25272d] bg-[#15161a]">
          <div className="grid min-h-[520px] grid-cols-1 items-center lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="px-7 py-14 sm:px-10 md:px-14 lg:px-16">

              <p className="mb-6 text-sm font-bold uppercase tracking-[2px] text-[#9cff00]">
                Workout Library
              </p>

              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[40px]">
                <span className="block lg:whitespace-nowrap">
                  Train with intent. Log
                </span>

                <span className="block">
                  every set.
                </span>
              </h1>

              <p className="mt-7 max-w-[610px] text-base leading-7 text-[#8b8d94] sm:text-lg">
                FitLog is a dark, no-nonsense gym companion: pick a lift,
                lock it into today&apos;s plan, and watch the week&apos;s work
                add up.
              </p>

              <button
                className="mt-8 rounded-md bg-[#a3ff00] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-black transition duration-200 hover:bg-[#b7ff33] active:scale-95"
              >
                Browse Workouts
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex min-h-[350px] items-center justify-center p-8 lg:min-h-[520px] lg:p-12">
              <div className="flex min-h-[300px] w-full items-center justify-center rounded-xl border border-dashed ">
                <img
                  src="/banner.png"
                  alt="Workout"
                  className="max-h-[430px] max-w-full object-contain"
                />
              </div>
            </div>

          </div>
        </section>
      </main>



      <section className="bg-black px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[2px] text-[#a3ff00]">
            Fitness Library
          </p>

          <h2 className="text-4xl font-black uppercase text-white">
            Build Your Best Body
          </h2>

          <p className="mt-4 text-zinc-400">
            Track your workouts and stay consistent with your fitness goals.
          </p>
        </div>
      </section>


      
      <section className="bg-black px-6 pb-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}

        </div>
      </section>
    </>
  );
}