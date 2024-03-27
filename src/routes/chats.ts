import { Router } from 'express';
import { getChats, createChatMessage, deleteChatMessage, getChattingUsers } from '../controller/chat';

const router = Router();

// Route to retrieve chats for a specific user
router.get('/chats/:receiverId/:senderId', getChats); 

// Route to create a new chat message
router.post('/chats/:senderId/:receiverId', createChatMessage); 

// Route to delete a chat message
router.delete('/chats/:messageId', deleteChatMessage); 

// Route to get all users that the current user is chatting with
router.get("/chats/:userId", getChattingUsers);

export default router;