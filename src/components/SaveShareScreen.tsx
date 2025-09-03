import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface SaveShareScreenProps {
  onNext: () => void;
}

export function SaveShareScreen({ onNext }: SaveShareScreenProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSaveImage = () => {
    setIsSaving(true);
    // จำลองการบันทึกภาพ
    setTimeout(() => {
      setIsSaving(false);
      toast.success("บันทึกภาพเรียบร้อยแล้ว!");
    }, 2000);
  };

  const handleShareLine = () => {
    setIsSharing(true);
    // จำลองการเชื่อมต่อ LINE LIFF
    setTimeout(() => {
      setIsSharing(false);
      toast.success("แชร์ผ่าน LINE เรียบร้อยแล้ว!");
      setTimeout(() => {
        onNext();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardContent className="p-6 text-center space-y-6">
          <h2 className="text-2xl text-gray-800 mb-4">บันทึกและแชร์</h2>
          
          <p className="text-gray-600 mb-6">
            คุณสามารถบันทึกภาพของตัวเองและส่งผ่าน LINE เพื่อเตือนใจในอนาคต
          </p>

          {/* พรีวิวภาพ */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">📸</span>
            </div>
            <p className="text-gray-500 text-sm">ภาพผลลัพธ์ของคุณ</p>
          </div>

          {/* ปุ่มบันทึกภาพ */}
          <Button 
            onClick={handleSaveImage}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 mb-3"
          >
            {isSaving ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>กำลังบันทึก...</span>
              </div>
            ) : (
              '💾 บันทึกภาพ'
            )}
          </Button>

          {/* ปุ่มแชร์ LINE */}
          <Button 
            onClick={handleShareLine}
            disabled={isSharing}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg transition-all duration-300"
          >
            {isSharing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>กำลังแชร์...</span>
              </div>
            ) : (
              '📱 บันทึกและส่งผ่าน LINE'
            )}
          </Button>

          {/* ข้อมูล LINE LIFF */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h4 className="text-green-800 mb-2 text-sm">เกี่ยวกับ LINE LIFF:</h4>
            <p className="text-green-700 text-xs leading-relaxed">
              การแชร์ผ่าน LINE จะส่งภาพผลลัพธ์และข้อความเตือนไปยังเพื่อนหรือกลุ่มที่คุณเลือก 
              เพื่อให้เป็นแรงจูงใจในการหยุดใช้บุหรี่ไฟฟ้า
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}