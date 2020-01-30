export interface iNoRegexOpt {
    acceptStrings?: boolean;
    acceptNumbers?: boolean;
    acceptUppercase?: boolean;
    acceptLowercase?: boolean;
    acceptAccents?: boolean;
    acceptSpecialChars?: boolean;
    acceptWhiteSpaces?: boolean;
    specialRules?: {
        allowedChars?: string;
        forbiddenChars?: string;
    };
    length?: {
        min?: number;
        max?: number;
        equals?: number;
    };
    affix?: {
        startsWith?: string;
        endsWith?: string;
    };
}
export default class noRegex {
    private _options?;
    static DEFAULT: iNoRegexOpt;
    static CHAR_LISTS: {
        LOWER_CASE: string;
        UPPER_CASE: string;
        ACCENTS_UPPER: string;
        ACCENTS_UPPER_REPLACE: string;
        ACCENTS_LOWER: string;
        ACCENTS_LOWER_REPLACE: string;
        NUMBERS: string;
        SPECIAL_CHARS: string;
    };
    constructor(_options?: iNoRegexOpt);
    test: (str: string) => boolean;
    format: (str: string) => string;
    private _isCharAllowedBySpecialRules;
    private _isCharForbiddenBySpecialRules;
    private _testCharList;
    private _replaceCharList;
    private _removeCharList;
    private _getAllowedCharToFill;
    private _getMissingAffixLength;
    private _containUppercase;
    private _replaceUppercase;
    private _containLowercase;
    private _replaceLowercase;
    private _containStrings;
    private _replaceStrings;
    private _containNumbers;
    private _replaceNumbers;
    private _containAccents;
    private _replaceAccents;
    private _containSpecialChars;
    private _replaceSpecialChars;
    private _containWhiteSpaces;
    private _replaceWhiteSpaces;
}
