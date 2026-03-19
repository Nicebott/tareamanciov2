import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { Notification } from '../services/notificationService';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const n = payload.new as any;
          setNotifications((prev) => [
            {
              id: n.id,
              title: n.title,
              message: n.message,
              createdBy: n.created_by,
              createdAt: n.created_at,
              status: n.status,
            },
            ...prev,
          ]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications' },
        (payload) => {
          const n = payload.new as any;
          if (n.status === 'archived') {
            setNotifications((prev) => prev.filter((notif) => notif.id !== n.id));
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'notifications' },
        (payload) => {
          const deletedId = (payload.old as any).id;
          setNotifications((prev) => prev.filter((notif) => notif.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setNotifications(
          data.map((n: any) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            createdBy: n.created_by,
            createdAt: n.created_at,
            status: n.status,
          }))
        );
        setUnreadCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, []);

  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}
