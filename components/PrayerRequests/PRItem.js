import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';

function PRItem({ Title, Description }) {
  const navigation = useNavigation();

  function prPressHandler() {
    // implement
  }

  return (
    <Pressable
      onPress={prPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.PRItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {Title}
          </Text>
          <Text style={styles.textBase}>{Description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default PRItem;

const styles = StyleSheet.create({
  PRItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.secondary200,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.6,
  },
});
