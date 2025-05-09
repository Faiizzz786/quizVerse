const API_BASE_URL = 'http://localhost:9099/api/auth';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {  // ✅ Fixed backticks
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify?token=${token}`, {  // ✅ Fixed backticks
      method: 'GET',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Verification failed');
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
      const response = await fetch('http://localhost:9099/api/auth/login', { // ✅ Ensure correct URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      });

      const textResponse = await response.text();  // ✅ Read raw response
      console.log("Raw Response:", textResponse);  // ✅ Log it before JSON parsing

      const data = JSON.parse(textResponse); // ✅ Parse manually

      if (response.status === 423) {
          return { locked: true, remainingTime: data.remainingTime };
      }

      if (!response.ok) throw new Error(data.error || "Login failed");

      return data;
  } catch (error) {
      console.error("Login API error:", error);
      throw error;
  }
};


// Forgot Password - Request reset link
export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to send reset email');
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};

// Reset Password - Use token to reset password
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),  // ✅ Send token inside body
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Password reset failed');
    }

    return await response.text();
  } catch (error) {
    throw error;
  }
};
