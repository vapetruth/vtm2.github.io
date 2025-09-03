import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface SummaryScreenProps {
  onRestart: () => void;
}

export function SummaryScreen({ onRestart }: SummaryScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">✅</span>
          </div>
          <CardTitle className="text-2xl text-gray-800">สรุปการใช้งาน</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ขอบคุณที่ใช้งาน Vape Truth Mirror! คุณได้เห็นอนาคตของตัวเองและรู้สึกถึงผลกระทบจากการตัดสินใจเลือกไม่ใช้บุหรี่ไฟฟ้า
          </p>

          {/* สถิติการใช้งาน */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
            <h3 className="text-gray-800 mb-3">สรุปกิจกรรม</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-1">
                  สแกนหน้า
                </Badge>
                <p className="text-sm text-gray-600">สำเร็จ ✓</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-700 mb-1">
                  ดูผลลัพธ์
                </Badge>
                <p className="text-sm text-gray-600">สำเร็จ ✓</p>
              </div>
            </div>
          </div>

          {/* ข้อความกำลังใจ */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 rounded-lg p-4">
            <h4 className="text-green-800 mb-2">💪 กำลังใจ</h4>
            <p className="text-green-700 text-sm leading-relaxed">
              การตัดสินใจที่ดีวันนี้ จะส่งผลดีต่อสุขภาพของคุณในอนาคต 
              เริ่มต้นชีวิตใหม่ที่ปราศจากบุหรี่ไฟฟ้า!
            </p>
          </div>

          {/* ข้อเสนอแนะ */}
          <div className="text-left space-y-2">
            <h4 className="text-gray-800 text-sm">📝 ข้อเสนอแนะถัดไป:</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• ปรึกษาแพทย์เพื่อวางแผนเลิกบุหรี่</li>
              <li>• หาทางเลือกที่ดีต่อสุขภาพ</li>
              <li>• แชร์ประสบการณ์ให้เพื่อนๆ</li>
            </ul>
          </div>

          <Button 
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            จบการใช้งาน
          </Button>

          <p className="text-xs text-gray-500 mt-4">
            ขอบคุณที่ให้ความสนใจกับสุขภาพของคุณ 🙏
          </p>
        </CardContent>
      </Card>
    </div>
  );
}