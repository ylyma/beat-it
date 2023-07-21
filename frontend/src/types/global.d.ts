declare module '@react-navigation/native' {
    interface realTheme {
        dark: boolean,
        colors: {
            primary: string,
            secondary: string,
            third: string,
            fourth: string,
            fifth: string,
            accent: string,
            failure: string,
            success: string,
            alwayswhite: string,
            otherdark: string,
            otherlight: string,
            alwaysblack: string,
            lightgrey: string,
            black: string,
            white: string,
            light: string,
            dark: string,
            grey: string,
            background: string,
            card: string,
            text: string,
            border: string,
            notification: string,
            secondaryText: string,
        }
    }
    export function useTheme(): realTheme;

}

declare module 'shorthash';

// declare module 'shorthash' {
//     export function unique(str: string): string;
// };
