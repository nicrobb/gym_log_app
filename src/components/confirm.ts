import { Alert, Platform } from 'react-native';

/**
 * Cross-platform confirm dialog. Native uses Alert; web falls back to
 * window.confirm so the app works in a browser preview too.
 */
export function confirm(
  title: string,
  message: string,
  onConfirm: () => void,
  confirmLabel = 'OK',
  destructive = false
) {
  if (Platform.OS === 'web') {
    const ok =
      typeof window !== 'undefined' && typeof window.confirm === 'function'
        ? window.confirm(`${title}\n\n${message}`)
        : true;
    if (ok) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    {
      text: confirmLabel,
      style: destructive ? 'destructive' : 'default',
      onPress: onConfirm,
    },
  ]);
}

/** Cross-platform notice (no choice). */
export function notify(title: string, message: string) {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(`${title}\n\n${message}`);
    }
    return;
  }
  Alert.alert(title, message);
}
