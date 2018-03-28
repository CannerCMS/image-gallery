# canner-image-gallery [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Greenkeeper badge](https://badges.greenkeeper.io/Canner/image-gallery.svg?token=62b0040cd9c1c2987e58709306c6e575db0370e67a8d8e460937887118118798&ts=1522228458209)](https://greenkeeper.io/)
> A image gallery for CannerIO

![demo](./docs/demo.png)

## Installation

```sh
$ npm install --save canner-image-gallery
```

## Usage

```js
import Gallery from 'canner-image-gallery';

class Demo extends React.Component {
  render() {
    return (
      <Gallery
        value={[
          'https://images.unsplash.com/photo-1494005612480-90f50fd9376f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=36d7fc577cf6a4527cbee851db481b8c&auto=format&fit=crop&w=3153&q=80',
          'https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=add00823c6d712c149aa86c82f02c21e&auto=format&fit=crop&w=3151&q=80',
          'https://images.unsplash.com/photo-1506241537529-eefea1fbe44d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c743141b38a2afe4a8ec4d77c889ef3&auto=format&fit=crop&w=3150&q=80'
        ]}
        renderContent={(i) => <div>content {i}</div>}
        contentTitle={"Content title"}
        onDelete={(i) => console.log(i)}
        onCreate={(item) => console.log(item)}
        onSwap={(from, to) => console.log(from, to)}
        serviceConfig={new ImgurService({
          mashapeKey: '<mashapeKey>',
          clientId: '<clientId>'
        })}
      />
    );
  }
}

```

## Props

| Name         | Type    | Default | Description |
| ------------ | ------- | ------- | ----------- |
| value | Array<string> | undefined | Array of your photo's url |
| renderContent | (index: number) => React.Element<*> | undefined | If this is defined, a edit button will rendered in each photo  |
| contentTitle | string? | undefined | The popup content's title |
| onDelete | (index: number) => void | undefined | Called when the photo is deleted  |
| onCreate | ({index: number, image: string} | Array<{index: number, image: string}>) => void | undefined | Called when the photo is created  |
| onSwap | ({fromIndex: number, toIndex: number}) => void | undefined | Called when the photo is swapped  |
| serviceConfig | depends on services | undefined | pass image configurations generate from: https://github.com/Canner/image-service-config |


## Start example server

```
npm start
```

## generate demo

```js
npm run gh-pages
```

## License

MIT © [Canner](https://www.canner.io)


[npm-image]: https://badge.fury.io/js/canner-image-gallery.svg
[npm-url]: https://npmjs.org/package/canner-image-gallery
[travis-image]: https://travis-ci.org/Canner/canner-image-gallery.svg?branch=master
[travis-url]: https://travis-ci.org/Canner/canner-image-gallery
[daviddm-image]: https://david-dm.org/Canner/canner-image-gallery.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Canner/canner-image-gallery
