import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, radius, space } from '../theme';
import { useColors } from '../useColors';
import { useStore } from '../store';
import { Button, Card, EmptyState, H1, Muted } from '../components/ui';
import { confirm } from '../components/confirm';
import {
  formatDate,
  formatTime,
  heaviestSetIndex,
  sessionDurationLabel,
  totalSets,
  totalVolume,
} from '../utils';

export function HistoryScreen() {
  const { state, deleteSession, repeatSession } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  const c = useColors();
  const styles = makeStyles(c);
  const sessions = state.sessions;

  const totalWorkouts = sessions.length;
  const thisWeek = sessions.filter(
    (s) => Date.now() - s.startedAt < 7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <H1>History</H1>
      <Muted style={{ marginBottom: space(4) }}>
        {totalWorkouts} workouts logged · {thisWeek} this week
      </Muted>

      {sessions.length === 0 ? (
        <EmptyState
          title="No workouts yet"
          subtitle="Finish a workout from the Today tab and it'll show up here."
        />
      ) : (
        sessions.map((s) => {
          const isOpen = open === s.id;
          return (
            <Card key={s.id} style={styles.card}>
              <Pressable onPress={() => setOpen(isOpen ? null : s.id)}>
                <View style={styles.head}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{s.dayName}</Text>
                    <Text style={styles.date}>
                      {formatDate(s.startedAt)} · {formatTime(s.startedAt)}
                    </Text>
                  </View>
                  <Text style={styles.chev}>{isOpen ? '▾' : '›'}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Meta value={String(s.exercises.length)} label="exercises" />
                  <Meta value={String(totalSets(s))} label="sets" />
                  <Meta
                    value={`${Math.round(totalVolume(s))}`}
                    label={`vol (${state.unit})`}
                  />
                  <Meta value={sessionDurationLabel(s)} label="time" />
                </View>
              </Pressable>

              {isOpen && (
                <View style={{ marginTop: space(3), gap: space(2.5) }}>
                  {s.exercises.map((le, i) => {
                    const top = heaviestSetIndex(le.sets);
                    return (
                      <View key={i}>
                        <Text style={styles.exName}>{le.name}</Text>
                        <Text style={styles.sets}>
                          {le.sets
                            .map(
                              (set, j) =>
                                `${set.weight}×${set.reps}${j === top ? ' 🏋️' : ''}`
                            )
                            .join('   ')}
                        </Text>
                      </View>
                    );
                  })}
                  {s.notes ? <Text style={styles.notes}>“{s.notes}”</Text> : null}
                  <Button
                    title="↻ Repeat this workout"
                    variant="secondary"
                    onPress={() => repeatSession(s.id)}
                    style={{ marginTop: space(2) }}
                  />
                  <Pressable
                    onPress={() =>
                      confirm(
                        'Delete workout?',
                        `${s.dayName} · ${formatDate(s.startedAt)}`,
                        () => deleteSession(s.id),
                        'Delete',
                        true
                      )
                    }
                  >
                    <Text style={styles.delete}>Delete workout</Text>
                  </Pressable>
                </View>
              )}
            </Card>
          );
        })
      )}
    </ScrollView>
  );
}

function Meta({ value, label }: { value: string; label: string }) {
  const c = useColors();
  const styles = makeStyles(c);
  return (
    <View style={styles.meta}>
      <Text style={styles.metaValue}>{value}</Text>
      <Text style={styles.metaLabel}>{label}</Text>
    </View>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  scroll: { padding: space(4), paddingBottom: space(16) },
  card: { marginBottom: space(3) },
  head: { flexDirection: 'row', alignItems: 'center' },
  name: { color: c.text, fontSize: 17, fontWeight: '800' },
  date: { color: c.textMuted, fontSize: 13, marginTop: 2 },
  chev: { color: c.textMuted, fontSize: 18 },
  metaRow: { flexDirection: 'row', gap: space(5), marginTop: space(3) },
  meta: {},
  metaValue: { color: c.text, fontSize: 16, fontWeight: '800' },
  metaLabel: { color: c.textMuted, fontSize: 12, marginTop: 1 },
  exName: { color: c.text, fontSize: 15, fontWeight: '600' },
  sets: { color: c.textMuted, fontSize: 14, marginTop: 2 },
  notes: { color: c.textMuted, fontStyle: 'italic', fontSize: 14 },
  delete: { color: c.danger, fontSize: 14, fontWeight: '600', marginTop: space(2) },
});
