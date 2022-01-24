const fs = require('fs');
const path = require('path');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const axios = require('axios')
const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

/*
* Jwt Startegy 
*/
const strategy = new JwtStrategy(options, (payload, done) => {
    axios.get('http://users-service:1003/api/v1/user/userId/' + payload.sub) 
        .then((result) => {
            if(result){
                return done(null, result);
            }else {
                return done(null, false);
            }
        })
        .catch(err => {
            console.log(err)
            done(err, null)}
            );
})


module.exports = (passport) => {
    passport.use(strategy);

}