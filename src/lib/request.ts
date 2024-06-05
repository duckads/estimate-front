import { getSession } from 'next-auth/react';
import { METHOD } from './apis';

const BASE_URL = 'http://localhost:8080';

/**
 * URL에서 데이터를 가져와서 JSON 형식으로 반환하는 함수
 *
 * @param { string | URL } url - 요청 URL
 * @param options
 * @param method
 * @param body
 * @returns { Promise<any> } - 요청이 성공하면 JSON 데이터가 포함된 Promise를 반환
 * @throws { Error } - 요청이 실패하거나 응답 상태가 ok가 아닌 경우 에러 발생
 */
async function fetchData(url: string | URL, options: RequestInit = { }, method: string = 'GET', body: Object = {} ): Promise<any> {
  const defaultOptions: RequestInit = {
    method: method,
    body: JSON.stringify(body),
    credentials: 'include'
  }
  options = { ...defaultOptions, ...options }

  try {
    const response = await fetch(BASE_URL + url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${ response.status }`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch Error: ${ error }`);
    throw error;
  }
}

/**
 * URL로 HTTP 요청을 보내고 기본 헤더와 함께 JSON 형식의 응답을 반환하는 함수
 *
 * @param { string | URL } url - 요청 URL
 * @param options
 * @param method
 * @param body
 * @param method
 * @param body
 * @returns { Promise<any> } - 요청이 성공하면 JSON 데이터가 포함된 Promise를 반환
 */
export async function fetchDataWithHeader(url: string | URL, options: RequestInit = { }, method: string = 'GET', body: Object = {}): Promise<any> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  options.headers = {
    ...defaultHeaders,
    ...options.headers,
  }

  return fetchData(url, options, method, body);
}

/**
 * URL로 HTTP 요청을 accessToken 과 함께 보냄
 *
 * @param { string | URL } url - 요청 URL
 * @param options
 * @param method
 * @param body
 * @returns { Promise<any> } - 요청이 성공하면 JSON 데이터가 포함된 Promise를 반환
 */
export async function fetchDataWithToken(url: string | URL, options: RequestInit = { }, method: string = 'GET', body: Object = {}): Promise<any> {
  const session = await getSession();
  const accessToken = session?.accessToken;

  options.headers = {
    'x-authorization': `Bearer ${ accessToken }`
  }

  return fetchDataWithHeader(url, options, method, body);
}