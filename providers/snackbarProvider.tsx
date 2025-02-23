import useStoreSnackbar from '@/stores/storeSnackbar';
import React from 'react'
import { Snackbar, useTheme } from 'react-native-paper'

type Props = {}

const SnackBarProvider = (props: Props) => {
    const theme = useTheme();
    const { visible, onDismiss, message } = useStoreSnackbar();
    return (
        <Snackbar
            visible={visible}
            duration={2 * 1000}
            style={{
                backgroundColor: theme.colors.error,
            }}
            icon="close"
            onDismiss={onDismiss}
        >
            {message}
        </Snackbar>
    )
}

export default SnackBarProvider