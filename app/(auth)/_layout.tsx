import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MD3Theme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
export const unstable_settings = {
    initiaRouteName: "sign-up"
}
const AuthLayout = () => {
    return (
        <Stack >
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: true, title: "" }} />
        </Stack>
    )
}

export const styles = (theme: MD3Theme) => StyleSheet.create({
    scrollView: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 30 },
    scrollContent: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    h1: {
        fontSize: 32,
        marginBottom: 40,
        fontWeight: 'bold',
        color: theme.colors.inversePrimary,
        textTransform: "uppercase"
        // alignSelf: "stretch"
    },
    controller: {
        flexDirection: "column",
        gap: 1,
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.colors.inversePrimary,
        borderRadius: 10,

    },
    suffixIcon: {

    },
    textError: { marginVertical: 10, color: "red" },
    input: {
        height: "100%",
        flex: 1,
        padding: 10,
        borderRadius: 10
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        fontSize: 18
    },
    textBottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20
    },
    otherAuthContainer: {
        marginTop: 20,
        flexDirection: "row",
        gap: 10
    },
    gmailContainer: {
        borderWidth: 1,
        borderColor: theme.colors.surfaceDisabled,
        width: "100%",
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap:20
    },

});

export default AuthLayout