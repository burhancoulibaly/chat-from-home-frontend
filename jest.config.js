module.exports = {
    "testPathIgnorePatterns": [
        "<rootDir>/.next/", 
        "<rootDir>/node_modules/",
        // "<rootDir>/test/login.test.tsx",
        // "<rootDir>/test/signup.test.tsx",
        // "<rootDir>/test/passwordreset.test.tsx"
    ],
    // "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
    "moduleNameMapper": {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    }
};