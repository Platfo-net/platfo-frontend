import React, { useState } from 'react';
import { Button } from '@/components/general/Button';
import styled from '@emotion/styled';
import { Typography } from '@/components/general/Typography';
import { INotification } from '@/types/api';
import Dropdown from '@/components/general/Dropdown/Dropdown';
import { useTranslation } from 'next-i18next';

const { Text } = Typography;

export interface INotificationButton {
  notifications: INotification[];
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled(Button)``;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  right: 8px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: flex;
  margin: auto;
  justify-content: center;
  background: rgba(255, 82, 82, 1);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;

  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`;

const NotificationButton: React.FC<INotificationButton> = ({
  notifications,
}) => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  const newNotifications = notifications.filter(
    (notification) => !notification.is_readed
  );
  return (
    <Wrapper>
      <StyledButton
        color="primary"
        icon={'Bell'}
        isIconOnly
        onClick={() => setIsVisible(!isVisible)}
        iconSize="6xl"
        variant="text"
        title=""
      />
      {newNotifications.length > 0 && <Badge />}
      <Dropdown
        isVisible={isVisible}
        header={
          <div>
            <Text>{t('notification')}</Text>
            {newNotifications.length > 0 && (
              <Text>{newNotifications.length}</Text>
            )}
          </div>
        }
      >
        <span>dfsdf</span>
      </Dropdown>
    </Wrapper>
  );
};

export default NotificationButton;
