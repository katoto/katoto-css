const crypto = require("crypto");
const CryptoJs = require('crypto-js')
// 哈希算法
const hash = crypto.createHash("md5");
// hmac算法
const hmac = crypto.createHmac("sha256", "key");
hmac.update("hello world");
console.log(hmac.digest("hex"));

hash.update("hello world");
console.log(hash.digest("hex"));
// AES对称加密算法
// encrypt
let cipherText = CryptoJs.AES.encrypt('hello world', 'key123').toString()
console.log(cipherText)
console.log('-----加密串-----')
const bytes = CryptoJs.AES.decrypt(cipherText, 'key123')
const originalText = bytes.toString(CryptoJs.enc.Utf8)
console.log(originalText)
console.log('------解密串-----')
