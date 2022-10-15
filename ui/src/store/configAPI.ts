// export const BASE_URL = 'http://hisokacards.online/api/v1';
export const BASE_URL = 'http://localhost/api/v1';

export const CREATE_USER = BASE_URL + '/users';

export const GET_USER_INFO = BASE_URL + '/users/profile';

export const START_SESSION = BASE_URL + '/sessions';

export const UPLOAD_IMG = BASE_URL + '/files/images';

export const CREATE_MODULE = BASE_URL + '/modules';

export const GET_ALL_MODULES = BASE_URL + '/modules';

export const GET_MODULES_WITH_PAGINATION = (num: number) => `${GET_ALL_MODULES}?offset=${(num - 1) * 12}&limit=12`;

export const GET_MODULES_BY_NAME = (name: string) => `${GET_ALL_MODULES}?search=${name}`;
