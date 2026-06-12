import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, radius, space } from '../theme';
import { useColors } from '../useColors';
import { useStore } from '../store';
import { Button, Card, H1, Muted, Tag } from '../components/ui';
import { RoutineBuilder } from '../components/RoutineBuilder';
import { confirm } from '../components/confirm';

export function RoutinesScreen() {
  const {
    allRoutines,
    state,
    setActiveRoutine,
    deleteCustomRoutine,
    getExercise,
  } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const c = useColors();
  const styles = makeStyles(c);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}>
        <H1>Routines</H1>
        <Muted style={{ marginBottom: space(4) }}>
          Pick a routine to follow, or build your own.
        </Muted>

        {allRoutines.map((r) => {
          const isActive = state.activeRoutineId === r.id;
          const isOpen = expanded === r.id;
          return (
            <Card key={r.id} style={styles.card}>
              <Pressable onPress={() => setExpanded(isOpen ? null : r.id)}>
                <View style={styles.cardHead}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.titleRow}>
                      <Text style={styles.name}>{r.name}</Text>
                      {isActive && <Tag label="ACTIVE" />}
                    </View>
                    <Text style={styles.meta}>
                      {r.daysPerWeek} days/week · {r.days.length} workouts
                      {r.isCustom ? ' · Custom' : ''}
                    </Text>
                  </View>
                  <Text style={styles.chev}>{isOpen ? '▾' : '›'}</Text>
                </View>
                <Text style={styles.desc}>{r.description}</Text>
              </Pressable>

              {isOpen && (
                <View style={{ marginTop: space(3), gap: space(3) }}>
                  {r.days.map((day) => (
                    <View key={day.id}>
                      <Text style={styles.dayTitle}>{day.name}</Text>
                      {day.exercises.map((re, i) => (
                        <View key={i} style={styles.exLine}>
                          <Text style={styles.exName}>
                            {getExercise(re.exerciseId)?.name ?? 'Exercise'}
                          </Text>
                          <Text style={styles.exScheme}>
                            {re.sets} ×{' '}
                            {re.repsLow === re.repsHigh
                              ? re.repsLow
                              : `${re.repsLow}–${re.repsHigh}`}
                          </Text>
                        </View>
                      ))}
                    </View>
                  ))}

                  <View style={styles.actions}>
                    <Button
                      title={isActive ? 'Active routine' : 'Set as active'}
                      onPress={() => setActiveRoutine(r.id)}
                      disabled={isActive}
                      style={{ flex: 1 }}
                    />
                    {r.isCustom && (
                      <Button
                        title="Delete"
                        variant="ghost"
                        onPress={() =>
                          confirm(
                            'Delete routine?',
                            r.name,
                            () => deleteCustomRoutine(r.id),
                            'Delete',
                            true
                          )
                        }
                      />
                    )}
                  </View>
                </View>
              )}
            </Card>
          );
        })}

        <Button
          title="＋ Create custom routine"
          variant="secondary"
          onPress={() => setBuilderOpen(true)}
          style={{ marginTop: space(4) }}
        />
      </ScrollView>

      <RoutineBuilder visible={builderOpen} onClose={() => setBuilderOpen(false)} />
    </>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  scroll: { padding: space(4), paddingBottom: space(16) },
  card: { marginBottom: space(3), gap: space(1) },
  cardHead: { flexDirection: 'row', alignItems: 'flex-start' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: space(2), flexWrap: 'wrap' },
  name: { color: c.text, fontSize: 18, fontWeight: '800' },
  meta: { color: c.textMuted, fontSize: 13, marginTop: 3 },
  chev: { color: c.textMuted, fontSize: 18, paddingLeft: space(2) },
  desc: { color: c.textMuted, fontSize: 14, marginTop: space(2), lineHeight: 20 },
  dayTitle: { color: c.primary, fontSize: 14, fontWeight: '800', marginBottom: space(1) },
  exLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: space(1.5),
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  exName: { color: c.text, fontSize: 14, flex: 1 },
  exScheme: { color: c.textMuted, fontSize: 14, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: space(3), marginTop: space(2) },
});
