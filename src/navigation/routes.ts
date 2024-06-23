export enum ROUTES {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
}
export type AppStackParamList = {
  [x in keyof typeof ROUTES]: {
    id?: number;
  };
};
