'use client';

import { useRef, useEffect } from 'react';
import styles from './VideoModal.module.css';

interface VideoModalProps {
    onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        return () => {
            // Pause video when modal unmounts
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button 
                    className={styles.closeBtn} 
                    onClick={handleClose} 
                    aria-label="Close video"
                >
                    ✕
                </button>
                <div className={styles.videoWrapper}>
                    <video
                        ref={videoRef}
                        className={styles.video}
                        controls
                        autoPlay
                        controlsList="nodownload"
                    >
                        <source src="/videos/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
}
