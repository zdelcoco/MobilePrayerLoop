import { Text, View, StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';
import LoginContent from '../components/Login/LoginContent';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>PrayerLoop</Text>
      </View>
      <LoginContent style={styles.login} />
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
