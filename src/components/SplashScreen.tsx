import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SplashScreenProps {
  onNext: () => void;
}

export function SplashScreen({ onNext }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl">🔮</span>
          </div>
          <CardTitle className="text-2xl text-gray-800">Vape Truth Mirror</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-gray-600 leading-relaxed">
            ยินดีต้อนรับสู่ Vape Truth Mirror! ฉันคือผู้ช่วย AI ของคุณ จะพาคุณผ่านขั้นตอนการใช้งานและแสดงผลลัพธ์อนาคตของคุณ หากคุณยังใช้บุหรี่ไฟฟ้า
          </p>
          <Button 
            onClick={onNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            เริ่มต้น
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}