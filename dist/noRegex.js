(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.noRegex = factory());
}(this, (function () { 'use strict';

    console.log("noRegex v0.1.0")

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var noRegex = (function () {
        function noRegex(_options) {
            var _this = this;
            this._options = _options;
            this.test = function (str) {
                var result = true;
                if ((result) && (!_this._options.acceptNumbers)) {
                    result = !_this._containNumbers(str);
                }
                if ((result) && (!_this._options.acceptLowercase)) {
                    result = !_this._containLowercase(str);
                }
                if ((result) && (!_this._options.acceptUppercase)) {
                    result = !_this._containUppercase(str);
                }
                if ((result) && (!_this._options.acceptAccents)) {
                    result = !_this._containAccents(str);
                }
                if ((result) && (!_this._options.acceptStrings)) {
                    result = !_this._containStrings(str);
                }
                if ((result) && (!_this._options.acceptSpecialChars)) {
                    result = !_this._containSpecialChars(str);
                }
                if ((result) && (!_this._options.acceptWhiteSpaces)) {
                    result = !_this._containWhiteSpaces(str);
                }
                if ((result) && (typeof _this._options.specialRules.forbiddenChars === 'string')) {
                    result = !_this._testCharList(str, _this._options.specialRules.forbiddenChars);
                }
                if ((result) && (typeof _this._options.length.equals === 'number')) {
                    result = (str.length === _this._options.length.equals);
                }
                if ((result) && (typeof _this._options.length.min === 'number')) {
                    result = (str.length >= _this._options.length.min);
                }
                if ((result) && (typeof _this._options.length.max === 'number')) {
                    result = (str.length <= _this._options.length.max);
                }
                if ((result) && (typeof _this._options.affix.startsWith === 'string')) {
                    result = (str.startsWith(_this._options.affix.startsWith));
                }
                if ((result) && (typeof _this._options.affix.endsWith === 'string')) {
                    result = (str.endsWith(_this._options.affix.endsWith));
                }
                return result;
            };
            this.format = function (str) {
                if (!_this._options.acceptNumbers) {
                    str = _this._replaceNumbers(str);
                }
                if (!_this._options.acceptLowercase) {
                    str = _this._replaceLowercase(str);
                }
                if (!_this._options.acceptUppercase) {
                    str = _this._replaceUppercase(str);
                }
                if (!_this._options.acceptAccents) {
                    str = _this._replaceAccents(str);
                }
                if (!_this._options.acceptStrings) {
                    str = _this._replaceStrings(str);
                }
                if (!_this._options.acceptSpecialChars) {
                    str = _this._replaceSpecialChars(str);
                }
                if (!_this._options.acceptWhiteSpaces) {
                    str = _this._replaceWhiteSpaces(str);
                }
                if (typeof _this._options.specialRules.forbiddenChars === 'string') {
                    str = _this._removeCharList(str, _this._options.specialRules.forbiddenChars);
                }
                if (typeof _this._options.length.equals === 'number') {
                    if (str.length < (_this._options.length.equals - _this._getMissingAffixLength(str))) {
                        str = str.padEnd((_this._options.length.equals - _this._getMissingAffixLength(str)), _this._getAllowedCharToFill());
                    }
                    if (str.length > (_this._options.length.equals - _this._getMissingAffixLength(str))) {
                        str = str.substr(0, (_this._options.length.equals - _this._getMissingAffixLength(str)));
                    }
                }
                if ((typeof _this._options.length.min === 'number') && (str.length < _this._options.length.min)) {
                    str = str.padEnd(_this._options.length.min, _this._getAllowedCharToFill());
                }
                if ((typeof _this._options.length.max === 'number') && (str.length > (_this._options.length.max - _this._getMissingAffixLength(str)))) {
                    str = (str.length < (_this._options.length.max - _this._getMissingAffixLength(str))) ? str : str.substr(0, (_this._options.length.max - _this._getMissingAffixLength(str)));
                }
                if (typeof _this._options.affix.startsWith === 'string') {
                    str = (str.startsWith(_this._options.affix.startsWith)) ? str : (_this._options.affix.startsWith + str);
                }
                if (typeof _this._options.affix.endsWith === 'string') {
                    str = (str.endsWith(_this._options.affix.endsWith)) ? str : (str + _this._options.affix.endsWith);
                }
                return str;
            };
            this._isCharAllowedBySpecialRules = function (char) {
                return (typeof _this._options.specialRules.allowedChars === 'string') && (_this._options.specialRules.allowedChars.split('').indexOf(char) !== -1);
            };
            this._isCharForbiddenBySpecialRules = function (char) {
                return (typeof _this._options.specialRules.forbiddenChars === 'string') && (_this._options.specialRules.forbiddenChars.indexOf(char) !== -1);
            };
            this._testCharList = function (target, testList) {
                var result = false;
                var charArrayTest = testList.split('');
                for (var i = 0; i < charArrayTest.length; i++) {
                    if ((target.indexOf(charArrayTest[i]) !== -1) && (!_this._isCharAllowedBySpecialRules(charArrayTest[i]))) {
                        result = true;
                        break;
                    }
                }
                return result;
            };
            this._replaceCharList = function (target, testList, replaceList) {
                var testArray = testList.split('');
                var replaceArray = replaceList.split('');
                return target.split('').map(function (char) {
                    return ((testArray.indexOf(char) === -1) || (_this._isCharAllowedBySpecialRules(char))) ? char : replaceArray[testArray.indexOf(char)];
                }).join('');
            };
            this._removeCharList = function (target, testList) {
                var testArray = testList.split('');
                return target.split('').map(function (char) {
                    return ((testArray.indexOf(char) === -1) || (_this._isCharAllowedBySpecialRules(char))) ? char : '';
                }).join('');
            };
            this._getAllowedCharToFill = function () {
                var result = '';
                if (typeof _this._options.specialRules.allowedChars === 'string') {
                    result = _this._options.specialRules.allowedChars[0];
                }
                else if (_this._options.acceptSpecialChars && (!_this._isCharForbiddenBySpecialRules('-'))) {
                    result = '-';
                }
                else if (_this._options.acceptSpecialChars && (!_this._isCharForbiddenBySpecialRules('_'))) {
                    result = '_';
                }
                else if (_this._options.acceptSpecialChars && (!_this._isCharForbiddenBySpecialRules('.'))) {
                    result = '.';
                }
                else if (_this._options.acceptWhiteSpaces && (!_this._isCharForbiddenBySpecialRules(' '))) {
                    result = ' ';
                }
                else if (_this._options.acceptNumbers && (!_this._isCharForbiddenBySpecialRules(' 0'))) {
                    result = '0';
                }
                else if (_this._options.acceptLowercase && (!_this._isCharForbiddenBySpecialRules('a'))) {
                    result = 'a';
                }
                else if (_this._options.acceptUppercase && (!_this._isCharForbiddenBySpecialRules('A'))) {
                    result = 'A';
                }
                else if (_this._options.acceptAccents && (!_this._isCharForbiddenBySpecialRules('à'))) {
                    result = 'à';
                }
                else if (_this._options.acceptStrings && (!_this._isCharForbiddenBySpecialRules('a'))) {
                    result = 'a';
                }
                return result;
            };
            this._getMissingAffixLength = function (str) {
                var count = 0;
                if (typeof _this._options.affix.startsWith === 'string') {
                    count += (str.startsWith(_this._options.affix.startsWith)) ? 0 : _this._options.affix.startsWith.length;
                }
                if (typeof _this._options.affix.endsWith === 'string') {
                    count += (str.endsWith(_this._options.affix.endsWith)) ? 0 : _this._options.affix.endsWith.length;
                }
                return count;
            };
            this._containUppercase = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_UPPER);
            };
            this._replaceUppercase = function (str) {
                var tmp = _this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_UPPER, noRegex.CHAR_LISTS.ACCENTS_UPPER_REPLACE);
                return _this._replaceCharList(tmp, noRegex.CHAR_LISTS.UPPER_CASE, noRegex.CHAR_LISTS.LOWER_CASE);
            };
            this._containLowercase = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER);
            };
            this._replaceLowercase = function (str) {
                var tmp = _this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER, noRegex.CHAR_LISTS.ACCENTS_LOWER_REPLACE);
                return _this._replaceCharList(tmp, noRegex.CHAR_LISTS.LOWER_CASE, noRegex.CHAR_LISTS.UPPER_CASE);
            };
            this._containStrings = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
            };
            this._replaceStrings = function (str) {
                return _this._removeCharList(str, noRegex.CHAR_LISTS.LOWER_CASE + noRegex.CHAR_LISTS.UPPER_CASE + noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
            };
            this._containNumbers = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.NUMBERS);
            };
            this._replaceNumbers = function (str) {
                return _this._removeCharList(str, noRegex.CHAR_LISTS.NUMBERS);
            };
            this._containAccents = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER);
            };
            this._replaceAccents = function (str) {
                return _this._replaceCharList(str, noRegex.CHAR_LISTS.ACCENTS_LOWER + noRegex.CHAR_LISTS.ACCENTS_UPPER, noRegex.CHAR_LISTS.ACCENTS_LOWER_REPLACE + noRegex.CHAR_LISTS.ACCENTS_UPPER_REPLACE);
            };
            this._containSpecialChars = function (str) {
                return _this._testCharList(str, noRegex.CHAR_LISTS.SPECIAL_CHARS);
            };
            this._replaceSpecialChars = function (str) {
                return _this._removeCharList(str, noRegex.CHAR_LISTS.SPECIAL_CHARS);
            };
            this._containWhiteSpaces = function (str) {
                return _this._testCharList(str, ' ');
            };
            this._replaceWhiteSpaces = function (str) {
                return _this._removeCharList(str, ' ');
            };
            this._options = __assign(__assign({}, noRegex.DEFAULT), _options);
            return this;
        }
        noRegex.DEFAULT = {
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
        noRegex.CHAR_LISTS = {
            LOWER_CASE: 'abcdefghijklmnopqrstuvwxyz',
            UPPER_CASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            ACCENTS_UPPER: 'ÀÁÂÃÄÅĄĀßÒÓÔÕÕÖØŐĎŽžÈÉÊËĘÇČĆÐÌÍÎÏĪÙÚÛÜŰĽĹŁÑŇŃŔŠŚŞŤŸÝŽŻŹĢĞ',
            ACCENTS_UPPER_REPLACE: 'AAAAAAAASOOOOOOOODZEEEEEECCCDIIIIIUUUUULLLNNNRSSSTYYZZZGG',
            ACCENTS_LOWER: 'āàáâãäåąòóôőõöøďžèéêëęðçčćìíîïīùűúûüľĺłňñńŕšśşťÿýžżźđģğ',
            ACCENTS_LOWER_REPLACE: 'aaaaaaaaooooooodzeeeeeeccciiiiiuuuuulllnnnrssstyyzzzdgg',
            NUMBERS: '0123456789',
            SPECIAL_CHARS: '\\/.,;+*^$€£¤[](){}=!?<>|:-"\'#%&`²~_@§',
        };
        return noRegex;
    }());

    return noRegex;

})));
//# sourceMappingURL=noRegex.js.map
