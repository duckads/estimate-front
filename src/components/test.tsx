'use client';

import { fetchDataWithToken } from '@/lib/request';
import { useEffect, useState } from 'react';

export function TestComp() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetchDataWithToken('/estimates', {
        method: 'GET', // HTTP 메서드 대문자로 수정
      });
      setData(res);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={ fetchData }>요청</button>
      test comp
    </div>
  )
}