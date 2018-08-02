module.exports = {
    "parserOptions": {
        "ecmaVersion": 8
    },

    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": "off",
        "accessor-pairs": "error",
        "array-bracket-spacing": "off",
        "array-callback-return": "error",
        "arrow-body-style": "off",
        "arrow-parens": [
            "error",
            "as-needed"
        ],
        "arrow-spacing": [
            "error",
            {
                "after": true,
                "before": true
            }
        ],
        "block-scoped-var": "error",
        "block-spacing": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "callback-return": "warn",
        "camelcase": "off",
        "capitalized-comments": "off",
        "class-methods-use-this": "error",
        "comma-dangle": "error",
        "comma-spacing": "off",
        "comma-style": [
            "error",
            "last"
        ],
        "complexity": "off",
        "computed-property-spacing": [
            "error",
            "never"
        ],
        "consistent-return": "error",
        "consistent-this": "error",
        "curly": "off",
        "default-case": "error",
        "dot-location": [
            "error",
            "property"
        ],
        "dot-notation": "off",
        "eol-last": "error",
        "eqeqeq": "off", // ["warn", "smart"],
        "func-call-spacing": "error",
        "func-name-matching": "error",
        "func-names": [
            "error",
            "never"
        ],
        "func-style": [
            "error",
            "declaration"
        ],
        "generator-star-spacing": "error",
        "global-require": "error",
        "guard-for-in": "error",
        "handle-callback-err": [
            "error",
            "^(err|error)$"
        ],
        "id-blacklist": "error",
        "id-length": "off",
        "id-match": "error",
        "indent": "off",
        "init-declarations": "error",
        "jsx-quotes": "error",
        "key-spacing": "off",
        "keyword-spacing": "off",
        "line-comment-position": "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "lines-around-comment": "off",
        "lines-around-directive": "error",
        "max-depth": "error",
        "max-len": "off",
        "max-lines": "off",
        "max-nested-callbacks": "error",
        "max-params": "off",
        "max-statements": "off",
        "max-statements-per-line": "off",
        "multiline-ternary": [
            "error",
            "never"
        ],
        "new-parens": "error",
        "newline-after-var": "off",
        "newline-before-return": "off",
        "newline-per-chained-call": "off",
        "no-alert": "error",
        "no-array-constructor": "error",
        "no-await-in-loop": "error",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-catch-shadow": "error",
        "no-confusing-arrow": "error",
        "no-continue": "off",
        "no-div-regex": "error",
        "no-duplicate-imports": "error",
        "no-else-return": "warn",
        "no-empty-function": "off",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-extra-parens": "off",
        "no-floating-decimal": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-inline-comments": "off",
        "no-inner-declarations": [
            "error",
            "both"
        ],
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-label-var": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "warn",
        "no-loop-func": "error",
        "no-magic-numbers": "off", // warn
        "no-mixed-operators": "error",
        "no-mixed-requires": "off",
        "no-multi-assign": "error",
        "no-multi-spaces": "off",
        "no-multi-str": "error",
        "no-multiple-empty-lines": "error",
        "no-native-reassign": "error",
        "no-negated-condition": "warn",
        "no-negated-in-lhs": "error",
        "no-nested-ternary": "error",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-require": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-path-concat": "error",
        "no-plusplus": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-proto": "error",
        "no-prototype-builtins": "error",
        "no-restricted-globals": "error",
        "no-restricted-imports": "error",
        "no-restricted-modules": "error",
        "no-restricted-properties": "error",
        "no-restricted-syntax": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-script-url": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-shadow": "warn",
        "no-shadow-restricted-names": "error",
        "no-spaced-func": "error",
        "no-sync": "off",
        "no-tabs": "off",
        "no-template-curly-in-string": "error",
        "no-ternary": "off",
        "no-throw-literal": "error",
        "no-trailing-spaces": "off",
        "no-undef-init": "error",
        "no-undefined": "off",
        "no-undef": "error",
        "no-underscore-dangle": "off",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "off",
        "no-unused-expressions": "error",
        "no-use-before-define": "off",
        "no-useless-call": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-constructor": "error",
        "no-useless-escape": "error",
        "no-useless-rename": "error",
        "no-useless-return": "off",
        "no-void": "error",
        "no-warning-comments": "off",
        "no-whitespace-before-property": "error",
        "no-with": "error",
        "object-curly-newline": "off",
        "object-curly-spacing": "off",
        "object-property-newline": [
            "error",
            {
                "allowMultiplePropertiesPerLine": true
            }
        ],
        "object-shorthand": ["error", "consistent"],
        "one-var": "off",
        "one-var-declaration-per-line": "off",
        "operator-assignment": [
            "error",
            "always"
        ],
        "operator-linebreak": "error",
        "padded-blocks": "off",
        "prefer-arrow-callback": "warn",
        "prefer-const": "warn",

        "no-var": "error",
        "prefer-destructuring": // warn
            [
                "error",
                {
                    "array": false,
                    "object": false
                }
            ],
        "prefer-numeric-literals": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-reflect": "off",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "off",
        "quote-props": ["error", "consistent"],
        "quotes": "off",
        "radix": "error",
        "require-await": "error",
        "require-jsdoc": "off",
        "rest-spread-spacing": "error",
        "semi": "error",
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "no-unreachable": "error",
        "sort-imports": "error",
        "sort-keys": "off",
        "sort-vars": "off",
        "space-before-blocks": "off",
        "space-before-function-paren": "off",
        "space-in-parens": "off",
        "space-infix-ops": "off",
        "space-unary-ops": "error",
        "spaced-comment": "off",
        "strict": "error",
        "symbol-description": "error",
        "template-curly-spacing": [
            "error",
            "never"
        ],
        "template-tag-spacing": "error",
        "unicode-bom": [
            "error",
            "never"
        ],
        "valid-jsdoc": "error",
        "vars-on-top": "off",
        "wrap-iife": "error",
        "wrap-regex": "error",
        "yield-star-spacing": "error",
        "yoda": [
            "error",
            "never"
        ]
    }
};