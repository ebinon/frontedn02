import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OnboardingSlideProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor: string;
  buttonText: string;
  onButtonClick: () => void;
  isPwaReady?: boolean;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  Icon,
  iconColor,
  buttonText,
  onButtonClick,
  isPwaReady,
}) => {
  return (
    <div className="flex flex-col items-center justify-between h-full px-6 py-4 text-center">
      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center w-full mb-8">
        <div className="relative p-8 rounded-full bg-secondary/20 flex items-center justify-center">
          <Icon size={120} color={iconColor} strokeWidth={1.5} />
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-8 w-full">
        <h1 className="text-textPrimary text-2xl font-bold mb-4">{title}</h1>
        <p className="text-textSecondary text-lg">{description}</p>
      </div>
      
      {/* Button */}
      <div className="w-full mb-6">
        {isPwaReady && (
          <div className="bg-secondary/20 rounded-lg p-3 mb-4 text-textPrimary text-sm">
            برای دسترسی بهتر، این برنامه را روی دستگاه خود نصب کنید.
          </div>
        )}
        <button
          onClick={onButtonClick}
          className="w-full bg-secondary hover:bg-secondary/90 transition-colors text-textPrimary font-bold py-4 px-6 rounded-lg text-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default OnboardingSlide;