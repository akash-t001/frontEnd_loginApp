import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppButton, AppTextInput } from '../components';
import { colors, spacing, typography } from '../theme';
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from '../utils';
import type { AuthStackParamList } from '../navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

type FormErrors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
};

export function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const nextErrors: FormErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    try {
      // TODO: call auth API
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Fill in the details to register</Text>
        </View>

        <AppTextInput
          label="Full name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          placeholder="John Doe"
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
        />
        <AppTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
        />
        <AppTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          placeholder="••••••••"
          secureTextEntry
          autoComplete="password-new"
          textContentType="newPassword"
        />
        <AppTextInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          placeholder="••••••••"
          secureTextEntry
          autoComplete="password-new"
          textContentType="newPassword"
        />

        <AppButton title="Register" onPress={handleSubmit} loading={loading} />
        <AppButton
          title="Back to Sign In"
          variant="secondary"
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
          disabled={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  secondaryButton: {
    marginTop: spacing.md,
  },
});
