import { Exercise } from '../types';

// Built-in exercise library. IDs are stable slugs so routines can reference them.
const ex = (id: string, name: string, muscleGroup: Exercise['muscleGroup']): Exercise => ({
  id,
  name,
  muscleGroup,
  isCustom: false,
});

export const BUILTIN_EXERCISES: Exercise[] = [
  // ── Chest ──────────────────────────────────────────────
  ex('bench-press', 'Barbell Bench Press', 'Chest'),
  ex('incline-barbell-press', 'Incline Barbell Press', 'Chest'),
  ex('decline-bench', 'Decline Bench Press', 'Chest'),
  ex('db-bench-press', 'Dumbbell Bench Press', 'Chest'),
  ex('incline-db-press', 'Incline Dumbbell Press', 'Chest'),
  ex('machine-chest-press', 'Machine Chest Press', 'Chest'),
  ex('pec-deck', 'Pec Deck Machine', 'Chest'),
  ex('cable-crossover', 'Cable Crossover', 'Chest'),
  ex('chest-fly', 'Cable Chest Fly', 'Chest'),
  ex('db-fly', 'Dumbbell Fly', 'Chest'),
  ex('incline-db-fly', 'Incline Dumbbell Fly', 'Chest'),
  ex('push-up', 'Push-Up', 'Chest'),
  ex('dips', 'Chest Dips', 'Chest'),

  // ── Back ───────────────────────────────────────────────
  ex('deadlift', 'Deadlift', 'Back'),
  ex('rack-pull', 'Rack Pull', 'Back'),
  ex('pull-up', 'Pull-Up', 'Back'),
  ex('chin-up', 'Chin-Up', 'Back'),
  ex('lat-pulldown', 'Lat Pulldown', 'Back'),
  ex('straight-arm-pulldown', 'Straight-Arm Pulldown', 'Back'),
  ex('barbell-row', 'Barbell Row', 'Back'),
  ex('pendlay-row', 'Pendlay Row', 'Back'),
  ex('t-bar-row', 'T-Bar Row', 'Back'),
  ex('db-row', 'One-Arm Dumbbell Row', 'Back'),
  ex('chest-supported-row', 'Chest-Supported Row', 'Back'),
  ex('machine-row', 'Machine Row', 'Back'),
  ex('seated-cable-row', 'Seated Cable Row', 'Back'),
  ex('barbell-shrug', 'Barbell Shrug', 'Back'),
  ex('db-shrug', 'Dumbbell Shrug', 'Back'),

  // ── Shoulders ──────────────────────────────────────────
  ex('ohp', 'Overhead Press', 'Shoulders'),
  ex('db-shoulder-press', 'Dumbbell Shoulder Press', 'Shoulders'),
  ex('arnold-press', 'Arnold Press', 'Shoulders'),
  ex('machine-shoulder-press', 'Machine Shoulder Press', 'Shoulders'),
  ex('lateral-raise', 'Lateral Raise', 'Shoulders'),
  ex('cable-lateral-raise', 'Cable Lateral Raise', 'Shoulders'),
  ex('front-raise', 'Front Raise', 'Shoulders'),
  ex('rear-delt-fly', 'Rear Delt Fly', 'Shoulders'),
  ex('reverse-pec-deck', 'Reverse Pec Deck', 'Shoulders'),
  ex('upright-row', 'Upright Row', 'Shoulders'),
  ex('face-pull', 'Face Pull', 'Shoulders'),

  // ── Biceps ─────────────────────────────────────────────
  ex('barbell-curl', 'Barbell Curl', 'Biceps'),
  ex('ez-bar-curl', 'EZ-Bar Curl', 'Biceps'),
  ex('db-curl', 'Dumbbell Curl', 'Biceps'),
  ex('incline-db-curl', 'Incline Dumbbell Curl', 'Biceps'),
  ex('hammer-curl', 'Hammer Curl', 'Biceps'),
  ex('preacher-curl', 'Preacher Curl', 'Biceps'),
  ex('cable-curl', 'Cable Curl', 'Biceps'),
  ex('concentration-curl', 'Concentration Curl', 'Biceps'),
  ex('spider-curl', 'Spider Curl', 'Biceps'),

  // ── Triceps ────────────────────────────────────────────
  ex('close-grip-bench', 'Close-Grip Bench Press', 'Triceps'),
  ex('tricep-pushdown', 'Tricep Pushdown', 'Triceps'),
  ex('rope-pushdown', 'Rope Pushdown', 'Triceps'),
  ex('skullcrusher', 'Skullcrusher', 'Triceps'),
  ex('overhead-tricep-ext', 'Overhead Tricep Extension', 'Triceps'),
  ex('cable-overhead-ext', 'Cable Overhead Extension', 'Triceps'),
  ex('db-tricep-kickback', 'Dumbbell Tricep Kickback', 'Triceps'),
  ex('bench-dips', 'Bench Dips', 'Triceps'),
  ex('diamond-push-up', 'Diamond Push-Up', 'Triceps'),

  // ── Quads ──────────────────────────────────────────────
  ex('back-squat', 'Barbell Back Squat', 'Quads'),
  ex('front-squat', 'Front Squat', 'Quads'),
  ex('hack-squat', 'Hack Squat', 'Quads'),
  ex('smith-squat', 'Smith Machine Squat', 'Quads'),
  ex('goblet-squat', 'Goblet Squat', 'Quads'),
  ex('leg-press', 'Leg Press', 'Quads'),
  ex('leg-extension', 'Leg Extension', 'Quads'),
  ex('bulgarian-split-squat', 'Bulgarian Split Squat', 'Quads'),
  ex('walking-lunge', 'Walking Lunge', 'Quads'),
  ex('step-up', 'Step-Up', 'Quads'),
  ex('sissy-squat', 'Sissy Squat', 'Quads'),

  // ── Hamstrings ─────────────────────────────────────────
  ex('rdl', 'Romanian Deadlift', 'Hamstrings'),
  ex('stiff-leg-deadlift', 'Stiff-Leg Deadlift', 'Hamstrings'),
  ex('lying-leg-curl', 'Lying Leg Curl', 'Hamstrings'),
  ex('seated-leg-curl', 'Seated Leg Curl', 'Hamstrings'),
  ex('single-leg-rdl', 'Single-Leg RDL', 'Hamstrings'),
  ex('good-morning', 'Good Morning', 'Hamstrings'),
  ex('nordic-curl', 'Nordic Hamstring Curl', 'Hamstrings'),
  ex('cable-pull-through', 'Cable Pull-Through', 'Hamstrings'),
  ex('glute-ham-raise', 'Glute-Ham Raise', 'Hamstrings'),

  // ── Glutes ─────────────────────────────────────────────
  ex('hip-thrust', 'Barbell Hip Thrust', 'Glutes'),
  ex('db-hip-thrust', 'Dumbbell Hip Thrust', 'Glutes'),
  ex('single-leg-hip-thrust', 'Single-Leg Hip Thrust', 'Glutes'),
  ex('sumo-deadlift', 'Sumo Deadlift', 'Glutes'),
  ex('b-stance-rdl', 'B-Stance RDL', 'Glutes'),
  ex('cable-kickback', 'Cable Glute Kickback', 'Glutes'),
  ex('donkey-kick', 'Donkey Kick (Machine/Cable)', 'Glutes'),
  ex('fire-hydrant', 'Fire Hydrant', 'Glutes'),
  ex('curtsy-lunge', 'Curtsy Lunge', 'Glutes'),
  ex('seated-hip-abduction', 'Seated Hip Abduction Machine', 'Glutes'),
  ex('standing-cable-abduction', 'Standing Cable Abduction', 'Glutes'),
  ex('clamshell', 'Banded Clamshell', 'Glutes'),
  ex('frog-pump', 'Frog Pump', 'Glutes'),
  ex('glute-bridge', 'Glute Bridge', 'Glutes'),
  ex('reverse-hyper', 'Reverse Hyperextension', 'Glutes'),

  // ── Calves ─────────────────────────────────────────────
  ex('standing-calf-raise', 'Standing Calf Raise', 'Calves'),
  ex('seated-calf-raise', 'Seated Calf Raise', 'Calves'),
  ex('leg-press-calf-raise', 'Leg Press Calf Raise', 'Calves'),
  ex('single-leg-calf-raise', 'Single-Leg Calf Raise', 'Calves'),

  // ── Abs ────────────────────────────────────────────────
  ex('hanging-leg-raise', 'Hanging Leg Raise', 'Abs'),
  ex('lying-leg-raise', 'Lying Leg Raise', 'Abs'),
  ex('cable-crunch', 'Cable Crunch', 'Abs'),
  ex('crunch', 'Crunch', 'Abs'),
  ex('sit-up', 'Sit-Up', 'Abs'),
  ex('decline-sit-up', 'Decline Sit-Up', 'Abs'),
  ex('bicycle-crunch', 'Bicycle Crunch', 'Abs'),
  ex('russian-twist', 'Russian Twist', 'Abs'),
  ex('ab-wheel', 'Ab Wheel Rollout', 'Abs'),
  ex('mountain-climber', 'Mountain Climber', 'Abs'),
  ex('dead-bug', 'Dead Bug', 'Abs'),
  ex('plank', 'Plank', 'Abs'),
  ex('side-plank', 'Side Plank', 'Abs'),

  // ── Cardio ─────────────────────────────────────────────
  ex('incline-walk', 'Incline Treadmill Walk', 'Cardio'),
  ex('treadmill-run', 'Treadmill Run', 'Cardio'),
  ex('stairmaster', 'StairMaster', 'Cardio'),
  ex('rowing-machine', 'Rowing Machine', 'Cardio'),
  ex('cycling', 'Stationary Bike', 'Cardio'),
  ex('elliptical', 'Elliptical', 'Cardio'),
  ex('assault-bike', 'Assault Bike', 'Cardio'),
  ex('jump-rope', 'Jump Rope', 'Cardio'),

  // ── Other ──────────────────────────────────────────────
  ex('farmers-carry', "Farmer's Carry", 'Other'),
  ex('wrist-curl', 'Wrist Curl', 'Other'),
  ex('reverse-wrist-curl', 'Reverse Wrist Curl', 'Other'),
];
