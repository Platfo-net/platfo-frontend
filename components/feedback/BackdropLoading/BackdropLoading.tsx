import React from 'react';
import { Modal } from '@/components/feedback/Modal';
import { Logo } from '@/components/dataDisplay/Logo';
import styled from '@emotion/styled';
import { Typography } from '@/components/general/Typography';

const { Text } = Typography;
export interface IBackdropLoading {
  loading: boolean;
}

const StyledModal = styled(Modal)`
  width: auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;
const WrapperLogo = styled.div`
  display: flex;
  margin: auto;
  svg {
    margin-right: 4px;
  }
`;
const WrapperBalls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  .LoaderBalls {
    width: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__item {
      width: 20px;
      height: 20px;
      border-radius: 50%;

      &:nth-child(1) {
        animation: bouncing 0.4s alternate infinite
          cubic-bezier(0.6, 0.05, 0.15, 0.95);
        background: ${({ theme }) => theme.components.secondary};
      }

      &:nth-child(2) {
        animation: bouncing 0.4s 0.1s alternate infinite
          cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
        background: ${({ theme }) => theme.components.chatbot};
      }

      &:nth-child(3) {
        animation: bouncing 0.4s 0.2s alternate infinite
          cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
        background: ${({ theme }) => theme.components.liveChat};
      }
    }
  }

  @keyframes bouncing {
    0% {
      transform: translate3d(0, 10px, 0) scale(1.2, 0.85);
    }

    100% {
      transform: translate3d(0, -20px, 0) scale(0.9, 1.1);
    }
  }
`;
const BackdropLoading: React.FC<IBackdropLoading> = ({ loading }) => {
  return (
    <StyledModal isVisible={loading} width={'auto'}>
      <Wrapper>
        <WrapperLogo>
          <Logo size={3} />
          <Text weight="semiBold" size="6xl">
            Botinow
          </Text>
        </WrapperLogo>
        <WrapperBalls>
          <div className="LoaderBalls">
            <div className="LoaderBalls__item" />
            <div className="LoaderBalls__item" />
            <div className="LoaderBalls__item" />
          </div>
        </WrapperBalls>
      </Wrapper>
    </StyledModal>
  );
};

export default BackdropLoading;
