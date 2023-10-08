'use client';

import { useState } from 'react';
import LogInForm from '../LogInForm/LogInForm';
import RegForm from '../RegForm/RegForm';

function Enter() {
  const [registration, setRegistration] = useState(false);

  return (
    <div className='w-full px-5'>
      {registration ? (
        <RegForm reg={setRegistration} />
      ) : (
        <LogInForm reg={setRegistration} />
      )}
    </div>
  );
}

export default Enter;
