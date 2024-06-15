import { Toaster, toast } from 'react-hot-toast';

const Notify = (message, type = 'default') => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        default:
            toast(message);
    }
}

const HotToast = () => {
    return <Toaster position='top-center' />
}

export { Notify, HotToast };