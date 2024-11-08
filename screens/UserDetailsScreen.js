import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';

function UserDetailsScreen() {
  const authState = useSelector(selectAuthState);

  const user = authState.user?.user;

  console.log(user);

  return (
    <View>
      <Text>User Details Screen</Text>
      <Text>User ID: {user.User_ID}</Text>
      <Text>Username: {user.Username}</Text>
      <Text>Email: {user.Email}</Text>
      <Text>First Name: {user.First_Name}</Text>
      <Text>Last Name: {user.Last_Name}</Text>
    </View>
  );
}

export default UserDetailsScreen;
