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

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import logo from './assets/logo.5.png'
import { UserDetailIcon } from './src/screens/icons/components/UserDetailsIcon';
import { UserDetails } from './src/screens/userDetails/UserDetails';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
/*
<svg viewBox="0 0 640 512">
  <path d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v17.7c0 7.8 4.8 14.8 11.6 18.7c6.8 3.9 15.1 4.5 21.8 .6l13.8-7.9c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-14.4 8.3c-6.5 3.7-10 10.9-10 18.4s3.5 14.7 10 18.4l14.4 8.3c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-13.8-7.9c-6.7-3.9-15.1-3.3-21.8 .6c-6.8 3.9-11.6 10.9-11.6 18.7v17.7c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V467.8c0-7.9-4.9-14.9-11.7-18.9c-6.8-3.9-15.2-4.5-22-.6l-13.5 7.8c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l14-8.1c6.5-3.8 10.1-11.1 10.1-18.6s-3.5-14.8-10.1-18.6l-14-8.1c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l13.6 7.8c6.8 3.9 15.2 3.3 22-.6c6.9-3.9 11.7-11 11.7-18.9V218.2zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z"/>
</svg>
*/
const Header = ({ navigation }) => {
  return (
    <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', paddingHorizontal: 10, backgroundColor: '#fff'}}>
      <Image
        source={logo}
        width={10}
        height={10}
        style={{ width: 90, height: 80, marginLeft: 1 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('User')} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Svg fill='none' stroke='#000000' strokeWidth='40' viewBox='0 0 640 512' width={40} height={40}>
          <Path
            d='M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v17.7c0 7.8 4.8 14.8 11.6 18.7c6.8 3.9 15.1 4.5 21.8 .6l13.8-7.9c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-14.4 8.3c-6.5 3.7-10 10.9-10 18.4s3.5 14.7 10 18.4l14.4 8.3c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-13.8-7.9c-6.7-3.9-15.1-3.3-21.8 .6c-6.8 3.9-11.6 10.9-11.6 18.7v17.7c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V467.8c0-7.9-4.9-14.9-11.7-18.9c-6.8-3.9-15.2-4.5-22-.6l-13.5 7.8c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l14-8.1c6.5-3.8 10.1-11.1 10.1-18.6s-3.5-14.8-10.1-18.6l-14-8.1c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l13.6 7.8c6.8 3.9 15.2 3.3 22-.6c6.9-3.9 11.7-11 11.7-18.9V218.2zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z'
          />
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

const HomeTabs = () => (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
      header : ({ navigation }) => <Header navigation={navigation} />,
      headerStyle: [{ height: 70 }]
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
        name='User2'
        component={UserDetails}
        options={{
          tabBarIcon: () => (
            <UserDetailIcon />
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
          tabBarIcon: () => (
            <HeartIcon />
          )
        }}
      />
      <Tab.Screen 
        name='User'
        component={UserDetails}
        options={{
          tabBarIcon: () => (
            <UserDetailIcon />
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