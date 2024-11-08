import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '../constants/colors';
import LoginContent from '../components/Login/LoginContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { selectAuthState, login } from '../store/authSlice';

function LoginScreen() {
  const { status, error } = useSelector(selectAuthState);
  const dispatch = useDispatch();

  async function loginHandler({ username, password }) {
    try {
      dispatch(login(username, password));
    } catch (error) {
      let alertMessage = error.message;
      if (error.type === 'InvalidCredentials') {
        alertMessage = 'Invalid username or password. Please try again.';
      } else if (error.type === 'ServerError') {
        alertMessage = 'Server error occurred. Please try again later.';
      } else if (error.type === 'NetworkError') {
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
