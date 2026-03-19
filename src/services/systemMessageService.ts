import { supabase } from '../supabase';

export interface SystemMessage {
  id: string;
  text: string;
  messageType: 'maintenance' | 'error' | 'info';
  createdBy: string;
  createdAt: string;
  isActive: boolean;
  priority: number;
}

export const getActiveSystemMessages = async (): Promise<SystemMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('system_messages')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row: any) => ({
      id: row.id,
      text: row.text,
      messageType: row.message_type,
      createdBy: row.created_by,
      createdAt: row.created_at,
      isActive: row.is_active,
      priority: row.priority,
    }));
  } catch (error) {
    console.error('Error fetching system messages:', error);
    return [];
  }
};

export const createSystemMessage = async (
  text: string,
  messageType: 'maintenance' | 'error' | 'info',
  priority: number = 3
): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from('system_messages').insert({
      text,
      message_type: messageType,
      created_by: user.id,
      priority,
      is_active: true,
    });

    return !error;
  } catch (error) {
    console.error('Error creating system message:', error);
    return false;
  }
};

export const deactivateSystemMessage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('system_messages')
      .update({ is_active: false })
      .eq('id', id);

    return !error;
  } catch (error) {
    console.error('Error deactivating system message:', error);
    return false;
  }
};

export const deleteSystemMessage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('system_messages')
      .delete()
      .eq('id', id);

    return !error;
  } catch (error) {
    console.error('Error deleting system message:', error);
    return false;
  }
};
