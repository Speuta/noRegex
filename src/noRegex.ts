export interface iNoRegexOpt {
    acceptStrings?: boolean,
    acceptNumbers?: boolean,
    acceptUppercase?: boolean,
    acceptLowercase?: boolean,
    acceptAccents?: boolean,
    acceptSpecialChars?: boolean,
    acceptWhiteSpaces?: boolean,
    specialRules?: {
        allowedChars?: string,
        forbiddenChars?: string,
    },
    length?: {
        min?: number,
        max?: number,
        equals?: number,
    },
    affix?: {
        startsWith?: string,
        endsWith?: string,
    }
}

export default class noRegex {
    static DEFAULT :iNoRegexOpt = {
        acceptStrings: true,
        acceptNumbers: true,
        acceptUppercase: true,
        acceptLowercase: true,
        acceptAccents: true,
        acceptSpecialChars: true,
        acceptWhiteSpaces: true,
        specialRules: {
            allowedChars: undefined,
            forbiddenChars: undefined,
        },
        length: {
            min: undefined,
            max: undefined,
            equals: undefined,
        },
        affix: {
            startsWith: undefined,
            endsWith: undefined,
        }
    };

    static CHAR_LISTS = {
        LOWER_CASE: 'abcdefghijklmnopqrstuvwxyz',
        UPPER_CASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        /*ACCENTS_BCK: 'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďŽžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ',
        ACCENTS_REPLACE_BCK: 'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdZzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg',*/
        ACCENTS_UPPER: 'ÀÁÂÃÄÅĄĀßÒÓÔÕÕÖØŐĎŽžÈÉÊËĘÇČĆÐÌÍÎÏĪÙÚÛÜŰĽĹŁÑŇŃŔŠŚŞŤŸÝŽŻŹĢĞ',
        ACCENTS_UPPER_REPLACE: 'AAAAAAAASOOOOOOOODZEEEEEECCCDIIIIIUUUUULLLNNNRSSSTYYZZZGG',
        ACCENTS_LOWER: 'āàáâãäåąòóôőõöøďžèéêëęðçčćìíîïīùűúûüľĺłňñńŕšśşťÿýžżźđģğ',
        ACCENTS_LOWER_REPLACE: 'aaaaaaaaooooooodzeeeeeeccciiiiiuuuuulllnnnrssstyyzzzdgg',
        NUMBERS: '0123456789',
        SPECIAL_CHARS: '\\/.,;+*^$€£¤[](){}=!?<>|:-"\'#%&`²~_@§',
    };

    constructor(private _options?: iNoRegexOpt){
        this._options = {
            ...noRegex.DEFAULT,
            ..._options
        };
        return this;
    }

    /**
     * Test if the given string match options.
     * @param str
     * @return boolean
     */
    public test = (str: string) :boolean  => {
        let result = true;
        if((result) && (!this._options.acceptNumbers)){
            result = !this._containNumbers(str);
        }
        if((result) && (!this._options.acceptLowercase)){
            result = !this._containLowercase(str);
        }
        if((result) && (!this._options.acceptUppercase)){
            result = !this._containUppercase(str);
        }
        if((result) && (!this._options.acceptAccents)){
            result = !this._containAccents(str);
        }
        if((result) && (!this._options.acceptStrings)){
            result = !this._containStrings(str);
        }
        if((result) && (!this._options.acceptSpecialChars)){
            result = !this._containSpecialChars(str);
        }
        if((result) && (!this._options.acceptWhiteSpaces)){
            result = !this._containWhiteSpaces(str);
        }

        //specialRules opts
        if((result) && (typeof this._options.specialRules.forbiddenChars === 'string')){
            result = !this._testCharList(str, this._options.specialRules.forbiddenChars);
        }

        //length opts
        if((result) && (typeof this._options.length.equals === 'number')){
            result = (str.length === this._options.length.equals);
        }
        if((result) && (typeof this._options.length.min === 'number')){
            result = (str.length >= this._options.length.min);
        }
        if((result) && (typeof this._options.length.max === 'number')){
            result = (str.length <= this._options.length.max);
        }

        //affix opts
        if((result) && (typeof this._options.affix.startsWith === 'string')){
            result = (str.startsWith(this._options.affix.startsWith));
        }
        if((result) && (typeof this._options.affix.endsWith === 'string')){
            result = (str.endsWith(this._options.affix.endsWith));
        }

        return result;
    };

