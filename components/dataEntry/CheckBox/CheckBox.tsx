import { useId } from '@/components/hooks/useId';
import { getBoxShadow } from '@/styles/globals';
import { settings } from '@/styles/Settings';
import styled from '@emotion/styled';
import React, { ChangeEvent } from 'react';

const Wrapper = styled.label`
  font-size: 1.8rem;
  & input {
    display: none;
  }
  & input:checked {
    & ~ label {
      ${({ theme }) =>
        getBoxShadow(theme.components.shadow1, theme.components.shadow2, true)};
      color: ${({ theme }) => theme.font.regular};
    }
  }
`;
const Visiblepart = styled.label`
  display: inline-block;
  user-select: none;
  cursor: pointer;
  text-align: center;
  border-radius: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  color: rgba(0, 0, 0, 0);
  background: ${({ theme }) => theme.components.background};
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  transition: ${settings.transition};
  &:hover {
    ${({ theme }) =>
      getBoxShadow(theme.components.shadow1, theme.components.shadow2, true)};
  }
`;

export interface ICheckBox {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<ICheckBox> = ({ onChange }) => {
  const fieldId = useId();
  return (
    <Wrapper>
      <input id={fieldId} type="checkbox" onChange={onChange} />
      <Visiblepart htmlFor={fieldId}>*</Visiblepart>
    </Wrapper>
  );
};

export default CheckBox;
