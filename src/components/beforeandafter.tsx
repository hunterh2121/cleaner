import React, { useState, useCallback } from "react";

interface SliderProps {
  id: string;
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage }: SliderProps) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div
      className="relative h-96 overflow-hidden cursor-col-resize touch-none"
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
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${beforeImage})` }}
      />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${afterImage})`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
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
    </div>
  );
};

const BeforeAfterComparison = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <BeforeAfterSlider
          id="1"
          beforeImage="/before.jpg"
          afterImage="/after.jpg"
        />
        <BeforeAfterSlider
          id="2"
          beforeImage="/before1.jpg"
          afterImage="/after1.jpg"
        />
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
