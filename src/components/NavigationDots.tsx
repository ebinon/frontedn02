import React from 'react';

interface NavigationDotsProps {
  count: number;
  active: number;
  onDotClick: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ count, active, onDotClick }) => {
  return (
    <div className="flex justify-center space-x-2 space-x-reverse">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            active === index ? 'bg-dot-active scale-125' : 'bg-dot-inactive'
          }`}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;