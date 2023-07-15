import { getBoxShadow, getIsRtl } from '@/styles/globals';
import styled from '@emotion/styled';
import { FC, ReactElement } from 'react';
import { settings } from '@/styles/Settings';
import { Button } from '@/components/general/Button';
import { SerializedStyles, css } from '@emotion/react';
import { Typography } from '@/components/general/Typography';
import { useTranslation } from 'next-i18next';

export interface IModal {
  isVisible: boolean;
  isLoading?: boolean;
  title?: string;
  width?: string;
  height?: string;
  alert?: 'danger' | 'warning' | 'success';
  children?: ReactElement;
  submitKey?: string;
  cancelKey?: string;
  submitType?: 'button' | 'submit';
  submit?: any;
  cancel?: any;
}

const isRTL = getIsRtl();

const getModalSize = (width?: string, height?: string): SerializedStyles => css`
  width: ${width};
  height: ${height};
  border-radius: ${settings.borderRadius_lg};
`;

type WrapperType = Pick<IModal, 'isVisible'>;
const Wrapper = styled.div<WrapperType>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  z-index: 100;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 !important;
`;

type SectionType = Pick<IModal, 'width' | 'height'>;
const Section = styled.section<SectionType>`
  z-index: 10;
  position: relative;
  padding: 1rem;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  ${({ width, height }) => getModalSize(width, height)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  header {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    border-bottom: ${({ theme }) => `1px solid ${theme.components.border}`};
    padding-bottom: 4px;
    .title {
      display: flex;
      flex-direction: row;
      justify-content: ${isRTL ? 'flex-end' : 'flex-start'};
      position: relative;
      .actions {
        position: absolute;
        right: ${isRTL ? 'auto' : 0};
        left: ${isRTL ? 0 : 'auto'};
      }
    }
  }
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: ${({ theme }) => theme.components.backDrop};
  opacity: 0.75;
  ${settings.transition}
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  button {
    margin-right: 4px;
    margin-left: 4px;
  }
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

export const Modal: FC<IModal> = ({
  isVisible = false,
  isLoading = false,
  title,
  width = '100%',
  height = 'auto',
  submitKey = 'save',
  cancelKey = 'cancel',
  submitType = 'button',
  children,
  cancel,
  submit,
}) => {
  const { t } = useTranslation('common');

  return (
    <Wrapper
      role="dialog"
      aria-modal="true"
      aria-labelledby={title}
      isVisible={isVisible}
    >
      <BackDrop onClick={cancel} />
      <Section height={height} width={width}>
        {title && (
          <header>
            <div className="title">
              <div className="actions">
                {cancel && (
                  <Button
                    icon="Cross"
                    isIconOnly
                    onClick={() => cancel()}
                    size="md"
                    title="Button"
                    variant="text"
                  />
                )}
              </div>
              {title && (
                <Typography.Title level="h2" size="2xl" weight="medium">
                  {title}
                </Typography.Title>
              )}
            </div>
            {/*Todo: Add alert types*/}
          </header>
        )}
        <Main>{children}</Main>
        {((submit && submitType) || submitType === 'submit') && (
          <Footer>
            <Button
              size="sm"
              title={t(submitKey)}
              onClick={submit}
              color="secondary"
              type={submitType}
              isLoading={isLoading}
            />
            <Button size="sm" title={t(cancelKey)} onClick={cancel} />
          </Footer>
        )}
      </Section>
    </Wrapper>
  );
};
