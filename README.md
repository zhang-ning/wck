### WCK 是 web compoment tools 的缩写

旨在根据页面上引入的链接，合并web-compoment 文件，减少网络请求，合并，压缩html
并将内部的css抽取出来


### 如何使用

```
npm install -g wck
wpt index.html b.html c.html d.html
```

然后会生产一个build/{index}/目录，里面放有优化后的 components.html
和 components.css


### License MIT


