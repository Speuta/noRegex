import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2';
import { uglify } from "rollup-plugin-uglify";

export default [{
    input: 'src/noRegex.ts',
    output: {
        file: 'dist/noRegex.js',
        format: 'umd',
        name: 'noRegex',
        sourcemap : true,
        intro : 'console.log("noRegex v' + pkg.version + '")'
    },
    plugins: [
        typescript()
    ]
},{
    input: 'src/noRegex.ts',
    output: {
        file: 'dist/noRegex.min.js',
        format: 'umd',
        name: 'noRegex',
        sourcemap : true,
        intro : 'console.log("noRegex v' + pkg.version + '")'
    },
    plugins: [
        typescript(),
        uglify()
    ]
}];
