// Theme tokens. Colors swap with light/dark mode; spacing/radii are constant.

export const palettes = {
  dark: {
    bg: '#0B0D12',
    surface: '#161A22',
    surfaceAlt: '#1E2430',
    border: '#2A3040',
    text: '#F4F6FB',
    textMuted: '#9AA3B2',
    primary: '#FF5A36',
    primaryDim: '#3A2018',
    accent: '#3DDC97',
    accentText: '#06281C',
    danger: '#FF5470',
    chip: '#222938',
  },
  light: {
    bg: '#F4F6F9',
    surface: '#FFFFFF',
    surfaceAlt: '#EDF0F5',
    border: '#DCE1EA',
    text: '#11151D',
    textMuted: '#5B6675',
    primary: '#F0431C',
    primaryDim: '#FFE5DC',
    accent: '#16A06A',
    accentText: '#FFFFFF',
    danger: '#E5384F',
    chip: '#E8EBF1',
  },
};

export type Colors = typeof palettes.dark;
export type ThemeMode = keyof typeof palettes;

export const radius = { sm: 8, md: 14, lg: 22, pill: 999 };
export const space = (n: number) => n * 4;

// Static fallback (dark) for any non-reactive reference.
export const theme = { colors: palettes.dark, radius, space };
