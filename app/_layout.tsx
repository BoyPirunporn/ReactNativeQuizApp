import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { PaperProvider } from 'react-native-paper';
import { theme } from '@/config/theme';
import DialogProvider from '@/providers/dialogProvider';
import LoadingProvider from '@/providers/loadingProvider';
import SnackBarProvider from '@/providers/snackbarProvider';
import useStoreAuth from '@/stores/useStoreAuth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export const unstable_settings = {
  initiaRouteName:"(auth)"
}
export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { user } = useStoreAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <DialogProvider />
      <LoadingProvider />
      <SnackBarProvider />
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, headerLeft: () => null, title: "" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
