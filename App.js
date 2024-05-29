import { Home } from './src/screens/home/Home';
import { Login } from './src/screens/auth/Login';
import { Register } from './src/screens/auth/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name='Home'
          component={Home}
          options={{title: 'Bienvenido'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )    
}