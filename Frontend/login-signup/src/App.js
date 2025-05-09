// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import VerifyEmail from './components/VerifyEmail';
// import Dashboard from './components/Dashboard';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';
// import VerifyResetToken from './components/VerifyResetToken';
// import CreateQuiz from "./components/CreateQuiz";
// import GiveQuiz from "./components/GiveQuiz";
// import GiveQuizQuestions from "./components/GiveQuizQuestions";
// import UserQuizResults from './components/UserQuizResults';
// import LearningMaterialComponents from './components/LearningMaterialComponents';
// import StartGame from './components/StartGame';
// import JoinGame from './components/JoinGame';
// import GamePage from './components/GamePage';

// import HomePage from './components/HomePage';
// import GameLobby from './components/GameLobby';
// import GameSession from './components/GameSession';
// import GameResults from './components/GameResults';
// import NavBar from './components/NavBar';
// import { GameProvider } from './context/GameContext';

// const ProtectedRoute = ({ element }) => {
//   const token = localStorage.getItem('token');
//   console.log("Token in ProtectedRoute:", token); // debug
//   return token ? element : <Navigate to="/login" replace />;
// };


// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
//           <h1 className="text-center text-3xl font-extrabold text-gray-900">
            
//           </h1>
//         </div>
        
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/" element={<Navigate replace to="/login" />} />
//           {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//           <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/verify-reset-token" element={<VerifyResetToken />} />
//           <Route path="/create-quiz" element={<ProtectedRoute element={<CreateQuiz />} />} />
//           <Route path="/give-quiz" element={<ProtectedRoute element={<GiveQuiz />} />} />
//           <Route path="/give-quiz/:id" element={<ProtectedRoute element={<GiveQuizQuestions />}/>} />
//           <Route path="/my-quiz-results" element={<ProtectedRoute element={<UserQuizResults />} />} />
//           <Route path="/learning-materials/:id" element={<ProtectedRoute element={<LearningMaterialComponents />} />} />

//           <Route path="/start-game" element={<StartGame />} />

//           <Route path="/join/:gameSessionId" element={<JoinGame />} />
//           <Route path="/game/:gameSessionId" element={<GamePage />} />


//           <Route path="/home" element={<HomePage />} />
//             <Route path="/lobby/:gameSessionId" element={<GameLobby />} />
//             <Route path="/game/:gameSessionId" element={<GameSession />} />
//             <Route path="/results/:gameSessionId" element={<GameResults />} />




//         {/* Optional: Specific category quiz */}
//         {/* <Route path="/give-quiz/:category" element={<QuizRunner />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// ... your other imports
import Login from './components/Login';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyResetToken from './components/VerifyResetToken';
import CreateQuiz from "./components/CreateQuiz";
import GiveQuiz from "./components/GiveQuiz";
import GiveQuizQuestions from "./components/GiveQuizQuestions";
import UserQuizResults from './components/UserQuizResults';
import LearningMaterialComponents from './components/LearningMaterialComponents';
import StartGame from './components/StartGame';
import JoinGame from './components/JoinGame';
import GamePage from './components/GamePage';
import HomePage from './components/HomePage';
import GameLobby from './components/GameLobby';
import GameSession from './components/GameSession';
import GameResults from './components/GameResults';
import Scramble from './features/scrambledGame/Scramble';
import CodingPage from './features/codeEditor/CodingPage';


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          {/* Optional title */}
        </h1>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-reset-token" element={<VerifyResetToken />} />
        <Route path="/create-quiz" element={<ProtectedRoute element={<CreateQuiz />} />} />
        <Route path="/give-quiz" element={<ProtectedRoute element={<GiveQuiz />} />} />
        <Route path="/give-quiz/:id" element={<ProtectedRoute element={<GiveQuizQuestions />} />} />
        <Route path="/my-quiz-results" element={<ProtectedRoute element={<UserQuizResults />} />} />
        <Route path="/learning-materials/:id" element={<ProtectedRoute element={<LearningMaterialComponents />} />} />

        <Route path="/start-game" element={<StartGame />} />
        <Route path="/join/:gameSessionId" element={<JoinGame />} />
        <Route path="/game/:gameSessionId" element={<GamePage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/lobby/:gameSessionId" element={<GameLobby />} />
        <Route path="/results/:gameSessionId" element={<GameResults />} />


        <Route path="/scramble-game" element={<Scramble />} />
        <Route path="/code-editor" element={<CodingPage />} />
      </Routes>
    </div>
  );
};

export default App;


