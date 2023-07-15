import { Color, getBoxShadow, getIsRtl, getTileSize } from '@/styles/globals';
import styled from '@emotion/styled';
import { FC, ReactElement, useState } from 'react';
import { Button } from '@/components/general/Button';
import { Typography } from '@/components/general/Typography';
import { Modal } from '@/components/feedback/Modal';
import { useTranslation } from 'next-i18next';

export interface ITile {
  data?: any;
  title?: string;
  width?: string;
  height?: string;
  avatar?: ReactElement;
  children?: ReactElement;
  clickLabel?: string;
  clickColor?: Color;
  className?: string;
  isClickDisable?: boolean;
  // eslint-disable-next-line no-unused-vars
  remove?: (data: any) => void;
  // eslint-disable-next-line no-unused-vars
  click?: (data: any) => void;
}

const isRTL = getIsRtl();

type SectionType = Pick<ITile, 'width' | 'height'>;
const Section = styled.section<SectionType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${({ width, height }) => getTileSize(width, height)}
  padding: 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  header {
    display: flex;
    flex-direction: column;

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

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer``;

export const Tile: FC<ITile> = ({
  data,
  title,
  width = '100%',
  height = 'auto',
  avatar,
  children,
  remove,
  click,
  clickLabel = '',
  clickColor = 'primary',
  className = '',
  isClickDisable = false,
}) => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Section height={height} width={width} className={className}>
      {(title || remove || avatar) && (
        <header>
          <div className="title">
            <div className="actions">
              {remove && (
                <>
                  <Button
                    icon="Cross"
                    isIconOnly
                    onClick={() => setIsVisible(true)}
                    size="sm"
                    title="Button"
                    variant="text"
                  />
                  <Modal
                    isVisible={isVisible}
                    cancel={() => setIsVisible(false)}
                    width="40%"
                    submitKey="yes"
                    cancelKey="no"
                    submit={() => remove(data)}
                  >
                    <div className="py-4">
                      <Typography.Text>
                        {t('are-you-sure-to-delete')}
                      </Typography.Text>
                    </div>
                  </Modal>
                </>
              )}
            </div>
            {title && (
              <Typography.Title level="h2" size="2xl" weight="medium">
                {title}
              </Typography.Title>
            )}
          </div>
          <div className="flex flex-row justify-center">{avatar}</div>
        </header>
      )}
      <Main>{children}</Main>
      {click && (
        <Footer>
          <Button
            color={clickColor}
            title={clickLabel}
            onClick={() => click(data)}
            width="100%"
            isDisable={isClickDisable}
          />
        </Footer>
      )}
    </Section>
  );
};
