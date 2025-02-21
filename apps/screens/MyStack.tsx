import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home/HomeScreen';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import BoardScreen from './board/BoardScreen';
import ResultScreen from './result/ResultScreen';
import QuestionScreenTwo from './questions/QuestionScreenTwo';
import Login from './auth/LoginScreen';
import Register from './auth/RegisterScreen';
import { useEffect } from 'react';
import useStoreAuth from '@/stores/useStoreAuth';
export type RootStackProps = {
    Home: undefined,
    Question: undefined;
    Board: undefined;
    Result: undefined;
    Login: undefined;
    Register: undefined;
};

export type PropsNavieStack = NativeStackScreenProps<RootStackProps>;
const Stack = createStackNavigator();


const AppNavigator = () => {
    const theme = useTheme();
    const { user, listenToAuthChanges } = useStoreAuth();
    useEffect(() => {
        listenToAuthChanges();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" >
                {/* Get Started เป็นหน้าแรก */}
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                {user ? (
                    <Stack.Group >
                        <Stack.Screen name='Question' component={QuestionScreenTwo} options={{
                            title: 'Questions',
                            headerBackTitleVisible: false, // Hide back button text
                            headerTintColor: theme.colors.primary, // Back button color
                            headerStyle: {
                                backgroundColor: theme.colors.inversePrimary, // Header background color
                            },
                        }} />
                        <Stack.Screen name='Board' component={BoardScreen} options={{
                            title: 'Scoreboard',
                            headerLeft: () => null,
                            headerBackTitleVisible: false, // Hide back button text
                            headerTintColor: theme.colors.primary, // Back button color
                            headerStyle: {
                                backgroundColor: theme.colors.inversePrimary, // Header background color
                            },
                        }} />
                        <Stack.Screen name='Result' component={ResultScreen} options={{
                            title: 'Finish',
                            headerLeft: () => null,
                            headerShown: false,
                            headerBackTitleVisible: false, // Hide back button text
                            headerTintColor: theme.colors.primary, // Back button color
                            headerStyle: {
                                backgroundColor: theme.colors.inversePrimary, // Header background color
                            },
                        }} />
                    </Stack.Group>
                ) : (
                    <Stack.Group screenOptions={{ animationEnabled: false, gestureEnabled: true }}>
                        <Stack.Screen name="Login" component={Login} options={{
                            title: '',
                            headerBackTitleVisible: false,
                            headerTintColor: theme.colors.primary,
                            headerStyle: { backgroundColor: theme.colors.inversePrimary },
                            headerLeft: () => null // 🔥 ซ่อนปุ่ม back
                        }} />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default AppNavigator;