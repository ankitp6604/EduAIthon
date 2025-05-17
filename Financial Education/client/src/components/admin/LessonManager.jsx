import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Grid,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Api from '../../api/index';
import { toast } from 'react-toastify';

const categories = ['banking', 'budgeting', 'investing', 'financing'];

function LessonManager() {
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    videoLink: '',
    category: '',
    modules: []
  });

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await Api.getLessons();
      setLessons(response.data);
    } catch (error) {
      toast.error('Error fetching lessons');
    }
  };

  const handleOpen = (lesson = null) => {
    if (lesson) {
      setEditingLesson(lesson);
      setFormData({
        title: lesson.title,
        content: lesson.content,
        videoLink: lesson.videoLink,
        category: lesson.category,
        modules: lesson.modules || []
      });
    } else {
      setEditingLesson(null);
      setFormData({
        title: '',
        content: '',
        videoLink: '',
        category: '',
        modules: []
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingLesson(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLesson) {
        await Api.updateLesson(editingLesson._id, formData);
        toast.success('Lesson updated successfully');
      } else {
        await Api.createLesson(formData);
        toast.success('Lesson created successfully');
      }
      handleClose();
      fetchLessons();
    } catch (error) {
      toast.error('Error saving lesson');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await Api.deleteLesson(id);
        toast.success('Lesson deleted successfully');
        fetchLessons();
      } catch (error) {
        toast.error('Error deleting lesson');
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],
      ['emoji']
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Lessons
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: '#33006F', '&:hover': { bgcolor: '#662d91' } }}
        >
          Add New Lesson
        </Button>
      </Box>

      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} md={6} key={lesson._id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{lesson.title}</Typography>
                <Box>
                  <IconButton onClick={() => handleOpen(lesson)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(lesson._id)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
              <Typography color="textSecondary" gutterBottom>
                Category: {lesson.category}
              </Typography>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {lesson.content.replace(/<[^>]+>/g, '')} 
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingLesson ? 'Edit Lesson' : 'Create New Lesson'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Video Link"
                  value={formData.videoLink}
                  onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })}
                  required
                  helperText="Enter full YouTube embed URL"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Content
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  modules={modules}
                  style={{ height: '200px', marginBottom: '50px' }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: '#33006F', '&:hover': { bgcolor: '#662d91' } }}
          >
            {editingLesson ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LessonManager; 