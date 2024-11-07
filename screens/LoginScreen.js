import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors } from '../constants/colors';
import LoginContent from '../components/Login/LoginContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useLogin } from '../hooks/useLogin';
import { selectAuthState } from '../store/authSlice';

function LoginScreen() {
  const { status, error } = useSelector(selectAuthState);
  const login = useLogin();

  async function loginHandler({ username, password }) {
    console.log('loginHandler called');
    const result = await login(username, password);

    if (result && !result.success) {
      let alertMessage = result.error.message;
      if (result.error.type === 'InvalidCredentials') {
        alertMessage = 'Invalid username or password. Please try again.';
      } else if (result.error.type === 'ServerError') {
        alertMessage = 'Server error occurred. Please try again later.';
      } else if (result.error.type === 'NetworkError') {
        alertMessage =
          'Network error. Please check your connection and try again.';
      }
      Alert.alert('Authentication Failed!', alertMessage, [{ text: 'Okay' }]);
    }
  }

  if (status === 'loading') {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>PrayerLoop</Text>
      </View>
      <LoginContent style={styles.login} onAuthenticate={loginHandler} />
      {status === 'failed' && (
        <Text style={styles.errorText}>{error?.message}</Text>
      )}
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 64,
    padding: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: Colors.primary700,
  },
  login: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
