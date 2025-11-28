import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isOnline?: boolean;
  isInMessenger?: boolean;
}

const mockContacts: Contact[] = [
  { id: '1', name: 'Анна Сырова', phone: '+7 999 123 45 67', avatar: '🧀', isOnline: true, isInMessenger: true },
  { id: '2', name: 'Максим Моцарелла', phone: '+7 999 234 56 78', avatar: '🤠', isOnline: true, isInMessenger: true },
  { id: '3', name: 'Ольга Пармезан', phone: '+7 999 345 67 89', avatar: '👩', isInMessenger: true },
  { id: '4', name: 'Дмитрий Чеддер', phone: '+7 999 456 78 90', avatar: '🧑', isInMessenger: false },
  { id: '5', name: 'Елена Маасдам', phone: '+7 999 567 89 01', avatar: '👱‍♀️', isOnline: true, isInMessenger: true },
];

export default function ContactsList() {
  const [contacts] = useState(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const inMessengerContacts = filteredContacts.filter(c => c.isInMessenger);
  const otherContacts = filteredContacts.filter(c => !c.isInMessenger);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border space-y-3">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск контактов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="w-full hover-scale">
          <Icon name="UserPlus" size={18} className="mr-2" />
          Добавить контакт
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {inMessengerContacts.length > 0 && (
          <div className="p-3">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              В CHEESEHOME ({inMessengerContacts.length})
            </h3>
            <div className="space-y-1">
              {inMessengerContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="text-3xl">{contact.avatar}</div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{contact.name}</h3>
                        {contact.isInMessenger && (
                          <Badge variant="secondary" className="text-xs">В сети</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="hover-scale">
                      <Icon name="MessageSquare" size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {otherContacts.length > 0 && (
          <div className="p-3">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              ДРУГИЕ КОНТАКТЫ ({otherContacts.length})
            </h3>
            <div className="space-y-1">
              {otherContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl opacity-50">{contact.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                    </div>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Icon name="UserPlus" size={14} className="mr-1" />
                      Пригласить
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
