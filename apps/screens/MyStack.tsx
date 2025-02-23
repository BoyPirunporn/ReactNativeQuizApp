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
import { View, Text, TouchableOpacity } from 'react-native';

import IonicIcons from 'react-native-vector-icons/Ionicons';
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
    const { user, listenToAuthChanges, logout } = useStoreAuth();
    useEffect(() => {
        listenToAuthChanges();
    }, []);


    const headerRight = () => (
        <TouchableOpacity onPress={async () => {
            await logout();
        }} style={{ marginRight: 10 }}>
            <IonicIcons name="log-out-outline" size={30} style={{
                color: "white"
            }} />
        </TouchableOpacity>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                {/* Get Started เป็นหน้าแรก */}
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

                <Stack.Group
                    screenOptions={
                        {
                            title: "",
                            headerLeft: () => null,
                            animationEnabled: false,
                            gestureEnabled: true,
                            headerBackTitleVisible: false,
                            headerTintColor: theme.colors.primary, // Back button color
                            headerTitleStyle: {
                                color: "#fff",
                                backgroundColor: theme.colors.inversePrimary
                            },
                            headerStyle: { backgroundColor: theme.colors.inversePrimary },
                        }
                    }
                >
                    {user ? (
                        <Stack.Group >
                            <Stack.Screen name='Question' component={QuestionScreenTwo} options={{
                                title: 'Questions',
                            }} />
                            <Stack.Screen name='Board' component={BoardScreen} options={{
                                title: 'Scoreboard',
                                headerRight,
                            }} />
                            <Stack.Screen name='Result' component={ResultScreen} options={{
                                title: 'Finish',
                            }} />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                        </Stack.Group>
                    )}

                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default AppNavigator;