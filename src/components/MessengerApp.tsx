import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import ContactsList from './ContactsList';
import GroupsList from './GroupsList';
import FavoritesList from './FavoritesList';
import ProfileSettings from './ProfileSettings';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

interface MessengerAppProps {
  currentUser: User;
  onLogout: () => void;
}

export default function MessengerApp({ currentUser, onLogout }: MessengerAppProps) {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <div className="w-full md:w-96 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card">
          <h1 className="text-2xl font-bold cheese-accent text-primary flex items-center gap-2">
            <span className="text-3xl">🧀</span>
            CheeseHome
          </h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowProfile(!showProfile)}
            className="hover-scale"
          >
            <div className="text-2xl">{currentUser.avatar || '👤'}</div>
          </Button>
        </div>

        {showProfile ? (
          <ProfileSettings 
            currentUser={currentUser} 
            onClose={() => setShowProfile(false)}
            onLogout={onLogout}
          />
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="w-full grid grid-cols-5 rounded-none bg-muted/30">
                <TabsTrigger value="chats" className="flex flex-col gap-1 py-3">
                  <Icon name="MessageSquare" size={20} />
                  <span className="text-xs">Чаты</span>
                </TabsTrigger>
                <TabsTrigger value="contacts" className="flex flex-col gap-1 py-3">
                  <Icon name="Users" size={20} />
                  <span className="text-xs">Контакты</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex flex-col gap-1 py-3">
                  <Icon name="UsersRound" size={20} />
                  <span className="text-xs">Группы</span>
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex flex-col gap-1 py-3">
                  <Icon name="Star" size={20} />
                  <span className="text-xs">Избранное</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex flex-col gap-1 py-3">
                  <Icon name="Settings" size={20} />
                  <span className="text-xs">Настройки</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="chats" className="h-full mt-0">
                  <ChatList onSelectChat={setSelectedChat} selectedChatId={selectedChat} />
                </TabsContent>
                <TabsContent value="contacts" className="h-full mt-0">
                  <ContactsList />
                </TabsContent>
                <TabsContent value="groups" className="h-full mt-0">
                  <GroupsList />
                </TabsContent>
                <TabsContent value="favorites" className="h-full mt-0">
                  <FavoritesList />
                </TabsContent>
                <TabsContent value="settings" className="h-full mt-0">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Настройки</h3>
                    <p className="text-muted-foreground">Раздел в разработке</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </>
        )}
      </div>

      <div className="hidden md:flex flex-1 bg-muted/10">
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} currentUser={currentUser} />
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 text-muted-foreground">
            <div className="text-8xl animate-fade-in">🧀</div>
            <p className="text-xl cheese-accent">Выберите чат для начала общения</p>
          </div>
        )}
      </div>
    </div>
  );
}
