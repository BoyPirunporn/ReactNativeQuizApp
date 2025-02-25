import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/config/theme";
import DialogProvider from "@/providers/dialogProvider";
import LoadingProvider from "@/providers/loadingProvider";
import SnackBarProvider from "@/providers/snackbarProvider";
import useFirebaseHook from "@/hooks/useFirebaseHook";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    });
    const { listenToAuthChanges } = useFirebaseHook();
    useEffect(() => {
        listenToAuthChanges();
    }, []);


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <Stack screenOptions={{
                    headerShown: false,
                    animation: "none"
                }}>
                    <Stack.Screen name="index" options={{  animation: "fade" }} />
                    <Stack.Screen name="(auth)" options={{  animation: "fade_from_bottom" }} />
                    <Stack.Screen name="(screen)" options={{ }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <DialogProvider />
                <LoadingProvider />
                <SnackBarProvider />
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
