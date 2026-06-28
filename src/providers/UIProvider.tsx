"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface UIContextType {
  modal: { open: boolean; content: ReactNode | null };
  drawer: { open: boolean; content: ReactNode | null };
  snackbar: SnackbarState;
  showModal: (content: ReactNode) => void;
  closeModal: () => void;
  openDrawer: (content: ReactNode) => void;
  closeDrawer: () => void;
  showSnackbar: (
    message: string,
    severity?: SnackbarState["severity"]
  ) => void;
  closeSnackbar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<{
    open: boolean;
    content: ReactNode | null;
  }>({ open: false, content: null });

  const [drawer, setDrawer] = useState<{
    open: boolean;
    content: ReactNode | null;
  }>({ open: false, content: null });

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showModal = useCallback((content: ReactNode) => {
    setModal({ open: true, content });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ open: false, content: null });
  }, []);

  const openDrawer = useCallback((content: ReactNode) => {
    setDrawer({ open: true, content });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer({ open: false, content: null });
  }, []);

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState["severity"] = "info") => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <UIContext.Provider
      value={{
        modal,
        drawer,
        snackbar,
        showModal,
        closeModal,
        openDrawer,
        closeDrawer,
        showSnackbar,
        closeSnackbar,
      }}
    >
      {children}
      <ModalComponent modal={modal} onClose={closeModal} />
      <DrawerComponent drawer={drawer} onClose={closeDrawer} />
      <SnackbarComponent snackbar={snackbar} onClose={closeSnackbar} />
    </UIContext.Provider>
  );
}

function ModalComponent({
  modal,
  onClose,
}: {
  modal: { open: boolean; content: ReactNode | null };
  onClose: () => void;
}) {
  if (!modal.open || !modal.content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-surface p-6 shadow-2xl animate-scaleIn border border-border">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {modal.content}
      </div>
    </div>
  );
}

function DrawerComponent({
  drawer,
  onClose,
}: {
  drawer: { open: boolean; content: ReactNode | null };
  onClose: () => void;
}) {
  if (!drawer.open || !drawer.content) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface shadow-2xl animate-slideInLeft border-l border-border overflow-auto">
        <div className="flex items-center justify-between border-b border-border p-4">
          <span className="font-semibold">منو</span>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">{drawer.content}</div>
      </div>
    </div>
  );
}

function SnackbarComponent({
  snackbar,
  onClose,
}: {
  snackbar: SnackbarState;
  onClose: () => void;
}) {
  if (!snackbar.open) return null;

  const colors: Record<string, string> = {
    success: "bg-success",
    error: "bg-danger",
    warning: "bg-warning",
    info: "bg-info",
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 animate-fadeIn">
      <div
        className={`${colors[snackbar.severity]} text-white rounded-xl px-6 py-3 shadow-lg flex items-center gap-3`}
      >
        <span className="text-sm font-medium">{snackbar.message}</span>
        <button onClick={onClose} className="rounded-full p-0.5 hover:bg-white/20 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
