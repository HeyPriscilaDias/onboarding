import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { miniplayerOpenAtom, miniplayerSlideUrlAtom } from "../../state/prototypeAtoms";

const SlideMiniplayer: React.FC = () => {
  const [isOpen, setIsOpen] = useRecoilState(miniplayerOpenAtom);
  const [slideUrl, setSlideUrl] = useRecoilState(miniplayerSlideUrlAtom);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(slideUrl);
  const [position, setPosition] = useState({ x: 20, y: 60 });
  const [size, setSize] = useState({ width: 480, height: 320 });
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUrlInput(slideUrl);
  }, [slideUrl]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, startPosX: position.x, startPosY: position.y };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      setPosition({
        x: dragRef.current.startPosX + (ev.clientX - dragRef.current.startX),
        y: dragRef.current.startPosY + (ev.clientY - dragRef.current.startY),
      });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [position]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { startX: e.clientX, startY: e.clientY, startW: size.width, startH: size.height };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      setSize({
        width: Math.max(320, resizeRef.current.startW + (ev.clientX - resizeRef.current.startX)),
        height: Math.max(200, resizeRef.current.startH + (ev.clientY - resizeRef.current.startY)),
      });
    };
    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [size]);

  const toEmbedUrl = (url: string): string => {
    // Convert Google Slides share/edit URL to embed URL
    const match = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://docs.google.com/presentation/d/${match[1]}/embed?start=false&loop=false&delayms=60000`;
    }
    return url;
  };

  const handleUrlSubmit = () => {
    setSlideUrl(urlInput.trim());
    setIsEditingUrl(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      style={{
        ...styles.panel,
        left: position.x,
        top: position.y,
        width: isCollapsed ? 200 : size.width,
        height: isCollapsed ? "auto" : size.height,
      }}
    >
      {/* Title bar */}
      <div style={styles.titleBar} onMouseDown={handleDragStart}>
        <span style={styles.titleText}>Curriculum Slides</span>
        <div style={styles.titleButtons}>
          <button onClick={() => setIsCollapsed(!isCollapsed)} style={styles.titleBtn} title={isCollapsed ? "Expand" : "Collapse"}>
            {isCollapsed ? "\u25B3" : "\u25BD"}
          </button>
          <button onClick={() => setIsOpen(false)} style={styles.titleBtn} title="Close">
            \u2715
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div style={styles.body}>
          {!slideUrl || isEditingUrl ? (
            <div style={styles.placeholder}>
              <div style={styles.placeholderLabel}>Google Slides URL</div>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit()}
                placeholder="Paste Google Slides link..."
                style={styles.urlInput}
                autoFocus
              />
              <div style={styles.placeholderActions}>
                <button onClick={handleUrlSubmit} style={styles.submitBtn}>
                  Load Slides
                </button>
                {slideUrl && (
                  <button onClick={() => setIsEditingUrl(false)} style={styles.cancelBtn}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <iframe
                src={toEmbedUrl(slideUrl)}
                style={styles.iframe}
                frameBorder="0"
                allowFullScreen
                title="Curriculum Slides"
              />
              <button onClick={() => setIsEditingUrl(true)} style={styles.editUrlBtn} title="Change slides URL">
                \u270E
              </button>
            </>
          )}

          {/* Resize handle */}
          <div style={styles.resizeHandle} onMouseDown={handleResizeStart} />
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  panel: {
    position: "fixed",
    zIndex: 99998,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
    display: "flex",
    flexDirection: "column",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Mono", Monaco, monospace',
    fontSize: 12,
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 10px",
    background: "#1a1a1a",
    cursor: "grab",
    userSelect: "none",
    borderBottom: "1px solid #333",
  },
  titleText: {
    color: "#ccc",
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: "0.02em",
  },
  titleButtons: {
    display: "flex",
    gap: 4,
  },
  titleBtn: {
    background: "transparent",
    border: "none",
    color: "#888",
    cursor: "pointer",
    fontSize: 13,
    padding: "0 4px",
    lineHeight: 1,
    fontFamily: "inherit",
  },
  body: {
    flex: 1,
    position: "relative",
    background: "#111",
    display: "flex",
    flexDirection: "column",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    flex: 1,
  },
  placeholderLabel: {
    color: "#666",
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  },
  urlInput: {
    width: "100%",
    maxWidth: 360,
    padding: "8px 12px",
    background: "#222",
    border: "1px solid #444",
    borderRadius: 6,
    color: "#eee",
    fontSize: 12,
    fontFamily: "inherit",
    outline: "none",
  },
  placeholderActions: {
    display: "flex",
    gap: 8,
  },
  submitBtn: {
    background: "#6366f1",
    border: "none",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "inherit",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #555",
    color: "#aaa",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 11,
    fontFamily: "inherit",
  },
  iframe: {
    width: "100%",
    flex: 1,
    border: "none",
    background: "#000",
  },
  editUrlBtn: {
    position: "absolute",
    bottom: 8,
    left: 8,
    background: "rgba(0,0,0,0.7)",
    border: "1px solid #555",
    color: "#aaa",
    borderRadius: 4,
    padding: "2px 8px",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "inherit",
    zIndex: 1,
  },
  resizeHandle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    cursor: "nwse-resize",
    background: "linear-gradient(135deg, transparent 50%, #555 50%)",
    borderRadius: "0 0 8px 0",
    zIndex: 2,
  },
};

export default SlideMiniplayer;
