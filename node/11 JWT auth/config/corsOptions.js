// Cross Origin Resource Sharing
//app.use(cors());
// to avoid error on front-end, for any request!
const whiteList = [
    'https://mysite.com',
    'https://www.google.com.ua'
];

const corsOptions = {
    origin: (origin, callback) => {
        // we must add "!origin" while developing,
        // cause is case of localhost origin is undeined!
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
            // express will handle the error automatically, so this is safe!
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;