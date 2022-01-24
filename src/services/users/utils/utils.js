const crypto = require('crypto');

/**
 * This function takes a plain text password and creates a salt and hash out of it.
 * @param {*} password - The password object
 */
 function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex')
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    
    return {
      salt: salt,
      hash: genHash
    };
}


module.exports.genPassword = genPassword