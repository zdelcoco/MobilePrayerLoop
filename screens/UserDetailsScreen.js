import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';

function UserDetailsScreen() {
  const authState = useSelector(selectAuthState);

  return (
    <View>
      <Text>User Details Screen</Text>
      <Text>User ID: {authState.userId}</Text>
      <Text>Username: {authState.userName}</Text>
      <Text>Email: {authState.email}</Text>
      <Text>First Name: {authState.firstName}</Text>
      <Text>Last Name: {authState.lastName}</Text>
    </View>
  );
}

export default UserDetailsScreen;
