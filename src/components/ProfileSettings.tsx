import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ProfileSettingsProps {
  currentUser: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  onClose: () => void;
  onLogout: () => void;
}

const avatarEmojis = ['🧀', '🧈', '🤠', '👤', '😊', '🎉', '🌟', '🔥', '💫', '🎨'];

export default function ProfileSettings({ currentUser, onClose, onLogout }: ProfileSettingsProps) {
  const [name, setName] = useState(currentUser.name);
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar || '🧀');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <h2 className="text-lg font-semibold">Профиль и настройки</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{selectedAvatar}</div>
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-sm text-muted-foreground">{currentUser.phone}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Личные данные</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label>Аватар</Label>
              <div className="grid grid-cols-5 gap-2">
                {avatarEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`text-3xl p-2 rounded-lg hover:bg-accent transition-all hover-scale ${
                      selectedAvatar === emoji ? 'bg-accent ring-2 ring-primary' : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Настройки чата</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Уведомления</Label>
                <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Тёмная тема</Label>
                <p className="text-sm text-muted-foreground">Использовать тёмное оформление</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={onClose}>
              <Icon name="Palette" size={18} className="mr-2" />
              Темы оформления чатов
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={onClose}>
              <Icon name="Bell" size={18} className="mr-2" />
              Настройки уведомлений
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={onClose}>
              <Icon name="Lock" size={18} className="mr-2" />
              Приватность и безопасность
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={onClose}>
              <Icon name="Database" size={18} className="mr-2" />
              Хранилище данных
            </Button>
          </div>

          <Separator />

          <Button 
            variant="destructive" 
            className="w-full" 
            onClick={onLogout}
          >
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти из аккаунта
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}
