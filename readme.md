# noRegex

noRegex is a lightweight javascript library with no dependencies, made for those who don't want to blow their mind with regex syntax.  
noRegex do not replace regex, it only simplify basic needs to validate what's inside a string, but do not test a pattern.

## Usage example:
``` javascript
var myTest = new noRegex({
    acceptNumbers: false,
    length: {
        min: 5
    },
    specialRules: {
        forbiddenChars: '().#'
    }
});
myTest.test(myString);
myTest.format(myString);
```

## Methods:
- **test(str)**: Test if the given string match options, return boolean.
- **format(str)**: Remove or replace all characters from the given string that does not match options, return formatted string.

## Options:

All options with their default values:
``` javascript
{
    acceptStrings: true,
    acceptNumbers: true,
    acceptUppercase: true,
    acceptLowercase: true,
    acceptAccents: true,
    acceptSpecialChars: true,
    acceptWhiteSpaces: true,
    specialRules: {
        allowedChars: undefined, //case-sensitive
        forbiddenChars: undefined //case-sensitive
    },
    length: {
        min: undefined,
        max: undefined,
        equals: undefined
    },
    affix: {
        startsWith: undefined, //case-sensitive
        endsWith: undefined //case-sensitive
    }
}
```

Example of options usage:
``` javascript
{
    acceptStrings: true,
    acceptNumbers: true,
    acceptUppercase: false,
    acceptLowercase: true,
    acceptAccents: false,
    acceptSpecialChars: false,
    acceptWhiteSpaces: false,
    specialRules: {
        allowedChars: '-_?=',
        forbiddenChars: '0.#'
    },
    length: {
        min: 12,
        max: 250
    },
    affix: {
        startsWith: 'https://',
        endsWith: '.js'
    }
}
```

## Modify default options:

``` javascript
noRegex.DEFAULT.acceptAccents = false;
```
