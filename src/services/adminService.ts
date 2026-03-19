import { supabase } from '../supabase';

export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    return !!data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

export const checkIsSuperAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data } = await supabase
      .from('superadmins')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    return !!data;
  } catch (error) {
    console.error('Error checking superadmin status:', error);
    return false;
  }
};

export const getCurrentUserSuperAdminStatus = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  return await checkIsSuperAdmin(user.id);
};

export const getCurrentUserAdminStatus = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  return await checkIsAdmin(user.id);
};

export const addAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const isSuperAdmin = await checkIsSuperAdmin(user.id);
    if (!isSuperAdmin) {
      console.error('Solo los SuperAdmins pueden agregar administradores');
      return false;
    }

    const { error } = await supabase.from('admins').insert({
      user_id: userId,
      added_by: user.id,
    });
    return !error;
  } catch (error) {
    console.error('Error adding admin:', error);
    return false;
  }
};

export const getAllAdmins = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: row.user_id,
      addedAt: row.added_at,
      addedBy: row.added_by,
    }));
  } catch (error) {
    console.error('Error fetching admins:', error);
    return [];
  }
};

export const removeAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const isSuperAdmin = await checkIsSuperAdmin(user.id);
    if (!isSuperAdmin) {
      console.error('Solo los SuperAdmins pueden eliminar administradores');
      return false;
    }

    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('user_id', userId);
    return !error;
  } catch (error) {
    console.error('Error removing admin:', error);
    return false;
  }
};

export const deleteReview = async (reviewId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const isAdmin = await checkIsAdmin(user.id);
    const isSuperAdmin = await checkIsSuperAdmin(user.id);

    if (!isAdmin && !isSuperAdmin) {
      console.error('Solo los administradores pueden eliminar reseñas');
      return false;
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);
    return !error;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
};
