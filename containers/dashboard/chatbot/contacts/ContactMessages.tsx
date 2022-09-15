import MessageBox from "components/MessageBox/MessageBox";
import React, {useEffect, useState} from "react";
import MessagesService from "services/endpoints/MessagesService";
import useTranslation from "next-translate/useTranslation";


type ContactMessagesProps = {
    userData: any
};

const ContactMessages: React.FC<ContactMessagesProps> = ({userData}) => {
    const [messages, setMessages] = useState([]);

    const getMessagesData = async () => {
        try {
            const response = await MessagesService.getArchive(
                null,
                userData.user_page_id,
                userData.contact_igs_id
            );
            setMessages(response.data);

        } catch (e) {}
    }

    useEffect(() => {
        (async ()=> {
            if(userData) {
                await getMessagesData()

            }
        })()

    }, [userData]);


    useEffect(() => {
        if(messages.length > 0) {
            let objDiv = document.getElementById("message-list");
             objDiv.scrollTop = objDiv.scrollHeight;
        }

    }, [messages]);

    return (
        <div className="message-container flex flex-col max-w-xxl h-2/3">
            {messages.length > 0   && (
                <div id="message-list" className="w-full flex flex-col card h-full  overflow-y-auto">
                    {messages?.map((item) => {
                        return (
                            <MessageBox
                                key={item.id}
                                className={`${
                                    userData.user_page_id === item.from_page_id
                                        ? "bot"
                                        : "user"
                                }`}
                                data={item}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
