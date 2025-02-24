import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="board" options={{ headerShown: true }} />
            <Stack.Screen name="question-v2" options={{ headerShown: false }} />
            <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
    );
}


export default Layout;
