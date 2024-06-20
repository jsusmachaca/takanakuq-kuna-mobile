import { Home } from './src/screens/home/Home';
import { Publish } from './src/screens/Publish/Publish';

import { Login } from './src/screens/auth/Login';
import { Register } from './src/screens/auth/Register';
import { Profile } from './src/screens/auth/Profile';

import { HomeIcon } from './src/icons/components/HomeIcon';
import { AddIcon } from './src/icons/components/AddIcon';
import { HeartIcon } from './src/icons/components/HeartIcon';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initDatabase from './src/utils/database/db';
import { SQLiteProvider } from 'expo-sqlite';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserDetailIcon } from './src/icons/components/UserDetailsIcon';
import { UserDetails } from './src/screens/userDetails/UserDetails';
import { CallIcon } from './src/icons/components/CallIcon';
import { Header } from './src/Layouts/Header';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeTabs = () => (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 55,
      },
      header : ({ navigation }) => <Header navigation={navigation} />,
      headerStyle: [{ height: 50 }]
    }}>
      <Tab.Screen 
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? '#151515': 'none'} />
          )
        }}
      />
      <Tab.Screen 
        name='Calls'
        component={UserDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <CallIcon color={focused ? '#3E3E3E': 'none'} />
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
        name='Recipes'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <HeartIcon color={focused ? '#151515': 'none'} />
          )
        }}
      />
      <Tab.Screen 
        name='User'
        component={UserDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <UserDetailIcon color={focused ? '#151515': 'none'} />
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
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Register'
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name='Profile'
            component={Profile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  )    
}