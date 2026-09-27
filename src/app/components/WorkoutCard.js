import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workouts/${workout.id}`} className="block">
      <article className="group overflow-hidden rounded-2xl border border-[#292b31] bg-[#15161a] transition duration-300 hover:-translate-y-1 hover:border-[#3a3d44]">

        {/* IMAGE */}
        <div className="h-[350px] w-full overflow-hidden bg-[#101114]">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* CARD CONTENT */}
        <div className="p-6">

          {/* MUSCLE GROUPS */}
          <div className="mb-5 flex flex-wrap gap-2">
            {workout.muscleGroups?.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#a3ff00] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* NAME */}
          <h2 className="text-xl font-black uppercase tracking-wide text-white">
            {workout.name}
          </h2>

          {/* EQUIPMENT */}
          <p className="mt-2 text-sm text-[#858890]">
            {workout.equipment}
          </p>

          {/* DIVIDER */}
          <div className="my-6 border-t border-[#292b31]" />

          {/* INFO */}
          <div className="flex items-center justify-between gap-3 text-sm text-[#b5b7bd]">

            {/* TIME */}
            <div className="flex items-center gap-2">
              <span className="text-lg text-[#c3c5ca]">
                ◷
              </span>

              <span>
                {workout.duration} min
              </span>
            </div>

            {/* CALORIES */}
            <div className="flex items-center gap-2">
              <span className="text-base text-[#c3c5ca]">
                ●
              </span>

              <span>
                {workout.caloriesBurned} kcal
              </span>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <span className="text-lg text-[#c3c5ca]">
                ☆
              </span>

              <span>
                {workout.rating}
              </span>
            </div>

          </div>

        </div>
      </article>
    </Link>
  );
}