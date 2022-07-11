const asyncHandler = require('express-async-handler');
const Chat = require('../Models/chatModel');
const User = require('../Models/userModel');



// ------------------- CREATE OR ACCESS CHAT 
const accessChat = asyncHandler(async (req, res) => {

    const { userId } = req.body;

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



// ------------------- FETCH ALL CHATS 
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



// ------------------- CREATE GROUP CHAT 
const createGroupChat = asyncHandler(async (req, res) => {

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: 'Please fill all the fields!' })
    }


    var users = JSON.parse(req.body.users);

    if (users.length < 0) {
        return res.status(400).send({ message: 'More than 2 users are required in a group chat' })
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate('users')
            .populate('groupAdmin')

        res.send(fullGroupChat).status(200);
    }

    catch (erorr) {
        res.status(400);
        throw new Error(error.message);
    }

})



// ------------------- RENAME GROUP CHAT 
const renameGrouoChat = asyncHandler(async (req, res) => {

    const { chatId, chatName } = req.body;

    const renameChatName = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true }
    )
        .populate('users')
        .populate('groupAdmin')

    if (!renameChatName) {
        res.status(400);
        throw new Error('Chat not Found');
    }
    else {
        res.json(renameChatName)
    }
})



// ------------------- ADD NEW USER CHAT 
const addNewUserToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const addNewUserToGroup = await Chat.findByIdAndUpdate(
        chatId,
        { $push: { users: userId } },
        { new: true }
    )
        .populate('users')
        .populate('groupAdmin')

    if (!addNewUserToGroup) {
        res.status(400);
        throw new Error('Chat not Found');
    }
    else {
        res.json(addNewUserToGroup);
    }
})



// ------------------- ADD NEW USER CHAT 
const removeUserFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removeUserFromGroup = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    )
        .populate('users')
        .populate('groupAdmin')

    if (!removeUserFromGroup) {
        res.status(400);
        throw new Error('Chat not Found');
    }
    else {
        res.json(removeUserFromGroup);
    }
})

module.exports = { accessChat, fetchChats, createGroupChat, renameGrouoChat, addNewUserToGroup, removeUserFromGroup };

