import { useFonts } from "expo-font";
import { Stack, Slot, Redirect, useNavigationContainerRef, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { theme } from "@/config/theme";
import DialogProvider from "@/providers/dialogProvider";
import LoadingProvider from "@/providers/loadingProvider";
import SnackBarProvider from "@/providers/snackbarProvider";
import useStoreAuth from "@/stores/useStoreAuth";
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
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(screen)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <DialogProvider />
                <LoadingProvider />
                <SnackBarProvider />
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
