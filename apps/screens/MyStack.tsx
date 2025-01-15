import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home/HomeScreen';
import QuestionScreen from './questions/QuestionScreen';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import BoardScreen from './board/BoardScreen';
import ResultScreen from './result/ResultScreen';
import LoginScreen from './auth/login/LoginScreen';
import SignUpScreen from './auth/regis/SignUpScreen';
export type RootStackProps = {
    Home: undefined,
    Question: undefined;
    Board: undefined;
    Result: undefined;
    Login: undefined;
    Signup: undefined;
};

export type PropsNavieStack = NativeStackScreenProps<RootStackProps>;
const Stack = createStackNavigator<RootStackProps>();

const MyStack = () => {
    const theme = useTheme();
    const defaultScreenOptions = {
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.primary,
        headerStyle: {
            backgroundColor: theme.colors.inversePrimary,
        },
    };
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    animationEnabled: false,
                    gestureEnabled: true,
                    ...defaultScreenOptions,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Question"
                    component={QuestionScreen}
                    options={{ title: 'Questions' }}
                />
                <Stack.Screen
                    name="Board"
                    component={BoardScreen}
                    options={{
                        title: 'Scoreboard',
                        headerLeft: () => null,
                    }}
                />
                <Stack.Screen
                    name="Result"
                    component={ResultScreen}
                    options={{
                        title: 'Finish',
                        headerLeft: () => null,
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );


};

export default MyStack;