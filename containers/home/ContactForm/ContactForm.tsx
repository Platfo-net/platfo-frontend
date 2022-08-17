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
    <form name="basic" className="flex flex-wrap items-center">
      <div className="m-4">
        <Input placeholder={t('fullname')} className="bg-white rounded-2xl" />
      </div>

      <div
        className="m-4"
        name="phone-number"
        rules={[{ required: true, message: t('erorr-enter-phone-number') }]}
      >
        <Input
          placeholder={t('phone-number')}
          className="bg-white rounded-2xl"
        />
      </div>

      <div className="mx-4">
        <button className="primary px-6 py-3" htmlType="submit">
          {t('submit')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
