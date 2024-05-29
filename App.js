import { Home } from './src/screens/home/Home';
import { Login } from './src/screens/auth/Login';
import { Register } from './src/screens/auth/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initDatabase from './src/utils/database/db';
import { SQLiteProvider } from 'expo-sqlite';

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <SQLiteProvider databaseName='takanakuq.db' onInit={initDatabase}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='Home'
            component={Home}
            options={{ headerShown: false, title: 'Bienvenido' }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  )    
}