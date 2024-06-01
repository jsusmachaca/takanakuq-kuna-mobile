import { Home } from './src/screens/home/Home';
import { Publish } from './src/screens/Publish/Publish';

import { Login } from './src/screens/auth/Login';
import { Register } from './src/screens/auth/Register';
import { Profile } from './src/screens/auth/Profile';

import { HomeIcon } from './src/screens/icons/components/HomeIcon';
import { AddIcon } from './src/screens/icons/components/AddIcon';
import { HeartIcon } from './src/screens/icons/components/HeartIcon';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initDatabase from './src/utils/database/db';
import { SQLiteProvider } from 'expo-sqlite';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeTabs = () => (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }
    }}>
      <Tab.Screen 
        name='Home'
        component={Home}
        options={{
          tabBarIcon: () => (
            <HomeIcon />
          )
        }}
      />
      <Tab.Screen 
        name='Publish'
        component={Publish}
        options={{
          tabBarIcon: () => (
            <AddIcon />
          ),
          tabBarStyle: { display: 'none' },
          headerShown: false
        }}

      />
      <Tab.Screen 
        name='User'
        component={Home}
        options={{
          tabBarIcon: () => (
            <HeartIcon />
          )
        }}
      />
    </Tab.Navigator>  
)

export default function App() {
  return (
    <SQLiteProvider databaseName='takanakuq.db' onInit={initDatabase}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='HomeTabs'
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Login'
            component={Login}
            options={{ headerShown: false, title: 'Login' }}
          />
          <Stack.Screen 
            name='Register'
            component={Register}
            options={{ headerShown: false, title: 'Register' }}
          />
          <Stack.Screen 
            name='Profile'
            component={Profile}
            options={{ headerShown: false, title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  )    
}