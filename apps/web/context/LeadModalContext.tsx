'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import LeadModal from '@/components/LeadModal/LeadModal';

interface LeadModalContextType {
    open: () => void;
    close: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <LeadModalContext.Provider value={{ open, close }}>
            {children}
            {/* render modal at top-level */}
            {isOpen && <LeadModal />}
        </LeadModalContext.Provider>
    );
}

export function useLeadModal() {
    const ctx = useContext(LeadModalContext);
    if (!ctx) {
        throw new Error('useLeadModal must be used within a LeadModalProvider');
    }
    return ctx;
}
