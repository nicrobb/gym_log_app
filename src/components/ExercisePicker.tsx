import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors, radius, space } from '../theme';
import { useColors } from '../useColors';
import { Exercise } from '../types';
import { useStore } from '../store';

export function ExercisePicker({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}) {
  const { allExercises } = useStore();
  const c = useColors();
  const styles = makeStyles(c);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? allExercises.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.muscleGroup.toLowerCase().includes(q)
        )
      : allExercises;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [allExercises, query]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Exercise</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.close}>Done</Text>
          </Pressable>
        </View>
        <TextInput
          placeholder="Search exercises…"
          placeholderTextColor={c.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.search}
          autoCorrect={false}
        />
        <FlatList
          data={filtered}
          keyExtractor={(e) => e.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.row,
                pressed && { backgroundColor: c.surfaceAlt },
              ]}
              onPress={() => {
                onSelect(item);
              }}
            >
              <View>
                <Text style={styles.rowName}>{item.name}</Text>
                <Text style={styles.rowGroup}>{item.muscleGroup}</Text>
              </View>
              <Text style={styles.plus}>＋</Text>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
}

const makeStyles = (c: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.bg,
      paddingHorizontal: space(4),
      paddingTop: space(4),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: space(3),
    },
    title: { color: c.text, fontSize: 22, fontWeight: '800' },
    close: { color: c.primary, fontSize: 16, fontWeight: '700' },
    search: {
      backgroundColor: c.surface,
      borderRadius: radius.md,
      paddingHorizontal: space(4),
      paddingVertical: space(3),
      color: c.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: c.border,
      marginBottom: space(2),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: space(3.5),
      paddingHorizontal: space(2),
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    rowName: { color: c.text, fontSize: 16, fontWeight: '600' },
    rowGroup: { color: c.textMuted, fontSize: 13, marginTop: 2 },
    plus: { color: c.primary, fontSize: 24, fontWeight: '700' },
  });
