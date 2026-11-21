import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

interface AppTextInputProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export function AppTextInput({ label, error, secureTextEntry, ...rest }: AppTextInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(Boolean(secureTextEntry));
  const isSecure = Boolean(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          focused && styles.focused,
          Boolean(error) && styles.errored,
        ]}
      >
        <TextInput
          {...rest}
          secureTextEntry={isSecure && hidden}
          style={styles.input}
          placeholderTextColor={colors.disabled}
          onFocus={e => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
        />
        {isSecure && (
          <Text style={styles.toggle} onPress={() => setHidden(v => !v)}>
            {hidden ? 'Show' : 'Hide'}
          </Text>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  focused: {
    borderColor: colors.primary,
  },
  errored: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.text,
  },
  toggle: {
    ...typography.caption,
    color: colors.primary,
    paddingHorizontal: spacing.md,
    fontWeight: '600',
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
