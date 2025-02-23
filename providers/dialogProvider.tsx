import useStoreDialog from '@/stores/useStoreDialog'
import React from 'react'
import DialogCommon from '../components/common/dialog/dialog-common';


const DialogProvider = () => {
    const {
        visible,
        onCancel,
        onPress,
        onDismiss,
        title,
        children
    } = useStoreDialog();
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