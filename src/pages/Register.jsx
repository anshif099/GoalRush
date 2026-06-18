import { useState, useEffect } from 'react';
import './Register.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: 'Too Weak',
    color: 'var(--bright-red)',
    criteria: {
      length: false,
      number: false,
      uppercase: false,
      special: false,
    }
  });

  // Check password strength when password changes
  useEffect(() => {
    const criteria = {
      length: password.length >= 8,
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    let metCount = 0;
    if (criteria.length) metCount++;
    if (criteria.number) metCount++;
    if (criteria.uppercase) metCount++;
    if (criteria.special) metCount++;

    let label = 'Too Weak';
    let color = 'var(--bright-red)';
    let score = metCount * 25; // 0, 25, 50, 75, 100

    if (metCount === 2) {
      label = 'Weak';
      color = '#FF8C00'; // Dark orange
    } else if (metCount === 3) {
      label = 'Medium';
      color = 'var(--gold)';
    } else if (metCount === 4) {
      label = 'Strong';
      color = 'var(--emerald-green)';
    }

    setPasswordStrength({
      score,
      label,
      color,
      criteria
    });
  }, [password]);

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
      newErrors.username = 'Username must be 3-15 alphanumeric characters or underscores';
    }
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!favoriteSport) {
      newErrors.favoriteSport = 'Please select a favorite sport';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms & conditions';
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
      setRegisterSuccess(true);
      // Redirect to home after 1.5 seconds
      setTimeout(() => {
        window.location.hash = '#home';
      }, 1500);
    }, 1500);
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-bg">
        <div className="auth-orb-1"></div>
        <div className="auth-orb-2"></div>
      </div>

      <div className="auth-container">
        {/* Left Column: Branding / Info */}
        <div className="auth-info-pane">
          <div className="auth-info-content">
            <span className="info-tag">🏆 JOIN GOAL RUSH</span>
            <h1 className="info-title">
              Start Your Fan <br />
              <span className="text-gradient-gold">Journey Today</span>
            </h1>
            <p className="info-text">
              Create a free account to enter matchday predictive challenges, trade limited-edition rewards, and show your fan pride.
            </p>

            <div className="info-bullets">
              <div className="bullet-item">
                <span className="bullet-icon">🏟️</span>
                <div>
                  <h4>Represent Your City</h4>
                  <p>Help your city rise to the top of the regional supporter leaderboard.</p>
                </div>
              </div>
              <div className="bullet-item">
                <span className="bullet-icon">🎟️</span>
                <div>
                  <h4>Unlock Fan Perks</h4>
                  <p>Get exclusive early access to sponsor discounts, match tickets, and club news.</p>
                </div>
              </div>
            </div>

            <div className="info-footer">
              <p>Registration takes less than 2 minutes. No credit card required.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="auth-form-pane">
          <div className="auth-card">
            {registerSuccess ? (
              <div className="success-screen text-center animate-scale-in">
                <div className="success-icon">🏟️</div>
                <h3 className="success-title">Account Created!</h3>
                <p className="success-desc">Welcome to Goal Rush. Launching your fan profile...</p>
                <div className="success-loader">
                  <div className="loader-progress"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="auth-card-header">
                  <a href="#home" className="back-home-link">← Back to home</a>
                  <h2 className="auth-title">Create Account</h2>
                  <p className="auth-subtitle">Join millions of fans. Play, predict, and win.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                  {/* Full Name & Username in 2 Columns */}
                  <div className="form-row">
                    <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
                      <label htmlFor="reg-name">Full Name</label>
                      <div className="input-wrapper">
                        <span className="input-icon">👤</span>
                        <input
                          type="text"
                          id="reg-name"
                          placeholder="Alex Morgan"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: null }));
                          }}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>

                    <div className={`form-group ${errors.username ? 'has-error' : ''}`}>
                      <label htmlFor="reg-username">Username</label>
                      <div className="input-wrapper">
                        <span className="input-icon">@</span>
                        <input
                          type="text"
                          id="reg-username"
                          placeholder="alex_m"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (errors.username) setErrors(prev => ({ ...prev, username: null }));
                          }}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>
                  </div>

                  {/* Email & Favorite Sport */}
                  <div className="form-row">
                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                      <label htmlFor="reg-email">Email Address</label>
                      <div className="input-wrapper">
                        <span className="input-icon">✉️</span>
                        <input
                          type="email"
                          id="reg-email"
                          placeholder="alex@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                          }}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className={`form-group ${errors.favoriteSport ? 'has-error' : ''}`}>
                      <label htmlFor="reg-sport">Favorite Sport</label>
                      <div className="input-wrapper">
                        <span className="input-icon">⚽</span>
                        <select
                          id="reg-sport"
                          value={favoriteSport}
                          onChange={(e) => {
                            setFavoriteSport(e.target.value);
                            if (errors.favoriteSport) setErrors(prev => ({ ...prev, favoriteSport: null }));
                          }}
                          disabled={isLoading}
                          required
                        >
                          <option value="" disabled>Choose Sport</option>
                          <option value="Football">Football</option>
                          <option value="Cricket">Cricket</option>
                          <option value="Basketball">Basketball</option>
                          <option value="Tennis">Tennis</option>
                          <option value="Formula1">Formula 1</option>
                        </select>
                      </div>
                      {errors.favoriteSport && <span className="error-message">{errors.favoriteSport}</span>}
                    </div>
                  </div>

                  {/* Password & Strength Meter */}
                  <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                    <label htmlFor="reg-password">Password</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="reg-password"
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
                    {errors.password && <span className="error-message">{errors.password}</span>}

                    {/* Strength Indicator */}
                    {password && (
                      <div className="strength-meter-wrap">
                        <div className="strength-bar-container">
                          <div
                            className="strength-bar"
                            style={{
                              width: `${passwordStrength.score}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          ></div>
                        </div>
                        <div className="strength-text" style={{ color: passwordStrength.color }}>
                          Strength: <strong>{passwordStrength.label}</strong>
                        </div>
                        <ul className="strength-criteria">
                          <li className={passwordStrength.criteria.length ? 'met' : ''}>✓ At least 8 characters</li>
                          <li className={passwordStrength.criteria.number ? 'met' : ''}>✓ Contains a number</li>
                          <li className={passwordStrength.criteria.uppercase ? 'met' : ''}>✓ Contains an uppercase letter</li>
                          <li className={passwordStrength.criteria.special ? 'met' : ''}>✓ Contains a special character</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className={`form-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                    <label htmlFor="reg-confirm-password">Confirm Password</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="reg-confirm-password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: null }));
                        }}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        tabIndex="-1"
                      >
                        {showConfirmPassword ? '👁️' : '🙈'}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>

                  {/* Terms Checkbox */}
                  <div className={`form-group ${errors.acceptTerms ? 'has-error' : ''}`}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => {
                          setAcceptTerms(e.target.checked);
                          if (errors.acceptTerms) setErrors(prev => ({ ...prev, acceptTerms: null }));
                        }}
                        disabled={isLoading}
                        id="reg-terms"
                      />
                      <span className="checkmark"></span>
                      I agree to the <a href="#terms" className="inline-link">Terms of Service</a> & <a href="#privacy" className="inline-link">Privacy Policy</a>
                    </label>
                    {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block auth-submit-btn"
                    disabled={isLoading}
                    id="register-submit-btn"
                  >
                    {isLoading ? (
                      <span className="btn-spinner"></span>
                    ) : (
                      'Create Fan Account 🚀'
                    )}
                  </button>
                </form>

                <div className="auth-divider">
                  <span>or sign up with</span>
                </div>

                {/* Social Login Buttons */}
                <div className="social-grid">
                  <button type="button" className="btn-social" aria-label="Sign up with Google">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.94 5.94 0 018 12.57c0-3.3 2.643-5.97 5.99-5.97 1.484 0 2.825.54 3.862 1.428l3.053-3.055C19.035 3.24 16.71 2 13.99 2 8.12 2 3.32 6.8 3.32 12.57c0 5.77 4.8 10.57 10.67 10.57 5.614 0 9.93-3.954 9.93-9.857 0-.707-.085-1.221-.24-1.7H12.24z"/>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="btn-social" aria-label="Sign up with Apple">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="auth-footer-text">
                  Already have an account? <a href="#login">Sign In</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
