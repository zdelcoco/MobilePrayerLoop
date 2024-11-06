import { useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';

import { Colors } from '../../constants/colors';

function LoginContent({ onAuthenticate}) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    password: false,
  });

  function submitHandler(credentials) {
    console.log(credentials);

    let { username, password } = credentials;

    username = username.trim();
    password = password.trim();

    const usernameIsValid = username.length > 0;
    const passwordIsValid = password.length > 0;

    if (!usernameIsValid || !passwordIsValid) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        username: !usernameIsValid,
        password: !passwordIsValid,
      });
      return;
    }

    onAuthenticate({ username, password})
  }

  return (
    <View style={styles.loginContent}>
      <LoginForm
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

export default LoginContent;

const styles = StyleSheet.create({
  loginContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
