import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
export const unstable_settings = {
    initiaRouteName:"sign-up"
  }
const AuthLayout = () => {
    return (
        <Stack >
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthLayout