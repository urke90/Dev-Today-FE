import { getServerSession } from 'next-auth';
import React from 'react';

import { authOptions } from '@/lib/auth-options';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
