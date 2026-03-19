import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabase';
import { Message } from '../types';

const MESSAGES_PER_PAGE = 50;
const LAST_SEEN_KEY = 'chat_last_seen_timestamp';

export function useSupabaseChat(isOpen: boolean, displayName: string, userId?: string, isAdmin: boolean = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Ref que siempre refleja el valor actual de isOpen dentro de los listeners
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(MESSAGES_PER_PAGE);

        if (!error && data) {
          setMessages(
            data.map((m) => ({
              id: m.id,
              text: m.text,
              timestamp: new Date(m.created_at).getTime(),
              username: m.username,
              isAdmin: m.is_admin,
            }))
          );
        }
        setLoading(false);
      };

      fetchMessages();

      // Resetear contador y marcar como visto al abrir
      setUnreadCount(0);
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());

      const channel = supabase
        .channel('chat-messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          (payload) => {
            const m = payload.new as any;
            setMessages((prev) => [
              ...prev,
              {
                id: m.id,
                text: m.text,
                timestamp: new Date(m.created_at).getTime(),
                username: m.username,
                isAdmin: m.is_admin,
              },
            ]);
            // Siempre actualizar last seen mientras el chat está abierto
            localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'chat_messages' },
          (payload) => {
            const deletedId = (payload.old as any).id;
            setMessages((prev) => prev.filter((msg) => msg.id !== deletedId));
          }
        )
        .subscribe();

      return () => {
        localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
        supabase.removeChannel(channel);
      };
    } else {
      // Chat cerrado: calcular no leídos desde last seen
      const fetchUnread = async () => {
        const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
        const cutoffTime = lastSeen || new Date(Date.now() - 300000).toISOString();

        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .gt('created_at', cutoffTime)
          // No contar mensajes del propio usuario
          .neq('username', displayName || '__nobody__');

        setUnreadCount(count ?? 0);
      };

      fetchUnread();

      const channel = supabase
        .channel('chat-unread')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          (payload) => {
            // FIX PRINCIPAL: si el chat ya está abierto, ignorar — evita la race condition
            if (isOpenRef.current) return;
            // No contar mensajes propios
            const m = payload.new as any;
            if (displayName && m.username === displayName) return;

            setUnreadCount((prev) => prev + 1);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen, displayName]);

  const sendMessage = useCallback(
    async (text: string) => {
      try {
        const { error } = await supabase.from('chat_messages').insert({
          text,
          username: displayName,
          is_admin: isAdmin,
        });
        return !error;
      } catch {
        return false;
      }
    },
    [displayName, isAdmin]
  );

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('id', messageId);
      return !error;
    } catch {
      return false;
    }
  }, []);

  const loadMoreMessages = useCallback(async () => {
    if (messages.length === 0) return;
    const oldest = messages[0];

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .lt('created_at', new Date(oldest.timestamp).toISOString())
      .order('created_at', { ascending: false })
      .limit(MESSAGES_PER_PAGE);

    if (!error && data && data.length > 0) {
      const older = data
        .map((m) => ({
          id: m.id,
          text: m.text,
          timestamp: new Date(m.created_at).getTime(),
          username: m.username,
          isAdmin: m.is_admin,
        }))
        .reverse();

      setMessages((prev) => [...older, ...prev]);
    }
  }, [messages]);

  return {
    messages,
    loading,
    unreadCount,
    sendMessage,
    deleteMessage,
    loadMoreMessages,
  };
}