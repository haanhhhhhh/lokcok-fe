import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondary,
  Chip,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const mockPosts = [
  {
    id: 1,
    content: "Mới về lô hàng túi xách cao cấp, mời các bạn ghé xem nhé! 🛍️",
    images: [],
    likes: 156,
    comments: 23,
    shares: 12,
    createdAt: "2024-03-15T10:30:00",
  },
  {
    id: 2,
    content: "Sale off 50% toàn bộ áo thun oversize! Số lượng có hạn ⚡️",
    images: [],
    likes: 89,
    comments: 15,
    shares: 8,
    createdAt: "2024-03-14T15:45:00",
  },
];

const mockFollowers = [
  {
    id: 1,
    name: "Nguyễn Thị A",
    avatar: "",
    followDate: "2024-03-10",
    orders: 5,
    totalSpent: 2500000,
  },
  {
    id: 2,
    name: "Trần Văn B",
    avatar: "",
    followDate: "2024-03-12",
    orders: 3,
    totalSpent: 1800000,
  },
];

const PostsPage = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState(mockPosts);
  const [followers, setFollowers] = useState(mockFollowers);
  const [openDialog, setOpenDialog] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setPostContent('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        content: postContent,
        images: [],
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      handleCloseDialog();
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPosts = () => (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(post.createdAt).toLocaleString('vi-VN')}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeletePost(post.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="body1" paragraph>
                {post.content}
              </Typography>
              {post.images.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    {post.images.map((image, index) => (
                      <Grid item xs={4} key={index}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={image}
                          alt={`Post image ${index + 1}`}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} />
                  {post.likes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                  {post.comments}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <ShareIcon fontSize="small" sx={{ mr: 0.5 }} />
                  {post.shares}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderFollowers = () => (
    <Box>
      <TextField
        fullWidth
        placeholder="Tìm kiếm người theo dõi..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List>
        {filteredFollowers.map((follower, index) => (
          <React.Fragment key={follower.id}>
            {index > 0 && <Divider />}
            <ListItem>
              <ListItemAvatar>
                <Avatar>{follower.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={follower.name}
                secondary={
                  <React.Fragment>
                    <Typography variant="body2" component="span">
                      Theo dõi từ: {new Date(follower.followDate).toLocaleDateString('vi-VN')}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        size="small"
                        label={`${follower.orders} đơn hàng`}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        size="small"
                        label={`${follower.totalSpent.toLocaleString('vi-VN')}đ`}
                        color="primary"
                      />
                    </Box>
                  </React.Fragment>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">
              Bài đăng & Người theo dõi
            </Typography>
            {tabValue === 0 && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Tạo bài đăng
              </Button>
            )}
          </Box>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Bài đăng" />
              <Tab label="Người theo dõi" />
            </Tabs>
          </Paper>
        </Box>

        {/* Content */}
        {tabValue === 0 ? renderPosts() : renderFollowers()}

        {/* Create Post Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Tạo bài đăng mới
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Nội dung bài đăng..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              sx={{ mt: 2 }}
            >
              Thêm ảnh
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Hủy
            </Button>
            <Button
              onClick={handleCreatePost}
              variant="contained"
              disabled={!postContent.trim()}
            >
              Đăng
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default PostsPage; 