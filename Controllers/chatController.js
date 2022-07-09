const asyncHandler = require('express-async-handler');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');


const accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    console.log('Req User id', req.user);

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    console.log('User ID', userId);

    var isChat = await Chat.find({

        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: req.userId } } },
        ],
    })
        .populate('users')
        .populate('latestMessage.sender')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name email photo'
    });


    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.body._id, userId]
        }


        try {
            const createChat = await Chat.create(chatData);
            const allChats = await Chat.findOne({ _id: createChat._id }).populate('users');
            res.status(200).json(allChats);
        }
        catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})




module.exports = { accessChat };

// , fetchChats, createGroupChat, renameGroup, addMemberToGroup, removeMemberFromGroup