import React from "react";

/* ============================================================================
   ErrorBoundary — защита от «чёрного экрана»: любой сбой рендера (например,
   редкий краш framer-motion при смене страницы) не роняет всё дерево React,
   а показывает тёмный экран восстановления с кнопкой перезагрузки и текстом
   ошибки (полезно для диагностики на телефоне).
   ========================================================================== */

interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
  stack: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null, stack: "" };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
    this.setState({ stack: info.componentStack || "" });
    try {
      (window as unknown as Record<string, unknown>).__tnErrorStack =
        info.componentStack || "";
    } catch {
      /* ignore */
    }
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 24,
            background: "#070709",
            color: "#F5F5F0",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
            Что-то пошло не так · Something went wrong
          </h1>
          <p style={{ fontSize: 14, color: "#9CA3AF", margin: 0, maxWidth: 480 }}>
            Произошла ошибка интерфейса. Перезагрузите страницу, чтобы продолжить.
            · An interface error occurred. Reload the page to continue.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: "12px 28px",
              borderRadius: 12,
              border: "none",
              background: "#3B82F6",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Перезагрузить · Reload
          </button>
          {this.state.error && (
            <p
              style={{
                fontSize: 11,
                color: "#EF4444",
                opacity: 0.8,
                fontFamily: "monospace",
                maxWidth: 560,
                wordBreak: "break-word",
                margin: 0,
              }}
            >
              {String(this.state.error.message || this.state.error)}
            </p>
          )}
          {this.state.stack && (
            <pre
              style={{
                fontSize: 9,
                color: "#F87171",
                fontFamily: "monospace",
                maxWidth: 560,
                maxHeight: 180,
                overflowY: "auto",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                margin: 0,
                padding: 8,
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 8,
                background: "rgba(239,68,68,0.05)",
              }}
            >
              {this.state.stack.split("\n").slice(0, 35).join("\n")}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}