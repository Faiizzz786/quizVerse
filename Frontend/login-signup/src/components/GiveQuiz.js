// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const GiveQuiz = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("http://localhost:9099/api/question/all").then((res) => {
//       const grouped = res.data.reduce((acc, q) => {
//         if (!acc[q.category]) acc[q.category] = [];
//         acc[q.category].push(q);
//         return acc;
//       }, {});

//       const quizList = Object.keys(grouped).map((category) => ({
//         title: `${category} Quiz`,  // Fixed string interpolation
//         category,
//         count: grouped[category].length,
//       }));
      

//       setQuizzes(quizList);
//     });
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4">🎯 Select a Quiz to Start</h3>
//       <div className="row">
//         {quizzes.map((quiz, idx) => (
//           <div key={idx} className="col-md-4 mb-3">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">{quiz.title}</h5>
//                 <p className="card-text">Questions: {quiz.count}</p>
//                 <button
//                   className="btn btn-outline-primary"
//                   onClick={() => navigate(`/give-quiz/${quiz.category}`)}

//                 >
//                   Start Quiz
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GiveQuiz;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GiveQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9099/quiz/all")
      .then((res) => {
        setQuizzes(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch quizzes", err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">🎯 Available Quizzes</h3>
      <div className="row">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {quiz.title || "Untitled Quiz"}
                  </h5>
                  <h5 className="card-id">
                    {quiz.id|| "Untitled id"}
                  </h5>
                  <p className="card-text">
                    Category: {quiz.category || "Unknown"}
                  </p>
                  <p className="card-text">
                    Questions:{" "}
                    {typeof quiz.questionCount === "number"
                      ? quiz.questionCount
                      : 0}
                  </p>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/give-quiz/${quiz.id}`)}
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">No quizzes available 😢</div>
        )}
      </div>
    </div>
  );
};

export default GiveQuiz;
