import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector, useDispatch } from 'react-redux';

import { Colors } from './constants/colors';
import IconButton from './components/ui/IconButton';
import LoginScreen from './screens/LoginScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import PrayerRequestsScreen from './screens/PrayerRequestsScreen';

import store from './store/store';
import { logout } from './store/authSlice';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary200 },
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: Colors.primary500,
        },
        tabBarActiveTintColor: Colors.secondary200,
      }}
    >
      <BottomTabs.Screen
        name='PrayerRequests'
        component={PrayerRequestsScreen}
        options={{
          title: 'Prayer Requests',
          tabBarIcon: ({ color }) => (
            <IconButton icon='albums' color={color} size={24} />
          ),
          headerRight: () => (
            <IconButton
              icon='exit'
              color='white'
              size={24}
              onPress={() => dispatch(logout())}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name='UserDetails'
        component={UserDetailsScreen}
        options={{
          title: 'User Details',
          tabBarIcon: ({ color }) => (
            <IconButton icon='person' color={color} size={24} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;
}

function Root() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});