import React, { ReactNode, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";

interface NotificationProviderProps {
  children?: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { push } = useRouter();

  const handleNotificationResponse = (
    notification: Notifications.Notification,
  ) => {
    if (notification.request.content.data) {
      const { activityId, activityType } = notification.request.content.data;

      if (activityType === "chat") {
        console.log("DATA", activityId, activityType);
        try {
          push({
            pathname: `chat/[chat_id]`,
            params: {
              chat_id: activityId,
            },
          });
        } catch (e) {
          console.log("ISSUE", e);
        }
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      handleNotificationResponse(response.notification);
    });

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationResponse(response.notification);
      });

    return () => {
      isMounted = false;
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
