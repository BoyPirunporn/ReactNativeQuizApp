import useStoreDialog from '@/stores/useStoreDialog'
import React from 'react'
import DialogCommon from '../components/common/dialog/dialog-common';
import DialogError from '../components/common/dialog/dialog-error';


const DialogProvider = () => {
    const {
        visible,
        onCancel,
        onPress,
        onDismiss,
        title,
        children,
        error,
        errorMessage
    } = useStoreDialog();

    if (error) {
        return (
            <DialogError
                visible={visible}
                onPress={onPress}
                onDismiss={onDismiss}
                title={title}
                message={errorMessage!}
            />
        )
    }
    return (
        <DialogCommon
            visible={visible}
            onCancel={onCancel}
            onPress={onPress}
            onDismiss={onDismiss}
            children={children()}
            title={title} />
    )
}

export default DialogProvider