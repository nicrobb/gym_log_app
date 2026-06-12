import React, { useState } from 'react';
import {
  Modal,
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
import { notify } from './confirm';
import { RoutineDay, RoutineExercise } from '../types';

let localId = 0;
const lid = () => `day-${Date.now()}-${localId++}`;

export function RoutineBuilder({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const c = useColors();
  const styles = makeStyles(c);
  const { addCustomRoutine, getExercise } = useStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState<RoutineDay[]>([
    { id: lid(), name: 'Day 1', exercises: [] },
  ]);
  const [pickerForDay, setPickerForDay] = useState<string | null>(null);

  const reset = () => {
    setName('');
    setDescription('');
    setDays([{ id: lid(), name: 'Day 1', exercises: [] }]);
  };

  const addDay = () =>
    setDays((d) => [...d, { id: lid(), name: `Day ${d.length + 1}`, exercises: [] }]);

  const removeDay = (id: string) =>
    setDays((d) => d.filter((x) => x.id !== id));

  const renameDay = (id: string, value: string) =>
    setDays((d) => d.map((x) => (x.id === id ? { ...x, name: value } : x)));

  const addExercise = (dayId: string, exerciseId: string) =>
    setDays((d) =>
      d.map((x) =>
        x.id === dayId
          ? {
              ...x,
              exercises: [
                ...x.exercises,
                { exerciseId, sets: 3, repsLow: 8, repsHigh: 12 },
              ],
            }
          : x
      )
    );

  const updateExercise = (
    dayId: string,
    index: number,
    patch: Partial<RoutineExercise>
  ) =>
    setDays((d) =>
      d.map((x) =>
        x.id === dayId
          ? {
              ...x,
              exercises: x.exercises.map((e, i) =>
                i === index ? { ...e, ...patch } : e
              ),
            }
          : x
      )
    );

  const removeExercise = (dayId: string, index: number) =>
    setDays((d) =>
      d.map((x) =>
        x.id === dayId
          ? { ...x, exercises: x.exercises.filter((_, i) => i !== index) }
          : x
      )
    );

  const save = () => {
    if (!name.trim()) {
      notify('Name required', 'Give your routine a name.');
      return;
    }
    const cleanDays = days.filter((d) => d.exercises.length > 0);
    if (cleanDays.length === 0) {
      notify('Add exercises', 'Add at least one exercise to one day.');
      return;
    }
    addCustomRoutine({
      name: name.trim(),
      description: description.trim() || 'Custom routine',
      daysPerWeek: cleanDays.length,
      days: cleanDays,
    });
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Text style={styles.title}>New Routine</Text>
          <Pressable onPress={save} hitSlop={12}>
            <Text style={styles.save}>Save</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            placeholder="Routine name (e.g. My Push/Pull/Legs)"
            placeholderTextColor={c.textMuted}
            value={name}
            onChangeText={setName}
            style={styles.field}
          />
          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor={c.textMuted}
            value={description}
            onChangeText={setDescription}
            style={[styles.field, { height: 70 }]}
            multiline
          />

          {days.map((day) => (
            <Card key={day.id} style={{ gap: space(2), marginTop: space(3) }}>
              <View style={styles.dayHeader}>
                <TextInput
                  value={day.name}
                  onChangeText={(t) => renameDay(day.id, t)}
                  style={styles.dayName}
                  placeholder="Day name"
                  placeholderTextColor={c.textMuted}
                />
                {days.length > 1 && (
                  <Pressable onPress={() => removeDay(day.id)} hitSlop={8}>
                    <Text style={styles.remove}>Delete day</Text>
                  </Pressable>
                )}
              </View>

              {day.exercises.map((re, i) => {
                const exName = getExercise(re.exerciseId)?.name ?? 'Exercise';
                return (
                  <View key={i} style={styles.exRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.exName}>{exName}</Text>
                      <View style={styles.numRow}>
                        <NumField
                          label="sets"
                          value={re.sets}
                          onChange={(v) => updateExercise(day.id, i, { sets: v })}
                        />
                        <NumField
                          label="rep min"
                          value={re.repsLow}
                          onChange={(v) => updateExercise(day.id, i, { repsLow: v })}
                        />
                        <NumField
                          label="rep max"
                          value={re.repsHigh}
                          onChange={(v) => updateExercise(day.id, i, { repsHigh: v })}
                        />
                      </View>
                    </View>
                    <Pressable onPress={() => removeExercise(day.id, i)} hitSlop={8}>
                      <Text style={styles.x}>✕</Text>
                    </Pressable>
                  </View>
                );
              })}

              <Pressable
                style={styles.addEx}
                onPress={() => setPickerForDay(day.id)}
              >
                <Text style={styles.addExText}>＋ Add exercise</Text>
              </Pressable>
            </Card>
          ))}

          <Button
            title="＋ Add day"
            variant="secondary"
            onPress={addDay}
            style={{ marginTop: space(4) }}
          />
        </ScrollView>
      </View>

      <ExercisePicker
        visible={pickerForDay !== null}
        onClose={() => setPickerForDay(null)}
        onSelect={(e) => {
          if (pickerForDay) addExercise(pickerForDay, e.id);
          setPickerForDay(null);
        }}
      />
    </Modal>
  );
}

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const c = useColors();
  const styles = makeStyles(c);
  return (
    <View style={styles.numField}>
      <TextInput
        value={String(value)}
        keyboardType="number-pad"
        onChangeText={(t) => onChange(parseInt(t, 10) || 0)}
        style={styles.numInput}
      />
      <Text style={styles.numLabel}>{label}</Text>
    </View>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space(4),
    paddingVertical: space(4),
  },
  title: { color: c.text, fontSize: 18, fontWeight: '800' },
  cancel: { color: c.textMuted, fontSize: 16 },
  save: { color: c.primary, fontSize: 16, fontWeight: '800' },
  scroll: { paddingHorizontal: space(4), paddingBottom: space(20) },
  field: {
    backgroundColor: c.surface,
    borderRadius: radius.md,
    paddingHorizontal: space(4),
    paddingVertical: space(3),
    color: c.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: c.border,
    marginTop: space(2),
  },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dayName: { color: c.text, fontSize: 17, fontWeight: '700', flex: 1 },
  remove: { color: c.danger, fontSize: 13, fontWeight: '600' },
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space(2),
    borderTopWidth: 1,
    borderTopColor: c.border,
    paddingTop: space(2.5),
  },
  exName: { color: c.text, fontSize: 15, fontWeight: '600' },
  numRow: { flexDirection: 'row', gap: space(3), marginTop: space(2) },
  numField: { alignItems: 'center' },
  numInput: {
    backgroundColor: c.surfaceAlt,
    borderRadius: radius.sm,
    paddingVertical: space(1.5),
    paddingHorizontal: space(3),
    color: c.text,
    fontSize: 15,
    fontWeight: '700',
    minWidth: 52,
    textAlign: 'center',
  },
  numLabel: { color: c.textMuted, fontSize: 11, marginTop: 3 },
  x: { color: c.danger, fontSize: 16, fontWeight: '700', padding: 4 },
  addEx: { paddingVertical: space(2.5), alignItems: 'center' },
  addExText: { color: c.primary, fontSize: 15, fontWeight: '700' },
});
