
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove token from storage
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-4 shadow-sm text-center">
//             <h1 className="card-title">Welcome to Your Dashboard!</h1>
//             <p className="text-muted mt-3">
//               You have successfully logged in.
//             </p>
//             <button className="btn btn-danger mt-3" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const QuizMaster = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [filter, setFilter] = useState("All Categories");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = () => {
//     axios.get("http://localhost:9099/api/question/all").then((res) => {
//       const grouped = res.data.reduce((acc, q) => {
//         if (!acc[q.category]) acc[q.category] = [];
//         acc[q.category].push(q);
//         return acc;
//       }, {});

//       const quizList = Object.keys(grouped).map((category, index) => ({
//         title: `${category} Quiz`,
//         category,
//         questions: grouped[category].length,
//         attempts: Math.floor(Math.random() * 500),
//       }));

//       setQuizzes(quizList);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const categories = ["All Categories", ...new Set(quizzes.map(q => q.category))];
//   const filteredQuizzes = filter === "All Categories"
//     ? quizzes
//     : quizzes.filter(q => q.category === filter);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Welcome to Your Dashboard!</h2>
//         <div>
//           <button className="btn btn-success me-2" onClick={() => navigate("/create-quiz")}>+ Create Quiz</button>
//           <button className="btn btn-primary me-2" onClick={() => navigate("/give-quiz")}>🎯 Give Quiz</button>
//           <button className="btn btn-warning me-2" onClick={() => navigate("/home")}>⚔️ Quiz Battle</button>

//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <p className="text-muted">Test your knowledge with our collection of quizzes across various categories.</p>

//       <div className="mb-4">
//         <select
//           className="form-select w-auto"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       <div className="row">
//         {filteredQuizzes.map((quiz, idx) => (
//           <div key={idx} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body">
//                 <span className={`badge bg-${getBadgeColor(quiz.category)} mb-2`}>{quiz.category}</span>
//                 <h5 className="card-title">{quiz.title}</h5>
//                 <p className="card-text">{quiz.questions} questions</p>
//                 <p className="text-muted small">
//                   <i className="bi bi-people"></i> {quiz.attempts} attempts
//                 </p>
//                 <button className="btn btn-outline-primary" onClick={() => navigate(`/give-quiz/${quiz.category}`)}>Start Quiz</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const getBadgeColor = (category) => {
//   switch (category.toLowerCase()) {
//     case "science": return "info";
//     case "history": return "warning";
//     case "geography": return "success";
//     case "technology": return "danger";
//     case "sports": return "primary";
//     case "general knowledge": return "secondary";
//     default: return "dark";
//   }
// };

// export default QuizMaster;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const QuizMaster = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [filter, setFilter] = useState("All Categories");
//   const navigate = useNavigate();

