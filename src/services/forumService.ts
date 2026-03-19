import { supabase } from '../supabase';
import { Topic, Message } from '../types/forum';
import { checkIsAdmin } from './adminService';

export const getTopics = async (): Promise<Topic[]> => {
  try {
    const { data, error } = await supabase
      .from('forum_topics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      creador: row.creador,
      creadorNombre: row.creador_nombre,
      creadoEn: row.created_at,
      mensajesCount: row.mensajes_count,
      isAdmin: row.is_admin || false,
    }));
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

export const getTopicMessages = async (topicId: string): Promise<Message[]> => {
  try {
    const { data, error } = await supabase
      .from('forum_messages')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id,
      contenido: row.contenido,
      autor: row.autor,
      autorNombre: row.autor_nombre,
      creadoEn: row.created_at,
      isAdmin: row.is_admin || false,
    }));
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const createTopic = async (
  title: string,
  description: string,
  userId: string,
  displayName: string
): Promise<string | null> => {
  try {
    const isAdmin = await checkIsAdmin(userId);
    const { data, error } = await supabase
      .from('forum_topics')
      .insert({
        titulo: title,
        descripcion: description,
        creador: userId,
        creador_nombre: displayName,
        mensajes_count: 0,
        is_admin: isAdmin,
      })
      .select('id')
      .single();

    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating topic:', error);
    return null;
  }
};

export const createMessage = async (
  topicId: string,
  content: string,
  userId: string,
  displayName: string
): Promise<string | null> => {
  try {
    const isAdmin = await checkIsAdmin(userId);
    const { data, error } = await supabase
      .from('forum_messages')
      .insert({
        topic_id: topicId,
        contenido: content,
        autor: userId,
        autor_nombre: displayName,
        is_admin: isAdmin,
      })
      .select('id')
      .single();

    if (error) throw error;

    // Update the topic's message count
    const { data: topicData } = await supabase
      .from('forum_topics')
      .select('mensajes_count')
      .eq('id', topicId)
      .single();

    if (topicData) {
      await supabase
        .from('forum_topics')
        .update({ mensajes_count: (topicData.mensajes_count ?? 0) + 1 })
        .eq('id', topicId);
    }

    return data.id;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
};

export const deleteTopic = async (
  topicId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const { data: topicData, error: fetchError } = await supabase
      .from('forum_topics')
      .select('creador')
      .eq('id', topicId)
      .single();

    if (fetchError || !topicData) {
      return { success: false, error: 'Tema no encontrado' };
    }

    const isAdmin = await checkIsAdmin(user.id);
    const isOwner = topicData.creador === user.id;

    if (!isOwner && !isAdmin) {
      return {
        success: false,
        error: 'No tienes permiso para eliminar este tema',
      };
    }

    // Delete messages first (cascade should handle this, but be explicit)
    await supabase
      .from('forum_messages')
      .delete()
      .eq('topic_id', topicId);

    const { error } = await supabase
      .from('forum_topics')
      .delete()
      .eq('id', topicId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting topic:', error);
    return {
      success: false,
      error: 'Error al eliminar el tema. Por favor, intenta de nuevo.',
    };
  }
};

export const deleteMessage = async (
  topicId: string,
  messageId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Usuario no autenticado' };
    }

    const { data: messageData, error: fetchError } = await supabase
      .from('forum_messages')
      .select('autor')
      .eq('id', messageId)
      .single();

    if (fetchError || !messageData) {
      return { success: false, error: 'Mensaje no encontrado' };
    }

    const isAdmin = await checkIsAdmin(user.id);
    const isOwner = messageData.autor === user.id;

    if (!isOwner && !isAdmin) {
      return {
        success: false,
        error: 'No tienes permiso para eliminar este mensaje',
      };
    }

    const { error } = await supabase
      .from('forum_messages')
      .delete()
      .eq('id', messageId);

    if (error) throw error;

    // Update the topic's message count
    const { data: topicData } = await supabase
      .from('forum_topics')
      .select('mensajes_count')
      .eq('id', topicId)
      .single();

    if (topicData) {
      await supabase
        .from('forum_topics')
        .update({
          mensajes_count: Math.max(0, (topicData.mensajes_count ?? 0) - 1),
        })
        .eq('id', topicId);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    return {
      success: false,
      error: 'Error al eliminar el mensaje. Por favor, intenta de nuevo.',
    };
  }
};
