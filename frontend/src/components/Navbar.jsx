import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { tasksList, error } = useSelector((state) => state.tasks);
  return (
    <>
      <h1 className='text-center my-4 text-primary'>Task Management App</h1>
      <p className='text-center'>
        {`Currently ${tasksList.length} task(s) pending`}
      </p>
      {error !== '' ? (
        <h5 className='text-center my-2 text-danger'>{error}</h5>
      ) : null}
    </>
  );
};

export default Navbar;
