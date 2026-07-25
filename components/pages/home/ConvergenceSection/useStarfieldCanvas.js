import { useEffect } from 'react';

export function useStarfieldCanvas(canvasRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars = [];
        const numStars = 800;
        const speed = 3;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
            });
        }

        let animationFrameId;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                star.z -= speed;
                if (star.z <= 0) {
                    star.z = width;
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                }

                const x = (star.x / star.z) * width + width / 2;
                const y = (star.y / star.z) * height + height / 2;
                const size = Math.max(0, (1 - star.z / width) * 3);

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, 1 - star.z / width)})`;
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [canvasRef]);
}
