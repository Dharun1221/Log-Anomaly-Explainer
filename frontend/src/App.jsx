import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState("");
  const [logLines, setLogLines] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a log file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setSeverity(data.severity);
    setLogLines(data.log_lines);
    setResult(data.analysis);

    setLoading(false);
  };

  return (
 <div
  style={{
    minHeight: "100vh",
    width: "100%",
    background:
  "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e3a8a 100%)",
    color: "white",
    padding: "20px 40px",
    fontFamily: "Segoe UI",
    boxSizing: "border-box",
  }}
>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "30px",
          textShadow: "0 0 20px rgba(59,130,246,0.5)",
          fontWeight: "800",
        }}
      >
        🛡️ AI Powered Log Anomaly Detection 🛡️
      </h1>

      <p
  style={{
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "1.1rem",
    marginBottom: "25px",
  }}
>
  Detect anomalies, analyze root causes and generate AI-powered remediation steps.
</p>

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  }}
>
  <label
    style={{
      width: "500px",
      maxWidth: "90%",
      padding: "40px",
      border: "2px dashed #3b82f6",
      borderRadius: "15px",
      textAlign: "center",
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
      cursor: "pointer",
      transition: "0.3s",
    }}
  >
    <input
      type="file"
      accept=".log"
      hidden
      onChange={(e) => setFile(e.target.files[0])}
    />

    <h2>📂 Drag & Drop Log File</h2>

    <p>
      {file
        ? `✅ ${file.name}`
        : "Click here to select your .log file"}
    </p>
  </label>

  <button
    onClick={handleUpload}
    disabled={loading}
    style={{
      padding: "12px 30px",
      background: "linear-gradient(90deg,#2563eb,#3b82f6)",
      boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    {loading ? "⏳ Analyzing..." : "Analyze Log"}
  </button>
  <p
  style={{
    color: "#94a3b8",
    marginTop: "12px",
    fontSize: "14px",
    textAlign: "center",
  }}
>
  Supports Apache, Nginx, Application and System Logs
</p>
</div>


      {loading && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          🤖 Gemini AI is analyzing logs...
        </h2>
      )}

   {!result && (
  <div
    style={{
      marginTop: "15px",
      width: "100%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        background: "rgba(30, 41, 59, 0.55)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
        padding: "10px",
        borderRadius: "15px",
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <h2>What this AI Tool Does?</h2>

      <p>✔ Upload any .log file</p>
      <p>✔ Detect critical errors automatically</p>
      <p>✔ Analyze root causes using Gemini AI</p>
      <p>✔ Generate impact assessment</p>
      <p>✔ Suggest remediation steps</p>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "10px",
        margin: "0 auto",
        padding:"10px",
        width: "100%"
      }}
    >
      <div
        style={{
          background: "rgba(30, 41, 59, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h2>🔍</h2>
        <h3>Error Detection</h3>
        <p>Automatically identifies anomalies from logs.</p>
      </div>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
          padding: "12px",
          borderRadius: "12px",
          textAlign: "center",
          
        }}
      >
        <h2>🤖</h2>
        <h3>AI Analysis</h3>
        <p>Uses Gemini AI to determine root causes.</p>
      </div>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
          padding: "12px",
          borderRadius: "12px",
          textAlign: "center",
          
        }}
      >
        <h2>🛠️</h2>
        <h3>Suggested Fixes</h3>
        <p>Provides actionable remediation steps.</p>
      </div>
    </div>

    <div
      style={{
      textAlign: "center",
      color: "#94a3b8",
      paddingBottom: "10px",
      transition: "0.3s",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      }}
    >
      <h3>🚀 Built by NEXUS | AI-Powered Log Analysis Platform</h3>
    </div>
  </div>
)}

      {result && (
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gap: "20px",
          }}
        >
          {/* Dashboard Cards */}
         <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  }}
>
  <div
    style={{
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>🚨 Severity</h3>
    <h2
      style={{
        color:
          severity === "CRITICAL"
            ? "#ef4444"
            : severity === "WARNING"
            ? "#facc15"
            : "#22c55e",
      }}
    >
      {severity}
    </h2>
  </div>

  <div
    style={{
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>📄 Log Lines</h3>
    <h2>{logLines}</h2>
  </div>

  <div
    style={{
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>✅ Status</h3>
    <h2>Success</h2>
  </div>

  <div
    style={{
      background: "rgba(30, 41, 59, 0.55)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
      padding: "20px",
      borderRadius: "12px",
      textAlign: "center",
    }}
  >
    <h3>🤖 AI Engine</h3>
    <h2>Gemini</h2>
  </div>
       </div>
       
        {/* AI Analysis Card */}
        <button
  onClick={() => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "AI_Log_Report.txt";
    document.body.appendChild(element);
    element.click();
  }}
  style={{
    padding: "10px 20px",
    background: "rgba(30, 41, 59, 0.55)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
    fontWeight: "bold",
  }}
>
  📥 Download PDF Report
</button>
          <div
            style={{
              background: "rgba(30, 41, 59, 0.55)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 32px rgba(31,38,135,0.25)",
              padding: "20px",
              borderRadius: "12px",
              transition: "0.3s",
            }}
          >
            <h2
           style={{
              borderBottom: "2px solid #334155",
              paddingBottom: "10px",
             }}
            >
              📋 AI Root Cause Analysis Report
            </h2>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "10px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  background:
                    severity === "CRITICAL" ? "#dc2626" : "#16a34a",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Severity: {severity}
              </div>

              <div
                style={{
                  background: "#2563eb",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                }}
              >
                Log Lines: {logLines}
              </div>
            </div>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                color: "#e2e8f0",
              }}
            >
              {result}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

