import PriceBox from 'components/PriceBox/PriceBox';
import useTranslation from 'next-translate/useTranslation';
import { iteratorSymbol } from 'immer/dist/internal';
import { Fragment } from 'react';

type PricingPanelsProps = {};

const PricingPanels: React.FC<PricingPanelsProps> = () => {
  let { t } = useTranslation('common');
  const plans = [
    {
      price: 100000,
      items: [
        t('Access to the design environment'),
        t('Unlimited number of chat flows'),
        t('Possibility to add an Instagram page'),
        t('Number of users maximum one person'),
        t('Access to the messaging tool'),
        t('Accessing the menu builder'),
      ],
      type: 'bronze',
      status: 'active',
    },
    {
      price: 100000,
      items: [
        t('Access to the design environment'),
        t('Unlimited number of chat flows'),
        t('Possibility to add an Instagram page'),
        t('Number of users maximum one person'),
        t('Access to the messaging tool'),
        t('Accessing the menu builder'),
      ],
      type: 'gold',
      status: 'disabled',
    },
    {
      price: 100000,
      items: [
        t('Access to the design environment'),
        t('Unlimited number of chat flows'),
        t('Possibility to add an Instagram page'),
        t('Number of users maximum one person'),
        t('Access to the messaging tool'),
        t('Accessing the menu builder'),
      ],
      type: 'silver',
      status: 'disabled',
    },
  ];

  const onSubmit = () => {};
  return (
    <>
      {plans.map((item) => (
        <div key={item.type} className="sm:basis-1/2 lg:basis-1/3">
          <PriceBox data={item} onSubmit={onSubmit} />
        </div>
      ))}
    </>
  );
};

export default PricingPanels;
