import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  InputAdornment,
  Badge,
  Grid,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockChats = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Nguyễn Thị A",
      avatar: "",
      lastSeen: "2024-03-15T11:30:00",
    },
    lastMessage: {
      content: "Sản phẩm này còn hàng không ạ?",
      timestamp: "2024-03-15T11:30:00",
      unread: true,
    },
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Trần Văn B",
      avatar: "",
      lastSeen: "2024-03-15T10:45:00",
    },
    lastMessage: {
      content: "Dạ em đã nhận được hàng rồi ạ",
      timestamp: "2024-03-15T10:45:00",
      unread: false,
    },
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    content: "Chào shop, sản phẩm này còn hàng không ạ?",
    timestamp: "2024-03-15T11:30:00",
  },
  {
    id: 2,
    senderId: "seller",
    content: "Chào bạn, sản phẩm này shop vẫn còn hàng nhé!",
    timestamp: "2024-03-15T11:31:00",
  },
  {
    id: 3,
    senderId: 1,
    content: "Giá này đã là giá tốt nhất chưa ạ?",
    timestamp: "2024-03-15T11:32:00",
  },
  {
    id: 4,
    senderId: "seller",
    content: "Đây là giá tốt nhất rồi ạ. Shop đang có chương trình freeship nữa nè!",
    timestamp: "2024-03-15T11:33:00",
  },
];

const ChatPage = () => {
  const router = useRouter();
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState(mockMessages);
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        senderId: "seller",
        content: messageInput,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Chat List */}
      <Paper sx={{ width: 320, borderRadius: 0, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Tin nhắn
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {filteredChats.map((chat, index) => (
            <React.Fragment key={chat.id}>
              {index > 0 && <Divider />}
              <ListItem
                button
                selected={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
              >
                <ListItemAvatar>
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: new Date(chat.user.lastSeen) > new Date(Date.now() - 5 * 60000)
                          ? '#44b700'
                          : 'grey.500',
                      },
                    }}
                  >
                    <Avatar>{chat.user.name[0]}</Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.user.name}
                  secondary={chat.lastMessage.content}
                  primaryTypographyProps={{
                    variant: 'subtitle2',
                    color: chat.lastMessage.unread ? 'primary' : 'textPrimary',
                  }}
                  secondaryTypographyProps={{
                    noWrap: true,
                    color: chat.lastMessage.unread ? 'primary' : 'textSecondary',
                  }}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Chat Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', bgcolor: '#f5f5f5' }}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <Paper sx={{ p: 2, borderRadius: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2 }}>{selectedChat.user.name[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {selectedChat.user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(selectedChat.user.lastSeen) > new Date(Date.now() - 5 * 60000)
                      ? 'Đang hoạt động'
                      : `Hoạt động ${new Date(selectedChat.user.lastSeen).toLocaleString('vi-VN')}`
                    }
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.senderId === 'seller' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  {message.senderId !== 'seller' && (
                    <Avatar
                      sx={{ width: 32, height: 32, mr: 1 }}
                    >
                      {selectedChat.user.name[0]}
                    </Avatar>
                  )}
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: message.senderId === 'seller' ? 'primary.main' : 'background.paper',
                      color: message.senderId === 'seller' ? 'white' : 'text.primary',
                      borderRadius: 2,
                      p: 2,
                      position: 'relative',
                    }}
                  >
                    <Typography variant="body1">
                      {message.content}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        position: 'absolute',
                        bottom: -20,
                        right: message.senderId === 'seller' ? 0 : 'auto',
                        left: message.senderId === 'seller' ? 'auto' : 0,
                        color: 'text.secondary',
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('vi-VN')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Paper sx={{ p: 2, borderRadius: 0 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <IconButton size="small">
                    <ImageIcon />
                  </IconButton>
                  <IconButton size="small">
                    <AttachFileIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Nhập tin nhắn..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Chọn một cuộc trò chuyện để bắt đầu
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatPage; 