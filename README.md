# Tabs Later
A Chrome extension to save and organize your tabs into lists.

## Development
**Tech Stack**
React, Redux, PouchDB for browser(based on IndexedDB)

**Install extension locally**
1. Clone the repository and make a build

        yarn install
        yarn build

2. In Chrome, go to extension page chrome://extensions/
3. Click "Load Unpacked" button on top left, go to the repository and choose '/dist' directory. Done.

**Local development**
Install the extension from local directory, and then start to watch local development changes.

    yarn install
    yarn start

## Credits
- Chrome extension boilerplate from [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/tree/react)
- Icons and base components from [Blueprintjs](https://github.com/palantir/blueprint)
- Placeholder favicon: https://favicon.io/emoji-favicons/white-question-mark/
- Logo: Elements from [The Noun Project](https://thenounproject.com/)
