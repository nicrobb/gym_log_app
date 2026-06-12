import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StoreProvider, useStore } from './src/store';
import { Colors, space } from './src/theme';
import { useColors } from './src/useColors';
import { TodayScreen } from './src/screens/TodayScreen';
import { RoutinesScreen } from './src/screens/RoutinesScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ExercisesScreen } from './src/screens/ExercisesScreen';
import { ActiveWorkout } from './src/components/ActiveWorkout';

type TabKey = 'today' | 'routines' | 'history' | 'exercises';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'today', label: 'Today', icon: '🏋️' },
  { key: 'routines', label: 'Routines', icon: '📋' },
  { key: 'history', label: 'History', icon: '📈' },
  { key: 'exercises', label: 'Exercises', icon: '💪' },
];

function Root() {
  const { hydrated, state } = useStore();
  const c = useColors();
  const styles = makeStyles(c);
  const [tab, setTab] = useState<TabKey>('today');

  if (!hydrated) {
    return (
      <View style={[styles.flex, styles.center]}>
        <ActivityIndicator color={c.primary} size="large" />
      </View>
    );
  }

  // A workout in progress takes over the screen — focused logging, no tab bar.
  if (state.activeSession) {
    return <ActiveWorkout />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.flex}>
        {tab === 'today' && <TodayScreen goToRoutines={() => setTab('routines')} />}
        {tab === 'routines' && <RoutinesScreen />}
        {tab === 'history' && <HistoryScreen />}
        {tab === 'exercises' && <ExercisesScreen />}
      </View>

      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
              <Text style={[styles.tabIcon, !active && styles.tabIconDim]}>
                {t.icon}
              </Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function Shell() {
  const { state } = useStore();
  const c = useColors();
  const styles = makeStyles(c);
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={state.themeMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Root />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}

const makeStyles = (c: Colors) =>
  StyleSheet.create({
    flex: { flex: 1 },
    center: { alignItems: 'center', justifyContent: 'center' },
    safe: {
      flex: 1,
      backgroundColor: c.bg,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: c.surface,
      borderTopWidth: 1,
      borderTopColor: c.border,
      paddingTop: space(2),
      paddingBottom: space(5),
    },
    tab: { flex: 1, alignItems: 'center', gap: 2 },
    tabIcon: { fontSize: 20 },
    tabIconDim: { opacity: 0.5 },
    tabLabel: { color: c.textMuted, fontSize: 11, fontWeight: '600' },
    tabLabelActive: { color: c.primary, fontWeight: '800' },
  });
