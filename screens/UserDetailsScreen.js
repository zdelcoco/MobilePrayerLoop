import { View, Text } from 'react-native';

function UserDetailsScreen( { route }) {

  const user = route.params.res?.user;

  return (
    <View>
      <Text>User Details Screen</Text>
      <Text>Username: {user.Username}</Text>
      <Text>Email: {user.Email}</Text>
      <Text>First Name: {user.First_Name}</Text>
      <Text>Last Name: {user.Last_Name}</Text>
    </View>
  )
}

export default UserDetailsScreen;