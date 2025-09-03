import { useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { FaceScanScreen } from "./components/FaceScanScreen";
import { ARResultScreen } from "./components/ARResultScreen";
import { SaveShareScreen } from "./components/SaveShareScreen";
import { SummaryScreen } from "./components/SummaryScreen";
import { Toaster } from "./components/ui/sonner";

type Screen = 'splash' | 'faceScan' | 'arResult' | 'saveShare' | 'summary';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [capturedImage, setCapturedImage] = useState<string>('');

  const handleSplashNext = () => {
    setCurrentScreen('faceScan');
  };

  const handleFaceScanComplete = (imageData: string) => {
    console.log("App.tsx ได้รับภาพ:", imageData ? "มีภาพ" : "ไม่มีภาพ");
    console.log("ขนาดข้อมูลภาพใน App:", imageData?.length || 0);
    
    setCapturedImage(imageData);
    setCurrentScreen('arResult');
  };

  const handleARResultNext = () => {
    setCurrentScreen('saveShare');
  };

  const handleSaveShareNext = () => {
    setCurrentScreen('summary');
  };

  const restartApp = () => {
    setCapturedImage(''); // รีเซ็ตภาพด้วย
    setCurrentScreen('splash');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNext={handleSplashNext} />;
      
      case 'faceScan':
        return <FaceScanScreen onNext={handleFaceScanComplete} />;
      
      case 'arResult':
        console.log("กำลังแสดง ARResultScreen พร้อมภาพ:", capturedImage ? "มีภาพ" : "ไม่มีภาพ");
        return (
          <ARResultScreen 
            capturedImage={capturedImage}
            onNext={handleARResultNext}
          />
        );
      
      case 'saveShare':
        return (
          <SaveShareScreen 
            capturedImage={capturedImage} // ส่งภาพต่อถ้า SaveShareScreen ต้องใช้
            onNext={handleSaveShareNext}
          />
        );
      
      case 'summary':
        return <SummaryScreen onRestart={restartApp} />;
      
      default:
        return <SplashScreen onNext={handleSplashNext} />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
      <Toaster position="top-center" />
      
      {/* Debug info - ลบออกเมื่อใช้งานจริง */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded z-50">
          <div>Screen: {currentScreen}</div>
          <div>Image: {capturedImage ? `${capturedImage.length} chars` : 'No image'}</div>
        </div>
      )}
    </div>
  );
}