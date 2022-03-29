import { notification } from 'antd'

export const openNotification = (title: string, desc: string, icon: any) => {
    notification.open({
        message: title,
        description: desc,
        icon: icon,
    });
};
