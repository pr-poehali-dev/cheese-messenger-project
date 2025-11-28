import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface FavoriteMessage {
  id: string;
  text: string;
  from: string;
  avatar: string;
  timestamp: string;
}

const mockFavorites: FavoriteMessage[] = [
  {
    id: '1',
    text: 'Тоже хорошо, спасибо 😊',
    from: 'Анна Сырова',
    avatar: '🧀',
    timestamp: '10:32',
  },
  {
    id: '2',
    text: 'Не забудь про встречу завтра!',
    from: 'Максим Моцарелла',
    avatar: '🤠',
    timestamp: 'Вчера',
  },
  {
    id: '3',
    text: 'Отличная идея! 🎉',
    from: 'Группа "Любители сыра"',
    avatar: '🧈',
    timestamp: '2 дня назад',
  },
];

export default function FavoritesList() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Icon name="Star" size={20} className="text-yellow-500" />
          Избранные сообщения
        </h2>
      </div>

      <ScrollArea className="flex-1">
        {mockFavorites.length > 0 ? (
          <div className="divide-y divide-border">
            {mockFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-4 cursor-pointer transition-all hover:bg-accent/50"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{favorite.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm">{favorite.from}</h3>
                      <span className="text-xs text-muted-foreground">{favorite.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground bg-muted/50 rounded-lg p-3">
                      {favorite.text}
                    </p>
                  </div>
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Icon name="Star" size={64} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Пока нет избранных сообщений</p>
            <p className="text-sm text-muted-foreground mt-2">
              Нажмите на звёздочку рядом с сообщением, чтобы добавить его в избранное
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
