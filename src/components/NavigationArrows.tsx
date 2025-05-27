import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  onNext: () => void;
  onPrev: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  onNext,
  onPrev,
  isFirstSlide,
  isLastSlide,
}) => {
  return (
    <div className="flex space-x-4 space-x-reverse">
      <button
        onClick={onPrev}
        disabled={isFirstSlide}
        className={`p-2 rounded-full ${
          isFirstSlide ? 'text-textSecondary/50 cursor-not-allowed' : 'text-textPrimary hover:bg-white/10'
        }`}
        aria-label="Previous slide"
      >
        <ChevronRight size={24} />
      </button>
      <button
        onClick={onNext}
        disabled={isLastSlide}
        className={`p-2 rounded-full ${
          isLastSlide ? 'text-textSecondary/50 cursor-not-allowed' : 'text-textPrimary hover:bg-white/10'
        }`}
        aria-label="Next slide"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
};

export default NavigationArrows;