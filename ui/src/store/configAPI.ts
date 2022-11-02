export const SERVER_URL = 'http://hisokacards.online';

export const BASE_URL = SERVER_URL + '/api/v1';
// export const BASE_URL = 'http://localhost/api/v1';

export const CREATE_USER = BASE_URL + '/users';

export const GET_USER_INFO = BASE_URL + '/users/profile';

export const START_SESSION = BASE_URL + '/sessions';

export const UPLOAD_IMG = BASE_URL + '/files/images';

export const CREATE_MODULE = BASE_URL + '/modules';

export const GET_ALL_MODULES = BASE_URL + '/modules';

export const CREATE_WORD = BASE_URL + '/words';

export const GET_WORDS_BY_ID = (id: string) => BASE_URL + `/words?moduleId=${id}`;

export const GET_MODULE_BY_ID = (id: string) => GET_ALL_MODULES + '/' + id;

export const UPDATE_MODULE_BY_ID = (id: string) => BASE_URL + `/modules/${id}`;

export const UPDATE_WORD_BY_ID = (id: string) => BASE_URL + `/words/${id}`;

export const GET_MODULES_WITH_PAGINATION = (num: number) => `${GET_ALL_MODULES}?offset=${(num - 1) * 12}&limit=12`;

export const GET_WORDS_WITH_PAGINATION = (id: string, num: number) =>
  BASE_URL + `/words?moduleId=${id}&offset=${(num - 1) * 8}&limit=8`;

export const GET_MODULES_BY_NAME = (name: string) => `${GET_ALL_MODULES}?search=${name}`;

export const DELETE_MODULE_BY_ID = (id: string) => BASE_URL + `/modules/${id}`;

export const DELETE_WORD_BY_ID = (id: string) => BASE_URL + `/words/${id}`;
