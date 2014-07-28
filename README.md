### WCK 是 Web Compoment Kitchen 的缩写

旨在根据页面上引入的链接，合并web-compoment 文件，减少网络请求，合并，压缩html
并将内部的css抽取出来


### 如何使用

```
npm install -g wck
wck index.html movie.html stars.html usrank.html imagegallery.html
```

```
generated build/index/components.html 
generated build/index/components.css 
generated build/index/components.js 
generated build/index.html 
generated build/movie/components.html 
generated build/movie/components.css 
generated build/movie/components.js 
generated build/movie.html 
generated build/stars/components.html 
generated build/stars/components.css 
generated build/stars/components.js 
generated build/stars.html 
generated build/usrank/components.html 
generated build/usrank/components.css 
generated build/usrank/components.js 
generated build/usrank.html 
generated build/imagegallery/components.html 
generated build/imagegallery/components.css 
generated build/imagegallery/components.js 
generated build/imagegallery.html
```

然后会生产一个build/{index}/目录，里面放有优化后的 components.html
和 components.css
```
build
├── imagegallery
│   ├── components.css
│   ├── components.html
│   └── components.js
├── imagegallery.html
├── index
│   ├── components.css
│   ├── components.html
│   └── components.js
├── index.html
├── movie
│   ├── components.css
│   ├── components.html
│   └── components.js
├── movie.html
├── stars
│   ├── components.css
│   ├── components.html
│   └── components.js
├── stars.html
├── usrank
│   ├── components.css
│   ├── components.html
│   └── components.js
└── usrank.html
```



### License MIT

```

Web Component Kitchen
Copyright (C) 2014 copyright @zhang-ning

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

