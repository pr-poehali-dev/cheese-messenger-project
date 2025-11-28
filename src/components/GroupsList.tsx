import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Group {
  id: string;
  name: string;
  avatar: string;
  members: number;
  lastMessage?: string;
  unread?: number;
}

const mockGroups: Group[] = [
  { id: '1', name: 'Любители сыра', avatar: '🧈', members: 42, lastMessage: 'Анна: Кто за встречу?', unread: 12 },
  { id: '2', name: 'Семья', avatar: '👨‍👩‍👧‍👦', members: 5, lastMessage: 'Мама: Когда придёте?' },
  { id: '3', name: 'Работа', avatar: '💼', members: 23, lastMessage: 'Босс: Совещание в 15:00', unread: 3 },
  { id: '4', name: 'Друзья', avatar: '🎉', members: 8 },
];

export default function GroupsList() {
  const [groups] = useState(mockGroups);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border space-y-3">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск групп..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="w-full hover-scale">
          <Icon name="Plus" size={18} className="mr-2" />
          Создать группу
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-4 cursor-pointer transition-all hover:bg-accent/50"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{group.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{group.name}</h3>
                    {group.unread && group.unread > 0 && (
                      <Badge className="ml-2 bg-primary">{group.unread}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Users" size={14} />
                    <span>{group.members} участников</span>
                  </div>
                  {group.lastMessage && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {group.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
