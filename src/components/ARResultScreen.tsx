import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { useState, useEffect } from "react";

interface ARResultScreenProps {
  onNext: () => void;
  capturedImage: string;
}

export function ARResultScreen({ onNext, capturedImage }: ARResultScreenProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    console.log("ARResultScreen ได้รับภาพ:", capturedImage ? "มีภาพ" : "ไม่มีภาพ");
    console.log("ขนาดข้อมูลภาพ:", capturedImage?.length || 0);

    const processingTimer = setTimeout(() => {
      setIsProcessing(false);
    }, 2000);

    const warningTimer = setTimeout(() => {
      setShowWarning(true);
    }, 4000);

    return () => {
      clearTimeout(processingTimer);
      clearTimeout(warningTimer);
    };
  }, [capturedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto shadow-2xl">
        <CardContent className="p-6 text-center space-y-6">
          {isProcessing ? (
            <div className="space-y-4">
              <h2 className="text-2xl text-gray-800">กำลังประมวลผล...</h2>
              <div className="flex justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
              <p className="text-gray-600">
                กำลังสร้างภาพจำลองผลกระทบจากการใช้บุหรี่ไฟฟ้า
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl text-gray-800 mb-4">ผลลัพธ์การจำลอง</h2>
              
              <p className="text-gray-600 mb-6">
                นี่คือการจำลองผลกระทบที่อาจเกิดขึ้นกับใบหน้าของคุณ หากยังคงใช้บุหรี่ไฟฟ้าต่อไป
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* ภาพปัจจุบัน */}
                <div className="text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-2 overflow-hidden border-4 border-green-300">
                    {capturedImage ? (
                      <img 
                        src={capturedImage} 
                        alt="ภาพปัจจุบัน" 
                        className="w-full h-full object-cover"
                        onLoad={() => console.log("ภาพปัจจุบันโหลดสำเร็จ")}
                        onError={() => console.log("ภาพปัจจุบันโหลดไม่สำเร็จ")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white text-2xl">😊</span>
                          </div>
                          <span className="text-green-700 text-sm">ปัจจุบัน</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-green-600 font-medium">สุขภาพดี</span>
                </div>

                {/* ภาพอนาคต */}
                <div className="text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg mb-2 overflow-hidden border-4 border-red-300 relative">
                    {capturedImage ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={capturedImage} 
                          alt="ภาพอนาคต" 
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'grayscale(60%) contrast(140%) brightness(60%) sepia(40%) saturate(150%)',
                          }}
                          onLoad={() => console.log("ภาพอนาคตโหลดสำเร็จ")}
                          onError={() => console.log("ภาพอนาคตโหลดไม่สำเร็จ")}
                        />
                        {/* เอฟเฟกต์เพิ่มเติม */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-yellow-200/50"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-red-200/40 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-transparent to-orange-200/30"></div>
                        
                        <div className="absolute top-2 right-2 text-red-600 text-xs bg-white/90 px-2 py-1 rounded font-semibold">
                          5 ปีข้างหน้า
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-white text-2xl">😷</span>
                          </div>
                          <span className="text-red-700 text-sm">5 ปีข้างหน้า</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-red-600 font-medium">ผิวเสื่อม ฟันเหลือง</span>
                </div>
              </div>

              {/* Debug info - ลบออกได้เมื่อใช้งานจริง */}
              {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                  Debug: {capturedImage ? `มีภาพ (${capturedImage.length} chars)` : "ไม่มีภาพ"}
                </div>
              )}

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <h3 className="text-red-800 mb-3 font-semibold">ผลกระทบที่อาจเกิดขึ้น:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "ผิวหน้าเหี่ยวย่น เร็วกว่าปกติ",
                    "ฟันเปลี่ยนเป็นสีเหลือง", 
                    "เหงือกอักเสบ",
                    "ริ้วรอยรอบปาก",
                    "ผิวหน้าหมองคล้ำ"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-red-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h3 className="text-green-800 mb-2 font-semibold">ประโยชน์ของการเลิกบุหรี่ไฟฟ้า:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "ผิวหน้ากลับมาแข็งแรงและใส",
                    "ลมหายใจหอมสดชื่น",
                    "ประหยัดเงินได้มาก"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-green-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {showWarning && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertDescription className="text-orange-800 text-sm">
                    ⚠️ นี่เป็นเพียงการจำลอง ผลจริงอาจแตกต่างกันไปในแต่ละบุคคล การเลิกใช้บุหรี่ไฟฟ้าจะช่วยลดความเสี่ยงเหล่านี้และทำให้สุขภาพดีขึ้น
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Button 
                  onClick={onNext}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ดูวิธีการเลิกบุหรี่ไฟฟ้า
                </Button>
                
                <p className="text-xs text-gray-500">
                  การเลิกบุหรี่ไฟฟ้าจะช่วยป้องกันผลกระทบเหล่านี้และทำให้คุณมีสุขภาพดีขึ้น
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}