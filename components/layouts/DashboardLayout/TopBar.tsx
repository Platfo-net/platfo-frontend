import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { IMenu } from '@/types/global';
import styled from '@emotion/styled';
import { Button } from '@/components/general/Button';
import { settings } from '@/styles/Settings';
import { css } from '@emotion/react';
import { getIsRtl } from '@/styles/globals';

interface ITopBar {
  data: IMenu[];
  color?: 'secondary' | 'chatbot' | 'liveChat' | 'postman';
}

const isRtl = getIsRtl();

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: center;
  padding-top: 20px;
  position: relative;
`;
const StyledButton = styled(Button)`
  margin: 0 8px;
  border-radius: ${settings.borderRadius_md} ${settings.borderRadius_md} 0 0;
  padding: 0 18px;
  box-shadow: none;
  width: auto;
  ${({ theme }) => css`
    background: ${theme.background};
    border: none;
    color: ${theme.font.regular};
  `};
  span {
    margin-top: auto;
    padding-bottom: 8px;
  }

  &.active {
    ${({ theme, color = 'secondary' }) => css`
      background: ${theme.components.background};
      span {
        font-weight: 600;
        border-bottom: 4px solid ${theme.components[color]};
      }
    `};

    &:hover {
      ${({ theme }) => css`
        background: ${theme.components.background};
        color: ${theme.font.regular} !important;
      `};
      cursor: default;
    }
  }

  &:hover {
    ${({ theme, color = 'secondary' }) => css`
      color: ${theme.components[color]} !important;
      filter: unset !important;
    `};
  }
  &:disabled {
    border: none;
    background: transparent;
    &:hover {
      color: ${({ theme }) => theme.font.nonActive} !important;
    }
  }
`;

const ActionWrapper = styled.div`
  position: absolute !important;
  right: ${isRtl ? 'unset' : '1rem'};
  left: ${isRtl ? '1rem' : 'unset'};
`;

export const TopBar: FC<ITopBar> = ({ data, color = 'secondary' }) => {
  let { t } = useTranslation('common');
  const router = useRouter();

  const goto = (path: string, isActive: boolean) => {
    if (!isActive) {
      router.push(`${path}`);
    }
  };

  return (
    <Wrapper>
      <ActionWrapper>
        {/*<NotificationButton notifications={[]} />*/}
      </ActionWrapper>
      {data.map((item) => {
        return (
          <StyledButton
            key={item.key}
            className={`${router.pathname === item.path ? 'active' : ''}`}
            onClick={() => goto(item.path, router.pathname === item.path)}
            isDisable={item.isDisable}
            title={t(item.key)}
            color={color}
          />
        );
      })}
    </Wrapper>
  );
};
