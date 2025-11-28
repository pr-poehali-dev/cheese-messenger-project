import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  isOnline?: boolean;
  isTyping?: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Анна Сырова',
    avatar: '🧀',
    lastMessage: 'Привет! Как дела?',
    timestamp: '10:30',
    unread: 3,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Группа "Любители сыра"',
    avatar: '🧈',
    lastMessage: 'Кто за встречу в субботу?',
    timestamp: 'Вчера',
    unread: 12,
  },
  {
    id: '3',
    name: 'Максим Моцарелла',
    avatar: '🤠',
    lastMessage: 'Отправил тебе файл',
    timestamp: '15:20',
    isOnline: true,
    isTyping: true,
  },
  {
    id: '4',
    name: 'Ольга Пармезан',
    avatar: '👩',
    lastMessage: 'Спасибо за помощь!',
    timestamp: '2 дня назад',
  },
];

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
}

export default function ChatList({ onSelectChat, selectedChatId }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats] = useState(mockChats);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                selectedChatId === chat.id ? 'bg-accent' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="text-3xl">{chat.avatar}</div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${chat.isTyping ? 'text-primary italic' : 'text-muted-foreground'}`}>
                      {chat.isTyping ? (
                        <span className="flex items-center gap-1">
                          <Icon name="Pencil" size={14} />
                          печатает...
                        </span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                    {chat.unread && chat.unread > 0 && (
                      <Badge className="ml-2 bg-primary">{chat.unread}</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
