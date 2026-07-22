import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
  errorStack: string;
}

/**
 * Safety net for production.
 * If ANY part of the React tree throws during render (bad data, a failed
 * lazy-loaded chunk, a third-party script race condition, etc.) React
 * unmounts everything and you get a silent blank page — exactly the
 * "black screen with zero console output" symptom.
 *
 * This component catches that, logs it loudly to the console, and renders
 * a visible, readable error panel instead of leaving the user staring at
 * an empty tinted background.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "", errorStack: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || "Unknown error",
      errorStack: error?.stack || "",
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Always keep this console.error — it's the fastest way to diagnose
    // a production incident from a user-supplied screenshot/video.
    console.error("[TrustNode] Uncaught render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "24px",
            background: "#0A0A0B",
            color: "#F5F5F0",
            fontFamily: "monospace",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "14px", letterSpacing: "0.05em", color: "#EF4444", fontWeight: 700 }}>
            TRUSTNODE // RUNTIME ERROR
          </div>
          <div style={{ fontSize: "13px", color: "#9CA3AF", maxWidth: "560px" }}>
            Приложение столкнулось с ошибкой при загрузке и не смогло отрисоваться.
            Пожалуйста, сделайте скриншот текста ниже и отправьте разработчику.
          </div>
          <pre
            style={{
              maxWidth: "720px",
              width: "100%",
              overflow: "auto",
              textAlign: "left",
              fontSize: "11px",
              background: "#111827",
              border: "1px solid #1F2937",
              borderRadius: "8px",
              padding: "16px",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {this.state.errorMessage}
            {"\n\n"}
            {this.state.errorStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "8px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #2E7DFF",
              background: "transparent",
              color: "#2E7DFF",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            Перезагрузить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
