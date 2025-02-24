import { Image, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/button';
import useStoreAuth from '@/stores/useStoreAuth';
import { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import useFirebaseHook from '@/hooks/useFirebaseHook';

export default function HomeScreen() {
    const router = useRouter();

    const {  } = useFirebaseHook();
    const { user } = useStoreAuth();

    if(user) return <Redirect href={"/board"}/>

    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("@/assets/images/Questions-pana.png")}
                />
            </ThemedView>
            <ThemedView style={styles.buttonContainer}>
                <Button
                    label="Get Started"
                    style={{ alignSelf: "stretch" }}
                    onPress={() => {
                        if (!user) {
                            return router.navigate("sign-in");
                        }
                        router.navigate("board");
                    }}
                />
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 8,
        alignSelf: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 30,
        padding: 15
    },

});
