import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { radius, space } from '../theme';
import { useColors } from '../useColors';

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const c = useColors();
  return (
    <View
      style={[
        {
          backgroundColor: c.surface,
          borderRadius: radius.md,
          padding: space(4),
          borderWidth: 1,
          borderColor: c.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}: {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const c = useColors();
  const bg =
    variant === 'primary'
      ? c.primary
      : variant === 'danger'
      ? c.danger
      : variant === 'secondary'
      ? c.surfaceAlt
      : 'transparent';
  const color =
    variant === 'primary' || variant === 'danger' ? '#fff' : c.text;
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [
        {
          paddingVertical: space(3.5),
          paddingHorizontal: space(5),
          borderRadius: radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bg,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
        variant === 'ghost' && { borderWidth: 1, borderColor: c.border },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={{ fontSize: 16, fontWeight: '700', color }}>{title}</Text>
      )}
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: space(2),
        paddingHorizontal: space(3.5),
        borderRadius: radius.pill,
        backgroundColor: selected ? c.primary : c.chip,
      }}
    >
      <Text
        style={{
          color: selected ? '#fff' : c.textMuted,
          fontSize: 14,
          fontWeight: selected ? '700' : '600',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function Tag({ label }: { label: string }) {
  const c = useColors();
  return (
    <View
      style={{
        paddingVertical: 2,
        paddingHorizontal: space(2.5),
        borderRadius: radius.sm,
        backgroundColor: c.primaryDim,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ color: c.primary, fontSize: 12, fontWeight: '700' }}>
        {label}
      </Text>
    </View>
  );
}

export function H1({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text style={[{ color: c.text, fontSize: 30, fontWeight: '800' }, style]}>{children}</Text>;
}
export function H2({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text style={[{ color: c.text, fontSize: 20, fontWeight: '700' }, style]}>{children}</Text>;
}
export function Muted({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const c = useColors();
  return <Text style={[{ color: c.textMuted, fontSize: 14 }, style]}>{children}</Text>;
}

export function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const c = useColors();
  return (
    <View style={{ alignItems: 'center', paddingVertical: space(12), gap: 6 }}>
      <Text style={{ color: c.text, fontSize: 17, fontWeight: '700' }}>{title}</Text>
      {subtitle ? (
        <Text
          style={{
            color: c.textMuted,
            fontSize: 14,
            textAlign: 'center',
            paddingHorizontal: space(8),
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
