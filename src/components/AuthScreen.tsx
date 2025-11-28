import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthScreenProps {
  onAuthSuccess: (email: string) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      setStep('code');
    }
  };

  const handleCodeComplete = (value: string) => {
    setCode(value);
    if (value.length === 6) {
      setTimeout(() => {
        onAuthSuccess(email);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[hsl(var(--cheese-cream))] via-[hsl(var(--cheese-milk))] to-[hsl(var(--background))]">
      <Card className="w-full max-w-md shadow-2xl border-2 animate-scale-in">
        <CardHeader className="text-center space-y-2">
          <div className="text-6xl mb-2 animate-fade-in">🧀</div>
          <CardTitle className="text-4xl font-bold cheese-accent text-primary">
            CheeseHome
          </CardTitle>
          <CardDescription className="text-base">
            {step === 'email' 
              ? 'Введите электронную почту для входа' 
              : 'Введите код из письма'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg h-12 border-2"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold hover-scale"
                disabled={!email.includes('@') || !email.includes('.')}
              >
                Получить код
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={handleCodeComplete}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="text-2xl h-14 w-12" />
                    <InputOTPSlot index={1} className="text-2xl h-14 w-12" />
                    <InputOTPSlot index={2} className="text-2xl h-14 w-12" />
                    <InputOTPSlot index={3} className="text-2xl h-14 w-12" />
                    <InputOTPSlot index={4} className="text-2xl h-14 w-12" />
                    <InputOTPSlot index={5} className="text-2xl h-14 w-12" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setStep('email')}
              >
                Изменить почту
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}