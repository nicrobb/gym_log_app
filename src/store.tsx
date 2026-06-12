import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AppState,
  Exercise,
  LoggedExercise,
  Routine,
  SetLog,
  WorkoutSession,
} from './types';
import { BUILTIN_EXERCISES } from './data/exercises';
import { BUILTIN_ROUTINES } from './data/routines';
import { DEFAULT_STATE, loadState, saveState } from './storage';

let idCounter = 0;
const newId = () => `${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

interface StoreValue {
  state: AppState;
  hydrated: boolean;
  // lookups
  allExercises: Exercise[];
  allRoutines: Routine[];
  getExercise: (id: string) => Exercise | undefined;
  getRoutine: (id: string | null | undefined) => Routine | undefined;
  lastPerformance: (exerciseId: string) => SetLog[] | null;
  // routine / exercise management
  setActiveRoutine: (id: string | null) => void;
  setUnit: (unit: 'kg' | 'lb') => void;
  setThemeMode: (mode: 'dark' | 'light') => void;
  addCustomExercise: (e: Omit<Exercise, 'id' | 'isCustom'>) => void;
  deleteCustomExercise: (id: string) => void;
  addCustomRoutine: (r: Omit<Routine, 'id' | 'isCustom'>) => void;
  deleteCustomRoutine: (id: string) => void;
  // sessions
  startSession: (routineId?: string, dayId?: string) => void;
  startEmptySession: () => void;
  repeatSession: (sessionId: string) => void;
  addExerciseToSession: (exerciseId: string) => void;
  removeSessionExercise: (index: number) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    patch: Partial<SetLog>
  ) => void;
  setSessionNotes: (notes: string) => void;
  finishSession: () => void;
  cancelSession: () => void;
  deleteSession: (id: string) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hydrate once
  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      setHydrated(true);
    });
  }, []);

  // persist (debounced) after hydration
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveState(state), 250);
  }, [state, hydrated]);

  const value = useMemo<StoreValue>(() => {
    const allExercises = [...BUILTIN_EXERCISES, ...state.customExercises];
    const allRoutines = [...BUILTIN_ROUTINES, ...state.customRoutines];
    const exerciseMap = new Map(allExercises.map((e) => [e.id, e]));
    const routineMap = new Map(allRoutines.map((r) => [r.id, r]));

    const getExercise = (id: string) => exerciseMap.get(id);
    const getRoutine = (id: string | null | undefined) =>
      id ? routineMap.get(id) : undefined;

    const lastPerformance = (exerciseId: string): SetLog[] | null => {
      for (const session of state.sessions) {
        const le = session.exercises.find((x) => x.exerciseId === exerciseId);
        if (le && le.sets.some((s) => s.done)) {
          return le.sets.filter((s) => s.done);
        }
      }
      return null;
    };

    const mutate = (fn: (draft: AppState) => AppState) =>
      setState((prev) => fn(prev));

    const mutateSession = (
      fn: (session: WorkoutSession) => WorkoutSession
    ) =>
      setState((prev) =>
        prev.activeSession
          ? { ...prev, activeSession: fn(prev.activeSession) }
          : prev
      );

    // Build an exercise for a session, prefilling each set's weight from the
    // last time this exercise was performed so progressive overload is one tap.
    const buildLoggedExercise = (
      exerciseId: string,
      sets: number,
      reps: number
    ): LoggedExercise => {
      const last = lastPerformance(exerciseId);
      const count = Math.max(1, sets);
      return {
        exerciseId,
        name: exerciseMap.get(exerciseId)?.name ?? 'Exercise',
        sets: Array.from({ length: count }, (_, i) => {
          const ref = last ? last[Math.min(i, last.length - 1)] : undefined;
          return {
            weight: ref?.weight ?? 0,
            reps: ref?.reps ?? reps,
            done: false,
          };
        }),
      };
    };

    return {
      state,
      hydrated,
      allExercises,
      allRoutines,
      getExercise,
      getRoutine,
      lastPerformance,

      setActiveRoutine: (id) =>
        mutate((d) => ({ ...d, activeRoutineId: id })),

      setUnit: (unit) => mutate((d) => ({ ...d, unit })),

      setThemeMode: (themeMode) => mutate((d) => ({ ...d, themeMode })),

      addCustomExercise: (e) =>
        mutate((d) => ({
          ...d,
          customExercises: [
            ...d.customExercises,
            { ...e, id: newId(), isCustom: true },
          ],
        })),

      deleteCustomExercise: (id) =>
        mutate((d) => ({
          ...d,
          customExercises: d.customExercises.filter((e) => e.id !== id),
        })),

      addCustomRoutine: (r) =>
        mutate((d) => ({
          ...d,
          customRoutines: [
            ...d.customRoutines,
            { ...r, id: newId(), isCustom: true },
          ],
        })),

      deleteCustomRoutine: (id) =>
        mutate((d) => ({
          ...d,
          customRoutines: d.customRoutines.filter((r) => r.id !== id),
          activeRoutineId:
            d.activeRoutineId === id ? null : d.activeRoutineId,
        })),

      startSession: (routineId, dayId) =>
        mutate((d) => {
          const routine = routineId ? routineMap.get(routineId) : undefined;
          const day = routine?.days.find((x) => x.id === dayId);
          const exercises: LoggedExercise[] = day
            ? day.exercises.map((re) =>
                buildLoggedExercise(re.exerciseId, re.sets, re.repsLow)
              )
            : [];
          return {
            ...d,
            activeSession: {
              id: newId(),
              startedAt: Date.now(),
              routineId,
              dayId,
              dayName: day?.name ?? 'Quick Workout',
              exercises,
            },
          };
        }),

      startEmptySession: () =>
        mutate((d) => ({
          ...d,
          activeSession: {
            id: newId(),
            startedAt: Date.now(),
            dayName: 'Quick Workout',
            exercises: [],
          },
        })),

      repeatSession: (sessionId) =>
        mutate((d) => {
          const src = d.sessions.find((s) => s.id === sessionId);
          if (!src) return d;
          return {
            ...d,
            activeSession: {
              id: newId(),
              startedAt: Date.now(),
              routineId: src.routineId,
              dayId: src.dayId,
              dayName: src.dayName,
              exercises: src.exercises.map((le) => ({
                exerciseId: le.exerciseId,
                name: le.name,
                sets: le.sets.map((s) => ({
                  weight: s.weight,
                  reps: s.reps,
                  done: false,
                })),
              })),
            },
          };
        }),

      addExerciseToSession: (exerciseId) =>
        mutateSession((s) => ({
          ...s,
          exercises: [
            ...s.exercises,
            buildLoggedExercise(exerciseId, 3, 10),
          ],
        })),

      removeSessionExercise: (index) =>
        mutateSession((s) => ({
          ...s,
          exercises: s.exercises.filter((_, i) => i !== index),
        })),

      addSet: (exerciseIndex) =>
        mutateSession((s) => ({
          ...s,
          exercises: s.exercises.map((le, i) => {
            if (i !== exerciseIndex) return le;
            const last = le.sets[le.sets.length - 1];
            return {
              ...le,
              sets: [
                ...le.sets,
                {
                  weight: last?.weight ?? 0,
                  reps: last?.reps ?? 10,
                  done: false,
                },
              ],
            };
          }),
        })),

      removeSet: (exerciseIndex, setIndex) =>
        mutateSession((s) => ({
          ...s,
          exercises: s.exercises.map((le, i) =>
            i === exerciseIndex
              ? { ...le, sets: le.sets.filter((_, j) => j !== setIndex) }
              : le
          ),
        })),

      updateSet: (exerciseIndex, setIndex, patch) =>
        mutateSession((s) => ({
          ...s,
          exercises: s.exercises.map((le, i) =>
            i === exerciseIndex
              ? {
                  ...le,
                  sets: le.sets.map((set, j) =>
                    j === setIndex ? { ...set, ...patch } : set
                  ),
                }
              : le
          ),
        })),

      setSessionNotes: (notes) => mutateSession((s) => ({ ...s, notes })),

      finishSession: () =>
        mutate((d) => {
          if (!d.activeSession) return d;
          const finished: WorkoutSession = {
            ...d.activeSession,
            finishedAt: Date.now(),
            // keep only exercises that had at least one completed set
            exercises: d.activeSession.exercises
              .map((le) => ({
                ...le,
                sets: le.sets.filter((s) => s.done),
              }))
              .filter((le) => le.sets.length > 0),
          };
          if (finished.exercises.length === 0) {
            // nothing logged — just discard
            return { ...d, activeSession: null };
          }
          return {
            ...d,
            activeSession: null,
            sessions: [finished, ...d.sessions],
          };
        }),

      cancelSession: () => mutate((d) => ({ ...d, activeSession: null })),

      deleteSession: (id) =>
        mutate((d) => ({
          ...d,
          sessions: d.sessions.filter((s) => s.id !== id),
        })),
    };
  }, [state, hydrated]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
