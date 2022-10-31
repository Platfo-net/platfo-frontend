import { useId } from '@/components/hooks/useId';
import { getBoxShadow } from '@/styles/globals';
import { settings } from '@/styles/Settings';
import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';

const Wrapper = styled.label`
  & input {
    display: none;
  }
  & input:checked {
    & ~ label {
      background: ${({ theme }) => theme.components.primary};
      &::after {
        margin-left: 3.5rem;
        background: ${({ theme }) => theme.components.active};
      }
    }
  }
`;
const VisiblePart = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  height: 3rem;
  width: 6rem;
  border-radius: 1.6rem;
  background: ${({ theme }) => theme.components.background};
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2, false)};
  &::after {
    content: '';
    margin-left: 0.5rem;
    height: 2.1rem;
    width: 2.1rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.components.nonActive};
    transition: ${settings.transition};
  }
`;

export interface ISwitch {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: FC<ISwitch> = ({ onChange }) => {
  const fieldId = useId();
  return (
    <Wrapper>
      <input id={fieldId} type="checkbox" onChange={onChange} />
      <VisiblePart htmlFor={fieldId} />
    </Wrapper>
  );
};

export default Switch;
