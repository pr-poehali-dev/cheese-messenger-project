import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AudioCallDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AudioCallDialog({ open, onClose }: AudioCallDialogProps) {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6 py-8">
          <div className="text-8xl animate-pulse">🧀</div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Анна Сырова</h3>
            <p className="text-muted-foreground">Аудиозвонок</p>
            <p className="text-sm text-primary">00:42</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant={isMuted ? 'destructive' : 'secondary'}
              size="icon"
              className="h-16 w-16 rounded-full hover-scale"
              onClick={() => setIsMuted(!isMuted)}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={28} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-16 w-16 rounded-full hover-scale"
              onClick={onClose}
            >
              <Icon name="PhoneOff" size={28} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
