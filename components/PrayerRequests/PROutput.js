import { View, Text, StyleSheet } from 'react-native';

import PRList from './PRList';
import { Colors } from '../../constants/colors';

function PROutput({ prayerRequests }) {
  console.log(prayerRequests);

  return (
    <View style={styles.container}>
      <PRList prayerRequests={prayerRequests} />
    </View>
  );
}

export default PROutput;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary300,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});