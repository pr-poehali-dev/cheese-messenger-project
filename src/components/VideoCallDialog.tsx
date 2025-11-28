import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoCallDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function VideoCallDialog({ open, onClose }: VideoCallDialogProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="text-8xl">🧀</div>
              <div>
                <h3 className="text-2xl font-bold">Анна Сырова</h3>
                <p className="text-muted-foreground">Видеозвонок</p>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-4 w-40 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
            <div className="text-4xl">👤</div>
          </div>

          {isScreenSharing && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Icon name="MonitorUp" size={16} />
              Демонстрация экрана
            </div>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            <Button
              variant={isMuted ? 'destructive' : 'secondary'}
              size="icon"
              className="h-14 w-14 rounded-full hover-scale"
              onClick={() => setIsMuted(!isMuted)}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
            </Button>
            <Button
              variant={isVideoOff ? 'destructive' : 'secondary'}
              size="icon"
              className="h-14 w-14 rounded-full hover-scale"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
            </Button>
            <Button
              variant={isScreenSharing ? 'default' : 'secondary'}
              size="icon"
              className="h-14 w-14 rounded-full hover-scale"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <Icon name="MonitorUp" size={24} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-14 w-14 rounded-full hover-scale"
              onClick={onClose}
            >
              <Icon name="PhoneOff" size={24} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
