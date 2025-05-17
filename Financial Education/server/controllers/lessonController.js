import Lesson from '../models/lessonSchema.js';

class LessonController {
  // Get all lessons
  getAllLessons = async (req, res) => {
    try {
      const lessons = await Lesson.find().sort({ createdAt: 1 });
      res.status(200).json(lessons);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching lessons" });
    }
  };

  // Get lessons by category
  getLessonsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      console.log("Fetching lessons for category:", category); // Debug log
      const lessons = await Lesson.find({ category }).sort({ createdAt: 1 });
      console.log("Found lessons:", lessons); // Debug log
      res.status(200).json(lessons);
    } catch (error) {
      console.log("Error fetching lessons by category:", error); // Debug log
      res.status(500).json({ message: "Error fetching lessons" });
    }
  };

  // Get a single lesson by ID
  getLessonById = async (req, res) => {
    try {
      const { id } = req.params;
      const lesson = await Lesson.findById(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.status(200).json(lesson);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching lesson" });
    }
  };

  // Create a new lesson
  createLesson = async (req, res) => {
    try {
      console.log("Create lesson request body:", req.body); // Debug log
      console.log("User ID from auth:", req.userID); // Debug log
      
      const { title, content, videoLink, category, modules } = req.body;
      
      // Validate required fields
      if (!title || !content || !videoLink || !category) {
        console.log("Missing required fields:", { title, content, videoLink, category }); // Debug log
        return res.status(400).json({ message: "All fields are required" });
      }

      const newLesson = new Lesson({
        title,
        content,
        videoLink,
        category,
        modules: modules || []
      });

      await newLesson.save();
      res.status(201).json(newLesson);
    } catch (error) {
      console.log("Lesson creation error:", error); // Debug log
      res.status(500).json({ message: "Error creating lesson" });
    }
  };

  // Update a lesson
  updateLesson = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, videoLink, category, modules } = req.body;

      const lesson = await Lesson.findById(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }

      // Update fields if provided
      if (title) lesson.title = title;
      if (content) lesson.content = content;
      if (videoLink) lesson.videoLink = videoLink;
      if (category) lesson.category = category;
      if (modules) lesson.modules = modules;

      await lesson.save();
      res.status(200).json(lesson);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating lesson" });
    }
  };

  // Delete a lesson
  deleteLesson = async (req, res) => {
    try {
      const { id } = req.params;
      const lesson = await Lesson.findByIdAndDelete(id);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting lesson" });
    }
  };
}

export default new LessonController(); 