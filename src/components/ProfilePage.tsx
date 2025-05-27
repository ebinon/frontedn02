import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  User, 
  Smartphone, 
  Laptop, 
  ChevronDown, 
  ChevronUp,
  QrCode,
  Link as LinkIcon,
  TestTube,
  CreditCard,
  RefreshCw
} from 'lucide-react';

interface UserData {
  name: string;
  username: string;
  volume: number;
  expiryDate: string | null;
  hasActiveService: boolean;
}

interface Config {
  id: string;
  country: string;
  flag: string;
  volume: number;
  expiryDate: string;
}

const ProfilePage: React.FC = () => {
  const [isEducationOpen, setIsEducationOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const { data: userData } = useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: async () => {
      // Simulated API call
      return {
        name: 'خدادادی',
        username: '@godverrdi',
        volume: 0,
        expiryDate: null,
        hasActiveService: false
      };
    }
  });

  const { data: configs } = useQuery<Config[]>({
    queryKey: ['configs'],
    queryFn: async () => {
      // Simulated API call
      return [
        {
          id: '1',
          country: 'آلمان (تست)',
          flag: '🇩🇪',
          volume: 10,
          expiryDate: '2024-04-01'
        },
        {
          id: '2',
          country: 'بلژیک',
          flag: '🇧🇪',
          volume: 5,
          expiryDate: '2024-04-01'
        }
      ];
    }
  });

  const handleDeviceClick = (device: string) => {
    setSelectedDevice(device);
  };

  const handleQrCode = (configId: string) => {
    console.log('QR Code clicked for config:', configId);
  };

  const handleLink = (configId: string) => {
    console.log('Link clicked for config:', configId);
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Status Bar */}
      <div className="h-6" />

      {/* Profile Card */}
      <div className="bg-background-card rounded-2xl p-6 text-center">
        <div className="relative w-20 h-20 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
          <User size={40} className="text-textPrimary" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-textPrimary">{userData?.name}</h2>
          <p className="text-textSecondary">{userData?.username}</p>
        </div>
        <div className="flex justify-center space-x-1 space-x-reverse mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-dot-inactive" />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-textSecondary text-sm">حجم باقی‌مانده</p>
            <p className="text-textPrimary font-bold">{userData?.volume || 0} GB</p>
          </div>
          <div>
            <p className="text-textSecondary text-sm">تاریخ انقضا</p>
            <p className="text-textPrimary font-bold">{userData?.expiryDate || '-'}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2
            ${userData?.hasActiveService ? 'bg-secondary/20 text-textSecondary' : 'bg-secondary text-textPrimary'}`}
          disabled={userData?.hasActiveService}
        >
          <TestTube size={24} />
          <span>تست</span>
        </button>
        <a 
          href="https://google.com/1" 
          className="p-4 rounded-xl bg-secondary text-textPrimary flex flex-col items-center justify-center space-y-2"
        >
          <CreditCard size={24} />
          <span>خرید</span>
        </a>
        <a 
          href="https://google.com/1" 
          className="p-4 rounded-xl bg-secondary text-textPrimary flex flex-col items-center justify-center space-y-2"
        >
          <RefreshCw size={24} />
          <span>تمدید</span>
        </a>
      </div>

      {/* Education Section */}
      <div className="bg-background-card rounded-2xl p-6">
        <button 
          className="w-full flex items-center justify-between text-textPrimary"
          onClick={() => setIsEducationOpen(!isEducationOpen)}
        >
          <span className="text-lg font-bold">آموزش</span>
          {isEducationOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
        
        {isEducationOpen && (
          <div className="mt-4 space-y-4">
            <p className="text-textSecondary">لطفاً دستگاه خود را انتخاب کنید...</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'iphone', label: 'آیفون', icon: Smartphone },
                { id: 'android', label: 'اندروید', icon: Smartphone },
                { id: 'computer', label: 'کامپیوتر', icon: Laptop }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleDeviceClick(id)}
                  className="p-4 rounded-xl bg-secondary/20 text-textPrimary flex flex-col items-center justify-center space-y-2"
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Config List */}
      <div className="bg-background-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-textPrimary mb-4">لیست کانفیگ‌ها</h3>
        <div className="space-y-4">
          {configs?.map((config) => (
            <div key={config.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-2xl">{config.flag}</span>
                <div>
                  <p className="text-textPrimary font-medium">{config.country}</p>
                  <p className="text-textSecondary text-sm">
                    {config.volume}GB - {new Date(config.expiryDate).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => handleQrCode(config.id)}
                  className="p-2 rounded-lg bg-secondary text-textPrimary"
                >
                  <QrCode size={20} />
                </button>
                <button
                  onClick={() => handleLink(config.id)}
                  className="p-2 rounded-lg bg-secondary text-textPrimary"
                >
                  <LinkIcon size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Instructions Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-background-card rounded-2xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-textPrimary">راهنمای نصب</h3>
              <button 
                onClick={() => setSelectedDevice(null)}
                className="text-textSecondary"
              >
                ✕
              </button>
            </div>
            <div className="text-textSecondary">
              <p>متن و فیلم رو در اینجا قرار خواهیم داد</p>
              <div className="mt-4 aspect-video bg-secondary/20 rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;