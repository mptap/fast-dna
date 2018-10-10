
# FAST viewer
A self contained React component which shows content in an iframe.
This can be used to as a method for previewing a React component(s) or an entire page.

## Getting started
- `npm i`

## Running local environment
- `npm run dev-server`

## Building the library for production
- `npm run build`

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.



1. createPortal hooks onto a dom node, this will then cause the parent to update, the structure should look like:

<div>
    // fancy wrapper
    <iframe>
        <div id="root" />
    </iframe>
    <contents /> <= exists as a createPortal
</div>

series of events:
- render the wrapper
- render the iframe - the iframe forward refs a created DOMNode for the content
- 