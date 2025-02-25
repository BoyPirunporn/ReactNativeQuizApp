import HeaderRight from '@/components/HeaderRight';
import { theme } from '@/config/theme';
import { Stack, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';

const Layout = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: false,
        })
    }, [navigation])
    return (
        <Stack screenOptions={{
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerTintColor: theme.colors.primary, // Back button color
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: { backgroundColor: theme.colors.inversePrimary },
        }}>
            <Stack.Screen name="board"
                options={{
                    headerRight: HeaderRight,
                    headerBackVisible: true,
                    title: "Boards"
                }}
            />
            <Stack.Screen name="question-v2" options={{ headerShown: false }} />
            <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
    );
}


export default Layout;
