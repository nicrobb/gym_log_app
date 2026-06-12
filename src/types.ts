// Core data models for the gym log app.

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Quads'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves'
  | 'Abs'
  | 'Cardio'
  | 'Other';

export const MUSCLE_GROUPS: MuscleGroup[] = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Abs',
  'Cardio',
  'Other',
];

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  isCustom: boolean;
}

/** An exercise as prescribed inside a routine day (target sets/reps). */
export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  repsLow: number;
  repsHigh: number;
  note?: string;
}

export interface RoutineDay {
  id: string;
  name: string;
  exercises: RoutineExercise[];
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  days: RoutineDay[];
  isCustom: boolean;
}

/** A single logged set. */
export interface SetLog {
  weight: number;
  reps: number;
  done: boolean;
}

export interface LoggedExercise {
  exerciseId: string;
  name: string;
  sets: SetLog[];
}

/** A workout in progress or completed. */
export interface WorkoutSession {
  id: string;
  startedAt: number; // epoch ms
  finishedAt?: number; // epoch ms
  routineId?: string;
  dayId?: string;
  dayName: string;
  exercises: LoggedExercise[];
  notes?: string;
}

export interface AppState {
  activeRoutineId: string | null;
  customExercises: Exercise[];
  customRoutines: Routine[];
  sessions: WorkoutSession[]; // completed sessions, newest first
  activeSession: WorkoutSession | null;
  unit: 'kg' | 'lb';
  themeMode: 'dark' | 'light';
}
