import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email or Username is required';
    } else if (email.includes('@') && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        window.location.hash = '#home';
      }, 1500);
    }, 1500);
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-bg">
        <div className="auth-orb-1"></div>
        <div className="auth-orb-2"></div>
      </div>

      <div className="auth-container">
        {/* Left Column: Branding / Info */}
        <div className="auth-info-pane">
          <div className="auth-info-content">
            <span className="info-tag">⚽ Join the Action</span>
            <h1 className="info-title">
              Experience the Game <br />
              <span className="text-gradient-red">Like Never Before</span>
            </h1>
            <p className="info-text">
              Log in to play daily prediction challenges, scale the city leaderboard, and unlock real-world stadium rewards.
            </p>

            <div className="info-bullets">
              <div className="bullet-item">
                <span className="bullet-icon">⚡</span>
                <div>
                  <h4>Real-time Match Predictor</h4>
                  <p>Call the scores and make predictions live as the match unfolds.</p>
                </div>
              </div>
              <div className="bullet-item">
                <span className="bullet-icon">🏆</span>
                <div>
                  <h4>Earn Fan Points (FP)</h4>
                  <p>Redeem your FP for premium merchandise and exclusive tickets.</p>
                </div>
              </div>
            </div>

            <div className="info-footer">
              <p>Trusted by over <strong>10,000,000+</strong> sports fans worldwide.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="auth-form-pane">
          <div className="auth-card">
            {loginSuccess ? (
              <div className="success-screen text-center animate-scale-in">
                <div className="success-icon">🎉</div>
                <h3 className="success-title">Welcome Back!</h3>
                <p className="success-desc">Authentication successful. Preparing your dashboard...</p>
                <div className="success-loader">
                  <div className="loader-progress"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="auth-card-header">
                  <a href="#home" className="back-home-link">← Back to home</a>
                  <h2 className="auth-title">Sign In</h2>
                  <p className="auth-subtitle">Enter your credentials to access your fan dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                  {/* Email Input */}
                  <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="login-email">Email or Username</label>
                    <div className="input-wrapper">
                      <span className="input-icon">✉️</span>
                      <input
                        type="text"
                        id="login-email"
                        placeholder="name@example.com or @username"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                        }}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
                  </div>

                  {/* Password Input */}
                  <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                    <div className="label-row">
                      <label htmlFor="login-password">Password</label>
                      <a href="#forgot" className="forgot-password-link">Forgot password?</a>
                    </div>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="login-password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                        }}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex="-1"
                      >
                        {showPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                    {errors.password && <span className="error-message" id="password-error">{errors.password}</span>}
                  </div>

                  {/* Remember Me */}
                  <div className="form-options">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                        id="login-remember"
                      />
                      <span className="checkmark"></span>
                      Remember me
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block auth-submit-btn"
                    disabled={isLoading}
                    id="login-submit-btn"
                  >
                    {isLoading ? (
                      <span className="btn-spinner"></span>
                    ) : (
                      'Sign In to Goal Rush 🚀'
                    )}
                  </button>
                </form>

                <div className="auth-divider">
                  <span>or continue with</span>
                </div>

                {/* Social Login Buttons */}
                <div className="social-grid">
                  <button type="button" className="btn-social" aria-label="Sign in with Google">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 018 12.57c0-3.3 2.643-5.97 5.99-5.97 1.484 0 2.825.54 3.862 1.428l3.053-3.055C19.035 3.24 16.71 2 13.99 2 8.12 2 3.32 6.8 3.32 12.57c0 5.77 4.8 10.57 10.67 10.57 5.614 0 9.93-3.954 9.93-9.857 0-.707-.085-1.221-.24-1.7H12.24z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="btn-social" aria-label="Sign in with Apple">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="auth-footer-text">
                  Don't have an account? <a href="#register">Create one for free</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
