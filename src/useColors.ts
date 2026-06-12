import { useStore } from './store';
import { Colors, palettes } from './theme';

/** Current color palette based on the active theme mode. */
export function useColors(): Colors {
  const { state } = useStore();
  return palettes[state.themeMode];
}
