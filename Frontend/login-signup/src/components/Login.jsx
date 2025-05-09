// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../api';
// import FormField from './FormField';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLocked, setIsLocked] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;
//     if (isLocked && remainingTime > 0) {
//       timer = setInterval(() => {
//         setRemainingTime((prev) => {
//           if (prev <= 1000) {
//             clearInterval(timer);
//             setIsLocked(false);
//             return 0;
//           }
//           return prev - 1000;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [isLocked, remainingTime]);

//   const formatTime = () => {
//     if (remainingTime >= 60000) {
//       return `${Math.floor(remainingTime / 60000)} min`;
//     } else {
//       return `${Math.ceil(remainingTime / 1000)} sec`;
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: '' });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});

//     try {
//       const response = await loginUser(formData.email, formData.password);

//       if (response.locked) {
//         setIsLocked(true);
//         setRemainingTime(response.remainingTime);
//         setErrors({ submit: "Your account is locked. Try again later." });
//       } else {
//         localStorage.setItem('userEmail', formData.email); 
//         localStorage.setItem('token', response.token);
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       setErrors({ submit: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };


  
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 shadow-sm">
//             <h2 className="card-title text-center mb-4">Login to Your Account</h2>

//             {errors.submit && !isLocked && (
//               <div className="alert alert-danger">{errors.submit}</div>
//             )}

//             {isLocked && remainingTime > 0 && (
//               <div className="alert alert-warning text-center">
//                 Your account is locked. Try again in <strong>{formatTime()}</strong>.
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <FormField
//                 label="Email"
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//                 required
//               />

//               <FormField
//                 label="Password"
//                 type="password"
//                 id="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//                 required
//               />

//               <div className="d-flex justify-content-end mb-3">
//                 <Link to="/forgot-password" className="text-primary">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary w-100"
//                 disabled={isLoading || isLocked}
//               >
//                 {isLoading ? 'Logging in...' : 'Login'}
//               </button>
//             </form>

//             <p className="mt-3 text-center">
//               Don't have an account? <Link to="/register" className="text-primary">Register</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import FormField from './FormField';
import './Dashboard.css'; // Using the same Dashboard.css for consistent styling

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Add page entrance animation
    document.querySelector('.login-container').classList.add('fade-in-up');
    
    let timer;
    if (isLocked && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            setIsLocked(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, remainingTime]);

  const formatTime = () => {
    if (remainingTime >= 60000) {
      return `${Math.floor(remainingTime / 60000)} min`;
    } else {
      return `${Math.ceil(remainingTime / 1000)} sec`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginUser(formData.email, formData.password);

      if (response.locked) {
        setIsLocked(true);
        setRemainingTime(response.remainingTime);
        setErrors({ submit: "Your account is locked. Try again later." });
      } else {
        // Success animation before navigating
        document.querySelector('.login-card').classList.add('success-animation');
        
        localStorage.setItem('userEmail', formData.email); 
        localStorage.setItem('token', response.token);
        
        // Navigate after animation completes
        setTimeout(() => {
          navigate('/dashboard');
        }, 800);
      }
    } catch (error) {
      // Error shake animation
      const card = document.querySelector('.login-card');
      card.classList.add('error-shake');
      setTimeout(() => card.classList.remove('error-shake'), 500);
      
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5 login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="login-card card shadow">
            {/* Logo/Brand Section */}
            <div className="text-center mb-4 logo-section">
              <div className="app-logo">
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <h1 className="brand-name">QuizMaster</h1>
              <p className="app-tagline">Test your knowledge, challenge your mind</p>
            </div>

            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login to Your Account</h2>

              {errors.submit && !isLocked && (
                <div className="alert alert-danger alert-animated">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errors.submit}
                </div>
              )}

              {isLocked && remainingTime > 0 && (
                <div className="alert alert-warning text-center alert-animated">
                  <i className="bi bi-lock-fill me-2"></i>
                  Your account is locked. Try again in <strong>{formatTime()}</strong>.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope-fill"></i>
                    </span>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-key-fill"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button 
                      type="button" 
                      className="btn input-group-text"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                </div>

                <div className="d-flex justify-content-end mb-3">
                  <Link to="/forgot-password" className="text-primary text-decoration-none">
                    <i className="bi bi-question-circle me-1"></i>
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isLoading || isLocked}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Login
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/register" className="btn btn-outline-primary mt-2">
                  <i className="bi bi-person-plus me-2"></i>
                  Register Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;