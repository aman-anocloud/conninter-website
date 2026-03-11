'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import VideoModal from '@/components/VideoModal/VideoModal';

interface VideoModalContextType {
    open: () => void;
    close: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export function VideoModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <VideoModalContext.Provider value={{ open, close }}>
            {children}
            {isOpen && <VideoModal onClose={close} />}
        </VideoModalContext.Provider>
    );
}

export function useVideoModal() {
    const ctx = useContext(VideoModalContext);
    if (!ctx) {
        throw new Error('useVideoModal must be used within a VideoModalProvider');
    }
    return ctx;
}
