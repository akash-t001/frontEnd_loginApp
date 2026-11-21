import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors, spacing, typography } from '../theme';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function AppButton({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  ...rest
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      {...rest}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        variant === 'secondary' && styles.secondary,
        isDisabled && styles.disabled,
        rest.style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} />
      ) : (
        <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  text: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.primary,
  },
});
