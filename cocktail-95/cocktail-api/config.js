const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbURL: 'mongodb://localhost/recipes',
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true
    },
    facebook: {
        appId: '2319917824932006',
        appSecret: '29c567807490991553fa6b09c88cfc8f' // insecure
    }
};

