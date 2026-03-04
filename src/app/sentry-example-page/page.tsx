import * as Sentry from "@sentry/nextjs";

export default function SentryTestPage() {
  const handleThrowError = async () => {
    throw new Error("Sentry test error — delete me");
  };

  const handleCaptureError = async () => {
    Sentry.captureException(
      new Error("Sentry captured error — delete me")
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Sentry Integration Test</h1>
      <p>Use these buttons to verify Sentry is capturing errors:</p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={handleThrowError}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Throw Error (Client)
        </button>

        <button
          onClick={handleCaptureError}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4ecdc4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Capture Error (Client)
        </button>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
        <p>
          After clicking a button, check your{" "}
          <a href="https://sentry.io/issues/" target="_blank" rel="noreferrer">
            Sentry Issues dashboard
          </a>
          .
        </p>
        <p>The error should appear within ~30 seconds.</p>
        <p>
          <strong>Delete this page after testing!</strong>
        </p>
      </div>
    </div>
  );
}
