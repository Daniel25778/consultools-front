export enum routePaths {
  login = '/',
  register = '/cadastro',

  home = '/home',

  detection = '/deteccoes',
  detectionDetail = '/deteccoes/:detectionId',

  yolo = '/yolo',
  yoloDetail = '/yolo/:yoloId',

  profile = '/perfil',
}

type Param<K extends string> = {
  [P in K]: string;
};

export const paths = {
  login: '/',
  register: '/cadastro',

  home: '/home',

  detection: '/deteccoes',
  detectionDetail: ({ detectionId }: Param<'detectionId'>): string =>
    `/deteccoes/${detectionId}`,

  yolo: '/yolo',
  yoloDetail: ({ yoloId }: Param<'yoloId'>): string => `/yolo/${yoloId}`,

  profile: '/perfil',
};

export const apiPaths = {
  default: '/default',
  login: '/login',
  user: '/user',
  detection: '/detection',
  yolo: '/yolo',
};
