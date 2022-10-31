import { IInput } from '@/components/dataEntry/Input/Input';

const base: IInput = {
  size: 'md',
  type: 'text',
  variant: 'outlined',
  color: 'default',
  label: 'Enter Name',
  placeholder: 'Your name',
};

export const mockIInputProps = {
  base,
};
