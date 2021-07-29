# Omnichannel AMSClient
[![npm version](https://badge.fury.io/js/%40microsoft%2Fomnichannel-amsclient.svg)](https://badge.fury.io/js/%40microsoft%2Fomnichannel-amsclient)
![Release CI](https://github.com/microsoft/omnichannel-amsclient/workflows/Release%20CI/badge.svg)

AMS client to interact with Microsoft AMS APIs. This is compatible on Web, Node, and Mobile using React Native.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)

## Installation

```
    npm install @microsoft/omnichannel-amsclient --save
```

## Usage

### Import

```ts

// NPM Package
import createAMSClient from '@microsoft/omnichannel-amsclient';

// CDN Package
const {createAMSClient} = window.Microsoft.CRM.Omnichannel.AMS.SDK;

```

### Initialization
```ts

// Get chat token
const chatToken = getChatToken();

const config = {
    framedMode: true,
    debug: false, // optional
    logger: null // optional
};

const AMSClient = await createAMSClient(config);

await AMSClient.initialize({
    chatToken
});
```

### Upload Attachment
```ts
// Initialize AMSClient

...

// Open file dialog
const fileSelector = document.createElement('input');
fileSelector.setAttribute('type', 'file');
fileSelector.click();
fileSelector.onchange = async (event: any) => {
    console.log(file); // FileInfo

    try {
        const objectResponse = await AMSClient.createObject(chatToken?.chatId as string, fileInfo);
        const fileMetadata = await this.uploadDocument(objectResponse.id, file);

        // Success

        // Read file content as base64 encoded string
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = () => {
            console.log(fileReader.result);
        }

        // Create URL to access file
        const objectUrl = URL.createObjectURL(file);
        console.log(objectUrl);
    } catch {
        throw new Error('uploadFile');
    }
}
```

### Download Attachment
```ts
// Initialize AMSClient

...

const response = await AMSClient.getViewStatus(fileMetadata);

const {view_location} = response;
const blob = await AMSClient.getView(fileMetadata, view_location);
console.log(blob);

// Read file content as base64 encoded string
const fileReader = new FileReader();
fileReader.readAsDataURL(blob as Blob);
fileReader.onloadend = () => {
    console.log(fileReader.result);
}

// Create URL to access file
const objectUrl = URL.createObjectURL(new File([blob, ], 'fileName', {type: blob.type}));
console.log(objectUrl);
```

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
