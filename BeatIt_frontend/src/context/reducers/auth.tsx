// eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
const auth = (state: any, {type, payload} : any) => {
  switch (type) {
    case 'LOGIN':
      return state;
    default:
      return state;
  }
};

export default auth;
