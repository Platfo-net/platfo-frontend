import Avatar from "components/Avatar/Avatar";
import {useAppDispatch, useAppSelector} from "hooks/reduxHooks";
import {selectAccount} from "../../../../stores/actions";


type AccountsListProps = {};

const AccountsList: React.FC<AccountsListProps> = () => {
    const { accountList, selectedAccount } = useAppSelector(
        (state) => ({
            accountList: state.connections.accountList,
            selectedAccount: state.message.selectedAccount,
        })
    );
    const dispatch = useAppDispatch();
    const onSelectAccount = (item) => {
        dispatch(selectAccount(item));
    };

    return (
        <div className="flex flex-nowrap card mb-4">
            <div className="w-full flex flex-wrap">
                {accountList.map((item) => {
                    return (
                        <div className="flex account-list px-2 " key={item.id}>
                            <button
                                className="p-0 h-auto h-14 w-14 my-auto"
                                onClick={() => onSelectAccount(item)}
                            >
                                <Avatar
                                    imageUrl={item.profile_image}
                                    className={`${
                                        item.id === selectedAccount?.id
                                            ? "active chatbot"
                                            : "opacity-60"
                                    }`}
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AccountsList;
