import React from 'react';
import styled from '@emotion/styled';
import { AvailableIcons, Icon } from '@/components/general/Icon';
import { Typography } from '@/components/general/Typography';
import { TypographySize } from '@/styles/globals';

const { Text } = Typography;

export interface IIconText {
  icon: AvailableIcons;
  title: string;
  size?: TypographySize;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIcon = styled(Icon)`
  margin: auto;
`;

const StyledText = styled(Text)`
  margin: 4px auto;
`;

const IconText: React.FC<IIconText> = ({ icon, title, size = 'lg' }) => {
  return (
    <Wrapper>
      <StyledIcon name={icon} size={size} />
      <StyledText size={size}>{title}</StyledText>
    </Wrapper>
  );
};

export default IconText;
