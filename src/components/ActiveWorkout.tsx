import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors, radius, space } from '../theme';
import { useColors } from '../useColors';
import { useStore } from '../store';
import { Button, Card } from './ui';
import { ExercisePicker } from './ExercisePicker';
import { confirm, notify } from './confirm';
import { sessionDurationLabel, totalSets, totalVolume } from '../utils';

export function ActiveWorkout() {
  const {
    state,
    updateSet,
    addSet,
    removeSet,
    addExerciseToSession,
    removeSessionExercise,
    finishSession,
    cancelSession,
    lastPerformance,
  } = useStore();
  const c = useColors();
  const styles = makeStyles(c);
  const session = state.activeSession!;
  const unit = state.unit;
  const [pickerOpen, setPickerOpen] = useState(false);
  const [, force] = useState(0);

  // live timer tick
  useEffect(() => {
    const t = setInterval(() => force((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const confirmFinish = () => {
    const done = totalSets(session);
    if (done === 0) {
      notify('Nothing logged', 'Mark at least one set as done, or discard this workout.');
      return;
    }
    confirm('Finish workout?', `${done} sets logged. Save to history?`, finishSession, 'Finish');
  };

  const confirmCancel = () => {
    confirm('Discard workout?', 'This will not be saved.', cancelSession, 'Discard', true);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.dayName}>{session.dayName}</Text>
        <View style={styles.statsRow}>
          <Stat label="Time" value={sessionDurationLabel(session)} />
          <Stat label="Sets done" value={String(totalSets(session))} />
          <Stat label={`Volume (${unit})`} value={String(Math.round(totalVolume(session)))} />
        </View>

        {session.exercises.map((le, ei) => {
          const last = lastPerformance(le.exerciseId);
          return (
            <Card key={`${le.exerciseId}-${ei}`} style={styles.exCard}>
              <View style={styles.exHeader}>
                <Text style={styles.exName}>{le.name}</Text>
                <Pressable onPress={() => removeSessionExercise(ei)} hitSlop={10}>
                  <Text style={styles.remove}>Remove</Text>
                </Pressable>
              </View>
              {last ? (
                <Text style={styles.lastLine}>
                  Last: {last.map((s) => `${s.weight}×${s.reps}`).join('  ')}
                </Text>
              ) : null}

              <View style={styles.setHeaderRow}>
                <Text style={[styles.setHeaderCell, { width: 34 }]}>Set</Text>
                <Text style={[styles.setHeaderCell, styles.flex1]}>{unit}</Text>
                <Text style={[styles.setHeaderCell, styles.flex1]}>Reps</Text>
                <Text style={[styles.setHeaderCell, { width: 52 }]}>Done</Text>
              </View>

              {le.sets.map((set, si) => (
                <View key={si} style={styles.setRow}>
                  <Text style={[styles.setIndex, { width: 34 }]}>{si + 1}</Text>
                  <TextInput
                    style={[styles.input, styles.flex1, set.done && styles.inputDone]}
                    keyboardType="decimal-pad"
                    value={set.weight ? String(set.weight) : ''}
                    placeholder="0"
                    placeholderTextColor={c.textMuted}
                    onChangeText={(t) =>
                      updateSet(ei, si, { weight: parseFloat(t) || 0 })
                    }
                  />
                  <TextInput
                    style={[styles.input, styles.flex1, set.done && styles.inputDone]}
                    keyboardType="number-pad"
                    value={set.reps ? String(set.reps) : ''}
                    placeholder="0"
                    placeholderTextColor={c.textMuted}
                    onChangeText={(t) =>
                      updateSet(ei, si, { reps: parseInt(t, 10) || 0 })
                    }
                  />
                  <Pressable
                    onPress={() => updateSet(ei, si, { done: !set.done })}
                    onLongPress={() => removeSet(ei, si)}
                    style={[styles.check, set.done && styles.checkOn, { width: 52 }]}
                  >
                    <Text style={styles.checkMark}>{set.done ? '✓' : ''}</Text>
                  </Pressable>
                </View>
              ))}

              <Pressable onPress={() => addSet(ei)} style={styles.addSet}>
                <Text style={styles.addSetText}>＋ Add set</Text>
              </Pressable>
            </Card>
          );
        })}

        <Button
          title="＋ Add exercise"
          variant="secondary"
          onPress={() => setPickerOpen(true)}
          style={{ marginTop: space(2) }}
        />

        <View style={styles.footerActions}>
          <Button title="Finish" onPress={confirmFinish} style={{ flex: 1 }} />
          <Button
            title="Discard"
            variant="ghost"
            onPress={confirmCancel}
            style={{ flex: 1 }}
          />
        </View>
        <Text style={styles.hint}>
          Tip: tap the box to mark a set done. Long-press it to delete the set.
        </Text>
      </ScrollView>

      <ExercisePicker
        visible={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(e) => {
          addExerciseToSession(e.id);
          setPickerOpen(false);
        }}
      />
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const c = useColors();
  const styles = makeStyles(c);
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  scroll: { padding: space(4), paddingBottom: space(20), gap: space(3) },
  dayName: { color: c.text, fontSize: 26, fontWeight: '800' },
  statsRow: { flexDirection: 'row', gap: space(3) },
  stat: {
    flex: 1,
    backgroundColor: c.surface,
    borderRadius: radius.md,
    paddingVertical: space(3),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: c.border,
  },
  statValue: { color: c.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: c.textMuted, fontSize: 12, marginTop: 2 },
  exCard: { gap: space(2) },
  exHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exName: { color: c.text, fontSize: 17, fontWeight: '700', flex: 1 },
  remove: { color: c.danger, fontSize: 13, fontWeight: '600' },
  lastLine: { color: c.textMuted, fontSize: 13 },
  setHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: space(2), marginTop: space(1) },
  setHeaderCell: { color: c.textMuted, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  flex1: { flex: 1 },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: space(2) },
  setIndex: { color: c.textMuted, fontSize: 15, textAlign: 'center', fontWeight: '700' },
  input: {
    backgroundColor: c.surfaceAlt,
    borderRadius: radius.sm,
    paddingVertical: space(2.5),
    color: c.text,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  inputDone: { backgroundColor: c.primaryDim },
  check: {
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: c.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: c.accent },
  checkMark: { color: c.accentText, fontSize: 18, fontWeight: '900' },
  addSet: { paddingVertical: space(2.5), alignItems: 'center' },
  addSetText: { color: c.primary, fontSize: 15, fontWeight: '700' },
  footerActions: { flexDirection: 'row', gap: space(3), marginTop: space(3) },
  hint: { color: c.textMuted, fontSize: 12, textAlign: 'center', marginTop: space(2) },
});
