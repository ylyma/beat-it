// eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
const auth = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
};

export default auth;
