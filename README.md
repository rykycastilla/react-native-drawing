# react-native-drawing
A drawing library for React Native using Expo. This library provides an easy-to-use drawing canvas with customizable features.

**⚠️ Warning:**
**react-native-drawing** is sill in development, that's why some details are unavailable right now:
 - Installation
 - API reference

## Installation
To install the library, you must be in the root of your working project

``` bash
npx expo install react-native-webview
npx expo install react-native-drawing
```

## API Reference
For detailed API documentation, visit API Reference.

## Local Testing
To test the project locally, follow these steps:

1. Navigate to the root of an expo project

2. Clone the library and install dependencies

``` bash
npx expo install react-native-webview
git clone https://github.com/rykycastilla/react-native-drawing.git
cd react-native-drawing
npm install
```

3. Set the public ip of your development device in `./.env.json`. This allows access through app container to the drawing web core server (necessary for development). By default it is `localhost`.

``` json
{
  ...
  "WEB_CORE_DEV_IP": <your-public-ip>
}
```

4. Start the drawing web core server

``` bash
npm run dev
```

5. Now, you can start Expo dev server in another shell to test the library in development

6. To test production mode, you must run `npm run build` to compile. This allow you to use the library without the drawing core server as a production preview

**⚠️ Warning:**
When you are using development mode, refer to the library with

``` javascript
import {} from '<react-native-drawing-path>/lib/src'
```

And when you are using production preview use

``` javascript
import {} from '<react-native-drawing-path>'
```
Remember this, Development mode has debugging capabilites enabled, such as javascript inspection with Browser DevTools and changes are applied without recompiling the entire project every time

> This library has been tested with Expo SDK 51 and 52.