import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from './types';

const KEY = 'gymlog:state:v1';

export const DEFAULT_STATE: AppState = {
  activeRoutineId: null,
  customExercises: [],
  customRoutines: [],
  sessions: [],
  activeSession: null,
  unit: 'kg',
  themeMode: 'dark',
};

export async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export async function saveState(state: AppState): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // best-effort; ignore write failures
  }
}
