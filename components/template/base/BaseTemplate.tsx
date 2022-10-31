import React from 'react';

export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return <div className="bg-red-600">{sampleTextProp}</div>;
};

export default BaseTemplate;
