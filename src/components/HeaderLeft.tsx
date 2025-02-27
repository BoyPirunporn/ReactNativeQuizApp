import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useStoreDialog from '@/stores/useStoreDialog';
import { theme } from '@/config/theme';
import IonicIcon from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useFirebaseHook from '@/hooks/useFirebaseHook';
import useStoreLoading from '@/stores/useStoreLoading';
const HeaderLeft = () => {
    const dialog = useStoreDialog();
    const router = useRouter();
    const {setLoading} = useStoreLoading();
    const { signOut } = useFirebaseHook();
    const handleSignOut = async () => {
        dialog.onDismiss();
        setLoading(true)
        await signOut();
        setLoading(false);
        router.push("/sign-in");
    };
    return (
        <TouchableOpacity onPress={async () => {
            dialog.onOpen({
                title: "LogOut",
                children: (
                    <View style={{
                        flexDirection: "column",
                        gap: 20
                    }}>
                        <Text>Are you sure you want to log out?</Text>
                        <View style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                        }}>
                            <TouchableOpacity
                                style={{
                                    height: 45,
                                    width: 80,
                                    backgroundColor: theme.colors.error,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 10,

                                }}
                                onPress={handleSignOut}>
                                <Text style={{ color: "#fff" }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            });
        }} style={{ marginRight: 10 }}>
            <IonicIcon name="log-out-outline" size={30} style={{
                color: "white"
            }} />
        </TouchableOpacity>
    );
};

export default HeaderLeft;