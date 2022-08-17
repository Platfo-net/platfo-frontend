import PriceBox from 'components/PriceBox/PriceBox';
import { iteratorSymbol } from 'immer/dist/internal';
import { Fragment } from 'react';

type PricingPanelsProps = {};

const PricingPanels: React.FC<PricingPanelsProps> = () => {
  const plans = [
    {
      price: 100000,
      items: [
        'Access to the design environment',
        'Unlimited number of chat flows',
        'Possibility to add an Instagram page',
        'Number of users maximum one person',
        'Access to the messaging tool',
        'Accessing the menu builder',
      ],
      type: 'bronze',
      status: 'active',
    },
    {
      price: 100000,
      items: [
        'Access to the design environment',
        'Unlimited number of chat flows',
        'Possibility to add an Instagram page',
        'Number of users maximum one person',
        'Access to the messaging tool',
        'Accessing the menu builder',
      ],
      type: 'gold',
      status: 'disabled',
    },
    {
      price: 100000,
      items: [
        'Access to the design environment',
        'Unlimited number of chat flows',
        'Possibility to add an Instagram page',
        'Number of users maximum one person',
        'Access to the messaging tool',
        'Accessing the menu builder',
      ],
      type: 'silver',
      status: 'disabled',
    },
  ];

  const onSubmit = () => {};
  return (
    <>
      {plans.map((item) => (
        <div key={item.type}>
          <PriceBox data={item} onSubmit={onSubmit} />
        </div>
      ))}
    </>
  );
};

export default PricingPanels;
