import Button from '@/components/button';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UseFirebaseHook from '@/hooks/useFirebaseHook';
import useStoreLoading from '@/stores/useStoreLoading';
import { FirebaseError } from 'firebase/app';
import useStoreSnackbar from '@/stores/storeSnackbar';
import { useRouter } from 'expo-router';
import { styles } from './_layout';
import FontAwesome from '@expo/vector-icons/FontAwesome';




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
            router.replace("/board");
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
                {/* <Image
                    style={makeStyle.logo}
                    source={require("@/assets/icon.png")}
                /> */}
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


                <View style={makeStyle.textBottom}>
                    <Text style={{ marginRight: 10 }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.navigate("sign-in")}>
                        <Text style={{ color: theme.colors.primary, textDecorationLine: "underline" }}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={makeStyle.button}>
                    <Button
                        label="Sign up"
                        fontSize={16}
                        onPress={handleSubmit(onSubmit)}
                        disabled={false}
                    />
                </View>

                <Text style={{ color: theme.colors.outline }}>OR</Text>
                <View style={makeStyle.otherAuthContainer}>
                    <TouchableOpacity style={makeStyle.gmailContainer}>
                        <FontAwesome name="google" size={24} color="#dd4b39" />
                        <Text style={{ color: theme.colors.outline, fontWeight: "bold" }}>Sign up with Google</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
};

export default RegisterScreen;
