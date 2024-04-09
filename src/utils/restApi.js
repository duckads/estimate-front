import {getCookie} from "./cookieUtil";

const BASE_URL = 'http://localhost:8080';

let token = getCookie('token');

const RestApi = async (endpoint, method, options = {}) => {
    const url = `${BASE_URL}/${endpoint}`;

    // 기본 헤더 설정
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'x-authorization': 'Bearer ' + token
    };

    try {
        const response = await fetch(url, {
            method: method,
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers, // 사용자가 직접 설정한 헤더와 병합
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // 호출하는 부분에서 에러 처리를 위해 다시 throw
    }
};
export default RestApi;