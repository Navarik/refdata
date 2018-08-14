module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "es6": true,
    },
    "parser": "babel-eslint",
    "plugins": [
        "flowtype"
    ],
    "extends": [
        "airbnb-base",
    ],
    "rules": {
        "indent": [
            "error",
            2,
        ],
        "linebreak-style": [
            "error",
            "unix",
        ],
        "quotes": [
            "error",
            "double",
            "avoid-escape"
        ],
        "semi": [
            "warn",
            "never"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-console": "error",
        "function-paren-newline": "off"
    }
};
