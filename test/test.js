if(typeof location === 'undefined'){
    var assert = require('assert');
    var chai = require('chai');
    var noRegex = require('../dist/noRegex.min.js');
}

var expect = chai.expect;

describe('API', function() {
    it('exist', function() {
        expect(noRegex).to.exist;
    });
    it('instantiate', function() {
        var _myTest = new noRegex();
        expect(_myTest).to.exist;
    });
});

describe('test(...)', function() {
    it('acceptStrings', function() {
        var _myTest = new noRegex({
            acceptStrings: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('12345A6789')).to.be.false;
        expect(_myTest.test('fjksdh gfkjsdglkj')).to.be.false;
        expect(_myTest.test('AZUIGAG')).to.be.false;
        expect(_myTest.test('ééé')).to.be.false;
        expect(_myTest.test('ÉÄ')).to.be.false;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('acceptNumbers', function() {
        var _myTest = new noRegex({
            acceptNumbers: false
        });
        expect(_myTest.test('123456789')).to.be.false;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.false;
        expect(_myTest.test('fjksdh gfkjsdglkj')).to.be.true;
        expect(_myTest.test('AZUIGAG')).to.be.true;
        expect(_myTest.test('ééé')).to.be.true;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('acceptUppercase', function() {
        var _myTest = new noRegex({
            acceptUppercase: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.true;
        expect(_myTest.test('fjks  dhgfkjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgfkAjsdglkj')).to.be.false;
        expect(_myTest.test('AZUIGAG')).to.be.false;
        expect(_myTest.test('éééÉ')).to.be.false;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('acceptLowercase', function() {
        var _myTest = new noRegex({
            acceptLowercase: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.false;
        expect(_myTest.test('fjks dhgfkjsdglkj')).to.be.false;
        expect(_myTest.test('fjksdhgfkAjsdglkj')).to.be.false;
        expect(_myTest.test('AZUIGAG')).to.be.true;
        expect(_myTest.test('éééÉ')).to.be.false;
        expect(_myTest.test('É')).to.be.true;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('acceptAccents', function() {
        var _myTest = new noRegex({
            acceptAccents: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('abcdefghijklmnopqrstuvwxyz')).to.be.true;
        expect(_myTest.test('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).to.be.true;
        expect(_myTest.test('fjksdh gfkjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgfkAjsdglkj')).to.be.true;
        expect(_myTest.test('AZUIGAG')).to.be.true;
        expect(_myTest.test('éééÉ')).to.be.false;
        expect(_myTest.test('É')).to.be.false;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('acceptSpecialChars', function() {
        var _myTest = new noRegex({
            acceptSpecialChars: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgfkjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgfkA@jsdglkj')).to.be.false;
        expect(_myTest.test('AZUIGAG')).to.be.true;
        expect(_myTest.test('éééÉ')).to.be.true;
        expect(_myTest.test('É')).to.be.true;
        expect(_myTest.test('@()-_')).to.be.false;
    });
    it('acceptWhiteSpaces', function() {
        var _myTest = new noRegex({
            acceptWhiteSpaces: false
        });
        expect(_myTest.test('123456789')).to.be.true;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgf kjsdglkj')).to.be.false;
        expect(_myTest.test(' fjksdhgfkjsdglkj')).to.be.false;
        expect(_myTest.test('fjksdhgfkjsdglkj ')).to.be.false;
        expect(_myTest.test(' fjksdhgfkjsdglkj ')).to.be.false;
        expect(_myTest.test('fjksdhgfkA@jsdglkj')).to.be.true;
        expect(_myTest.test('AZUIGAG')).to.be.true;
        expect(_myTest.test('éééÉ')).to.be.true;
        expect(_myTest.test('É')).to.be.true;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('specialRules', function() {
        var _myTest = new noRegex({
            acceptStrings: true,
            acceptNumbers: false,
            specialRules: {
                allowedChars: '9',
                forbiddenChars: 'aA'
            }
        });
        expect(_myTest.test('123456789')).to.be.false;
        expect(_myTest.test('9999')).to.be.true;
        expect(_myTest.test('fjksdhgf1kjsdglkj')).to.be.false;
        expect(_myTest.test('fjksdhgf kjsdglkj')).to.be.true;
        expect(_myTest.test(' fjksdhgfkjsdglkj')).to.be.true;
        expect(_myTest.test('fjksdhgfkjsdglkj ')).to.be.true;
        expect(_myTest.test(' fjksdhgfkjBsdglkj ')).to.be.true;
        expect(_myTest.test('fjksdhgfkA@jsdglkj')).to.be.false;
        expect(_myTest.test('AZUIGAG')).to.be.false;
        expect(_myTest.test('éééÉ')).to.be.true;
        expect(_myTest.test('É')).to.be.true;
        expect(_myTest.test('@()-_')).to.be.true;
    });
    it('length', function() {
        var _myTest = new noRegex({
            length: {
                min: 5,
                max: 20
            }
        });
        expect(_myTest.test('123')).to.be.false;
        expect(_myTest.test('999999')).to.be.true;
        expect(_myTest.test('12345')).to.be.true;
        expect(_myTest.test('12345123451234512345')).to.be.true;
        expect(_myTest.test('99999lkdjgklsdgjkndsklghksdjgklsdhjkgbnsdjgklnsdbklgjjsdbgjknsdkgbkjsdngnsdjkg9')).to.be.false;
        var _myTest2 = new noRegex({
            length: {
                equals: 7
            }
        });
        expect(_myTest2.test('123')).to.be.false;
        expect(_myTest2.test('123456789')).to.be.false;
        expect(_myTest2.test('1234567')).to.be.true;
    });
    it('affix', function() {
        var _myTest = new noRegex({
            affix: {
                startsWith: 'plop'
            }
        });
        expect(_myTest.test('123')).to.be.false;
        expect(_myTest.test('plop-999999')).to.be.true;
        var _myTest2 = new noRegex({
            affix: {
                endsWith: 'foo'
            }
        });
        expect(_myTest2.test('123')).to.be.false;
        expect(_myTest2.test('123456789-foo')).to.be.true;
        var _myTest3 = new noRegex({
            affix: {
                startsWith: 'plop',
                endsWith: 'foo'
            }
        });
        expect(_myTest3.test('123')).to.be.false;
        expect(_myTest3.test('plop-123')).to.be.false;
        expect(_myTest3.test('123-foo')).to.be.false;
        expect(_myTest3.test('plop-123-foo')).to.be.true;
    });
});

describe('format(...)', function() {
    it('acceptStrings', function() {
        var _myTest = new noRegex({
            acceptStrings: false
        });
        expect(_myTest.format('123456789')).equal('123456789');
        expect(_myTest.format('fjksdh gfkjsdglkj')).equal(' ');
        expect(_myTest.format('AZUIGAG123')).equal('123');
        expect(_myTest.format('ééé')).equal('');
        expect(_myTest.format('ÉÄ')).equal('');
        expect(_myTest.format('@()a-_')).equal('@()-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('acceptNumbers', function() {
        var _myTest = new noRegex({
            acceptNumbers: false
        });
        expect(_myTest.format('123456789')).equal('');
        expect(_myTest.format('1234abc56789')).equal('abc');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkAZUIGAGsdéééhgfkjsdglkj@()-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('acceptUppercase', function() {
        var _myTest = new noRegex({
            acceptUppercase: false
        });
        expect(_myTest.format('123456789')).equal('123456789');
        expect(_myTest.format('1234abc56789')).equal('1234abc56789');
        expect(_myTest.format('1234ABC56789')).equal('1234abc56789');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkazuigagsdéé12éhgf1kjsdglkj@()-_');
        expect(_myTest.format('()ÉÅ-_')).equal('()ea-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('acceptLowercase', function() {
        var _myTest = new noRegex({
            acceptLowercase: false
        });
        expect(_myTest.format('123456789')).equal('123456789');
        expect(_myTest.format('1234abc56789')).equal('1234ABC56789');
        expect(_myTest.format('1234ABC56789')).equal('1234ABC56789');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('FJKAZUIGAGSDEE12EHGF1KJSDGLKJ@()-_');
        expect(_myTest.format('()éàçè-_')).equal('()EACE-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('acceptAccents', function() {
        var _myTest = new noRegex({
            acceptAccents: false
        });
        expect(_myTest.format('123456789')).equal('123456789');
        expect(_myTest.format('1234abc56789')).equal('1234abc56789');
        expect(_myTest.format('1234ABC56789')).equal('1234ABC56789');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkAZUIGAGsdee12ehgf1kjsdglkj@()-_');
        expect(_myTest.format('()éàçè-_')).equal('()eace-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('acceptSpecialChars', function() {
        var _myTest = new noRegex({
            acceptSpecialChars: false
        });
        expect(_myTest.format('123456789')).equal('123456789');
        expect(_myTest.format('1234abc56789')).equal('1234abc56789');
        expect(_myTest.format('1234ABC56789')).equal('1234ABC56789');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkAZUIGAGsdéé12éhgf1kjsdglkj');
        expect(_myTest.format('()@éàçè-_')).equal('éàçè');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a'))).to.be.true;
    });
    it('acceptWhiteSpaces', function() {
        var _myTest = new noRegex({
            acceptWhiteSpaces: false
        });
        expect(_myTest.format('1234 56789')).equal('123456789');
        expect(_myTest.format('1234abc56789 ')).equal('1234abc56789');
        expect(_myTest.format(' 1234ABC56789')).equal('1234ABC56789');
        expect(_myTest.format(' fjkAZUIGAGsd éé12éhgf1kjsdglk j@()-_ ')).equal('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_');
        expect(_myTest.format(' ()éàçè-_ ')).equal('()éàçè-_');
        expect(_myTest.test(_myTest.format(' 1234 56789@fjksdh gfkjsdglkjAZUIGAG  123éééÉÄ()a-_ '))).to.be.true;
    });
    it('specialRules', function() {
        var _myTest = new noRegex({
            acceptStrings: true,
            acceptNumbers: false,
            specialRules: {
                allowedChars: '9',
                forbiddenChars: 'aA'
            }
        });
        expect(_myTest.format('123456789')).equal('9');
        expect(_myTest.format('1234abc56789')).equal('bc9');
        expect(_myTest.format('1234ABC56789')).equal('BC9');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkZUIGGsdéééhgfkjsdglkj@()-_');
        expect(_myTest.format('()éàçè-_')).equal('()éàçè-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('length', function() {
        var _myTest = new noRegex({
            length: {
                min: 5,
                max: 20
            }
        });
        expect(_myTest.format('123')).equal('123--');
        expect(_myTest.format('1234abc56789')).equal('1234abc56789');
        expect(_myTest.format('1234512345123451234512345')).equal('12345123451234512345');
        expect(_myTest.format('fjkAZUIGAGsdéé12éhgf1kjsdglkj@()-_')).equal('fjkAZUIGAGsdéé12éhgf');
        expect(_myTest.format('()éàçè-_')).equal('()éàçè-_');
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
        var _myTest2 = new noRegex({
            length: {
                equals: 7
            }
        });
        expect(_myTest2.format('123')).equal('123----');
        expect(_myTest2.format('123456789')).equal('1234567');
        expect(_myTest2.format('1234567')).equal('1234567');
        expect(_myTest2.test(_myTest2.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
    it('affix', function() {
        var _myTest = new noRegex({
            affix: {
                startsWith: 'plop'
            }
        });
        expect(_myTest.format('123')).equal('plop123');
        expect(_myTest.format('plop-999999')).equal('plop-999999');
        var _myTest2 = new noRegex({
            affix: {
                endsWith: 'foo'
            }
        });
        expect(_myTest2.format('123')).equal('123foo');
        expect(_myTest2.format('123456789-foo')).equal('123456789-foo');
        var _myTest3 = new noRegex({
            affix: {
                startsWith: 'plop',
                endsWith: 'foo'
            }
        });
        expect(_myTest3.format('123')).equal('plop123foo');
        expect(_myTest3.format('plop-123')).equal('plop-123foo');
        expect(_myTest3.format('123-foo')).equal('plop123-foo');
        expect(_myTest3.format('plop-123-foo')).equal('plop-123-foo');
        expect(_myTest2.test(_myTest2.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
});

describe('advanced cases', function() {
    it('combination #1', function() {
        var _myTest = new noRegex({
            acceptStrings: true,
            acceptNumbers: false,
            acceptSpecialChars: false,
            acceptWhiteSpaces: false,
            specialRules: {
                allowedChars: '9_',
                forbiddenChars: 'aA'
            },
            length: {
                equals: 15
            },
            affix: {
                startsWith: 'plop',
                endsWith: 'foo'
            }
        });
        expect(_myTest.format('123456789')).equal('plop99999999foo');
        expect(_myTest.test(_myTest.format('123456789'))).to.be.true;
        expect(_myTest.format('fjksdh gfkjsdglkj')).equal('plopfjksdhgffoo');
        expect(_myTest.test(_myTest.format('fjksdh gfkjsdglkj'))).to.be.true;
        expect(_myTest.format('AZUIGAG123')).equal('plopZUIGG999foo');
        expect(_myTest.test(_myTest.format('AZUIGAG123'))).to.be.true;
        expect(_myTest.format('ééé')).equal('plopééé99999foo');
        expect(_myTest.test(_myTest.format('ééé'))).to.be.true;
        expect(_myTest.format('ÉÄ')).equal('plopÉÄ999999foo');
        expect(_myTest.test(_myTest.format('ÉÄ'))).to.be.true;
        expect(_myTest.format('@()a-_')).equal('plop_9999999foo');
        expect(_myTest.test(_myTest.format('@()a-_'))).to.be.true;
        expect(_myTest.test(_myTest.format('123456789@fjksdh gfkjsdglkjAZUIGAG123éééÉÄ()a-_'))).to.be.true;
    });
});
