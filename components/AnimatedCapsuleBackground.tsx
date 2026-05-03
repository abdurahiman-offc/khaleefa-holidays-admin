"use client";
import { useEffect, useRef } from "react";

const IMAGES = [
    "https://images.unsplash.com/photo-1725335743799-dfda716c7844?q=80&w=400",
    "https://images.unsplash.com/photo-1568919980958-427ce0cf60e8?q=80&w=400",
    "https://images.unsplash.com/photo-1588430490358-2a5f33b3ad48?q=80&w=400",
    "https://images.unsplash.com/photo-1563330097-03b10aa9db3a?q=80&w=400",
    "https://images.unsplash.com/photo-1762687508828-a976cfb5b532?q=80&w=400",
    "https://images.unsplash.com/photo-1741209874674-5523d5aba7c4?q=80&w=400",
    "https://images.unsplash.com/photo-1714577745268-efa729c2ae4b?q=80&w=400",
    "https://images.unsplash.com/photo-1465414951857-102134ffaa57?q=80&w=400",
    "https://images.unsplash.com/photo-1721974303220-57d1d812ed2a?q=80&w=400",
    "https://images.unsplash.com/photo-1619806840163-38e329be64bb?q=80&w=400",
    "https://images.unsplash.com/photo-1588129582730-bf9c9a7cab5c?q=80&w=400"
];

export default function AnimatedCapsuleBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const box = containerRef.current;
        box.innerHTML = '';

        const allDivs: HTMLDivElement[] = [];

        for (let i = 0; i < 50; i++) {
            const div = document.createElement("div");
            div.className = "scatter-image-box";

            // random animation delay
            div.style.animationDelay = (Math.random() * 5) + "s";

            // uniform grid position to avoid blank spaces
            const cols = 10;
            const col = i % cols;
            const row = Math.floor(i / cols);

            div.style.left = (col * 10) + "%";
            div.style.top = (row * 20) + "%";

            // random image
            const img = document.createElement("img");
            img.src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.pointerEvents = "none";
            div.appendChild(img);

            // same size for all boxes
            const size = 150;
            div.style.width = size + "px";
            div.style.height = size + "px";

            // initial stacking
            div.style.zIndex = i.toString();

            box.appendChild(div);
            allDivs.push(div);
        }

        // bring multiple random divs to front at same time
        let topIndex = 1000;
        const intervalId = setInterval(() => {
            if (allDivs.length === 0) return;
            for (let i = 0; i < 5; i++) { // number of divs coming forward at same time
                const randomIndex = Math.floor(Math.random() * allDivs.length);
                const tgt = allDivs[randomIndex];
                tgt.style.zIndex = (topIndex++).toString();
                tgt.style.transform = "scale(1.4) translateY(-10px)";
                tgt.style.opacity = "1";
                setTimeout(() => {
                    if (tgt) {
                        tgt.style.transform = "scale(1) translateY(0px)";
                        tgt.style.opacity = "0.9";
                    }
                }, 800);
            }
        }, 1200);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                .scatter-image-box {
                    position: absolute;
                    border-radius: 10px;
                    opacity: 0.9;
                    animation: floatForward 6s infinite ease-in-out;
                    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
                }
                @keyframes floatForward {
                    0% { transform: scale(1) translateZ(0); opacity: 0.7; }
                    50% { transform: scale(1.3) translateZ(50px); opacity: 1; }
                    100% { transform: scale(1) translateZ(0); opacity: 0.7; }
                }
            `}} />
            <div ref={containerRef} className="absolute inset-0 w-full h-full bg-[#18189C]" />
        </>
    );
}
