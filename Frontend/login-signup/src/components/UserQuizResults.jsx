import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserQuizResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("📦 JWT Token from localStorage:", token); // Debug log

    if (!token) {
      console.warn("⚠️ No token found! User might not be logged in.");
      setLoading(false);
      return;
    }

    axios.get('http://localhost:9099/quiz/results', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      console.log("✅ Full response data structure:", res.data);

      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else if (res.data.data && Array.isArray(res.data.data)) {
        setResults(res.data.data);
      } else {
        console.warn("⚠️ Unexpected response format:", res.data);
        setResults([]);
      }
    })
    .catch((err) => {
      console.error("❌ Failed to fetch results", err);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📊 My Quiz Attempts</h2>
      {loading ? (
        <p>Loading results...</p>
      ) : results.length === 0 ? (
        <p>You haven't attempted any quizzes yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Score</th>
              <th>Time Taken (seconds)</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, idx) => (
              <tr key={idx}>
                <td>{r.quizId}</td>
                <td>{r.score}</td>
                <td>{r.timeTakenInSeconds}</td>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => window.location.href = `/give-quiz/${r.quizId}`}
                  >
                    Reattempt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserQuizResults;