    /**
     * Remove all characters from the given string that doesn't match options.
     * @param str
     * @return string
     */
    public format = (str: string) :string => {
        if(!this._options.acceptNumbers){
            str = this._replaceNumbers(str);
        }
        if(!this._options.acceptLowercase){
            str = this._replaceLowercase(str);
        }
        if(!this._options.acceptUppercase){
            str = this._replaceUppercase(str);
        }
        if(!this._options.acceptAccents){
            str = this._replaceAccents(str);
        }
        if(!this._options.acceptStrings){
            str = this._replaceStrings(str);
        }
        if(!this._options.acceptSpecialChars){
            str = this._replaceSpecialChars(str);
        }
        if(!this._options.acceptWhiteSpaces){
            str = this._replaceWhiteSpaces(str);
        }

        //specialRules opts
        if(typeof this._options.specialRules.forbiddenChars === 'string'){
            str = this._removeCharList(str, this._options.specialRules.forbiddenChars);
        }

        //length opts
        if(typeof this._options.length.equals === 'number'){
            if(str.length < (this._options.length.equals - this._getMissingAffixLength(str))){
                str = str.padEnd((this._options.length.equals - this._getMissingAffixLength(str)), this._getAllowedCharToFill());
            }
            if(str.length > (this._options.length.equals - this._getMissingAffixLength(str))){
                str = str.substr(0, (this._options.length.equals  - this._getMissingAffixLength(str)));
            }
        }
        if((typeof this._options.length.min === 'number') && (str.length < this._options.length.min)){
            str = str.padEnd(this._options.length.min, this._getAllowedCharToFill());
        }
        if((typeof this._options.length.max === 'number') && (str.length > (this._options.length.max - this._getMissingAffixLength(str)))){
            str = (str.length < (this._options.length.max - this._getMissingAffixLength(str))) ? str : str.substr(0, (this._options.length.max - this._getMissingAffixLength(str)));
        }

        //affix opts
        if(typeof this._options.affix.startsWith === 'string'){
            str = (str.startsWith(this._options.affix.startsWith)) ? str : (this._options.affix.startsWith + str);
        }
        if(typeof this._options.affix.endsWith === 'string'){
            str = (str.endsWith(this._options.affix.endsWith)) ? str : (str + this._options.affix.endsWith);
        }

        return str;
    };



    //HELPERS
    private _isCharAllowedBySpecialRules = (char: string) :boolean => {
        return (typeof this._options.specialRules.allowedChars === 'string') && (this._options.specialRules.allowedChars.split('').indexOf(char) !== -1);
    };
    private _isCharForbiddenBySpecialRules = (char: string) :boolean => {
        return (typeof this._options.specialRules.forbiddenChars === 'string') && (this._options.specialRules.forbiddenChars.indexOf(char) !== -1);
    };

    private _testCharList = (target: string, testList: string) :boolean => {
        let result = false;
        let charArrayTest = testList.split('');
        for (let i = 0; i < charArrayTest.length; i++) {
            if ((target.indexOf(charArrayTest[i]) !== -1) && (!this._isCharAllowedBySpecialRules(charArrayTest[i]))) {
                result = true;
                break;
            }
        }
        return result;
    };

    private _replaceCharList = (target: string, testList: string, replaceList: string) :string => {
        let testArray = testList.split('');
        let replaceArray = replaceList.split('');
        return target.split('').map((char) => {
            return ((testArray.indexOf(char) === -1) || (this._isCharAllowedBySpecialRules(char))) ? char : replaceArray[testArray.indexOf(char)];
        }).join('');
    };

    private _removeCharList = (target: string, testList: string) :string => {
        let testArray = testList.split('');
        return target.split('').map((char) => {
            return ((testArray.indexOf(char) === -1) || (this._isCharAllowedBySpecialRules(char))) ? char : '';
        }).join('');
    };

