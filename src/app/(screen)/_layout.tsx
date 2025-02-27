import HeaderRight from '@/components/HeaderRight';
import { theme } from '@/config/theme';
import useStoreAuth from '@/stores/useStoreAuth';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import useStoreDialog from '@/stores/useStoreDialog';
import Button from '@/components/button';
const Layout = () => {
    const router = useRouter();
    const dialog = useStoreDialog();
    const { loggedIn } = useStoreAuth();
    useEffect(() => {
        if (!loggedIn) {
            router.replace("/sign-in");
        }
    }, [loggedIn])
    return (
        <Stack screenOptions={{
            headerTintColor: theme.colors.primary, // Back button color
            headerTitleStyle: {
                color: "#fff",
            },
            headerStyle: { backgroundColor: theme.colors.inversePrimary },
        }}>
            <Stack.Screen name="board"
                options={{
                    headerRight: HeaderRight,
                    headerBackVisible: true,
                    headerBackButtonMenuEnabled: true,
                    title: "Boards",
                }}
            />
            <Stack.Screen name="question-v2" options={{
                headerTitle: () => null,
                headerLeft: (props) => (
                    <TouchableOpacity {...props} onPress={() => {
                        dialog.onOpen({
                            title: "Alert",
                            children: (
                                <View style={{gap:20}}>
                                    <Text>Are you sure you want to go back?</Text>
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}>

                                        <Button
                                            linear={false}
                                            label={'Ok'}
                                            width={80}
                                            height={40}
                                            backgroundColor={theme.colors.error}
                                            onPress={() => {
                                                dialog.onDismiss();
                                                router.replace("/board");
                                            }}
                                        />
                                    </View>
                                </View>
                            ),

                        })
                    }}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                )
            }} />
            <Stack.Screen name="result" options={{ headerShown: false }} />
        </Stack>
    );
}


export default Layout;
