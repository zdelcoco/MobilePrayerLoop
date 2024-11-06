import { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { Colors } from '../constants/colors';
import LoginContent from '../components/Login/LoginContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState();

  //const authCtx = useContext(AuthContext);

  async function loginHandler({ username, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(username, password);
      //authCtx.authenticate(token);
      Alert.alert('Authentication Passed!', token, [{ text: 'Okay' }]);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert('Authentication Failed!', error.message, [{ text: 'Okay' }]);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>PrayerLoop</Text>
      </View>
      <LoginContent style={styles.login} onAuthenticate={loginHandler}/>
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
});
