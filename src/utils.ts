import { WorkoutSession } from './types';

export function formatDate(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(ms: number): string {
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function sessionDurationLabel(s: WorkoutSession): string {
  const end = s.finishedAt ?? Date.now();
  const mins = Math.max(0, Math.round((end - s.startedAt) / 60000));
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

export function totalVolume(s: WorkoutSession): number {
  return s.exercises.reduce(
    (sum, le) =>
      sum +
      le.sets.reduce((a, set) => a + (set.done ? set.weight * set.reps : 0), 0),
    0
  );
}

import { SetLog } from './types';

/** Index of the heaviest set (ties broken by reps); -1 if none. */
export function heaviestSetIndex(sets: SetLog[]): number {
  let best = -1;
  let bestW = -1;
  let bestR = -1;
  sets.forEach((s, i) => {
    if (s.weight > bestW || (s.weight === bestW && s.reps > bestR)) {
      best = i;
      bestW = s.weight;
      bestR = s.reps;
    }
  });
  return bestW > 0 ? best : -1;
}

export function totalSets(s: WorkoutSession): number {
  return s.exercises.reduce(
    (sum, le) => sum + le.sets.filter((x) => x.done).length,
    0
  );
}
