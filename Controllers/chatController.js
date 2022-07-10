const asyncHandler = require('express-async-handler');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');



// ------------------- ACCESS E CHAT 
const accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body;
    console.log('Req User Middleware', req.user);

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({

        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
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
            users: [req.user._id, userId]
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



// ------------------- ACCESS ALL CHAT 
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users')
            .populate('groupAdmin')
            .populate('latestMessage')
            .sort({ upadteAdt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'name photo email'
                })
                res.send(results).status(200)
            })
    }
    catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})


module.exports = { accessChat, fetchChats };

// , fetchChats, createGroupChat, renameGroup, addMemberToGroup, removeMemberFromGroup