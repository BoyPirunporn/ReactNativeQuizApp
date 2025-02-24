import Button from '@/components/button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseFirebaseHook from '@/hooks/useFirebaseHook';
import useStoreLoading from '@/stores/useStoreLoading';
import { FirebaseError } from 'firebase/app';
import useStoreSnackbar from '@/stores/storeSnackbar';
import { useRouter } from 'expo-router';




export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            message: "Passwords do not match",
            code: "custom"
        });
    }
},);

type SignUpSchema = z.infer<typeof signUpSchema>;

const RegisterScreen = () => {
    const router = useRouter()
    const theme = useTheme();
    const makeStyle = styles(theme);
    const { signUp } = UseFirebaseHook();
    const { setLoading } = useStoreLoading();
    const snackBar = useStoreSnackbar();
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: SignUpSchema) => {
        setLoading(true)
        try {
            await signUp(data.email, data.password);
            router.navigate("Board");
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.code)
                console.log(error.message)
                if (error.code === "auth/invalid-credential") {
                    snackBar.showSnackbar({ message: "Email or password is incorrect", duration: 2 * 1000, visible: true });
                }
                if (error.code === "auth/email-already-in-use") {
                    snackBar.showSnackbar({ message: "Email already exists", duration: 2 * 1000, visible: true });
                }
            } else {
                snackBar.showSnackbar({ message: (error as Error).message, duration: 2 * 1000, visible: true });
            }

        } finally {
            setLoading(false)
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
                    source={require("../../assets/images/Questions-pana.png")}
                />
                <Text style={makeStyle.h1}>Sign Up</Text>
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
                            {errors.email && <Text style={makeStyle.textError}>{errors.email.message}</Text>}
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
                            {errors.password && <Text style={makeStyle.textError}>{errors.password.message}</Text>}
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{ required: "Password is required" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <View style={makeStyle.controller}>
                            <View style={makeStyle.inputContainer}>
                                <TextInput
                                    placeholder='Confirm Password'
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry
                                    style={{ ...makeStyle.input, borderColor: errors.confirmPassword ? "red" : theme.colors.inversePrimary }} />
                            </View>
                            {errors.confirmPassword && <Text style={makeStyle.textError}>{errors.confirmPassword.message}</Text>}
                        </View>
                    )}
                />

                <TouchableOpacity onPress={() => { console.log("FORGET PASSWORD"); }} style={{ marginBottom: 20 }}>
                    <Text style={{ textDecorationLine: "underline" }}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                    label="Sign UP"
                    style={makeStyle.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={false}
                />
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{ marginRight: 10 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.navigate("sign-in")}>
                        <Text style={{ color: theme.colors.primary, textDecorationLine: "underline" }}>Sign In</Text>
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
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 8,
    },

    textError: { marginVertical: 10, color: "red" },
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
export default RegisterScreen;
