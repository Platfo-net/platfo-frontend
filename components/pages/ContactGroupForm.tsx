import React, { FC, useEffect, useState } from 'react';
import { Input } from '@/components/dataEntry/Input/Input';
import { useForm, Controller } from 'react-hook-form';
import {
  Body_Postman_Group,
  IContact,
  Res_LiveChat_Contact_All_PageId,
} from '@/types/api';
import { useTranslation } from 'next-i18next';
import { Modal } from '@/components/feedback/Modal';
import TileButton from '@/components/general/TileButton/TileButton';
import { AxiosResponse } from 'axios';
import LiveChatService from '@/services/endpoints/LiveChatService';
import PostmanService from '@/services/endpoints/PostmanService';
import { AvatarCheckBox } from '@/components/dataEntry/AvatarCheckBox';
import { Avatar } from '@/components/dataDisplay/Avatar';

interface IProps {
  pageId: string;
  change: () => void;
}
const ContactGroupForm: FC<IProps> = ({ pageId, change }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Body_Postman_Group>({
    defaultValues: {
      facebook_page_id: pageId,
    },
  });
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const getContacts = async (pageId: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_LiveChat_Contact_All_PageId> =
        await LiveChatService.getContacts(pageId);
      setContacts(response.data.items);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const submit = async (data: Body_Postman_Group) => {
    const changeData = { ...data };
    changeData.contacts = changeData.contacts.filter((contact) => contact);
    try {
      setLoading(true);
      await PostmanService.postGroup(changeData);
      setLoading(false);
      setOpenModal(false);
      await change();
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (openModal) {
        await getContacts(pageId);
      }
    })();
  }, [openModal, pageId]);

  return (
    <>
      <TileButton title={t('add-new-group')} onClick={modalHandler} />
      <form onSubmit={handleSubmit(submit)}>
        <Modal
          isVisible={openModal}
          cancel={modalHandler}
          title={t('add-new-group')}
          width="50%"
          submitType="submit"
          isLoading={loading}
        >
          <div className="flex flex-wrap  w-full">
            <div className="basis-1/3 p-2">
              <Input
                label={t('name')}
                feedback={errors.name?.message}
                color="postman"
                status={errors.description?.message ? 'danger' : 'default'}
                {...register('name', {
                  required: t('error-required-field'),
                })}
              />
            </div>
            <div className="basis-2/3 p-2">
              <Input
                label={t('description')}
                color="postman"
                status={errors.description?.message ? 'danger' : 'default'}
                feedback={errors.description?.message}
                {...register('description', {
                  required: t('error-required-field'),
                  minLength: { value: 3, message: t('error-min-length') },
                })}
              />
            </div>

            <div className="flex flex-wrap mt-4">
              {contacts.map((contact, index) => {
                const fieldName = `contacts[${index}]`;
                return (
                  <fieldset className="m-2" name={fieldName} key={fieldName}>
                    <Controller
                      control={control}
                      name={`contacts[${index}]` as `contacts`}
                      render={({ field: { onChange } }) => (
                        <AvatarCheckBox
                          color="postman"
                          label={contact.information.name || ''}
                          onChange={(e) =>
                            onChange(
                              e.currentTarget.checked
                                ? {
                                    contact_id: contact.id,
                                    contact_igs_id: contact.contact_igs_id,
                                  }
                                : undefined
                            )
                          }
                          avatar={
                            <Avatar
                              url={contact.information.profile_image}
                              size={3.5}
                              type="image"
                            />
                          }
                        />
                      )}
                    />
                  </fieldset>
                );
              })}
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
};

export default ContactGroupForm;
