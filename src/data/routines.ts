import { Routine, RoutineExercise } from '../types';

const e = (
  exerciseId: string,
  sets: number,
  repsLow: number,
  repsHigh: number,
  note?: string
): RoutineExercise => ({ exerciseId, sets, repsLow, repsHigh, note });

// Built-in routines. Users can also create their own custom routines.
export const BUILTIN_ROUTINES: Routine[] = [
  {
    id: 'bro-split-5',
    name: 'Bro Split (5 days)',
    description: 'Classic body-part split. One muscle group per day, high volume.',
    daysPerWeek: 5,
    isCustom: false,
    days: [
      {
        id: 'bro-chest',
        name: 'Day 1 — Chest',
        exercises: [
          e('bench-press', 4, 6, 10),
          e('incline-db-press', 3, 8, 12),
          e('chest-fly', 3, 12, 15),
          e('dips', 3, 8, 12),
        ],
      },
      {
        id: 'bro-back',
        name: 'Day 2 — Back',
        exercises: [
          e('deadlift', 3, 5, 8),
          e('pull-up', 3, 6, 12),
          e('barbell-row', 4, 8, 12),
          e('seated-cable-row', 3, 10, 15),
        ],
      },
      {
        id: 'bro-shoulders',
        name: 'Day 3 — Shoulders',
        exercises: [
          e('ohp', 4, 6, 10),
          e('db-shoulder-press', 3, 8, 12),
          e('lateral-raise', 4, 12, 20),
          e('face-pull', 3, 12, 20),
        ],
      },
      {
        id: 'bro-legs',
        name: 'Day 4 — Legs',
        exercises: [
          e('back-squat', 4, 6, 10),
          e('rdl', 3, 8, 12),
          e('leg-press', 3, 10, 15),
          e('lying-leg-curl', 3, 10, 15),
          e('standing-calf-raise', 4, 12, 20),
        ],
      },
      {
        id: 'bro-arms',
        name: 'Day 5 — Arms',
        exercises: [
          e('barbell-curl', 4, 8, 12),
          e('tricep-pushdown', 4, 10, 15),
          e('hammer-curl', 3, 10, 12),
          e('skullcrusher', 3, 8, 12),
        ],
      },
    ],
  },
  {
    id: 'ab-3',
    name: 'A/B Day (3 days)',
    description: 'Two alternating full-body workouts, 3 days a week. Great for strength on a busy schedule.',
    daysPerWeek: 3,
    isCustom: false,
    days: [
      {
        id: 'ab-a',
        name: 'Workout A',
        exercises: [
          e('back-squat', 3, 5, 5),
          e('bench-press', 3, 5, 5),
          e('barbell-row', 3, 5, 8),
          e('plank', 3, 30, 60, 'Hold in seconds'),
        ],
      },
      {
        id: 'ab-b',
        name: 'Workout B',
        exercises: [
          e('deadlift', 1, 5, 5),
          e('ohp', 3, 5, 5),
          e('pull-up', 3, 6, 10),
          e('hanging-leg-raise', 3, 10, 15),
        ],
      },
    ],
  },
  {
    id: 'ppl-6',
    name: 'Push / Pull / Legs (6 days)',
    description:
      'High-frequency hypertrophy split. Each muscle hit twice a week across six sessions (Push/Pull/Legs, run through twice with A/B variety).',
    daysPerWeek: 6,
    isCustom: false,
    days: [
      {
        id: 'ppl-push-a',
        name: 'Push A — Chest Focus',
        exercises: [
          e('bench-press', 4, 6, 8),
          e('incline-db-press', 3, 8, 12),
          e('ohp', 3, 8, 10),
          e('cable-crossover', 3, 12, 15),
          e('lateral-raise', 3, 12, 20),
          e('tricep-pushdown', 3, 10, 15),
        ],
      },
      {
        id: 'ppl-pull-a',
        name: 'Pull A — Back Thickness',
        exercises: [
          e('deadlift', 3, 5, 5),
          e('pull-up', 3, 6, 10),
          e('barbell-row', 3, 8, 12),
          e('lat-pulldown', 3, 10, 12),
          e('face-pull', 3, 15, 20),
          e('barbell-curl', 3, 8, 12),
        ],
      },
      {
        id: 'ppl-legs-a',
        name: 'Legs A — Quad Focus',
        exercises: [
          e('back-squat', 4, 6, 8),
          e('leg-press', 3, 10, 15),
          e('rdl', 3, 8, 12),
          e('leg-extension', 3, 12, 15),
          e('lying-leg-curl', 3, 12, 12),
          e('standing-calf-raise', 4, 12, 20),
        ],
      },
      {
        id: 'ppl-push-b',
        name: 'Push B — Shoulder Focus',
        exercises: [
          e('ohp', 4, 6, 8),
          e('incline-barbell-press', 3, 8, 10),
          e('db-shoulder-press', 3, 8, 12),
          e('lateral-raise', 4, 15, 20),
          e('skullcrusher', 3, 8, 12),
          e('rope-pushdown', 3, 12, 15),
        ],
      },
      {
        id: 'ppl-pull-b',
        name: 'Pull B — Back Width',
        exercises: [
          e('chin-up', 4, 6, 10),
          e('chest-supported-row', 3, 10, 12),
          e('seated-cable-row', 3, 10, 12),
          e('straight-arm-pulldown', 3, 12, 15),
          e('hammer-curl', 3, 10, 12),
          e('incline-db-curl', 3, 10, 12),
        ],
      },
      {
        id: 'ppl-legs-b',
        name: 'Legs B — Posterior Focus',
        exercises: [
          e('rdl', 4, 6, 10),
          e('front-squat', 3, 8, 10),
          e('bulgarian-split-squat', 3, 10, 10, 'Each side'),
          e('seated-leg-curl', 3, 12, 15),
          e('hip-thrust', 3, 10, 12),
          e('seated-calf-raise', 4, 15, 20),
        ],
      },
    ],
  },
  {
    id: 'upper-lower-4',
    name: 'Upper / Lower (4 days)',
    description:
      'Balanced 4-day split. Two upper and two lower sessions per week — strong mix of strength and hypertrophy.',
    daysPerWeek: 4,
    isCustom: false,
    days: [
      {
        id: 'ul-upper-a',
        name: 'Upper A',
        exercises: [
          e('bench-press', 4, 6, 8),
          e('barbell-row', 4, 6, 8),
          e('ohp', 3, 8, 10),
          e('lat-pulldown', 3, 10, 12),
          e('db-curl', 3, 10, 12),
          e('tricep-pushdown', 3, 10, 15),
        ],
      },
      {
        id: 'ul-lower-a',
        name: 'Lower A',
        exercises: [
          e('back-squat', 4, 6, 8),
          e('rdl', 3, 8, 10),
          e('leg-press', 3, 10, 15),
          e('lying-leg-curl', 3, 12, 12),
          e('standing-calf-raise', 4, 12, 20),
          e('hanging-leg-raise', 3, 10, 15),
        ],
      },
      {
        id: 'ul-upper-b',
        name: 'Upper B',
        exercises: [
          e('incline-db-press', 4, 8, 10),
          e('pull-up', 4, 6, 10),
          e('db-shoulder-press', 3, 10, 12),
          e('chest-supported-row', 3, 10, 12),
          e('lateral-raise', 3, 15, 20),
          e('hammer-curl', 3, 10, 12),
          e('skullcrusher', 3, 10, 12),
        ],
      },
      {
        id: 'ul-lower-b',
        name: 'Lower B',
        exercises: [
          e('deadlift', 3, 5, 5),
          e('front-squat', 3, 8, 10),
          e('bulgarian-split-squat', 3, 10, 10, 'Each side'),
          e('seated-leg-curl', 3, 12, 15),
          e('seated-calf-raise', 4, 15, 20),
          e('cable-crunch', 3, 12, 15),
        ],
      },
    ],
  },
  {
    id: 'full-body-3',
    name: 'Full Body (3 days)',
    description:
      'Hit everything each session, three times a week. Efficient and great for beginners or busy weeks.',
    daysPerWeek: 3,
    isCustom: false,
    days: [
      {
        id: 'fb-1',
        name: 'Full Body A',
        exercises: [
          e('back-squat', 3, 5, 5),
          e('bench-press', 3, 5, 5),
          e('barbell-row', 3, 8, 8),
          e('ohp', 3, 8, 10),
          e('plank', 3, 30, 60, 'Hold in seconds'),
        ],
      },
      {
        id: 'fb-2',
        name: 'Full Body B',
        exercises: [
          e('deadlift', 3, 5, 5),
          e('incline-db-press', 3, 8, 12),
          e('lat-pulldown', 3, 10, 12),
          e('leg-press', 3, 12, 15),
          e('hanging-leg-raise', 3, 12, 12),
        ],
      },
      {
        id: 'fb-3',
        name: 'Full Body C',
        exercises: [
          e('front-squat', 3, 8, 8),
          e('db-shoulder-press', 3, 10, 12),
          e('seated-cable-row', 3, 10, 12),
          e('rdl', 3, 10, 10),
          e('db-curl', 3, 12, 12),
          e('tricep-pushdown', 3, 12, 12),
        ],
      },
    ],
  },
  {
    id: 'stronglifts-5x5',
    name: 'StrongLifts 5×5 (3 days)',
    description:
      'Classic beginner strength program. Two alternating workouts of heavy compound lifts, 5 sets of 5. Add weight every session.',
    daysPerWeek: 3,
    isCustom: false,
    days: [
      {
        id: 'sl-a',
        name: 'Workout A',
        exercises: [
          e('back-squat', 5, 5, 5),
          e('bench-press', 5, 5, 5),
          e('barbell-row', 5, 5, 5),
        ],
      },
      {
        id: 'sl-b',
        name: 'Workout B',
        exercises: [
          e('back-squat', 5, 5, 5),
          e('ohp', 5, 5, 5),
          e('deadlift', 1, 5, 5),
        ],
      },
    ],
  },
  {
    id: 'booty-builder-3',
    name: 'Booty Builder (3 days)',
    description:
      'Glute-focused programming: build the glutes (especially lateral) without adding leg size. Hip thrust progression + high-frequency abduction work. 3 non-consecutive days/week.',
    daysPerWeek: 3,
    isCustom: false,
    days: [
      {
        id: 'booty-1',
        name: 'Day 1 — Posterior Chain',
        exercises: [
          e('hip-thrust', 4, 10, 12, 'Primary glute max builder — progressive overload is non-negotiable'),
          e('rdl', 3, 10, 10, 'Light–moderate, feel the glute stretch'),
          e('cable-kickback', 3, 15, 15, 'Each side'),
          e('lying-leg-curl', 3, 12, 12, 'Hamstring without quad load'),
        ],
      },
      {
        id: 'booty-2',
        name: 'Day 2 — Lateral Glute',
        exercises: [
          e('seated-hip-abduction', 4, 15, 20, 'Glute medius — the key fix'),
          e('standing-cable-abduction', 3, 15, 15, 'Each side'),
          e('clamshell', 3, 20, 20, 'Banded, activation'),
          e('single-leg-rdl', 3, 10, 10, 'Each side'),
        ],
      },
      {
        id: 'booty-3',
        name: 'Day 3 — Full Glute Emphasis',
        exercises: [
          e('hip-thrust', 4, 8, 8, 'Heavier than Day 1'),
          e('sumo-deadlift', 3, 8, 8, 'Wide stance shifts load to glutes/adductors'),
          e('donkey-kick', 3, 15, 15, 'Each side'),
          e('seated-hip-abduction', 3, 20, 20),
        ],
      },
    ],
  },
];
