import React, { useMemo, useState } from 'react';
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
import { Button, Card, Chip, H1, Muted } from '../components/ui';
import { confirm, notify } from '../components/confirm';
import { MUSCLE_GROUPS, MuscleGroup } from '../types';

export function ExercisesScreen() {
  const {
    allExercises,
    state,
    setUnit,
    setThemeMode,
    addCustomExercise,
    deleteCustomExercise,
  } = useStore();
  const c = useColors();
  const styles = makeStyles(c);
  const [addOpen, setAddOpen] = useState(false);
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? allExercises.filter((e) => e.name.toLowerCase().includes(q))
      : allExercises;
    const map = new Map<string, typeof allExercises>();
    for (const e of [...list].sort((a, b) => a.name.localeCompare(b.name))) {
      const arr = map.get(e.muscleGroup) ?? [];
      arr.push(e);
      map.set(e.muscleGroup, arr);
    }
    return Array.from(map.entries());
  }, [allExercises, query]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        <H1>Exercises</H1>
        <Muted style={{ marginBottom: space(4) }}>
          {allExercises.length} exercises · {state.customExercises.length} custom
        </Muted>

        <Card style={{ gap: space(4) }}>
          <View style={styles.settingsRow}>
            <Text style={styles.settingsTitle}>Appearance</Text>
            <View style={styles.chipRow}>
              <Chip
                label="Dark"
                selected={state.themeMode === 'dark'}
                onPress={() => setThemeMode('dark')}
              />
              <Chip
                label="Light"
                selected={state.themeMode === 'light'}
                onPress={() => setThemeMode('light')}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.settingsRow}>
            <Text style={styles.settingsTitle}>Weight unit</Text>
            <View style={styles.chipRow}>
              <Chip
                label="kg"
                selected={state.unit === 'kg'}
                onPress={() => setUnit('kg')}
              />
              <Chip
                label="lb"
                selected={state.unit === 'lb'}
                onPress={() => setUnit('lb')}
              />
            </View>
          </View>
        </Card>

        <TextInput
          placeholder="Search exercises…"
          placeholderTextColor={c.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          autoCorrect={false}
        />

        {grouped.map(([group, items]) => (
          <View key={group} style={{ marginTop: space(4) }}>
            <Text style={styles.group}>{group}</Text>
            {items.map((e) => (
              <View key={e.id} style={styles.row}>
                <Text style={styles.exName}>{e.name}</Text>
                {e.isCustom ? (
                  <Pressable
                    hitSlop={10}
                    onPress={() =>
                      confirm(
                        'Delete exercise?',
                        e.name,
                        () => deleteCustomExercise(e.id),
                        'Delete',
                        true
                      )
                    }
                  >
                    <Text style={styles.del}>✕</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        ))}

        <Button
          title="＋ Add custom exercise"
          variant="secondary"
          onPress={() => setAddOpen(true)}
          style={{ marginTop: space(6) }}
        />
      </ScrollView>

      <AddExerciseModal
        visible={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={(name, group) => {
          addCustomExercise({ name, muscleGroup: group });
          setAddOpen(false);
        }}
      />
    </>
  );
}

function AddExerciseModal({
  visible,
  onClose,
  onAdd,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, group: MuscleGroup) => void;
}) {
  const c = useColors();
  const styles = makeStyles(c);
  const [name, setName] = useState('');
  const [group, setGroup] = useState<MuscleGroup>('Chest');

  const submit = () => {
    if (!name.trim()) {
      notify('Name required', 'Enter an exercise name.');
      return;
    }
    onAdd(name.trim(), group);
    setName('');
    setGroup('Chest');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
          <Text style={styles.modalTitle}>Custom Exercise</Text>
          <Pressable onPress={submit} hitSlop={12}>
            <Text style={styles.save}>Add</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: space(4) }}>
          <TextInput
            placeholder="Exercise name"
            placeholderTextColor={c.textMuted}
            value={name}
            onChangeText={setName}
            style={styles.field}
            autoFocus
          />
          <Text style={styles.label}>Muscle group</Text>
          <View style={styles.chipWrap}>
            {MUSCLE_GROUPS.map((g) => (
              <Chip
                key={g}
                label={g}
                selected={group === g}
                onPress={() => setGroup(g)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const makeStyles = (c: Colors) =>
  StyleSheet.create({
    scroll: { padding: space(4), paddingBottom: space(16) },
    settingsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingsTitle: { color: c.text, fontSize: 16, fontWeight: '700' },
    chipRow: { flexDirection: 'row', gap: space(2) },
    divider: { height: 1, backgroundColor: c.border },
    search: {
      backgroundColor: c.surface,
      borderRadius: radius.md,
      paddingHorizontal: space(4),
      paddingVertical: space(3),
      color: c.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: c.border,
      marginTop: space(3),
    },
    group: { color: c.primary, fontSize: 14, fontWeight: '800', marginBottom: space(1) },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: space(3),
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    exName: { color: c.text, fontSize: 15 },
    del: { color: c.danger, fontSize: 16, fontWeight: '700' },
    modal: { flex: 1, backgroundColor: c.bg },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: space(4),
    },
    modalTitle: { color: c.text, fontSize: 18, fontWeight: '800' },
    cancel: { color: c.textMuted, fontSize: 16 },
    save: { color: c.primary, fontSize: 16, fontWeight: '800' },
    field: {
      backgroundColor: c.surface,
      borderRadius: radius.md,
      paddingHorizontal: space(4),
      paddingVertical: space(3.5),
      color: c.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: c.border,
    },
    label: { color: c.textMuted, fontSize: 14, marginTop: space(5), marginBottom: space(2) },
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space(2) },
  });
