'use server';

import { revalidatePath } from 'next/cache';

// ----------------------------------------------------------------

export const revalidateRoute = async (
  path: string,
  type?: 'layout' | 'page'
) => {
  revalidatePath(path, (type = 'page'));
};
