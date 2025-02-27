import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { useTheme } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form'
import Button from '@/components/button'
import { useRouter } from 'expo-router'
import useFirebaseHook from '@/hooks/useFirebaseHook'
import useStoreSnackbar from '@/stores/storeSnackbar'
import useStoreLoading from '@/stores/useStoreLoading'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { z } from 'zod';
import { styles } from './_layout'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';



const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

const SignInPage = () => {
    const theme = useTheme();
    const makeStyle = styles(theme);
    const router = useRouter();

    const [showPassword, setShowPassword] = React.useState(false);

    const { signIn } = useFirebaseHook();
    const loading = useStoreLoading();
    const snackBar = useStoreSnackbar();
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: SignUpSchema) => {
        loading.setLoading(true)
        try {
            await signIn(data.email, data.password);
            router.replace("/board");
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-credential") {
                    snackBar.showSnackbar({ message: "Email or password is incorrect", duration: 2 * 1000, visible: true });
                }
            } else {
                snackBar.showSnackbar({ message: (error as Error).message, duration: 2 * 1000, visible: true });
            }

        } finally {
            loading.setLoading(false)
        }
    };


    return (
        <ScrollView style={makeStyle.scrollView}
            contentContainerStyle={makeStyle.scrollContent}>
            <SafeAreaView style={makeStyle.container}>
                {/* <Image
                    style={makeStyle.logo}
                    source={require("@/assets/icon.png")}
                /> */}
                <ThemedText style={makeStyle.h1} type="title">Sign In</ThemedText>

                <Controller
                    control={control}
                    name="email"
                    rules={{ required: "Email is required" }}
                    render={({ field: { onChange, value, onBlur } }) => (
                        <View style={makeStyle.controller}>
                            <View style={[makeStyle.inputContainer, { borderColor: errors.email ? "red" : theme.colors.inversePrimary }]}>
                                <Feather name="mail" size={16} color={errors.email ? "red" : theme.colors.inversePrimary} style={makeStyle.suffixIcon} />
                                <TextInput
                                    placeholder='Email or username'
                                    placeholderTextColor={errors.email ? "red" : theme.colors.outline}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    style={[makeStyle.input]} />
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
                            <View style={[makeStyle.inputContainer, { borderColor: errors.password ? "red" : theme.colors.inversePrimary }]}>
                                <Feather name={showPassword ? "unlock" : "lock"} size={16} color={errors.password ? "red" : theme.colors.inversePrimary} style={makeStyle.suffixIcon} />
                                <TextInput
                                    placeholder='Password'
                                    placeholderTextColor={errors.password ? "red" : theme.colors.outline}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    onBlur={onBlur}
                                    secureTextEntry={!showPassword}
                                    style={[makeStyle.input]} />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Feather name={showPassword ? "eye-off" : "eye"} size={16} color={theme.colors.inversePrimary} style={makeStyle.suffixIcon} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={makeStyle.textError}>{errors.password.message}</Text>}
                        </View>
                    )}
                />
                <View style={makeStyle.textBottom}>
                    <Text style={{ marginRight: 10 }}> Dont' you have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        router.navigate("sign-up");
                    }}>
                        <Text style={{ color: theme.colors.primary, textDecorationLine: "underline", }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={makeStyle.button}>
                    <Button
                        label="Sign In"
                        fontSize={16}
                        onPress={handleSubmit(onSubmit)}
                        disabled={false}
                    />
                </View>

                <Text style={{ color: theme.colors.outline }}>OR</Text>
                <View style={makeStyle.otherAuthContainer}>
                    <TouchableOpacity style={makeStyle.gmailContainer}>
                        <FontAwesome name="google" size={24} color="#dd4b39" />
                        <Text style={{ color: theme.colors.outline, fontWeight: "bold" }}>Login with Google</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SignInPage