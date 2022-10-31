import {
  TextProps,
  TitleProps,
} from '@/components/general/Typography/Typography';

const title: TitleProps = {
  size: 'base',
  weight: 'medium',
  children: 'I a title',
  level: 'h1',
  color: 'regular',
};
const text: TextProps = {
  size: 'base',
  weight: 'medium',
  children: 'I a Text',
  color: 'regular',
};

const paragraph: TextProps = {
  size: 'base',
  weight: 'medium',
  children: 'I a Paragraph',
  color: 'regular',
};

export const mockTypographyProps = {
  title,
  text,
  paragraph,
};
