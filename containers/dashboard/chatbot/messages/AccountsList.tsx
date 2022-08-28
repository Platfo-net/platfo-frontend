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
        <div className="flex flex-nowrap">
            <div className="w-full flex flex-wrap">
                {accountList.map((item) => {
                    return (
                        <div className="account-list px-2 w-16 h-16" key={item.id}>
                            <button
                                className="p-0 h-auto"
                                onClick={() => onSelectAccount(item)}
                            >
                                <Avatar
                                    imageUrl={item.profile_image_url}
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
