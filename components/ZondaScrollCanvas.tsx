'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';

interface ZondaScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function ZondaScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath }: ZondaScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        // Prompt says files are named ezgif-frame-001.jpg to ezgif-frame-181.jpg
        // We will handle 1-based indexing for filenames, but 0-based for array.
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Pad to 3 digits
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `${imageFolderPath}ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [totalFrames, imageFolderPath]);

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = images[index];

        if (!canvas || !ctx || !img) return;

        // Ensure smoothing is on for every frame draw (just in case context resets)
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const rect = canvas.getBoundingClientRect();

        // Image fitting (object-fit: contain)
        const canvasRatio = rect.width / rect.height;
        const imageRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imageRatio) {
            // Canvas is wider than image (fit to height)
            drawHeight = rect.height;
            drawWidth = img.width * (rect.height / img.height);
            offsetX = (rect.width - drawWidth) / 2;
            offsetY = 0;
        } else {
            // Canvas is taller than image (fit to width)
            drawWidth = rect.width;
            drawHeight = img.height * (rect.width / img.width);
            offsetX = 0;
            offsetY = (rect.height - drawHeight) / 2;
        }

        // Clear only the visible area (using logic coordinates)
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Handle canvas sizing and responsiveness
    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Only update if dimensions overlap to avoid flickering
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(dpr, dpr);
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
            }
        }

        // Redraw current frame after resize
        if (images.length > 0) {
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(
                totalFrames - 1,
                Math.floor(currentProgress * totalFrames)
            );
            drawFrame(frameIndex);
        }
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Initial draw and resize listener
    useEffect(() => {
        if (isLoaded) {
            updateCanvasSize();
            window.addEventListener('resize', updateCanvasSize);
            return () => window.removeEventListener('resize', updateCanvasSize);
        }
    }, [isLoaded, scrollYProgress, totalFrames]); // Re-bind if loaded changes

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-pagani-black z-0 pointer-events-none">
            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-pagani-gold font-orbitron z-50">
                    LOADING ZONDA R SEQUENCE...
                </div>
            )}
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
