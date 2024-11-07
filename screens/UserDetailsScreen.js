import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';

function UserDetailsScreen() {
  const authState = useSelector(selectAuthState);

  const user = authState.user;

  return (
    <View>
      <Text>User Details Screen</Text>
      <Text>User ID: {user.userId}</Text>
      <Text>Username: {user.userName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>First Name: {user.firstName}</Text>
      <Text>Last Name: {user.lastName}</Text>
    </View>
  );
}

export default UserDetailsScreen;
