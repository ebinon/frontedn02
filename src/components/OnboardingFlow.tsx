import React, { useState, useEffect } from 'react';
import OnboardingSlide from './OnboardingSlide';
import NavigationDots from './NavigationDots';
import NavigationArrows from './NavigationArrows';
import { Globe, Shield, Zap, Smartphone } from 'lucide-react';

// Define the slide content
const slides = [
  {
    id: 1,
    title: 'مهم نیست از چه سیستم عاملی استفاده میکنید',
    description: 'VPN سرویس امکان دسترسی از هر پلتفرمی رو ممکن میکنه!',
    icon: Globe,
    iconColor: '#FFFFFF',
  },
  {
    id: 2,
    title: 'مهم نیست از چه سیستم عاملی استفاده میکنید',
    description: 'VPN سرویس امکان دسترسی از هر پلتفرمی رو ممکن میکنه!',
    icon: Shield,
    iconColor: '#FFFFFF',
  },
  {
    id: 3,
    title: 'مهم نیست از چه سیستم عاملی استفاده میکنید',
    description: 'VPN سرویس امکان دسترسی از هر پلتفرمی رو ممکن میکنه!',
    icon: Zap,
    iconColor: '#FFFFFF',
  },
  {
    id: 4,
    title: 'مهم نیست از چه سیستم عاملی استفاده میکنید',
    description: 'VPN سرویس امکان دسترسی از هر پلتفرمی رو ممکن میکنه!',
    icon: Smartphone,
    iconColor: '#FFFFFF',
  },
];

const OnboardingFlow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // The app is already installed or not installable
      alert('این اپلیکیشن قبلاً نصب شده است یا قابل نصب نیست.');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    // Reset the deferred prompt variable
    setDeferredPrompt(null);
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const buttonText = isLastSlide ? 'نصب اپلیکیشن' : 'بعدی';
  const buttonAction = isLastSlide ? handleInstallClick : handleNext;

  return (
    <div className="relative flex flex-col h-screen w-full">
      {/* Status Bar */}
      <div className="h-6 bg-transparent"></div>
      
      {/* Header */}
      <div className="py-4 px-6 flex justify-between items-center">
        <div className="text-textPrimary font-bold text-xl">VPN سرویس</div>
        <NavigationArrows 
          onNext={handleNext} 
          onPrev={handlePrev} 
          isFirstSlide={currentSlide === 0} 
          isLastSlide={isLastSlide}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        <OnboardingSlide
          key={slides[currentSlide].id}
          title={slides[currentSlide].title}
          description={slides[currentSlide].description}
          Icon={slides[currentSlide].icon}
          iconColor={slides[currentSlide].iconColor}
          buttonText={buttonText}
          onButtonClick={buttonAction}
          isPwaReady={isLastSlide && !!deferredPrompt}
        />
      </div>
      
      {/* Navigation Dots */}
      <div className="py-6">
        <NavigationDots 
          count={slides.length} 
          active={currentSlide} 
          onDotClick={handleDotClick} 
        />
      </div>
      
      {/* Bottom Navigation Bar Placeholder */}
      <div className="h-16 bg-transparent"></div>
    </div>
  );
};

export default OnboardingFlow;