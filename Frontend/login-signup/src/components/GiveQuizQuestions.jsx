// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";

// // const GiveQuizQuestions = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [questions, setQuestions] = useState([]);
// //   const [answers, setAnswers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [startTime, setStartTime] = useState(null);

// //   useEffect(() => {
// //     setStartTime(Date.now());

// //     axios.get(`http://localhost:9099/quiz/get/${id}`)
// //       .then((res) => {
// //         setQuestions(res.data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching quiz questions", err);
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   const handleOptionChange = (questionId, answer) => {
// //     setAnswers((prev) => {
// //       const updated = [...prev];
// //       const index = updated.findIndex((a) => a.questionId === questionId);
// //       if (index !== -1) updated[index] = { questionId, response: answer };
// //       else updated.push({ questionId, response: answer });
// //       return updated;
// //     });
// //   };

// //   const handleSubmit = () => {
// //     const endTime = Date.now();
// //     const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);
// //     const token = localStorage.getItem("token");

// //     // Decode email from JWT token
// //     let email = "";
// //     if (token) {
// //       const payload = JSON.parse(atob(token.split(".")[1]));
// //       email = payload.sub;
// //     }

// //     const payload = {
// //       responses: answers,
// //       email,
// //       timeTakenInSeconds,
// //     };

// //     axios.post(`http://localhost:9099/quiz/submit/${id}`, payload)
// //       .then((res) => {
// //         alert(`✅ You got ${res.data} correct answers!`);
// //         navigate("/my-quiz-results");
// //       })
// //       .catch((err) => {
// //         console.error("Error submitting quiz", err);
// //       });
// //   };

// //   if (loading) return <div className="container mt-5">Loading quiz...</div>;

// //   return (
// //     <div className="container mt-5">
// //       <h3 className="mb-4">📝 Answer the Questions</h3>
// //       {questions.map((q, index) => (
// //         <div key={q.id} className="mb-4">
// //           <h5>{index + 1}. {q.questionTitle}</h5>
// //           {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
// //             <div className="form-check" key={i}>
// //               <input
// //                 className="form-check-input"
// //                 type="radio"
// //                 name={`question-${q.id}`}
// //                 value={opt}
// //                 onChange={() => handleOptionChange(q.id, opt)}
// //               />
// //               <label className="form-check-label">{opt}</label>
// //             </div>
// //           ))}
// //         </div>
// //       ))}
// //       <button className="btn btn-primary" onClick={handleSubmit}>
// //         Submit Quiz
// //       </button>
// //     </div>
// //   );
// // };

// // export default GiveQuizQuestions;








// 2 correct

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const GiveQuizQuestions = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startTime, setStartTime] = useState(null);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [results, setResults] = useState({
//     correctAnswers: 0,
//     correctOptions: []
//   });

//   useEffect(() => {
//     setStartTime(Date.now());

//     axios.get(`http://localhost:9099/quiz/get/${id}`)
//       .then((res) => {
//         setQuestions(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching quiz questions", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOptionChange = (questionId, answer) => {
//     if (quizSubmitted) return;
    
//     setAnswers((prev) => {
//       const updated = [...prev];
//       const index = updated.findIndex((a) => a.questionId === questionId);
//       if (index !== -1) updated[index] = { questionId, response: answer };
//       else updated.push({ questionId, response: answer });
//       return updated;
//     });
//   };

//   const handleSubmit = () => {
//     const endTime = Date.now();
//     const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);
//     const token = localStorage.getItem("token");

//     // Decode email from JWT token
//     let email = "";
//     if (token) {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       email = payload.sub;
//     }

//     const payload = {
//       responses: answers,
//       email,
//       timeTakenInSeconds,
//     };

//     axios.post(`http://localhost:9099/quiz/submit/${id}`, payload)
//       .then((res) => {
//         // Get correct answers from the response
//         setResults({
//           correctAnswers: res.data.correctCount || res.data,
//           correctOptions: res.data.correctAnswers || []
//         });
//         setQuizSubmitted(true);
//       })
//       .catch((err) => {
//         console.error("Error submitting quiz", err);
//       });
//   };

//   const isCorrectAnswer = (questionId, option) => {
//     if (!quizSubmitted) return false;
    
//     // If the backend returns an array of correct answers
//     if (Array.isArray(results.correctOptions)) {
//       const correctAnswer = results.correctOptions.find(item => item.questionId === questionId);
//       return correctAnswer && correctAnswer.correctOption === option;
//     }
    
//     return false;
//   };

//   const getUserAnswer = (questionId) => {
//     const answer = answers.find(a => a.questionId === questionId);
//     return answer ? answer.response : null;
//   };

//   const viewResults = () => {
//     navigate("/my-quiz-results");
//   };
//   const viewLearningMaterials = () => {
//     navigate(`/learning-materials/${id}`);
//   };
  

//   if (loading) return <div className="container mt-5">Loading quiz...</div>;

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">📝 {quizSubmitted ? "Quiz Results" : "Answer the Questions"}</h3>
      
//       {quizSubmitted && (
//         <div className="alert alert-success mb-4">
//           <h5>You got {results.correctAnswers} correct out of {questions.length} questions!</h5>
//         </div>
//       )}

//       {questions.map((q, index) => (
//         <div key={q.id} className="mb-4 p-3" style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
//           <h5>{index + 1}. {q.questionTitle}</h5>
//           {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
//             const isCorrect = isCorrectAnswer(q.id, opt);
//             const isUserSelection = getUserAnswer(q.id) === opt;
//             const isWrong = quizSubmitted && isUserSelection && !isCorrect;
            
//             return (
//               <div className="form-check d-flex align-items-center" key={i}>
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name={`question-${q.id}`}
//                   value={opt}
//                   checked={getUserAnswer(q.id) === opt}
//                   onChange={() => handleOptionChange(q.id, opt)}
//                   disabled={quizSubmitted}
//                 />
//                 <label 
//                   className="form-check-label ms-2" 
//                   style={{ 
//                     color: isWrong ? 'red' : isCorrect ? 'green' : 'inherit'
//                   }}
//                 >
//                   {opt}
//                 </label>
//                 {quizSubmitted && (
//                   <>
//                     {isCorrect && (
//                       <span className="ms-2 text-success">✓</span>
//                     )}
//                     {isWrong && (
//                       <span className="ms-2 text-danger">✗</span>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       {!quizSubmitted ? (
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Submit Quiz
//         </button>
//       ) : (
//         <div className="d-flex gap-2">
//           <button className="btn btn-secondary" onClick={viewResults}>
//             View All Quiz Results
//           </button>
//           <button className="btn btn-info" onClick={viewLearningMaterials}>
//           Learning Materials
//         </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiveQuizQuestions;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const GiveQuizQuestions = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // ✅ Decode email from JWT token globally
//   const token = localStorage.getItem("token");
//   let email = "";
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       email = payload.sub;
//     } catch (err) {
//       console.error("Invalid token", err);
//     }
//   }

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startTime, setStartTime] = useState(null);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [results, setResults] = useState({
//     correctAnswers: 0,
//     correctOptions: []
//   });

//   useEffect(() => {
//     setStartTime(Date.now());

//     axios.get(`http://localhost:9099/quiz/get/${id}`)
//       .then((res) => {
//         setQuestions(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching quiz questions", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOptionChange = (questionId, answer) => {
//     if (quizSubmitted) return;
    
//     setAnswers((prev) => {
//       const updated = [...prev];
//       const index = updated.findIndex((a) => a.questionId === questionId);
//       if (index !== -1) updated[index] = { questionId, response: answer };
//       else updated.push({ questionId, response: answer });
//       return updated;
//     });
//   };

//   const handleSubmit = () => {
//     const endTime = Date.now();
//     const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);

//     const payload = {
//       responses: answers,
//       email,
//       timeTakenInSeconds,
//     };

//     axios.post(`http://localhost:9099/quiz/submit/${id}`, payload)
//       .then((res) => {
//         setResults({
//           correctAnswers: res.data.correctCount || res.data,
//           correctOptions: res.data.correctAnswers || []
//         });
//         setQuizSubmitted(true);
//       })
//       .catch((err) => {
//         console.error("Error submitting quiz", err);
//       });
//   };

//   const isCorrectAnswer = (questionId, option) => {
//     if (!quizSubmitted) return false;
    
//     if (Array.isArray(results.correctOptions)) {
//       const correctAnswer = results.correctOptions.find(item => item.questionId === questionId);
//       return correctAnswer && correctAnswer.correctOption === option;
//     }
    
//     return false;
//   };

//   const getUserAnswer = (questionId) => {
//     const answer = answers.find(a => a.questionId === questionId);
//     return answer ? answer.response : null;
//   };

//   const viewResults = () => {
//     navigate("/my-quiz-results");
//   };

//   const viewLearningMaterials = () => {
//     navigate(`/learning-materials/${id}`, {
//       state: {
//         responses: answers,
//         userEmail: email
//       }
//     });
//   };

//   if (loading) return <div className="container mt-5">Loading quiz...</div>;

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">📝 {quizSubmitted ? "Quiz Results" : "Answer the Questions"}</h3>
      
//       {quizSubmitted && (
//         <div className="alert alert-success mb-4">
//           <h5>You got {results.correctAnswers} correct out of {questions.length} questions!</h5>
//         </div>
//       )}

//       {questions.map((q, index) => (
//         <div key={q.id} className="mb-4 p-3" style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
//           <h5>{index + 1}. {q.questionTitle}</h5>
//           {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
//             const isCorrect = isCorrectAnswer(q.id, opt);
//             const isUserSelection = getUserAnswer(q.id) === opt;
//             const isWrong = quizSubmitted && isUserSelection && !isCorrect;
            
//             return (
//               <div className="form-check d-flex align-items-center" key={i}>
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name={`question-${q.id}`}
//                   value={opt}
//                   checked={getUserAnswer(q.id) === opt}
//                   onChange={() => handleOptionChange(q.id, opt)}
//                   disabled={quizSubmitted}
//                 />
//                 <label 
//                   className="form-check-label ms-2" 
//                   style={{ 
//                     color: isWrong ? 'red' : isCorrect ? 'green' : 'inherit'
//                   }}
//                 >
//                   {opt}
//                 </label>
//                 {quizSubmitted && (
//                   <>
//                     {isCorrect && (
//                       <span className="ms-2 text-success">✓</span>
//                     )}
//                     {isWrong && (
//                       <span className="ms-2 text-danger">✗</span>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       {!quizSubmitted ? (
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Submit Quiz
//         </button>
//       ) : (
//         <div className="d-flex gap-2">
//           <button className="btn btn-secondary" onClick={viewResults}>
//             View All Quiz Results
//           </button>
//           <button className="btn btn-info" onClick={viewLearningMaterials}>
//             Learning Materials
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiveQuizQuestions;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const GiveQuizQuestions = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // ✅ Decode email from JWT token globally
//   const token = localStorage.getItem("token");
//   let email = "";
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       email = payload.sub;
//     } catch (err) {
//       console.error("Invalid token", err);
//     }
//   }

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [startTime, setStartTime] = useState(null);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [results, setResults] = useState({
//     correctAnswers: 0, // Ensure this is a number
//     correctOptions: []
//   });

//   useEffect(() => {
//     setStartTime(Date.now());

//     axios
//       .get(`http://localhost:9099/quiz/get/${id}`)
//       .then((res) => {
//         setQuestions(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching quiz questions", err);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOptionChange = (questionId, answer) => {
//     if (quizSubmitted) return;

//     setAnswers((prev) => {
//       const updated = [...prev];
//       const index = updated.findIndex((a) => a.questionId === questionId);
//       if (index !== -1) updated[index] = { questionId, response: answer };
//       else updated.push({ questionId, response: answer });
//       return updated;
//     });
//   };

//   const handleSubmit = () => {
//     const endTime = Date.now();
//     const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);

//     const payload = {
//       responses: answers,
//       email,
//       timeTakenInSeconds,
//     };

//     axios
//       .post(`http://localhost:9099/quiz/submit/${id}`, payload)
//       .then((res) => {
//         // Ensure correctCount is a number and correctAnswers is an array or object that can be rendered
//         setResults({
//           correctAnswers: res.data.correctCount || 0, // Make sure this is a number
//           correctOptions: res.data.correctAnswers || [], // This should be an array
//         });
//         setQuizSubmitted(true);
//       })
//       .catch((err) => {
//         console.error("Error submitting quiz", err);
//       });
//   };

//   const isCorrectAnswer = (questionId, option) => {
//     if (!quizSubmitted) return false;

//     if (Array.isArray(results.correctOptions)) {
//       const correctAnswer = results.correctOptions.find(
//         (item) => item.questionId === questionId
//       );
//       return correctAnswer && correctAnswer.correctOption === option;
//     }

//     return false;
//   };

//   const getUserAnswer = (questionId) => {
//     const answer = answers.find((a) => a.questionId === questionId);
//     return answer ? answer.response : null;
//   };

//   const viewResults = () => {
//     navigate("/my-quiz-results");
//   };

//   const viewLearningMaterials = () => {
//     navigate(`/learning-materials/${id}`, {
//       state: {
//         responses: answers,
//         userEmail: email,
//       },
//     });
//   };

//   if (loading) return <div className="container mt-5">Loading quiz...</div>;

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">📝 {quizSubmitted ? "Quiz Results" : "Answer the Questions"}</h3>

//       {quizSubmitted && (
//         <div className="alert alert-success mb-4">
//           {/* Adjusted to ensure correctAnswers is a valid number */}
//           <h5>
//             You got {results.correctAnswers} correct out of {questions.length} questions!
//           </h5>
//         </div>
//       )}

//       {questions.map((q, index) => (
//         <div
//           key={q.id}
//           className="mb-4 p-3"
//           style={{ border: "1px solid #ddd", borderRadius: "5px" }}
//         >
//           <h5>
//             {index + 1}. {q.questionTitle}
//           </h5>
//           {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
//             const isCorrect = isCorrectAnswer(q.id, opt);
//             const isUserSelection = getUserAnswer(q.id) === opt;
//             const isWrong = quizSubmitted && isUserSelection && !isCorrect;

//             return (
//               <div className="form-check d-flex align-items-center" key={i}>
//                 <input
//                   className="form-check-input"
//                   type="radio"
//                   name={`question-${q.id}`}
//                   value={opt}
//                   checked={getUserAnswer(q.id) === opt}
//                   onChange={() => handleOptionChange(q.id, opt)}
//                   disabled={quizSubmitted}
//                 />
//                 <label
//                   className="form-check-label ms-2"
//                   style={{
//                     color: isWrong ? "red" : isCorrect ? "green" : "inherit",
//                   }}
//                 >
//                   {opt}
//                 </label>
//                 {quizSubmitted && (
//                   <>
//                     {isCorrect && <span className="ms-2 text-success">✓</span>}
//                     {isWrong && <span className="ms-2 text-danger">✗</span>}
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ))}

//       {!quizSubmitted ? (
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Submit Quiz
//         </button>
//       ) : (
//         <div className="d-flex gap-2">
//           <button className="btn btn-secondary" onClick={viewResults}>
//             View All Quiz Results
//           </button>
//           <button className="btn btn-info" onClick={viewLearningMaterials}>
//             Learning Materials
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GiveQuizQuestions;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const GiveQuizQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let email = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      email = payload.sub;
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState({
    correctAnswers: 0,
    correctOptions: [],
  });

  useEffect(() => {
    setStartTime(Date.now());
    axios
      .get(`http://localhost:9099/quiz/get/${id}`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quiz questions", err);
        setLoading(false);
      });
  }, [id]);

  const handleOptionChange = (questionId, answer) => {
    if (quizSubmitted) return;

    setAnswers((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((a) => a.questionId === questionId);
      if (index !== -1) updated[index] = { questionId, response: answer };
      else updated.push({ questionId, response: answer });
      return updated;
    });
  };

  const handleSubmit = () => {
    const endTime = Date.now();
    const timeTakenInSeconds = Math.floor((endTime - startTime) / 1000);

    const payload = {
      responses: answers,
      email,
      timeTakenInSeconds,
    };

    axios
      .post(`http://localhost:9099/quiz/submit/${id}`, payload)
      .then((res) => {
        setResults({
          correctAnswers: res.data.correctCount || 0,
          correctOptions: res.data.correctAnswers || [],
        });
        setQuizSubmitted(true);
      })
      .catch((err) => {
        console.error("Error submitting quiz", err);
      });
  };

  const isCorrectAnswer = (questionId, option) => {
    if (!quizSubmitted) return false;
    const correctAnswer = results.correctOptions.find(
      (item) => item.questionId === questionId
    );
    return correctAnswer && correctAnswer.correctOption === option;
  };

  const getUserAnswer = (questionId) => {
    const answer = answers.find((a) => a.questionId === questionId);
    return answer ? answer.response : null;
  };

  const viewResults = () => {
    navigate("/my-quiz-results");
  };

  const viewLearningMaterials = () => {
    navigate(`/learning-materials/${id}`, {
      state: {
        responses: answers,
        userEmail: email,
      },
    });
  };

  if (loading) return <div className="container mt-5">Loading quiz...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        📝 {quizSubmitted ? "Quiz Results" : "Answer the Questions"}
      </h3>

      {quizSubmitted && (
        <div className="alert alert-success mb-4">
          <h5>
            You got {results.correctAnswers} correct out of {questions.length} questions!
          </h5>
        </div>
      )}

      {questions.map((q, index) => (
        <div key={q.id} className="card mb-4">
          <div className="card-body">
            <h5>
              {index + 1}. {q.questionTitle}
            </h5>
            {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => {
              const isCorrect = isCorrectAnswer(q.id, opt);
              const isUserSelection = getUserAnswer(q.id) === opt;
              const isWrong = quizSubmitted && isUserSelection && !isCorrect;

              return (
                <div className="form-check d-flex align-items-center" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt}
                    checked={isUserSelection}
                    onChange={() => handleOptionChange(q.id, opt)}
                    disabled={quizSubmitted}
                  />
                  <label
                    className="form-check-label ms-2"
                    style={{
                      color: isWrong ? "red" : isCorrect ? "green" : "inherit",
                    }}
                  >
                    {opt}
                  </label>
                  {quizSubmitted && (
                    <>
                      {isCorrect && <span className="ms-2 text-success">✓</span>}
                      {isWrong && <span className="ms-2 text-danger">✗</span>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!quizSubmitted ? (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Quiz
        </button>
      ) : (
        <div className="action-buttons mt-3">
          <button className="btn btn-outline-primary" onClick={viewResults}>
            View All Quiz Results
          </button>
          <button className="btn btn-warning" onClick={viewLearningMaterials}>
            Learning Materials
          </button>
        </div>
      )}
    </div>
  );
};

export default GiveQuizQuestions;
