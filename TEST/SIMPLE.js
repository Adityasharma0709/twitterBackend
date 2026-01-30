import http from "http"

const server=http.createServer((req,res)=>{
    if(req.url==='/')
        res.end("<h1>h222</h1>")
    else if(req.url==='/user'){
        res.end("<h1>fbgdldlg</h1>");
    }
})
server.listen(5000);