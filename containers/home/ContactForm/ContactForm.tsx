import { useEffect, useState } from 'react';
import Input from 'components/Input/Input';
import useTranslation from 'next-translate/useTranslation';

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = () => {
  const { t } = useTranslation('common');
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <form name="basic" className="flex flex-wrap xl:flex-nowrap items-center">
      <div className="md:basis-5/12 2xl:basis-4/12 mx-2">
        <Input placeholder={t('fullname')} className="bg-white rounded-2xl" />
      </div>

      <div
        className="md:basis-5/12 2xl:basis-4/12 mx-2"
        name="phone-number"
        rules={[{ required: true, message: t('erorr-enter-phone-number') }]}
      >
        <Input
          placeholder={t('phone-number')}
          className="bg-white rounded-2xl"
        />
      </div>

      <div className="md:basis-5/12 2xl:basis-4/12 items-center mx-2">
        <button className="primary px-8 py-2" htmltype="submit">
          {t('submit')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
