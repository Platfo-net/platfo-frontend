import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { Tile } from '@/components/dataDisplay/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { IAccount } from '@/types/api';
import { changeSelectedAccount } from '@/stores/reducers/chatbot';

const AccountsAvatars = () => {
  const { accounts, requestState, selectedAccount } = useAppSelector(
    (state) => ({
      accounts: state.chatbot.accounts,
      requestState: state.chatbot.requestState,
      selectedAccount: state.chatbot.selectedAccount,
    })
  );
  const dispatch = useAppDispatch();

  const selectAccount = (account: IAccount) => {
    dispatch(changeSelectedAccount(account));
  };

  return (
    <>
      {requestState !== 'pending' && (
        <Tile>
          <div className="flex flex-wrap space-x-2 justify-start w-full">
            {accounts.map((account) => {
              return (
                <Avatar
                  key={account.id}
                  type="image"
                  url={account.profile_image}
                  click={selectAccount}
                  color="chatbot"
                  data={account}
                  isActive={account.id === selectedAccount?.id}
                />
              );
            })}
          </div>
        </Tile>
      )}
    </>
  );
};

export default AccountsAvatars;
