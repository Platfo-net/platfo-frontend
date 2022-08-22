import PriceBox from 'components/PriceBox/PriceBox';
import useTranslation from 'next-translate/useTranslation';

type PricingPanelsProps = {};

const PricingPanels: React.FC<PricingPanelsProps> = () => {
  let { t } = useTranslation('common');
  const plans = [
    {
      price: 100000,
      items: [
        t('access-to-the-design-environment'),
        t('unlimited-number-of-chat-flows'),
        t('possibility-to-add-an-Instagram-page'),
        t('number-of-users-maximum-one-person'),
        t('access-to-the-messaging-tool'),
        t('accessing-the-menu-builder'),
      ],
      type: 'bronze',
      status: 'active',
    },
    {
      price: 100000,
      items: [
        t('access-to-the-design-environment'),
        t('unlimited-number-of-chat-flows'),
        t('possibility-to-add-an-Instagram-page'),
        t('number-of-users-maximum-one-person'),
        t('access-to-the-messaging-tool'),
        t('accessing-the-menu-builder'),
      ],
      type: 'gold',
      status: 'disabled',
    },
    {
      price: 100000,
      items: [
        t('access-to-the-design-environment'),
        t('unlimited-number-of-chat-flows'),
        t('possibility-to-add-an-Instagram-page'),
        t('number-of-users-maximum-one-person'),
        t('access-to-the-messaging-tool'),
        t('accessing-the-menu-builder'),
      ],
      type: 'silver',
      status: 'disabled',
    },
  ];

  const onSubmit = () => {};
  return (
    <>
      {plans.map((item) => (
        <div key={item.type} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          <PriceBox data={item} onSubmit={onSubmit} />
        </div>
      ))}
    </>
  );
};

export default PricingPanels;
