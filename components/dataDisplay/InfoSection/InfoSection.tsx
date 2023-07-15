import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@/components/general/Typography';
import { useTranslation } from 'next-i18next';
import { getIsRtl } from '@/styles/globals';
import { css } from '@emotion/react';
import { Tile } from '@/components/dataDisplay/Tile';

const { Text, Paragraph } = Typography;
export interface IInfoSection {
  avatar?: ReactElement;
  username?: string;
  followers?: string | number;
  follows?: string | number;
  name?: string;
  description?: string;
  extra?: ReactElement;
}

const isRtl = getIsRtl();

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  ${() => css`
    margin-right: ${isRtl ? 0 : '2rem'};
    margin-left: ${isRtl ? '2rem' : 0};
  `}
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  justify-content: space-between;
`;
const ExtraWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoSection: React.FC<IInfoSection> = ({
  avatar,
  username,
  followers,
  follows,
  name,
  description,
  extra,
}) => {
  const { t } = useTranslation('common');
  return (
    <Tile>
      <>
        <Wrapper>
          {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}
          <InfoWrapper>
            <Text size="xl">{username}</Text>
            <div>
              {followers && (
                <>
                  <Text weight="semiBold">{followers}</Text>
                  <Text className="mr-16"> {t('followers')}</Text>
                </>
              )}

              {follows && (
                <>
                  <Text weight="semiBold">{follows}</Text>
                  <Text> {t('followers')}</Text>
                </>
              )}
            </div>

            {name && <Text weight="semiBold">{name}</Text>}
            {description && <Paragraph>{description}</Paragraph>}
          </InfoWrapper>
        </Wrapper>
        {extra && <ExtraWrapper>{extra}</ExtraWrapper>}
      </>
    </Tile>
  );
};

export default InfoSection;
