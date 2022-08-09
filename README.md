# Creating a Next.js Project

## Create Next App
```
yarn create next-app --typescript
```

## Configure ESLint
```
npm init @eslint/config
```

![ESLint config](/public/lint.png)

## Add Prettier and Additional ESLint Plugins
See [Linting Doc](https://coda.io/d/Q3-Weekly-Agenda_dl84tlotEu4/Linting-Flow-and-Template_suleL#_luNOQ) for additional configuration

## React and NextJS ESLint Configuration
Update `.eslint.json`:
```
{
  "rules": {
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx", ".ts"] }],
    "react/function-component-definition": ["error", { "namedComponents": "arrow-function" }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ]
      }
    }
  }
}
```
