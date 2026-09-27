const PLAN_KEY = "fitlog_today_plan";
const SAVED_KEY = "fitlog_saved";

export function getPlan() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(PLAN_KEY)) || [];
  } catch {
    return [];
  }
}

export function getSaved() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
  } catch {
    return [];
  }
}

export function addToPlan(workout) {
  const plan = getPlan();

  if (
    plan.some(
      (item) => String(item.id) === String(workout.id)
    )
  ) {
    return {
      success: false,
      reason: "already-added",
      data: plan,
    };
  }

  if (plan.length >= 12) {
    return {
      success: false,
      reason: "limit",
      data: plan,
    };
  }

  const newPlan = [...plan, workout];

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(newPlan)
  );

  window.dispatchEvent(
    new Event("fitlog-storage")
  );

  return {
    success: true,
    data: newPlan,
  };
}

export function removeFromPlan(id) {
  const plan = getPlan();

  const newPlan = plan.filter(
    (item) => String(item.id) !== String(id)
  );

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(newPlan)
  );

  window.dispatchEvent(
    new Event("fitlog-storage")
  );

  return newPlan;
}

export function addToSaved(workout) {
  const saved = getSaved();

  if (
    saved.some(
      (item) => String(item.id) === String(workout.id)
    )
  ) {
    return {
      success: false,
      reason: "already-saved",
      data: saved,
    };
  }

  const newSaved = [...saved, workout];

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(newSaved)
  );

  window.dispatchEvent(
    new Event("fitlog-storage")
  );

  return {
    success: true,
    data: newSaved,
  };
}

export function removeFromSaved(id) {
  const saved = getSaved();

  const newSaved = saved.filter(
    (item) => String(item.id) !== String(id)
  );

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(newSaved)
  );

  window.dispatchEvent(
    new Event("fitlog-storage")
  );

  return newSaved;
}