    private _getAllowedCharToFill = () :string => {
        let result = '';
        if(typeof this._options.specialRules.allowedChars === 'string'){
            result = this._options.specialRules.allowedChars[0];
        } else if(this._options.acceptSpecialChars && (!this._isCharForbiddenBySpecialRules('-'))){
            result = '-';
        } else if(this._options.acceptSpecialChars && (!this._isCharForbiddenBySpecialRules('_'))){
            result = '_';
        } else if(this._options.acceptSpecialChars && (!this._isCharForbiddenBySpecialRules('.'))){
            result = '.';
        } else if(this._options.acceptWhiteSpaces && (!this._isCharForbiddenBySpecialRules(' '))){
            result = ' ';
        } else if(this._options.acceptNumbers && (!this._isCharForbiddenBySpecialRules(' 0'))){
            result = '0';
        } else if(this._options.acceptLowercase && (!this._isCharForbiddenBySpecialRules('a'))){
            result = 'a';
        } else if(this._options.acceptUppercase && (!this._isCharForbiddenBySpecialRules('A'))){
            result = 'A';
        } else if(this._options.acceptAccents && (!this._isCharForbiddenBySpecialRules('à'))){
            result = 'à';
        } else if(this._options.acceptStrings && (!this._isCharForbiddenBySpecialRules('a'))){
            result = 'a';
        }
        return result;
    };

    private _getMissingAffixLength = (str) :number => {
        let count = 0;
        if(typeof this._options.affix.startsWith === 'string'){
            count += (str.startsWith(this._options.affix.startsWith)) ? 0 : this._options.affix.startsWith.length;
        }
        if(typeof this._options.affix.endsWith === 'string'){
            count += (str.endsWith(this._options.affix.endsWith)) ? 0 : this._options.affix.endsWith.length;
        }
        return count;
    };



    //UPPERCASE
    private _containUppercase = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_UPPER);
    };
    private _replaceUppercase = (str: string) :string => {
        let tmp = this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_UPPER, noRegex.CHAR_LISTS.ACCENTS_UPPER_REPLACE);
        return this._replaceCharList(tmp, noRegex.CHAR_LISTS.UPPER_CASE, noRegex.CHAR_LISTS.LOWER_CASE);
    };

    //LOWERCASE
    private _containLowercase = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER);
    };
    private _replaceLowercase = (str: string) :string => {
        let tmp = this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER, noRegex.CHAR_LISTS.ACCENTS_LOWER_REPLACE);
        return this._replaceCharList(tmp, noRegex.CHAR_LISTS.LOWER_CASE, noRegex.CHAR_LISTS.UPPER_CASE);
    };

    //STRINGS
    private _containStrings = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
    };
    private _replaceStrings = (str: string) :string => {
        return this._removeCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
    };

    //NUMBERS
    private _containNumbers = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.NUMBERS);
    };
    private _replaceNumbers = (str: string) :string => {
        return this._removeCharList(str, noRegex.CHAR_LISTS.NUMBERS);
    };

    //ACCENTS
    private _containAccents = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
    };
    private _replaceAccents = (str: string) :string => {
        return this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER, noRegex.CHAR_LISTS.ACCENTS_LOWER_REPLACE + noRegex.CHAR_LISTS.ACCENTS_UPPER_REPLACE);
    };

    //SPECIAL CHARS
    private _containSpecialChars = (str: string) :boolean => {
        return this._testCharList(str, noRegex.CHAR_LISTS.SPECIAL_CHARS);
    };
    private _replaceSpecialChars = (str: string) :string => {
        return this._removeCharList(str, noRegex.CHAR_LISTS.SPECIAL_CHARS);
    };

    //WHITE SPACES
    private _containWhiteSpaces = (str: string) :boolean => {
        return this._testCharList(str, ' ');
    };
    private _replaceWhiteSpaces = (str: string) :string => {
        return this._removeCharList(str, ' ');
    };
}
