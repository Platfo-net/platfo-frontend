import React from 'react';
import styled from '@emotion/styled';
import { Avatar } from '@/components/dataDisplay/Avatar';

export interface IAvatarGroup {
  data: any[];
  urlKey: string;
  nameKey: string;
  count: number;
  size?: number;
  className?: string;
}
type ListType = Pick<IAvatarGroup, 'size'>;
const Wrapper = styled.ul<ListType>`
  display: flex;
  margin-left: -${({ size = 5 }) => size / 2}rem;
`;

const List = styled.li<ListType>`
  margin-right: -${({ size = 5 }) => size / 2}rem;
`;

export const AvatarGroup: React.FC<IAvatarGroup> = ({
  data,
  urlKey,
  nameKey,
  size = 5,
  count,
  className = '',
}) => {
  return (
    <Wrapper size={size} className={className}>
      {data.map((item) => (
        <List key={item[nameKey]} size={size}>
          <Avatar size={size} type="image" url={item[urlKey]} />
        </List>
      ))}
      {count > 3 && (
        <List size={size}>
          <Avatar size={size} type="text" text="+3" />
        </List>
      )}
    </Wrapper>
  );
};
