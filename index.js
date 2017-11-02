const os = require('os')
const fs = require('fs')

/**
 * pos : 
 *   after_header
 *   befor_header
 *   after_body
 *   befor_header 
 */

// {
//   filename: "index.html",
//   type: "js",
//   pos: "befor_header",
//   src: 'https://cdn.bootcss.com/axios/0.16.2/axios.js',
// }

class InjectCdnSourceWebpackPlugin {
    constructor(options = []) {
        this.options = options

        console.log("\n----------------------------------\n inject-cdn-source-webpack-plugin \n author: qiwen<34214399@qq.com> \n----------------------------------\n")
    }

    _createJs(src) {
        return `<script src="${src}"></script>`
    }

    _createCss(src) {
        return `<link href="${src}" rel=stylesheet>`
    }

    action(option, sourceHtml) {

        option.type = option.type || "js";

        let _f = ""
        if (option.type == 'css') {
            _f = this._createCss(option.src);
        } else {
            _f = this._createJs(option.src);
        }

        let _pos = option.pos || "befor_header"

        let distHtml = "";
        switch (_pos) {
            case 'befor_header':
                distHtml = sourceHtml.replace('<head>', `<head>\n${_f}\n`)
                break;
            case 'after_header':
                distHtml = sourceHtml.replace('</head>', `\n${_f}\n</head>`)
                break;
            case 'befor_header':
                distHtml = sourceHtml.replace('<body>', `<body>\n${_f}\n`)
                break;
            case 'after_body':
                distHtml = sourceHtml.replace('</body>', `\n${_f}\n</body>`)
                break;
        }
        // distHtml = sourceHtml.replace(`\n\n`, `\n`)
        return distHtml;
    }

    apply(compiler) {

        compiler.plugin('emit', function(compilation, callback) {

            const distPath = compilation.outputOptions.path || ''

            for (let index = this.options.length - 1; index >= 0; index--) {

                let option = this.options[index];

                if (compilation.assets[option.filename] == undefined) {
                    continue;
                }

                let sourceHtml = compilation.assets[option.filename].source();

                let distHtml = this.action(option, sourceHtml);

                let filePath = `${distPath}/${option.filename}`

                // console.log(sourceHtml, distHtml, filePath)

                compilation.assets[option.filename] = {
                    source: () => distHtml,
                    size: () => fs.statSync(filePath).size
                }
            }

            callback()
        }.bind(this))
    }
}

module.exports = InjectCdnSourceWebpackPlugin
