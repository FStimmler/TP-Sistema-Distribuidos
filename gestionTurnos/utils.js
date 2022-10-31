const fs = require('fs')

function writeDataToFile(filename, content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) =>{
        if(err)
            console.log(err)
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
    }
    return hash;
}

module.exports = {
    writeDataToFile,
    getPostData,
    hashCode
}