import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface VideoModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(
  undefined
);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return (
    <VideoModalContext.Provider value={value}>
      {children}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (context === undefined) {
    throw new Error("useVideoModal must be used within VideoModalProvider");
  }
  return context;
}
