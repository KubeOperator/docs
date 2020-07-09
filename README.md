
# KubeOperator 2.0 文档

This is the KubeOperator 2.0 documentation website. 

It is built with [docusaurus](https://docusaurus.io/).


## Clone the Repo
```bash
git clone https://github.com/KubeOperator/docs.git && \
cd docs && \
cd website
```

## Install Dependencies
Install [yarn](https://yarnpkg.com/en/).

In `website` folder:
```bash
yarn install
```

## Preview the Site
In `website` folder:
```bash
yarn start
```

Then you should be able to preview the website at `http://localhost:3000/` in your browser.

## Build the Site
In `website` folder:
```bash
yarn build
```

The generated static files will be in `website/build`.

## Deploy
Just serve the generated static files in `website/build`.


## Docs
All the documents go into the `docs` folder. All the images should be in the `docs/assets` folder.

To add a document:
* add the the document to `docs`
* add [header](https://docusaurus.io/docs/en/next/adding-blog#adding-posts) to the document (id and title is required)
* add the path of the folder to the `website/sidebars.json` file
