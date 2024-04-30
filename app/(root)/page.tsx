import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
