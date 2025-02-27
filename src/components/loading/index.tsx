import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import useStoreLoading from '@/stores/useStoreLoading';

const LoadingSpiner = () => {
    const theme = useTheme();
    const { loading } = useStoreLoading();
    return (
        <ActivityIndicator
            style={[styles.loading, {
                display: loading ? "flex" : "none"
            }]}
            animating={loading}
            size={"large"}
            color={theme.colors.inversePrimary} />

    );
};

export default LoadingSpiner;

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "gray",
        opacity: 0.5
    }
});