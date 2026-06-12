import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, radius, space } from '../theme';
import { useColors } from '../useColors';
import { useStore } from '../store';
import { Button, Card, H1, Muted, Tag } from '../components/ui';
import { formatDate, sessionDurationLabel, totalSets } from '../utils';

export function TodayScreen({ goToRoutines }: { goToRoutines: () => void }) {
  const { state, getRoutine, startSession, startEmptySession, repeatSession } =
    useStore();
  const c = useColors();
  const styles = makeStyles(c);

  const routine = getRoutine(state.activeRoutineId);
  const recent = state.sessions.slice(0, 3);
  const lastSession = state.sessions[0];

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <H1>Today</H1>
      <Muted style={{ marginBottom: space(4) }}>
        {new Date().toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })}
      </Muted>

      {routine ? (
        <Card style={{ gap: space(3) }}>
          <View style={styles.routineHead}>
            <Tag label="ACTIVE ROUTINE" />
            <Pressable onPress={goToRoutines} hitSlop={8}>
              <Text style={styles.change}>Change</Text>
            </Pressable>
          </View>
          <Text style={styles.routineName}>{routine.name}</Text>
          <Muted>Pick today's workout:</Muted>
          <View style={{ gap: space(2) }}>
            {routine.days.map((day) => (
              <Pressable
                key={day.id}
                style={styles.dayBtn}
                onPress={() => startSession(routine.id, day.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.dayBtnName}>{day.name}</Text>
                  <Text style={styles.dayBtnSub}>
                    {day.exercises.length} exercises
                  </Text>
                </View>
                <Text style={styles.startArrow}>Start ›</Text>
              </Pressable>
            ))}
          </View>
        </Card>
      ) : (
        <Card style={{ gap: space(3) }}>
          <Text style={styles.routineName}>No routine selected</Text>
          <Muted>
            Choose a routine like Bro Split, A/B Day or Booty Builder — or just
            start a quick freestyle workout.
          </Muted>
          <Button title="Browse routines" onPress={goToRoutines} />
        </Card>
      )}

      {lastSession && (
        <Button
          title={`↻ Repeat last — ${lastSession.dayName}`}
          variant="secondary"
          onPress={() => repeatSession(lastSession.id)}
          style={{ marginTop: space(4) }}
        />
      )}

      <Button
        title="＋ Quick workout (no routine)"
        variant="ghost"
        onPress={startEmptySession}
        style={{ marginTop: space(3) }}
      />

      {recent.length > 0 && (
        <View style={{ marginTop: space(8) }}>
          <Text style={styles.sectionTitle}>Recent</Text>
          {recent.map((s) => (
            <View key={s.id} style={styles.recentRow}>
              <View>
                <Text style={styles.recentName}>{s.dayName}</Text>
                <Text style={styles.recentSub}>{formatDate(s.startedAt)}</Text>
              </View>
              <Text style={styles.recentMeta}>
                {totalSets(s)} sets · {sessionDurationLabel(s)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  scroll: { padding: space(4), paddingBottom: space(16) },
  routineHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  change: { color: c.primary, fontWeight: '700', fontSize: 14 },
  routineName: { color: c.text, fontSize: 22, fontWeight: '800' },
  dayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: c.surfaceAlt,
    borderRadius: radius.md,
    padding: space(3.5),
  },
  dayBtnName: { color: c.text, fontSize: 16, fontWeight: '700' },
  dayBtnSub: { color: c.textMuted, fontSize: 13, marginTop: 2 },
  startArrow: { color: c.primary, fontSize: 16, fontWeight: '800' },
  sectionTitle: { color: c.text, fontSize: 18, fontWeight: '700', marginBottom: space(2) },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: space(3),
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  recentName: { color: c.text, fontSize: 15, fontWeight: '600' },
  recentSub: { color: c.textMuted, fontSize: 13, marginTop: 2 },
  recentMeta: { color: c.textMuted, fontSize: 13 },
});
