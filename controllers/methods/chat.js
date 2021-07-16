var User = require("../../models/user");
var Chat = require("../../models/chatLog");
var Message = require("../../models/message");

var ApiError = require("../../middleware/ErrorTypes");

createChat = async(fromUser, toUser) => {
    const fromUsername = fromUser.username;
    const toUserName = toUser.username;

    const chatLogInfo = {
        userIds: [fromUsername, toUserName],
    }
    const newChat = await Chat.create(chatLogInfo);

    fromUser.chatLogs.set(toUserName, newChat);
    toUser.chatLogs.set(fromUsername, newChat);

    await fromUser.save();
    await toUser.save();

    return newChat;
}

module.exports = {
    messageUser: async (from, to, message) => {
        const fromUser = await User.findOne({ username: from }).populate({ path: 'chatLogs', populate: { path: 'messages' } });
        if(!fromUser){
            throw ApiError.UserDNEError;
        }
        const toUser = await User.findOne({ username: to }).populate("chatLogs");
        if(!toUser){
            throw ApiError.UserDNEError;
        }
        let chat;

        if(fromUser.chatLogs.has(to)){
            chat = fromUser.chatLogs.get(to);
        }
        else{
            chat = await createChat(fromUser, toUser);
        }
        
        const messageInfo = {
            message: message,
            postedByUser: from,
        }
        const newMessage = await Message.create(messageInfo);

        chat.messages.push(newMessage);
        await chat.save()

        return {
            success: true,
            body: {
                message: message,
                deliveredTo: to
            }
        }
    },
    getMessages: async (from, to) => {
        const fromUser = await User.findOne({ username: from }).populate({ path: 'chatLogs', populate: { path: 'messages' } });
        if(!fromUser){
            throw ApiError.UserDNEError;
        }
        if(!fromUser.chatLogs.has(to)){
            return {messages : []}
        }
        const chatLogs = fromUser.chatLogs.get(to).messages.map((msg) => {return {text: msg.message, sentBy: msg.postedByUser}});
        return {messages: chatLogs};
    }
}
