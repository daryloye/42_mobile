# Mobile Piscine

To run:
```
npm install
npx expo start --tunnel -c
````

Adding env secrets to dev build from .env
```
eas secret:push --scope project --env-file .env --force
```

Creating dev build:
```
eas build --profile development --platform android
```