//   // Retrieve the user's email from localStorage
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = () => {
//     axios.get("http://localhost:9099/api/question/all").then((res) => {
//       const grouped = res.data.reduce((acc, q) => {
//         if (!acc[q.category]) acc[q.category] = [];
//         acc[q.category].push(q);
//         return acc;
//       }, {});

//       const quizList = Object.keys(grouped).map((category, index) => ({
//         title: `${category} Quiz`,
//         category,
//         questions: grouped[category].length,
//         attempts: Math.floor(Math.random() * 500),
//       }));

//       setQuizzes(quizList);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail"); // Clear the email as well
//     navigate("/login");
//   };

//   const categories = ["All Categories", ...new Set(quizzes.map(q => q.category))];
//   const filteredQuizzes = filter === "All Categories"
//     ? quizzes
//     : quizzes.filter(q => q.category === filter);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         {/* Personalized greeting */}
//         <h2>Welcome, <strong>{userEmail}</strong>!</h2>

//         <div>
//           <button className="btn btn-success me-2" onClick={() => navigate("/create-quiz")}>+ Create Quiz</button>
//           <button className="btn btn-primary me-2" onClick={() => navigate("/give-quiz")}>🎯 Give Quiz</button>
//           <button className="btn btn-warning me-2" onClick={() => navigate("/home")}>⚔️ Quiz Battle</button>

//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <p className="text-muted">Test your knowledge with our collection of quizzes across various categories.</p>

//       <div className="mb-4">
//         <select
//           className="form-select w-auto"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       <div className="row">
//         {filteredQuizzes.map((quiz, idx) => (
//           <div key={idx} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body">
//                 <span className={`badge bg-${getBadgeColor(quiz.category)} mb-2`}>{quiz.category}</span>
//                 <h5 className="card-title">{quiz.title}</h5>
//                 <p className="card-text">{quiz.questions} questions</p>
//                 <p className="text-muted small">
//                   <i className="bi bi-people"></i> {quiz.attempts} attempts
//                 </p>
//                 <button className="btn btn-outline-primary" onClick={() => navigate(`/give-quiz/${quiz.category}`)}>Start Quiz</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const getBadgeColor = (category) => {
//   switch (category.toLowerCase()) {
//     case "science": return "info";
//     case "history": return "warning";
//     case "geography": return "success";
//     case "technology": return "danger";
//     case "sports": return "primary";
//     case "general knowledge": return "secondary";
//     default: return "dark";
//   }
// };

// export default QuizMaster;







// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import './Dashboard.css'; 

// const QuizMaster = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [filter, setFilter] = useState("All Categories");
//   const navigate = useNavigate();

//   // Retrieve the user's email from localStorage
//   const userEmail = localStorage.getItem("userEmail");

//   // Function to get a fun tagline based on the user's email
//   const getFunTagline = (email) => {
//     if (!email || email === "Guest") return "Ready to test your knowledge today?";
//     const name = email.split("@")[0];
//     const taglines = [
//       `Welcome back, ${name}! Let's conquer some quizzes!`,
//       `🧠 Time to flex those brain muscles, ${name}!`,
//       `🎉 ${name}, your quiz kingdom awaits!`,
//       `👀 Let's see what you've got, ${name}!`,
//       `🔥 Get ready to smash those quizzes, ${name}!`,
//       `🚀 Blast off into quiz mode, ${name}!`,
//       `🧩 Unleash your inner quiz champion, ${name}!`,
//       `🏆 Show off your quiz mastery, ${name}!`,
//       `⚡ Charge up your brain power, ${name}, it's quiz time!`,
//       `🎯 You're on fire, ${name}! Let's nail this quiz!`,
//       `🎉 It's quiz time, ${name}! Are you ready to shine?`,
//       `💡 Brainpower alert! Let's dive into some quizzes, ${name}!`,
//       `🌟 You've got this, ${name}! Time to rock the quiz world!`,
//       `💪 Let's dominate this quiz, ${name}! You've got what it takes!`
//     ];
//     return taglines[Math.floor(Math.random() * taglines.length)];
//   };
  

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   const fetchQuizzes = () => {
//     axios.get("http://localhost:9099/api/question/all").then((res) => {
//       const grouped = res.data.reduce((acc, q) => {
//         if (!acc[q.category]) acc[q.category] = [];
//         acc[q.category].push(q);
//         return acc;
//       }, {});

//       const quizList = Object.keys(grouped).map((category, index) => ({
//         title: `${category} Quiz`,
//         category,
//         questions: grouped[category].length,
//         attempts: Math.floor(Math.random() * 500),
//       }));

//       setQuizzes(quizList);
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail"); // Clear the email as well
//     navigate("/login");
//   };

//   const categories = ["All Categories", ...new Set(quizzes.map(q => q.category))];
//   const filteredQuizzes = filter === "All Categories"
//     ? quizzes
//     : quizzes.filter(q => q.category === filter);

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         {/* Personalized greeting with tagline */}
//         <div>
//           <h2>Welcome, <strong>{userEmail}</strong>!</h2>
//           <p className="text-muted">{getFunTagline(userEmail)}</p>
//         </div>

//         <div>
//           <button className="btn btn-success me-2" onClick={() => navigate("/create-quiz")}>+ Create Quiz</button>
//           <button className="btn btn-primary me-2" onClick={() => navigate("/give-quiz")}>🎯 Give Quiz</button>
//           <button className="btn btn-warning me-2" onClick={() => navigate("/home")}>⚔️ Quiz Battle</button>
//           <button className="btn btn-warning me-2" onClick={() => navigate("/scramble-game")}>Scrambled Game</button>

//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>

//       <p className="text-muted">Test your knowledge with our collection of quizzes across various categories.</p>

//       <div className="mb-4">
//         <select
//           className="form-select w-auto"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           {categories.map((cat, i) => (
//             <option key={i} value={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       <div className="row">
//         {filteredQuizzes.map((quiz, idx) => (
//           <div key={idx} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body">
//                 <span className={`badge bg-${getBadgeColor(quiz.category)} mb-2`}>{quiz.category}</span>
//                 <h5 className="card-title">{quiz.title}</h5>
//                 <p className="card-text">{quiz.questions} questions</p>
//                 <p className="text-muted small">
//                   <i className="bi bi-people"></i> {quiz.attempts} attempts
//                 </p>
//                 <button className="btn btn-outline-primary" onClick={() => navigate(`/give-quiz/${quiz.category}`)}>Start Quiz</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const getBadgeColor = (category) => {
//   switch (category.toLowerCase()) {
//     case "science": return "info";
//     case "history": return "warning";
//     case "geography": return "success";
//     case "technology": return "danger";
//     case "sports": return "primary";
//     case "general knowledge": return "secondary";
//     default: return "dark";
//   }
// };

// export default QuizMaster;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css';
import Footer from "../Footer/Footer";

const QuizMaster = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filter, setFilter] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve the user's email from localStorage
  const userEmail = localStorage.getItem("userEmail") || "Quiz Explorer";

  // Function to get a fun tagline based on the user's email
  const getFunTagline = (email) => {
    if (!email || email === "Guest") return "Ready to test your knowledge today?";
    const name = email.split("@")[0];
    const taglines = [
      `Welcome back, ${name}! Let's conquer some quizzes!`,
      `🧠 Time to flex those brain muscles, ${name}!`,
      `🎉 ${name}, your quiz kingdom awaits!`,
      `👀 Let's see what you've got, ${name}!`,
      `🔥 Get ready to smash those quizzes, ${name}!`,
      `🚀 Blast off into quiz mode, ${name}!`,
      `🧩 Unleash your inner quiz champion, ${name}!`,
      `🏆 Show off your quiz mastery, ${name}!`,
      `⚡ Charge up your brain power, ${name}, it's quiz time!`,
      `🎯 You're on fire, ${name}! Let's nail this quiz!`,
      `🎉 It's quiz time, ${name}! Are you ready to shine?`,
      `💡 Brainpower alert! Let's dive into some quizzes, ${name}!`,
      `🌟 You've got this, ${name}! Time to rock the quiz world!`,
      `💪 Let's dominate this quiz, ${name}! You've got what it takes!`
    ];
    return taglines[Math.floor(Math.random() * taglines.length)];
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = () => {
    setLoading(true);
    axios.get("http://localhost:9099/api/question/all").then((res) => {
      const grouped = res.data.reduce((acc, q) => {
        if (!acc[q.category]) acc[q.category] = [];
        acc[q.category].push(q);
        return acc;
      }, {});

      const quizList = Object.keys(grouped).map((category, index) => ({
        title: `${category} Quiz`,
        category,
        questions: grouped[category].length,
        attempts: Math.floor(Math.random() * 500),
        icon: getCategoryIcon(category),
      }));

      setQuizzes(quizList);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching quizzes:", err);
      setLoading(false);
    });
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "science": return "🔬";
      case "history": return "🏛️";
      case "geography": return "🌍";
      case "technology": return "💻";
      case "sports": return "🏅";
      case "general knowledge": return "📚";
      default: return "❓";
    }
  };

  const handleLogout = () => {
    // Add a logout animation
    document.querySelector('.container').style.animation = 'fadeOut 0.5s ease-in-out forwards';
    
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      navigate("/login");
    }, 500);
  };

  const categories = ["All Categories", ...new Set(quizzes.map(q => q.category))];
  const filteredQuizzes = filter === "All Categories"
    ? quizzes
    : quizzes.filter(q => q.category === filter);

  const getCategoryClass = (category) => {
    switch (category.toLowerCase()) {
      case "science": return "badge-science";
      case "history": return "badge-history";
      case "geography": return "badge-geography";
      case "technology": return "badge-technology";
      case "sports": return "badge-sports";
      case "general knowledge": return "badge-general";
      default: return "bg-dark";
    }
  };

  return (
    <>
    <div className="container mt-4">
      {/* Personalized welcome section */}
      <div className="welcome-section">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="fw-bold">Welcome, <span className="text-primary">{userEmail}</span>!</h2>
            <p className="tagline">{getFunTagline(userEmail)}</p>
            <p className="text-muted mt-3">Test your knowledge with our collection of interactive quizzes across various categories.</p>
          </div>
          <div className="col-md-4 text-md-end">
            <div className="action-buttons">
              <button className="btn btn-success" onClick={() => navigate("/create-quiz")}>
                <i className="bi bi-plus-circle me-1"></i> Create Quiz
              </button>
              <button className="btn btn-primary" onClick={() => navigate("/give-quiz")}>
                <i className="bi bi-lightning me-1"></i> Give Quiz
              </button>
              <button className="btn btn-warning" onClick={() => navigate("/home")}>
                <i className="bi bi-trophy me-1"></i> Quiz Battle
              </button>
              <button className="btn btn-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter section */}
      <div className="filter-section">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Browse Quizzes</h4>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex align-items-center justify-content-md-end">
              <label className="me-2 fw-bold">Filter by:</label>
              <select
                className="form-select w-auto"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz cards */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading awesome quizzes...</p>
        </div>
      ) : (
        <div className="row">
          {filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz, idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="text-center quiz-icon">{quiz.icon}</div>
                    <span className={`badge ${getCategoryClass(quiz.category)} mb-2`}>{quiz.category}</span>
                    <h5 className="card-title fw-bold">{quiz.title}</h5>
                    
                    <div className="quiz-stats">
                      <span className="stat-badge">
                        <i className="bi bi-question-circle"></i> {quiz.questions} questions
                      </span>
                      <span className="stat-badge">
                        <i className="bi bi-people"></i> {quiz.attempts} attempts
                      </span>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <button 
                        className="btn btn-outline-primary" 
                        onClick={() => navigate(`/give-quiz/${quiz.category}`)}
                      >
                        <i className="bi bi-play-circle me-1"></i> Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center my-5">
              <h3>No quizzes found for this category</h3>
              <button className="btn btn-primary mt-3" onClick={() => setFilter("All Categories")}>
                Show All Quizzes
              </button>
            </div>
          )}
        </div>
      )}

      {/* Additional game button */}
      <div className="text-center mt-4 mb-5">
        <button 
          className="btn btn-warning btn-lg" 
          onClick={() => navigate("/scramble-game")}
        >
          <i className="bi bi-puzzle me-2"></i> Play Word Scramble Game
        </button>
      </div>
      <div className="text-center mt-4 mb-5">
        <button 
          className="btn btn-warning btn-lg" 
          onClick={() => navigate("/code-editor")}
        >
          <i className="bi bi-puzzle me-2"></i> start coding
        </button>
      </div>
   



    </div>
    
    <Footer />
     </>
  );
};

export default QuizMaster;

