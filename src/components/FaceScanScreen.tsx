import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect, useRef } from "react";

interface FaceScanScreenProps {
  onNext: (capturedImage: string) => void;
}

export function FaceScanScreen({ onNext }: FaceScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string>("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // รอให้วิดีโอโหลดเสร็จก่อน
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setIsCameraReady(true);
              setCameraError("");
              console.log("กล้องพร้อมใช้งาน");
            }).catch((err) => {
              console.error("ไม่สามารถเล่นวิดีโอได้:", err);
              setCameraError("ไม่สามารถเริ่มต้นกล้องได้");
            });
          }
        };
      }
    } catch (err) {
      console.error('ข้อผิดพลาดในการเข้าถึงกล้อง:', err);
      setCameraError('ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้กล้องในเบราว์เซอร์');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraReady(false);
  };

  const capturePhoto = (): string => {
    if (!videoRef.current) {
      console.log("ไม่มี video element");
      return "";
    }

    // สร้าง canvas ใหม่ทุกครั้ง
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.log("ไม่สามารถสร้าง canvas context ได้");
      return "";
    }

    const video = videoRef.current;
    
    // ตั้งค่าขนาด canvas ให้เท่ากับวิดีโอ
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    console.log(`ขนาดวิดีโอ: ${video.videoWidth} x ${video.videoHeight}`);
    
    if (canvas.width === 0 || canvas.height === 0) {
      console.log("วิดีโอยังไม่พร้อม");
      return "";
    }

    // วาดภาพจากวิดีโอลงใน canvas (กลับด้านแนวนอน)
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0);
    
    // แปลงเป็น base64
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    console.log(`ถ่ายรูปสำเร็จ - ขนาดข้อมูล: ${imageData.length} characters`);
    
    return imageData;
  };

  const handleStartScan = () => {
    if (!isCameraReady) {
      console.log("กล้องยังไม่พร้อม");
      startCamera();
      return;
    }

    console.log("เริ่มกระบวนการสแกน");
    setIsScanning(true);

    // สแกนเสร็จหลังจาก 3 วินาที และถ่ายรูปทันที
    setTimeout(() => {
      console.log("กำลังถ่ายรูป...");
      const imageData = capturePhoto();
      
      setIsScanning(false);
      
      if (imageData) {
        console.log("ส่งภาพไปหน้าถัดไป");
        onNext(imageData);
      } else {
        console.log("ไม่สามารถถ่ายรูปได้");
        setCameraError("ไม่สามารถถ่ายรูปได้ กรุณาลองใหม่");
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6 text-center space-y-6">
          <h2 className="text-2xl text-gray-800 mb-4">การสแกนใบหน้า</h2>
          
          <p className="text-gray-600 mb-6">
            กรุณาส่องหน้าตรงกับกรอบที่แสดงบนหน้าจอ เพื่อเริ่มการสแกนใบหน้า
          </p>

          <div className="relative mx-auto w-64 h-80 mb-6">
            <div 
              className={`w-full h-full border-4 rounded-3xl transition-all duration-500 overflow-hidden ${
                isScanning 
                  ? 'border-green-400 shadow-lg shadow-green-400/50' 
                  : 'border-blue-400 border-dashed'
              }`}
            >
              <video
                ref={videoRef}
                className={`w-full h-full object-cover rounded-2xl ${
                  !isCameraReady ? 'hidden' : ''
                }`}
                playsInline
                muted
                autoPlay
                style={{ transform: 'scaleX(-1)' }}
              />

              {!isCameraReady && !cameraError && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">กำลังเปิดกล้อง...</p>
                  </div>
                </div>
              )}

              {cameraError && (
                <div className="w-full h-full bg-red-50 flex items-center justify-center p-4">
                  <div className="text-red-600 text-sm text-center">
                    <p className="mb-2">{cameraError}</p>
                    <Button 
                      onClick={startCamera} 
                      className="text-xs bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      ลองอีกครั้ง
                    </Button>
                  </div>
                </div>
              )}

              {isCameraReady && (
                <>
                  <div className="absolute top-2 left-2 w-8 h-8 border-l-4 border-t-4 border-blue-500"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 border-r-4 border-t-4 border-blue-500"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-l-4 border-b-4 border-blue-500"></div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-r-4 border-b-4 border-blue-500"></div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-green-400' : 'bg-blue-400'} animate-pulse`}></div>
                  </div>
                </>
              )}

              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>กำลังสแกน...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={handleStartScan}
            disabled={isScanning || (!isCameraReady && !cameraError)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isScanning 
              ? 'กำลังสแกน...' 
              : !isCameraReady && !cameraError
              ? 'กำลังเปิดกล้อง...'
              : cameraError
              ? 'เปิดกล้องอีกครั้ง'
              : 'เริ่มสแกน'
            }
          </Button>

          <p className="text-xs text-gray-500">
            กล้องจะใช้งานได้เฉพาะใน HTTPS หรือ localhost เท่านั้น
          </p>
        </CardContent>
      </Card>
    </div>
  );
}