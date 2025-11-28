import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import VideoCallDialog from './VideoCallDialog';
import AudioCallDialog from './AudioCallDialog';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  isFavorite?: boolean;
}

interface ChatWindowProps {
  chatId: string;
  currentUser: { id: string; name: string; avatar?: string };
}

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Привет! Как дела?',
    senderId: 'other',
    timestamp: '10:30',
  },
  {
    id: '2',
    text: 'Отлично! А у тебя?',
    senderId: '1',
    timestamp: '10:31',
    reactions: [{ emoji: '👍', count: 1 }],
  },
  {
    id: '3',
    text: 'Тоже хорошо, спасибо 😊',
    senderId: 'other',
    timestamp: '10:32',
    isFavorite: true,
  },
];

const reactionEmojis = ['❤️', '👍', '😂', '😮', '😢', '🔥'];

export default function ChatWindow({ chatId, currentUser }: ChatWindowProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showAudioCall, setShowAudioCall] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        senderId: currentUser.id,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        
        if (existingReaction) {
          return {
            ...msg,
            reactions: reactions.map(r => 
              r.emoji === emoji ? { ...r, count: r.count + 1 } : r
            ),
          };
        } else {
          return {
            ...msg,
            reactions: [...reactions, { emoji, count: 1 }],
          };
        }
      }
      return msg;
    }));
    setSelectedMessage(null);
  };

  const toggleFavorite = (messageId: string) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, isFavorite: !msg.isFavorite } : msg
    ));
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between bg-card">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="text-2xl">🧀</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Анна Сырова</h2>
              <p className="text-xs text-muted-foreground">был(а) в сети 5 минут назад</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowAudioCall(true)} className="hover-scale">
              <Icon name="Phone" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowVideoCall(true)} className="hover-scale">
              <Icon name="Video" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hover-scale">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`max-w-[70%] group relative`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.senderId === currentUser.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.isFavorite && (
                        <Icon name="Star" size={12} className="text-yellow-400" />
                      )}
                    </div>
                  </div>

                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {message.reactions.map((reaction, idx) => (
                        <div
                          key={idx}
                          className="text-xs bg-muted px-2 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="absolute -top-8 right-0 hidden group-hover:flex gap-1 bg-popover border border-border rounded-lg p-1 shadow-lg">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Icon name="Smile" size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div className="flex gap-1 p-1">
                          {reactionEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => handleReaction(message.id, emoji)}
                              className="text-xl hover:scale-125 transition-transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => toggleFavorite(message.id)}
                    >
                      <Icon name="Star" size={16} className={message.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="icon" className="hover-scale">
              <Icon name="Paperclip" size={20} />
            </Button>
            <Input
              type="text"
              placeholder="Введите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="hover-scale">
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </form>
      </div>

      <VideoCallDialog open={showVideoCall} onClose={() => setShowVideoCall(false)} />
      <AudioCallDialog open={showAudioCall} onClose={() => setShowAudioCall(false)} />
    </>
  );
}
