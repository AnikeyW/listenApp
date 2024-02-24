import React from 'react';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';

const Page = () => {
  return (
    <PrivateRoute>
      <div>favorites</div>
    </PrivateRoute>
  );
};

export default Page;
