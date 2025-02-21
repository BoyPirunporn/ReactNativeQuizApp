import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MD3Theme, useTheme } from 'react-native-paper';
import Button from '../../components/button'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const LoginScreen = (props: NativeStackScreenProps) => {
    const theme = useTheme();
    const makeStyle = styles(theme)
    return (
        <ScrollView>
            <SafeAreaView style={makeStyle.container}>
                <Image
                    style={makeStyle.logo}
                    source={require("../../../assets/images/Questions-pana.png")}
                />
                <Text style={makeStyle.h1}>Login</Text>
                <View style={{ height: 20 }} />
                <View style={makeStyle.inputContainer}>
                    <TextInput placeholder='Email or username' style={makeStyle.input} />
                </View>
                <View style={makeStyle.inputContainer}>
                    <TextInput placeholder='Password' secureTextEntry style={makeStyle.input} />
                </View>
                <TouchableOpacity onPress={() => { console.log("FORGET PASSWORD") }} style={{ marginBottom: 20 }}>
                    <Text style={{ textDecorationLine: "underline" }}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                    label="Login"
                    style={makeStyle.button}
                    onPress={() => { }}
                    disabled={false}
                />
                <Text style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}> Dont' you have an account?
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Text style={{ color: theme.colors.primary }}>Sign Up</Text>
                    </TouchableOpacity>
                </Text>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = (theme: MD3Theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
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
        color: theme.colors.inversePrimary
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.inversePrimary,
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
    buttonText: {},

})

export default LoginScreen;
