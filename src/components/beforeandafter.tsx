import React, { useState, useCallback } from "react";
import { useEffect } from "react";

interface SliderProps {
  id: string;
  beforeImage: string;
  afterImage: string;
  height?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  height = "h-96",
}: SliderProps) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload images with correct GitHub Pages paths
    const beforeImg = new Image();
    const afterImg = new Image();

    beforeImg.src = beforeImage;
    afterImg.src = afterImage;

    Promise.all([
      new Promise((resolve) => (beforeImg.onload = resolve)),
      new Promise((resolve) => (afterImg.onload = resolve)),
    ]).then(() => setImagesLoaded(true));
  }, [beforeImage, afterImage]);

  const handleStart = useCallback(
    (clientX: number, element: HTMLDivElement) => {
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
      setIsDragging(true);
    },
    []
  );

  const handleMove = useCallback(
    (clientX: number, element: HTMLDivElement) => {
      if (!isDragging) return;
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
    },
    [isDragging]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, e.currentTarget);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleStart(e.clientX, e.currentTarget);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.currentTarget);
  };

  if (!imagesLoaded) {
    return (
      <div
        className={`${height} flex items-center justify-center bg-gray-100 rounded-lg`}
      >
        <div className="animate-pulse text-gray-500">Loading images...</div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${height} overflow-hidden cursor-col-resize touch-none rounded-lg shadow-lg`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200"
        style={{
          backgroundImage: `url(${beforeImage})`,
          transform: isDragging ? "scale(1.02)" : "scale(1)",
        }}
      />

      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
          transform: isDragging ? "scale(1.02)" : "scale(1)",
        }}
      />

      <div
        className="absolute inset-y-0 w-1 bg-white cursor-col-resize"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-1 h-4 bg-gray-400 mx-0.5"></div>
          <div className="w-1 h-4 bg-gray-400 mx-0.5"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        After
      </div>
    </div>
  );
};

const BeforeAfterComparison = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          See The Difference
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Swipe or drag to see the before and after results of our professional
          window cleaning service
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BeforeAfterSlider
            id="exterior"
            beforeImage="/window-cleaning/assets/before.jpg"
            afterImage="/window-cleaning/assets/after.jpg"
          />
          <BeforeAfterSlider
            id="interior"
            beforeImage="/window-cleaning/assets/before1.jpg"
            afterImage="/window-cleaning/assets/after1.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterComparison;
