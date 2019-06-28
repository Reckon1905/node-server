var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


var server = http.createServer(function (req, res) {
    staticRoot(path.join(__dirname, 'static'), req, res)
})
server.listen(8080)

//处理静态路径
function staticRoot(staticPath, req, res) {

    var pathObject = url.parse(req.url, true)
    console.log(pathObject)

    if (pathObject.pathname === '/') {
        pathObject.pathname += 'index.html'
    }

    //文件路径
    var filePath = path.join(staticPath, pathObject.pathname)
    console.log('-------------------------------------------')
    console.log(filePath)

    //文件读取  这个是异步版本 注意去社区找文档对应
    console.log('读取文件')
    fs.readFile(filePath, function (err, fileContent) {
        if (err) {
            console.log("出错了")
            console.log('404')
            res.writeHead(404, 'not found')
            res.end('<h1>404 Not Found</h1>')
        } else {
            console.log("正常的")
            console.log('ok')
            res.writeHead(200, 'OK')
            res.write(fileContent, 'binary')
            res.end()
        }
    })

}


