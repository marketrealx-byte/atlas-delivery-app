
import React from 'react';
import { Notification } from '../types';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface Props {
  notifications: Notification[];
  remove: (id: string) => void;
}

const NotificationSystem: React.FC<Props> = ({ notifications, remove }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border border-zinc-800 animate-slide-in ${
            n.type === 'success' ? 'bg-emerald-950/80 text-emerald-100' : 'bg-rose-950/80 text-rose-100'
          }`}
        >
          {n.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">{n.message}</span>
          <button onClick={() => remove(n.id)} className="ml-auto opacity-70 hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
