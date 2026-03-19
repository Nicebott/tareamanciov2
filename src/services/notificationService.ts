import { supabase } from '../supabase';

export interface Notification {
  id: string;
  title: string;
  message: string;
  createdBy: string;
  createdAt: string;
  status: 'active' | 'archived';
}

export const sendNotification = async (title: string, message: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase.from('notifications').insert({
      title,
      message,
      created_by: user.id,
      status: 'active',
    });

    return !error;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

export const getAllNotifications = async (): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((n: any) => ({
      id: n.id,
      title: n.title,
      message: n.message,
      createdBy: n.created_by,
      createdAt: n.created_at,
      status: n.status,
    }));
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const archiveNotification = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ status: 'archived' })
      .eq('id', id);

    return !error;
  } catch (error) {
    console.error('Error archiving notification:', error);
    return false;
  }
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id);

    return !error;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};
