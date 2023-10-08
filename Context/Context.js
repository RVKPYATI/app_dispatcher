'use client';

import React, { createContext, useContext, useState } from 'react';
import useSWR from 'swr';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { fetcher } from '@/utils/helpers';

// Создаем контекст
const UserDataTimeContext = createContext();

/*Получаем полную информацию о user который сейчас залогинен*/
// Создаем провайдер
export const MyProvider = ({ children }) => {
  const { getValue } = useLocalStorage();
  const userId = getValue('Authorization');
  const { data } = useSWR(`/api/users/${userId}`, fetcher);
  const [userData, setUserData] = useState(data);

  return (
    <UserDataTimeContext.Provider value={{ userData: data, setUserData }}>
      {children}
    </UserDataTimeContext.Provider>
  );
};

export const useMyContext = () => useContext(UserDataTimeContext);
