import React, { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { stickyNotesVisibleAtom, addNoteRequestAtom } from "../../state/prototypeAtoms";

interface Note {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
}

type NotesByPage = Record<string, Note[]>;

const COLORS = ["#fef08a", "#bbf7d0", "#bfdbfe", "#fbcfe8", "#fde68a", "#c4b5fd"];

const generateId = () => Math.random().toString(36).slice(2, 9);

const STORAGE_KEY = "prototype_sticky_notes";

const loadAllNotes = (): NotesByPage => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveAllNotes = (allNotes: NotesByPage) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allNotes));
};

const StickyNote: React.FC = () => {
  const visible = useRecoilValue(stickyNotesVisibleAtom);
  const addNoteRequest = useRecoilValue(addNoteRequestAtom);
  const { pathname } = useLocation();
  const [allNotes, setAllNotes] = useState<NotesByPage>(loadAllNotes);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [editing, setEditing] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const notes = allNotes[pathname] || [];

  const setNotes = useCallback(
    (updater: (prev: Note[]) => Note[]) => {
      setAllNotes((prev) => {
        const updated = { ...prev, [pathname]: updater(prev[pathname] || []) };
        if (updated[pathname].length === 0) delete updated[pathname];
        return updated;
      });
    },
    [pathname]
  );

  useEffect(() => {
    saveAllNotes(allNotes);
  }, [allNotes]);

  const addNote = () => {
    const newNote: Note = {
      id: generateId(),
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      text: "",
      color: COLORS[notes.length % COLORS.length],
    };
    setNotes((prev) => [...prev, newNote]);
    setEditing(newNote.id);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (editing === id) setEditing(null);
  };

  const updateText = (id: string, text: string) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, id: string) => {
      if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      setDragging(id);
      setOffset({ x: e.clientX - note.x, y: e.clientY - note.y });
      e.preventDefault();
    },
    [notes]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      setNotes((prev) =>
        prev.map((n) =>
          n.id === dragging ? { ...n, x: e.clientX - offset.x, y: e.clientY - offset.y } : n
        )
      );
    },
    [dragging, offset]
  );

  const handleMouseUp = useCallback(() => {
    setDragging(null);
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  const addNoteRequestRef = useRef(addNoteRequest);
  useEffect(() => {
    if (addNoteRequest > addNoteRequestRef.current) {
      addNote();
    }
    addNoteRequestRef.current = addNoteRequest;
  }, [addNoteRequest]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  if (!visible) return null;

  return (
    <>
      {notes.map((note) => (
          <div
            key={note.id}
            style={{
              ...styles.note,
              left: note.x,
              top: note.y,
              backgroundColor: note.color,
              cursor: dragging === note.id ? "grabbing" : "grab",
              zIndex: dragging === note.id ? 100000 : 99998,
              transform: dragging === note.id ? "scale(1.03) rotate(-1deg)" : "rotate(-0.5deg)",
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
            onDoubleClick={() => setEditing(note.id)}
          >
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
              style={styles.deleteBtn}
            >
              ×
            </button>

            {editing === note.id ? (
              <textarea
                ref={textareaRef}
                value={note.text}
                onChange={(e) => updateText(note.id, e.target.value)}
                onBlur={() => setEditing(null)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setEditing(null);
                }}
                style={{ ...styles.textarea, backgroundColor: note.color }}
                placeholder="Type your note..."
              />
            ) : (
              <div style={styles.text}>{note.text || "Double-click to edit"}</div>
            )}
          </div>
        ))}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  note: {
    position: "fixed",
    width: 200,
    minHeight: 120,
    borderRadius: 4,
    padding: "28px 12px 12px",
    boxShadow: "2px 3px 12px rgba(0,0,0,0.18)",
    fontFamily: '"Comic Sans MS", "Marker Felt", "Patrick Hand", cursive',
    fontSize: 14,
    lineHeight: 1.4,
    userSelect: "none",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },
  deleteBtn: {
    position: "absolute",
    top: 4,
    right: 6,
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#999",
    lineHeight: 1,
    padding: "2px 4px",
    borderRadius: 3,
  },
  textarea: {
    width: "100%",
    minHeight: 80,
    border: "none",
    outline: "none",
    resize: "vertical",
    fontFamily: '"Comic Sans MS", "Marker Felt", "Patrick Hand", cursive',
    fontSize: 14,
    lineHeight: 1.4,
    padding: 0,
  },
  text: {
    color: "#444",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    minHeight: 40,
  },
};

export default StickyNote;
