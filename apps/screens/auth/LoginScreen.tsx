import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MD3Theme, useTheme } from 'react-native-paper';
import Button from '../../components/button';
import { RootStackProps } from '../MyStack';

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import useStoreAuth from '@/stores/useStoreAuth';

export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;


const LoginScreen = ({
    navigation:{
        navigate
    },
}: NativeStackScreenProps<RootStackProps>) => {
    const theme = useTheme();
    const makeStyle = styles(theme);
    const {login} = useStoreAuth();
     const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
            resolver: zodResolver(signUpSchema),
            defaultValues: {
                email: "",
                password: "",
            }
        });
    
        const onSubmit = async (data: SignUpSchema) => {
            try {
                await login(data.email, data.password);
                navigate("Board");
            } catch (error) {
                console.log(error);
            }
        };
    return (
        <ScrollView
            style={makeStyle.scrollView}
            contentContainerStyle={makeStyle.scrollContent}
        >
            <SafeAreaView
                style={makeStyle.container}
            >
                <Image
                    style={makeStyle.logo}
                    source={require("../../../assets/images/Questions-pana.png")}
                />
                <Text style={makeStyle.h1}>Sign In</Text>
                <View style={{ height: 20 }} />
                
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Email is required" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <View style={makeStyle.controller}>
                            <View style={makeStyle.inputContainer}>
                                <TextInput
                                    placeholder='Email or username'
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    style={{ ...makeStyle.input, borderColor: errors.email ? "red" : theme.colors.inversePrimary }} />
                            </View>
                            {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: "Password" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <View style={makeStyle.controller}>
                            <View style={makeStyle.inputContainer}>
                                <TextInput
                                    placeholder='Password'
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry
                                    style={{ ...makeStyle.input, borderColor: errors.password ? "red" : theme.colors.inversePrimary }} />
                            </View>
                            {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
                        </View>
                    )}
                />
                
                <TouchableOpacity onPress={() => { console.log("FORGET PASSWORD"); }} style={{ marginBottom: 20 }}>
                    <Text style={{ textDecorationLine: "underline" }}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                    label="Login"
                    style={makeStyle.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={false}
                />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ marginRight: 10 }}> Dont' you have an account?</Text>
                    <TouchableOpacity onPress={() => navigate("Register")}>
                        <Text style={{ color: theme.colors.primary, textDecorationLine: "underline" }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = (theme: MD3Theme) => StyleSheet.create({
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
        color: theme.colors.inversePrimary
    },
    controller: {
        flexDirection: "column",
        gap: 1,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 8,
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

});

export default LoginScreen;
