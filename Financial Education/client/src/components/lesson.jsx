import { QuestionAnswer } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Api from "../api/index";
import { toast } from "react-toastify";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function Lesson({ category }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log("Fetching lessons for category:", category);
        const response = await Api.getLessonsByCategory(category);
        console.log("Lessons response:", response.data);
        if (response.data && response.data.length > 0) {
          setLessons(response.data);
          console.log("Setting lessons:", response.data);
        } else {
          console.log("No lessons found for category:", category);
          toast.error('No lessons found for this category');
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
        toast.error('Error fetching lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [category]);

  const handleOpenModal = (lesson) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const isValidVideoLink = (link) => {
    return link && link !== "null" && link.trim() !== "";
  };

  if (loading) {
    return (
      <div className="lesson-container mx-auto max-w-7xl p-4 md:p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="lesson-container mx-auto max-w-7xl p-4 md:p-6">
        <div className="text-center text-gray-600">
          No lesson content available
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-container mx-auto max-w-7xl p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#33006F] capitalize">
        {category} Lessons
      </h1>
      
      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            onClick={() => handleOpenModal(lesson)}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold mb-3 text-[#33006F] line-clamp-2">
              {lesson.title}
            </h2>
            <div className="text-gray-600 text-sm mb-4 line-clamp-3">
              {lesson.content.replace(/<[^>]+>/g, '')}
            </div>
            {lesson.modules && lesson.modules.length > 0 && (
              <div className="text-sm text-[#33006F]">
                {lesson.modules.length} module{lesson.modules.length !== 1 ? 's' : ''} available
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lesson Modal */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          className: "rounded-xl"
        }}
      >
        <DialogContent className="p-0">
          {selectedLesson && (
            <div className="relative">
              <IconButton
                onClick={handleCloseModal}
                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                size="small"
              >
                <Close />
              </IconButton>
              
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#33006F] border-b-2 border-[#33006F] pb-2">
                    {selectedLesson.title}
                  </h2>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6">
                  <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line prose prose-ul:list-disc prose-ul:pl-6 prose-li:my-1 max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: selectedLesson.content.replace(/\n/g, '<br />')
                      }} 
                      className="[&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:my-1 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:my-1"
                    />
                  </div>
                </div>

                {isValidVideoLink(selectedLesson.videoLink) && (
                  <div className="video-container mb-6 relative w-full rounded-lg shadow-md overflow-hidden" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={selectedLesson.videoLink}
                      title={selectedLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {selectedLesson.modules && selectedLesson.modules.length > 0 && (
                  <div className="playlist mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-[#33006F] border-b border-gray-200 pb-2">Modules</h3>
                    <ul className="space-y-2">
                      {selectedLesson.modules.map((module, moduleIndex) => (
                        <li key={moduleIndex}>
                          <a
                            href={module.path}
                            className="text-[#33006F] hover:text-[#662d91] transition-colors duration-300 flex items-center gap-2"
                          >
                            <QuestionAnswer className="text-lg" />
                            <span>{module.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Lesson;
