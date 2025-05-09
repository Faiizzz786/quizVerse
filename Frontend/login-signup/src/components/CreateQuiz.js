// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateQuiz = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [numQ, setNumQ] = useState(5);
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     axios.post("http://localhost:9099/quiz/create", null, {
//       params: {
//         category,
//         numQ,
//         title,
//       },
//     }).then(() => {
//       alert("Quiz created successfully!");
//       navigate("/give-quiz");
//     }).catch((err) => {
//       console.error(err);
//       alert("Failed to create quiz.");
//     });
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h3 className="mb-4">📚 Create a New Quiz</h3>
//         <div className="mb-3">
//           <label className="form-label">Quiz Title</label>
//           <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Number of Questions</label>
//           <input type="number" className="form-control" value={numQ} onChange={(e) => setNumQ(e.target.value)} />
//         </div>
//         <button className="btn btn-success" onClick={handleCreate}>Create Quiz</button>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateQuiz = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [numQ, setNumQ] = useState(5);
//   const [useAI, setUseAI] = useState(false);
//   const [paragraph, setParagraph] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     if (useAI && !paragraph.trim()) {
//       alert("Please enter a paragraph for AI to generate questions.");
//       return;
//     }

//     setIsLoading(true);

//     if (useAI) {
//       // AI-powered quiz creation
//       axios.post("http://localhost:9099/quiz/create-with-ai", {
//         paragraph,
//         category,
//         numQ,
//         title
//       })
//       .then(() => {
//         alert("Quiz created successfully with AI!");
//         setIsLoading(false);
//         navigate("/give-quiz");
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsLoading(false);
//         alert("Failed to create quiz with AI: " + (err.response?.data || err.message));
//       });
//     } else {
//       // Regular quiz creation (your existing code)
//       axios.post("http://localhost:9099/quiz/create", null, {
//         params: {
//           category,
//           numQ,
//           title,
//         },
//       })
//       .then(() => {
//         alert("Quiz created successfully!");
//         setIsLoading(false);
//         navigate("/give-quiz");
//       })
//       .catch((err) => {
//         console.error(err);
//         setIsLoading(false);
//         alert("Failed to create quiz.");
//       });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h3 className="mb-4">📚 Create a New Quiz</h3>
        
//         <div className="mb-3 form-check form-switch">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             id="useAI"
//             checked={useAI}
//             onChange={() => setUseAI(!useAI)}
//           />
//           <label className="form-check-label" htmlFor="useAI">
//             Generate quiz with AI
//           </label>
//         </div>
        
//         <div className="mb-3">
//           <label className="form-label">Quiz Title</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={title} 
//             onChange={(e) => setTitle(e.target.value)} 
//             required
//           />
//         </div>
        
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={category} 
//             onChange={(e) => setCategory(e.target.value)} 
//             required
//           />
//         </div>
        
//         <div className="mb-3">
//           <label className="form-label">Number of Questions</label>
//           <input 
//             type="number" 
//             className="form-control" 
//             value={numQ} 
//             onChange={(e) => setNumQ(parseInt(e.target.value))} 
//             min="1"
//             max="20"
//             required
//           />
//         </div>
        
//         {useAI && (
//           <div className="mb-3">
//             <label className="form-label">Content for Quiz</label>
//             <textarea
//               className="form-control"
//               rows="8"
//               value={paragraph}
//               onChange={(e) => setParagraph(e.target.value)}
//               placeholder="Paste your paragraph here for AI to generate questions from..."
//               required={useAI}
//             />
//             <small className="form-text text-muted">
//               The AI will analyze this text and create quiz questions based on its content.
//             </small>
//           </div>
//         )}
        
//         <button 
//           className="btn btn-success" 
//           onClick={handleCreate}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Creating...' : useAI ? 'Create Quiz with AI' : 'Create Quiz'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';  // Import the CSS

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [numQ, setNumQ] = useState(5);
  const [useAI, setUseAI] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    if (useAI && !paragraph.trim()) {
      alert("Please enter a paragraph for AI to generate questions.");
      return;
    }

    setIsLoading(true);

    if (useAI) {
      // AI-powered quiz creation
      axios.post("http://localhost:9099/quiz/create-with-ai", {
        paragraph,
        category,
        numQ,
        title
      })
      .then(() => {
        alert("Quiz created successfully with AI!");
        setIsLoading(false);
        navigate("/give-quiz");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        alert("Failed to create quiz with AI: " + (err.response?.data || err.message));
      });
    } else {
      // Regular quiz creation (your existing code)
      axios.post("http://localhost:9099/quiz/create", null, {
        params: {
          category,
          numQ,
          title,
        },
      })
      .then(() => {
        alert("Quiz created successfully!");
        setIsLoading(false);
        navigate("/give-quiz");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        alert("Failed to create quiz.");
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">📚 Create a New Quiz</h3>
        
        <div className="mb-3 form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="useAI"
            checked={useAI}
            onChange={() => setUseAI(!useAI)}
          />
          <label className="form-check-label" htmlFor="useAI">
            Generate quiz with AI
          </label>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Quiz Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input 
            type="text" 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Number of Questions</label>
          <input 
            type="number" 
            className="form-control" 
            value={numQ} 
            onChange={(e) => setNumQ(parseInt(e.target.value))} 
            min="1"
            max="20"
            required
          />
        </div>
        
        {useAI && (
          <div className="mb-3">
            <label className="form-label">Content for Quiz</label>
            <textarea
              className="form-control"
              rows="8"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
              placeholder="Paste your paragraph here for AI to generate questions from..."
              required={useAI}
            />
            <small className="form-text text-muted">
              The AI will analyze this text and create quiz questions based on its content.
            </small>
          </div>
        )}
        
        <button 
          className="btn btn-success" 
          onClick={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : useAI ? 'Create Quiz with AI' : 'Create Quiz'}
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;

