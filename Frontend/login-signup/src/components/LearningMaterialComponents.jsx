// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams(); // from /learning-materials/:id
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("DEBUG - quizId:", quizId);
//     console.log("DEBUG - userEmail:", userEmail);
//     console.log("DEBUG - responses:", responses);

//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }

//         const requestBody = { responses };

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         setMaterials(result.data.materials || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("DEBUG - Error fetching learning materials:", err);
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   if (loading) return <div className="learning-status">Loading personalized learning materials...</div>;
//   if (error) return <div className="learning-error">{error}</div>;

//   if (materials.length === 0) {
//     return (
//       <div className="learning-perfect-score">
//         <h2>Perfect Score! 🎉</h2>
//         <p>Great job! You answered all questions correctly.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="learning-materials">
//       <h2>Personalized Learning Materials</h2>
//       <p>We've prepared some materials to help you improve on the questions you missed.</p>

//       {materials.map((material, index) => (
//         <div key={material.questionId} className="material-card">
//           <h3>Question {index + 1}</h3>
//           <div className="question-details">
//             <p><strong>Question:</strong> {material.questionText}</p>
//             <p><strong>Your Answer:</strong> {material.userAnswer}</p>
//             <p><strong>Correct Answer:</strong> {material.correctAnswer}</p>
//           </div>

//           <div className="flashcard">
//             <h4>Flashcard</h4>
//             <div className="flashcard-content">
//               <p><strong>Q:</strong> {material.flashcard.question}</p>
//               <p><strong>A:</strong> {material.flashcard.answer}</p>
//             </div>
//           </div>

//           <div className="summary">
//             <h4>Summary</h4>
//             <p>{material.summary}</p>
//           </div>

//           <div className="study-guide">
//             <h4>Study Guide</h4>
//             <ul>
//               {material.studyGuide?.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LearningMaterials;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams(); // from /learning-materials/:id
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("DEBUG - quizId:", quizId);
//     console.log("DEBUG - userEmail:", userEmail);
//     console.log("DEBUG - responses:", responses);

//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }

//         // Filter out responses with null or undefined response property
//         const validResponses = responses.filter(item => 
//           item && item.response !== undefined && item.response !== null
//         );

//         if (validResponses.length === 0 && responses.length > 0) {
//           console.warn("Warning: All responses were filtered out due to missing 'response' property");
          
//           // Log structure of first response to help debugging
//           if (responses[0]) {
//             console.log("Example of invalid response object:", responses[0]);
//           }
//         }

//         const requestBody = { responses: validResponses };

//         // Log the request body and URL before making the request
//         console.log("Request body:", requestBody);
//         console.log("Request URL:", `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`);

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         setMaterials(result.data.materials || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("DEBUG - Error fetching learning materials:", err);
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   if (loading) return <div className="learning-status">Loading personalized learning materials...</div>;
//   if (error) return (
//     <div className="learning-error">
//       <h3>Error Loading Learning Materials</h3>
//       <p>{error}</p>
//       <p>Please try again later or contact support if the problem persists.</p>
//     </div>
//   );

//   if (materials.length === 0) {
//     return (
//       <div className="learning-perfect-score">
//         <h2>Perfect Score! 🎉</h2>
//         <p>Great job! You answered all questions correctly.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="learning-materials">
//       <h2>Personalized Learning Materials</h2>
//       <p>We've prepared some materials to help you improve on the questions you missed.</p>

//       {materials.map((material, index) => (
//         <div key={material.questionId || index} className="material-card">
//           <h3>Question {index + 1}</h3>
//           <div className="question-details">
//             <p><strong>Question:</strong> {material.questionText}</p>
//             <p><strong>Your Answer:</strong> {material.userAnswer}</p>
//             <p><strong>Correct Answer:</strong> {material.correctAnswer}</p>
//           </div>

//           <div className="flashcard">
//             <h4>Flashcard</h4>
//             <div className="flashcard-content">
//               <p><strong>Q:</strong> {material.flashcard?.question}</p>
//               <p><strong>A:</strong> {material.flashcard?.answer}</p>
//             </div>
//           </div>

//           <div className="summary">
//             <h4>Summary</h4>
//             <p>{material.summary}</p>
//           </div>

//           <div className="study-guide">
//             <h4>Study Guide</h4>
//             <ul>
//               {material.studyGuide?.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LearningMaterials;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams(); // from /learning-materials/:id
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("DEBUG - quizId:", quizId);
//     console.log("DEBUG - userEmail:", userEmail);
//     console.log("DEBUG - responses:", JSON.stringify(responses, null, 2)); // Better logging

//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }

//         // Make sure each response has a valid 'response' property
//         const processedResponses = responses.map(item => {
//           // If the item doesn't have a response property or it's null,
//           // create a copy with a default value
//           if (!item || item.response === undefined || item.response === null) {
//             return {
//               ...item,
//               response: "No answer provided"
//             };
//           }
//           return item;
//         });

//         const requestBody = { responses: processedResponses };

//         // Log the request body and URL before making the request
//         console.log("Request body:", JSON.stringify(requestBody, null, 2));
//         console.log("Request URL:", `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`);

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         console.log("API Response:", result.data);
//         setMaterials(result.data.materials || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("DEBUG - Error fetching learning materials:", err);
//         // More detailed error info
//         if (err.response) {
//           console.error("Response error data:", err.response.data);
//           console.error("Response status:", err.response.status);
//         }
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   if (loading) return <div className="learning-status">Loading personalized learning materials...</div>;
//   if (error) return (
//     <div className="learning-error">
//       <h3>Error Loading Learning Materials</h3>
//       <p>{error}</p>
//       <p>Please try again later or contact support if the problem persists.</p>
//     </div>
//   );

//   if (materials.length === 0) {
//     return (
//       <div className="learning-perfect-score">
//         <h2>Perfect Score! 🎉</h2>
//         <p>Great job! You answered all questions correctly.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="learning-materials">
//       <h2>Personalized Learning Materials</h2>
//       <p>We've prepared some materials to help you improve on the questions you missed.</p>

//       {materials.map((material, index) => (
//         <div key={material.questionId || index} className="material-card">
//           <h3>Question {index + 1}</h3>
//           <div className="question-details">
//             <p><strong>Question:</strong> {material.questionText}</p>
//             <p><strong>Your Answer:</strong> {material.userAnswer}</p>
//             <p><strong>Correct Answer:</strong> {material.correctAnswer}</p>
//           </div>

//           <div className="flashcard">
//             <h4>Flashcard</h4>
//             <div className="flashcard-content">
//               <p><strong>Q:</strong> {material.flashcard?.question}</p>
//               <p><strong>A:</strong> {material.flashcard?.answer}</p>
//             </div>
//           </div>

//           <div className="summary">
//             <h4>Summary</h4>
//             <p>{material.summary}</p>
//           </div>

//           <div className="study-guide">
//             <h4>Study Guide</h4>
//             <ul>
//               {material.studyGuide?.map((item, i) => (
//                 <li key={i}>{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LearningMaterials;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams();
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const exportRef = useRef();

//   useEffect(() => {
//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }

//         const processedResponses = responses.map(item => {
//           const answerValue = item.answer || item.selectedAnswer || item.userAnswer || 
//                              item.response || item.selectedOption ||
//                              (item.data ? item.data.response : null);
//           return {
//             ...item,
//             response: answerValue || "No answer provided"
//           };
//         });

//         const requestBody = { responses: processedResponses };

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         setMaterials(result.data.materials || []);
//         setLoading(false);
//       } catch (err) {
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   const handleDownload = async () => {
//     const input = exportRef.current;
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const scale = 2;

//     const cards = input.querySelectorAll('.pdf-item');

//     for (let i = 0; i < cards.length; i++) {
//       const canvas = await html2canvas(cards[i], { scale });
//       const imgData = canvas.toDataURL('image/png');
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       if (i !== 0) pdf.addPage();
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     }

//     pdf.save('learning-materials.pdf');
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (materials.length === 0) return <div>No learning materials needed.</div>;

//   return (
//     <div className="container mt-4 mb-5">
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-outline-primary" onClick={handleDownload}>
//           Download Flashcards & Summaries PDF
//         </button>
//       </div>

//       <div ref={exportRef}>
//         {materials.map((material, index) => (
//           <div key={material.questionId || index} className="pdf-item mb-4 p-3 border rounded">
//             {/* Flashcard */}
//             <div className="mb-3">
//               <h5>Flashcard</h5>
//               <p><strong>Q:</strong> {material.flashcard?.question}</p>
//               <p><strong>A:</strong> {material.flashcard?.answer}</p>
//             </div>

//             {/* Summary */}
//             <div>
//               <h5>Summary</h5>
//               <p>{material.summary}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Your original cards display untouched below */}
//       {materials.map((material, index) => (
//         <div key={`full-${index}`} className="card shadow-sm mb-4">
//           {/* ... unchanged UI logic here ... */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LearningMaterials;

// working 3
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { BsMoon, BsSun, BsFileEarmarkPdf, BsCardText } from 'react-icons/bs';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams();
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
  
//   const contentRef = useRef(null);
//   const flashcardsRef = useRef(null);

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Generate PDF function using html2canvas and jsPDF
//   const generatePDF = async (contentRef, filename) => {
//     if (!contentRef.current) return;
    
//     try {
//       const content = contentRef.current;
//       const canvas = await html2canvas(content, {
//         scale: 1,
//         useCORS: true,
//         logging: false
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//       });
      
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;
      
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
      
//       // Add new pages if content is longer than one page
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }
      
//       pdf.save(filename);
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   // Handle PDF download for full content
//   const handleDownloadPDF = () => {
//     generatePDF(contentRef, 'Learning_Materials.pdf');
//   };

//   // Handle PDF download for flashcards only
//   const handleDownloadFlashcards = () => {
//     generatePDF(flashcardsRef, 'Flashcards.pdf');
//   };

//   useEffect(() => {
//     console.log("DEBUG - quizId:", quizId);
//     console.log("DEBUG - userEmail:", userEmail);

//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }
        
//         const processedResponses = responses.map(item => {
//           const answerValue = item.answer || item.selectedAnswer || item.userAnswer || 
//                              item.response || item.selectedOption ||
//                              (item.data ? item.data.response : null);
          
//           return {
//             ...item,
//             response: answerValue || "No answer provided"
//           };
//         });

//         const requestBody = { responses: processedResponses };

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         setMaterials(result.data.materials || []);
//         setLoading(false);
//       } catch (err) {
//         console.error("DEBUG - Error fetching learning materials:", err);
//         if (err.response) {
//           console.error("Response error data:", err.response.data);
//           console.error("Response status:", err.response.status);
//         }
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   if (loading) return (
//     <div className={`d-flex justify-content-center align-items-center ${darkMode ? 'bg-dark text-light' : ''}`} style={{ minHeight: "300px" }}>
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//       <span className="ms-3">Loading personalized learning materials...</span>
//     </div>
//   );

//   if (error) return (
//     <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
//       <div className="alert alert-danger">
//         <h4 className="alert-heading">Error Loading Learning Materials</h4>
//         <p>{error}</p>
//         <hr />
//         <p className="mb-0">Please try again later or contact support if the problem persists.</p>
//       </div>
//     </div>
//   );

//   if (materials.length === 0) {
//     return (
//       <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
//         <div className={`card text-center p-5 shadow ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//           <div className="card-body">
//             <h2 className="card-title text-success">Perfect Score! 🎉</h2>
//             <p className="card-text lead">Great job! You answered all questions correctly.</p>
//             <div className="mt-4">
//               <i className="bi bi-trophy text-warning" style={{ fontSize: "3rem" }}></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={darkMode ? 'bg-dark text-light' : ''}>
//         <div className="container mt-4 mb-5">
//           {/* Action buttons */}
//           <div className="d-flex justify-content-end mb-3">
//             <button 
//               className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`} 
//               onClick={toggleDarkMode}
//             >
//               {darkMode ? <BsSun /> : <BsMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
//             </button>
//             <button 
//               className="btn btn-primary me-2" 
//               onClick={handleDownloadPDF}
//             >
//               <BsFileEarmarkPdf /> Download PDF
//             </button>
//             <button 
//               className="btn btn-info" 
//               onClick={handleDownloadFlashcards}
//             >
//               <BsCardText /> Download Flashcards
//             </button>
//           </div>

//           {/* Main content for full PDF export */}
//           <div ref={contentRef}>
//             <div className={`card shadow mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//               <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-primary'} text-white`}>
//                 <h2 className="mb-0">Personalized Learning Materials</h2>
//               </div>
//               <div className="card-body">
//                 <p className="lead">We've prepared some materials to help you improve on the questions you missed.</p>
//               </div>
//             </div>

//             {materials.map((material, index) => (
//               <div key={material.questionId || index} className={`card shadow-sm mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                 <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-light'} ${darkMode ? 'text-light' : ''}`}>
//                   <h3 className="h5 mb-0">Question {index + 1}</h3>
//                 </div>
//                 <div className="card-body">
//                   <div className="mb-4">
//                     <p className="fw-bold text-primary">Question:</p>
//                     <p className="ms-3">{material.questionText}</p>
                    
//                     <div className="row mt-3">
//                       <div className="col-md-6">
//                         <div className={`alert ${darkMode ? 'alert-danger bg-danger bg-opacity-25' : 'alert-danger'}`}>
//                           <p className="fw-bold mb-1">Your Answer:</p>
//                           <p className="mb-0">{material.userAnswer}</p>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className={`alert ${darkMode ? 'alert-success bg-success bg-opacity-25' : 'alert-success'}`}>
//                           <p className="fw-bold mb-1">Correct Answer:</p>
//                           <p className="mb-0">{material.correctAnswer}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                     <div className={`card-header ${darkMode ? 'bg-info bg-opacity-50' : 'bg-info'} ${darkMode ? 'text-light' : 'text-white'}`}>
//                       <h4 className="h6 mb-0">Flashcard</h4>
//                     </div>
//                     <div className="card-body">
//                       <div className="row">
//                         <div className="col-md-6 mb-3 mb-md-0">
//                           <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                             <div className="card-body">
//                               <p className="fw-bold">Question:</p>
//                               <p>{material.flashcard?.question}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                             <div className="card-body">
//                               <p className="fw-bold">Answer:</p>
//                               <p>{material.flashcard?.answer}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                     <div className={`card-header ${darkMode ? 'bg-warning bg-opacity-50' : 'bg-warning'}`}>
//                       <h4 className="h6 mb-0">Summary</h4>
//                     </div>
//                     <div className="card-body">
//                       <p>{material.summary}</p>
//                     </div>
//                   </div>

//                   <div className={`card ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                     <div className={`card-header ${darkMode ? 'bg-success bg-opacity-50' : 'bg-success'} ${darkMode ? 'text-light' : 'text-white'}`}>
//                       <h4 className="h6 mb-0">Study Guide</h4>
//                     </div>
//                     <div className="card-body">
//                       <ul className={`list-group list-group-flush ${darkMode ? 'bg-dark' : ''}`}>
//                         {material.studyGuide?.map((item, i) => (
//                           <li key={i} className={`list-group-item ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>{item}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Hidden section for flashcards only - used for the flashcards PDF */}
//       <div style={{ position: 'absolute', left: '-9999px' }}>
//         <div ref={flashcardsRef} className="container my-4 p-4 bg-white">
//           <h2 className="text-center mb-4">Flashcards</h2>
//           {materials.map((material, index) => (
//             <div key={`flashcard-${index}`} className="card mb-4 border">
//               <div className="card-header bg-info text-white">
//                 <h4 className="h5 mb-0">Flashcard {index + 1}</h4>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 mb-4">
//                     <div className="card border">
//                       <div className="card-header bg-light">
//                         <h5 className="mb-0">Question:</h5>
//                       </div>
//                       <div className="card-body">
//                         <p>{material.flashcard?.question}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="card border">
//                       <div className="card-header bg-light">
//                         <h5 className="mb-0">Answer:</h5>
//                       </div>
//                       <div className="card-body">
//                         <p>{material.flashcard?.answer}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LearningMaterials;



//working all pdf download and bookmarks

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useParams, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { BsMoon, BsSun, BsFileEarmarkPdf, BsCardText, BsDownload, BsShare, BsBookmark, BsStarFill } from 'react-icons/bs';

// const LearningMaterials = () => {
//   const { id: quizId } = useParams();
//   const location = useLocation();

//   const responses = location.state?.responses || [];
//   const userEmail = location.state?.userEmail || '';

//   const [materials, setMaterials] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);
//   const [savedFlashcards, setSavedFlashcards] = useState([]);
  
//   const contentRef = useRef(null);
//   const flashcardsRef = useRef(null);
//   const singleFlashcardRefs = useRef([]);

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // Save flashcard to favorites
//   const toggleSaveFlashcard = (index) => {
//     if (savedFlashcards.includes(index)) {
//       setSavedFlashcards(savedFlashcards.filter(i => i !== index));
//     } else {
//       setSavedFlashcards([...savedFlashcards, index]);
//     }
//   };

//   // Generate PDF function using html2canvas and jsPDF
//   const generatePDF = async (contentRef, filename) => {
//     if (!contentRef.current) return;
    
//     try {
//       const content = contentRef.current;
//       const canvas = await html2canvas(content, {
//         scale: 1,
//         useCORS: true,
//         logging: false
//       });
      
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF({
//         orientation: 'portrait',
//         unit: 'mm',
//         format: 'a4'
//       });
      
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 297; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;
      
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
      
//       // Add new pages if content is longer than one page
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }
      
//       pdf.save(filename);
//     } catch (err) {
//       console.error('Error generating PDF:', err);
//       alert('Failed to generate PDF. Please try again.');
//     }
//   };

//   // Handle PDF download for full content
//   const handleDownloadPDF = () => {
//     generatePDF(contentRef, 'Learning_Materials.pdf');
//   };

//   // Handle PDF download for flashcards only
//   const handleDownloadFlashcards = () => {
//     generatePDF(flashcardsRef, 'Flashcards.pdf');
//   };

//   // Handle PDF download for a single flashcard
//   const handleDownloadSingleFlashcard = (index) => {
//     if (singleFlashcardRefs.current[index]) {
//       generatePDF({ current: singleFlashcardRefs.current[index] }, `Flashcard_${index + 1}.pdf`);
//     }
//   };

//   // Share flashcard (example implementation)
//   const handleShareFlashcard = (index) => {
//     const material = materials[index];
//     if (!material) return;
    
//     const shareText = `Check out this flashcard: Question: ${material.flashcard?.question} Answer: ${material.flashcard?.answer}`;
    
//     if (navigator.share) {
//       navigator.share({
//         title: `Flashcard ${index + 1}`,
//         text: shareText,
//       }).catch(err => console.error('Error sharing:', err));
//     } else {
//       // Fallback for browsers without Web Share API
//       navigator.clipboard.writeText(shareText)
//         .then(() => alert('Flashcard content copied to clipboard!'))
//         .catch(err => console.error('Error copying to clipboard:', err));
//     }
//   };

//   useEffect(() => {
//     const fetchLearningMaterials = async () => {
//       try {
//         if (!quizId || quizId === 'undefined') {
//           throw new Error('Quiz ID is undefined or invalid');
//         }
        
//         const processedResponses = responses.map(item => {
//           const answerValue = item.answer || item.selectedAnswer || item.userAnswer || 
//                              item.response || item.selectedOption ||
//                              (item.data ? item.data.response : null);
          
//           return {
//             ...item,
//             response: answerValue || "No answer provided"
//           };
//         });

//         const requestBody = { responses: processedResponses };

//         const result = await axios.post(
//           `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
//           requestBody,
//           { headers: { 'Content-Type': 'application/json' } }
//         );

//         setMaterials(result.data.materials || []);
//         // Initialize refs array for each flashcard
//         singleFlashcardRefs.current = Array(result.data.materials?.length || 0).fill().map(() => React.createRef());
//         setLoading(false);
//       } catch (err) {
//         console.error("DEBUG - Error fetching learning materials:", err);
//         if (err.response) {
//           console.error("Response error data:", err.response.data);
//           console.error("Response status:", err.response.status);
//         }
//         setError(`Failed to load learning materials: ${err.message}`);
//         setLoading(false);
//       }
//     };

//     fetchLearningMaterials();
//   }, [quizId, responses, userEmail]);

//   // Initialize ratings state after materials are loaded
//   const [flashcardRatings, setFlashcardRatings] = useState([]);
//   useEffect(() => {
//     if (materials.length > 0) {
//       setFlashcardRatings(Array(materials.length).fill(0));
//     }
//   }, [materials]);

//   // Handle rating change
//   const handleRating = (index, rating) => {
//     const newRatings = [...flashcardRatings];
//     newRatings[index] = rating;
//     setFlashcardRatings(newRatings);
//   };

//   if (loading) return (
//     <div className={`d-flex justify-content-center align-items-center ${darkMode ? 'bg-dark text-light' : ''}`} style={{ minHeight: "300px" }}>
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//       <span className="ms-3">Loading personalized learning materials...</span>
//     </div>
//   );

//   if (error) return (
//     <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
//       <div className="alert alert-danger">
//         <h4 className="alert-heading">Error Loading Learning Materials</h4>
//         <p>{error}</p>
//         <hr />
//         <p className="mb-0">Please try again later or contact support if the problem persists.</p>
//       </div>
//     </div>
//   );

//   if (materials.length === 0) {
//     return (
//       <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
//         <div className={`card text-center p-5 shadow ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//           <div className="card-body">
//             <h2 className="card-title text-success">Perfect Score! 🎉</h2>
//             <p className="card-text lead">Great job! You answered all questions correctly.</p>
//             <div className="mt-4">
//               <i className="bi bi-trophy text-warning" style={{ fontSize: "3rem" }}></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className={darkMode ? 'bg-dark text-light' : ''}>
//         <div className="container mt-4 mb-5">
//           {/* Action buttons */}
//           <div className="d-flex justify-content-end mb-3">
//             <button 
//               className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`} 
//               onClick={toggleDarkMode}
//             >
//               {darkMode ? <BsSun /> : <BsMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
//             </button>
//             <button 
//               className="btn btn-primary me-2" 
//               onClick={handleDownloadPDF}
//             >
//               <BsFileEarmarkPdf /> Download PDF
//             </button>
//             <button 
//               className="btn btn-info" 
//               onClick={handleDownloadFlashcards}
//             >
//               <BsCardText /> Download All Flashcards
//             </button>
//           </div>

//           {/* Progress bar */}
//           <div className={`card shadow mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//             <div className={`card-body`}>
//               <h5>Your Progress</h5>
//               <div className="progress mb-2">
//                 <div 
//                   className="progress-bar bg-success" 
//                   role="progressbar" 
//                   style={{ width: `${(materials.length > 0 ? 100 - (materials.length / responses.length) * 100 : 0)}%` }}
//                   aria-valuenow={materials.length > 0 ? 100 - (materials.length / responses.length) * 100 : 0} 
//                   aria-valuemin="0" 
//                   aria-valuemax="100"
//                 >
//                   {Math.round(materials.length > 0 ? 100 - (materials.length / responses.length) * 100 : 0)}%
//                 </div>
//               </div>
//               <small className="text-muted">
//                 {responses.length - materials.length} correct out of {responses.length} questions
//               </small>
//             </div>
//           </div>

//           {/* Main content for full PDF export */}
//           <div ref={contentRef}>
//             <div className={`card shadow mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//               <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-primary'} text-white`}>
//                 <h2 className="mb-0">Personalized Learning Materials</h2>
//               </div>
//               <div className="card-body">
//                 <p className="lead">We've prepared some materials to help you improve on the questions you missed.</p>
//               </div>
//             </div>

//             {materials.map((material, index) => (
//               <div key={material.questionId || index} className={`card shadow-sm mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                 <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-light'} ${darkMode ? 'text-light' : ''}`}>
//                   <h3 className="h5 mb-0">Question {index + 1}</h3>
//                 </div>
//                 <div className="card-body">
//                   <div className="mb-4">
//                     <p className="fw-bold text-primary">Question:</p>
//                     <p className="ms-3">{material.questionText}</p>
                    
//                     <div className="row mt-3">
//                       <div className="col-md-6">
//                         <div className={`alert ${darkMode ? 'alert-danger bg-danger bg-opacity-25' : 'alert-danger'}`}>
//                           <p className="fw-bold mb-1">Your Answer:</p>
//                           <p className="mb-0">{material.userAnswer}</p>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className={`alert ${darkMode ? 'alert-success bg-success bg-opacity-25' : 'alert-success'}`}>
//                           <p className="fw-bold mb-1">Correct Answer:</p>
//                           <p className="mb-0">{material.correctAnswer}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Flashcard with individual download button */}
//                   <div 
//                     className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
//                     ref={el => singleFlashcardRefs.current[index] = el}
//                   >
//                     <div className={`card-header ${darkMode ? 'bg-info bg-opacity-50' : 'bg-info'} ${darkMode ? 'text-light' : 'text-white'} d-flex justify-content-between align-items-center`}>
//                       <h4 className="h6 mb-0">Flashcard</h4>
//                       <div>
//                         <button 
//                           className="btn btn-sm btn-outline-light me-1" 
//                           onClick={() => handleDownloadSingleFlashcard(index)}
//                           title="Download this flashcard"
//                         >
//                           <BsDownload />
//                         </button>
//                         <button 
//                           className="btn btn-sm btn-outline-light me-1" 
//                           onClick={() => handleShareFlashcard(index)}
//                           title="Share this flashcard"
//                         >
//                           <BsShare />
//                         </button>
//                         <button 
//                           className={`btn btn-sm ${savedFlashcards.includes(index) ? 'btn-warning' : 'btn-outline-light'}`} 
//                           onClick={() => toggleSaveFlashcard(index)}
//                           title={savedFlashcards.includes(index) ? "Remove from saved" : "Save this flashcard"}
//                         >
//                           <BsBookmark />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="card-body">
//                       <div className="row">
//                         <div className="col-md-6 mb-3 mb-md-0">
//                           <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                             <div className="card-body">
//                               <p className="fw-bold">Question:</p>
//                               <p>{material.flashcard?.question}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-md-6">
//                           <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                             <div className="card-body">
//                               <p className="fw-bold">Answer:</p>
//                               <p>{material.flashcard?.answer}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Flashcard rating */}
//                       <div className="mt-3">
//                         <p className="mb-1">Rate this flashcard:</p>
//                         <div className="d-flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <button 
//                               key={star} 
//                               className="btn btn-sm me-1" 
//                               onClick={() => handleRating(index, star)}
//                               style={{ background: 'transparent', border: 'none' }}
//                             >
//                               <BsStarFill 
//                                 size={20} 
//                                 color={star <= flashcardRatings[index] ? '#ffc107' : '#e4e5e9'} 
//                               />
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                     <div className={`card-header ${darkMode ? 'bg-warning bg-opacity-50' : 'bg-warning'}`}>
//                       <h4 className="h6 mb-0">Summary</h4>
//                     </div>
//                     <div className="card-body">
//                       <p>{material.summary}</p>
//                     </div>
//                   </div>

//                   <div className={`card ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
//                     <div className={`card-header ${darkMode ? 'bg-success bg-opacity-50' : 'bg-success'} ${darkMode ? 'text-light' : 'text-white'}`}>
//                       <h4 className="h6 mb-0">Study Guide</h4>
//                     </div>
//                     <div className="card-body">
//                       <ul className={`list-group list-group-flush ${darkMode ? 'bg-dark' : ''}`}>
//                         {material.studyGuide?.map((item, i) => (
//                           <li key={i} className={`list-group-item ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>{item}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Hidden section for flashcards only - used for all flashcards PDF */}
//       <div style={{ position: 'absolute', left: '-9999px' }}>
//         <div ref={flashcardsRef} className="container my-4 p-4 bg-white">
//           <h2 className="text-center mb-4">Flashcards</h2>
//           {materials.map((material, index) => (
//             <div key={`flashcard-${index}`} className="card mb-4 border">
//               <div className="card-header bg-info text-white">
//                 <h4 className="h5 mb-0">Flashcard {index + 1}</h4>
//               </div>
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-12 mb-4">
//                     <div className="card border">
//                       <div className="card-header bg-light">
//                         <h5 className="mb-0">Question:</h5>
//                       </div>
//                       <div className="card-body">
//                         <p>{material.flashcard?.question}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-12">
//                     <div className="card border">
//                       <div className="card-header bg-light">
//                         <h5 className="mb-0">Answer:</h5>
//                       </div>
//                       <div className="card-body">
//                         <p>{material.flashcard?.answer}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LearningMaterials;








import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BsMoon, BsSun, BsFileEarmarkPdf, BsCardText, BsDownload, BsShare, BsBookmark, BsStarFill } from 'react-icons/bs';

const LearningMaterials = () => {
  const { id: quizId } = useParams();
  const location = useLocation();

  // Get responses data from location state
  const responses = location.state?.responses || [];
  const userEmail = location.state?.userEmail || '';

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [savedFlashcards, setSavedFlashcards] = useState([]);
  
  // Store refs for PDF generation
  const contentRef = useRef(null);
  const flashcardsRef = useRef(null);
  const singleFlashcardRefs = useRef([]);

  // For debugging - check what data we're working with
  useEffect(() => {
    console.log("Responses data:", responses);
    console.log("User email:", userEmail);
  }, [responses, userEmail]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Save flashcard to favorites
  const toggleSaveFlashcard = (index) => {
    if (savedFlashcards.includes(index)) {
      setSavedFlashcards(savedFlashcards.filter(i => i !== index));
    } else {
      setSavedFlashcards([...savedFlashcards, index]);
    }
  };

  // Generate PDF function using html2canvas and jsPDF
  const generatePDF = async (contentRef, filename) => {
    if (!contentRef.current) return;
    
    try {
      const content = contentRef.current;
      const canvas = await html2canvas(content, {
        scale: 1,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add new pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(filename);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Handle PDF download for full content
  const handleDownloadPDF = () => {
    generatePDF(contentRef, 'Learning_Materials.pdf');
  };

  // Handle PDF download for flashcards only
  const handleDownloadFlashcards = () => {
    generatePDF(flashcardsRef, 'Flashcards.pdf');
  };

  // Handle PDF download for a single flashcard
  const handleDownloadSingleFlashcard = (index) => {
    if (singleFlashcardRefs.current[index]) {
      generatePDF({ current: singleFlashcardRefs.current[index] }, `Flashcard_${index + 1}.pdf`);
    }
  };

  // Share flashcard (example implementation)
  const handleShareFlashcard = (index) => {
    const material = materials[index];
    if (!material) return;
    
    const shareText = `Check out this flashcard: Question: ${material.flashcard?.question} Answer: ${material.flashcard?.answer}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Flashcard ${index + 1}`,
        text: shareText,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Flashcard content copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };

  useEffect(() => {
    const fetchLearningMaterials = async () => {
      try {
        if (!quizId || quizId === 'undefined') {
          throw new Error('Quiz ID is undefined or invalid');
        }
        
        // FIXED: More comprehensive extraction of answer values
        const processedResponses = responses.map(item => {
          // First, log the complete item to see its structure
          console.log("Processing response item:", item);
          
          // Try different ways to extract the answer
          let answerValue;
          
          // If the item itself is a string, use that
          if (typeof item === 'string') {
            answerValue = item;
          } 
          // For nested structures, check various common property names
          else if (typeof item === 'object' && item !== null) {
            answerValue = 
              // Direct properties
              item.answer || 
              item.selectedAnswer || 
              item.userAnswer || 
              item.response || 
              item.selectedOption ||
              // Nested in data
              (item.data && item.data.response) ||
              // Nested in other common structures
              (item.value) || 
              (item.selection) || 
              (item.userSelection) ||
              // If there's a choices array with a selected item
              (item.choices && item.choices.find(c => c.selected)?.text);
              
            // If there's a questionResponse property, try to extract from it
            if (!answerValue && item.questionResponse) {
              if (typeof item.questionResponse === 'string') {
                answerValue = item.questionResponse;
              } else if (typeof item.questionResponse === 'object') {
                answerValue = item.questionResponse.answer || 
                             item.questionResponse.value || 
                             item.questionResponse.text;
              }
            }
          }
          
          console.log(`Extracted answer value: ${answerValue}`);
          
          return {
            ...item,
            response: answerValue || item.toString() // Use string representation as fallback
          };
        });

        const requestBody = { responses: processedResponses };

        console.log("Sending request body:", requestBody);
        console.log("Request URL:", `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`);

        const result = await axios.post(
          `http://localhost:9099/quiz/learning-materials-alt/${quizId}?email=${userEmail}`,
          requestBody,
          { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("API Response:", result.data);
        setMaterials(result.data.materials || []);
        // Initialize refs array for each flashcard
        singleFlashcardRefs.current = Array(result.data.materials?.length || 0).fill().map(() => React.createRef());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching learning materials:", err);
        if (err.response) {
          console.error("Response error data:", err.response.data);
          console.error("Response status:", err.response.status);
        }
        setError(`Failed to load learning materials: ${err.message}`);
        setLoading(false);
      }
    };

    fetchLearningMaterials();
  }, [quizId, responses, userEmail]);

  // Initialize ratings state after materials are loaded
  const [flashcardRatings, setFlashcardRatings] = useState([]);
  useEffect(() => {
    if (materials.length > 0) {
      setFlashcardRatings(Array(materials.length).fill(0));
    }
  }, [materials]);

  // Handle rating change
  const handleRating = (index, rating) => {
    const newRatings = [...flashcardRatings];
    newRatings[index] = rating;
    setFlashcardRatings(newRatings);
  };

  // Calculate progress (fixed)
  const calculateProgress = () => {
    // If we have no responses, return 0
    if (!responses || responses.length === 0) return 0;
    
    // If we have no materials, it means all answers were correct
    if (materials.length === 0) return 100;
    
    // Otherwise, calculate the percentage of correct answers
    const correctAnswers = responses.length - materials.length;
    return Math.round((correctAnswers / responses.length) * 100);
  };

  if (loading) return (
    <div className={`d-flex justify-content-center align-items-center ${darkMode ? 'bg-dark text-light' : ''}`} style={{ minHeight: "300px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-3">Loading personalized learning materials...</span>
    </div>
  );

  if (error) return (
    <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
      <div className="alert alert-danger">
        <h4 className="alert-heading">Error Loading Learning Materials</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Please try again later or contact support if the problem persists.</p>
      </div>
    </div>
  );

  // Perfect score case - all answers correct
  if (materials.length === 0) {
    return (
      <div className={`container mt-4 ${darkMode ? 'bg-dark text-light' : ''}`}>
        <div className={`card text-center p-5 shadow ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
          <div className="card-body">
            <h2 className="card-title text-success">Perfect Score! 🎉</h2>
            <p className="card-text lead">Great job! You answered all questions correctly.</p>
            <div className="mt-4">
              <i className="bi bi-trophy text-warning" style={{ fontSize: "3rem" }}></i>
            </div>
            {/* Show progress bar even for perfect score */}
            <div className="mt-4">
              <h5>Your Progress</h5>
              <div className="progress mb-2">
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: '100%' }}
                  aria-valuenow={100} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  100%
                </div>
              </div>
              <small className="text-muted">
                {responses.length} correct out of {responses.length} questions
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Progress calculation
  const progressPercent = calculateProgress();

  return (
    <>
      <div className={darkMode ? 'bg-dark text-light' : ''}>
        <div className="container mt-4 mb-5">
          {/* Action buttons */}
          <div className="d-flex justify-content-end mb-3">
            <button 
              className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`} 
              onClick={toggleDarkMode}
            >
              {darkMode ? <BsSun /> : <BsMoon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button 
              className="btn btn-primary me-2" 
              onClick={handleDownloadPDF}
            >
              <BsFileEarmarkPdf /> Download PDF
            </button>
            <button 
              className="btn btn-info" 
              onClick={handleDownloadFlashcards}
            >
              <BsCardText /> Download All Flashcards
            </button>
          </div>

          {/* Progress bar - FIXED */}
          <div className={`card shadow mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
            <div className={`card-body`}>
              <h5>Your Progress</h5>
              <div className="progress mb-2">
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  style={{ width: `${progressPercent}%` }}
                  aria-valuenow={progressPercent} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {progressPercent}%
                </div>
              </div>
              <small className="text-muted">
                {responses.length - materials.length} correct out of {responses.length} questions
              </small>
            </div>
          </div>

          {/* Main content for full PDF export */}
          <div ref={contentRef}>
            <div className={`card shadow mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
              <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-primary'} text-white`}>
                <h2 className="mb-0">Personalized Learning Materials</h2>
              </div>
              <div className="card-body">
                <p className="lead">We've prepared some materials to help you improve on the questions you missed.</p>
              </div>
            </div>

            {materials.map((material, index) => (
              <div key={material.questionId || index} className={`card shadow-sm mb-4 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <div className={`card-header ${darkMode ? 'bg-secondary' : 'bg-light'} ${darkMode ? 'text-light' : ''}`}>
                  <h3 className="h5 mb-0">Question {index + 1}</h3>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <p className="fw-bold text-primary">Question:</p>
                    <p className="ms-3">{material.questionText}</p>
                    
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className={`alert ${darkMode ? 'alert-danger bg-danger bg-opacity-25' : 'alert-danger'}`}>
                          <p className="fw-bold mb-1">Your Answer:</p>
                          <p className="mb-0">{material.userAnswer || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className={`alert ${darkMode ? 'alert-success bg-success bg-opacity-25' : 'alert-success'}`}>
                          <p className="fw-bold mb-1">Correct Answer:</p>
                          <p className="mb-0">{material.correctAnswer}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flashcard with individual download button */}
                  <div 
                    className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    ref={el => singleFlashcardRefs.current[index] = el}
                  >
                    <div className={`card-header ${darkMode ? 'bg-info bg-opacity-50' : 'bg-info'} ${darkMode ? 'text-light' : 'text-white'} d-flex justify-content-between align-items-center`}>
                      <h4 className="h6 mb-0">Flashcard</h4>
                      <div>
                        <button 
                          className="btn btn-sm btn-outline-light me-1" 
                          onClick={() => handleDownloadSingleFlashcard(index)}
                          title="Download this flashcard"
                        >
                          <BsDownload />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-light me-1" 
                          onClick={() => handleShareFlashcard(index)}
                          title="Share this flashcard"
                        >
                          <BsShare />
                        </button>
                        <button 
                          className={`btn btn-sm ${savedFlashcards.includes(index) ? 'btn-warning' : 'btn-outline-light'}`} 
                          onClick={() => toggleSaveFlashcard(index)}
                          title={savedFlashcards.includes(index) ? "Remove from saved" : "Save this flashcard"}
                        >
                          <BsBookmark />
                        </button>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                          <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                            <div className="card-body">
                              <p className="fw-bold">Question:</p>
                              <p>{material.flashcard?.question}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className={`card h-100 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                            <div className="card-body">
                              <p className="fw-bold">Answer:</p>
                              <p>{material.flashcard?.answer}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Flashcard rating */}
                      <div className="mt-3">
                        <p className="mb-1">Rate this flashcard:</p>
                        <div className="d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star} 
                              className="btn btn-sm me-1" 
                              onClick={() => handleRating(index, star)}
                              style={{ background: 'transparent', border: 'none' }}
                            >
                              <BsStarFill 
                                size={20} 
                                color={star <= flashcardRatings[index] ? '#ffc107' : '#e4e5e9'} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`card mb-3 ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                    <div className={`card-header ${darkMode ? 'bg-warning bg-opacity-50' : 'bg-warning'}`}>
                      <h4 className="h6 mb-0">Summary</h4>
                    </div>
                    <div className="card-body">
                      <p>{material.summary}</p>
                    </div>
                  </div>

                  <div className={`card ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                    <div className={`card-header ${darkMode ? 'bg-success bg-opacity-50' : 'bg-success'} ${darkMode ? 'text-light' : 'text-white'}`}>
                      <h4 className="h6 mb-0">Study Guide</h4>
                    </div>
                    <div className="card-body">
                      <ul className={`list-group list-group-flush ${darkMode ? 'bg-dark' : ''}`}>
                        {material.studyGuide?.map((item, i) => (
                          <li key={i} className={`list-group-item ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden section for flashcards only - used for all flashcards PDF */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={flashcardsRef} className="container my-4 p-4 bg-white">
          <h2 className="text-center mb-4">Flashcards</h2>
          {materials.map((material, index) => (
            <div key={`flashcard-${index}`} className="card mb-4 border">
              <div className="card-header bg-info text-white">
                <h4 className="h5 mb-0">Flashcard {index + 1}</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 mb-4">
                    <div className="card border">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Question:</h5>
                      </div>
                      <div className="card-body">
                        <p>{material.flashcard?.question}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card border">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Answer:</h5>
                      </div>
                      <div className="card-body">
                        <p>{material.flashcard?.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LearningMaterials;