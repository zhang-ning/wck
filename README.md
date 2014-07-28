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


