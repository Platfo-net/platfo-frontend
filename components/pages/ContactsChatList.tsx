import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { Tile } from '@/components/dataDisplay/Tile';
import { IContact, Res_LiveChat_Contact_Page_PageId } from '@/types/api';
import { changeSelectedAccount } from '@/stores/reducers/chatbot';
import { useEffect, useState } from 'react';
import LiveChatService from '@/services/endpoints/LiveChatService';
import { AxiosResponse } from 'axios';
import AvatarButton from '@/components/general/AvatarButton/AvatarButton';

const ContactsChatList = () => {
  const { requestState, selectedAccount } = useAppSelector((state) => ({
    requestState: state.chatbot.requestState,
    selectedAccount: state.chatbot.selectedAccount,
  }));
  const dispatch = useAppDispatch();
  const [contacts, setContacts] = useState<Res_LiveChat_Contact_Page_PageId>(
    []
  );

  //TODO: change type
  const selectAccount = (contact: IContact) => {
    dispatch(changeSelectedAccount(contact));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getContacts = async () => {
    try {
      const response: AxiosResponse<Res_LiveChat_Contact_Page_PageId> =
        await LiveChatService.getContacts(selectedAccount?.page_id);

      if (response.data.length > 0) {
        setContacts(response.data);
        // dispatch(selectUser(response.data[0]));
      } else {
        // dispatch(selectUser(null));
      }
      // setUsers(response.data);
    } catch (e) {
      //empty
    }
  };

  useEffect(() => {
    if (selectedAccount?.id) {
      // TODO:
      getContacts().then();
    }
  }, [getContacts, selectedAccount]);

  return (
    <>
      {requestState !== 'pending' && (
        <Tile>
          <>
            <div className="flex flex-col space-y-2 w-full">
              {contacts.map((contact) => {
                return (
                  <AvatarButton
                    key={contact.id}
                    imageUrl={contact.information.profile_image as string}
                    click={selectAccount}
                    color="chatbot"
                    data={contact}
                    isActive={contact.id === selectedAccount?.id}
                    description={''}
                    title={''}
                  />
                );
              })}
            </div>
          </>
        </Tile>
      )}
    </>
  );
};

export default ContactsChatList;
