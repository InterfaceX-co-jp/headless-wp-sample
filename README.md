# faust-getting-started

Welcome to the experimental Faust getting started example.

ヘッドレス CMS フレームワーク: https://faustjs.org/

## URL

### WP 管理画面

https://wp-experiment.stylish-ero.mixh.jp/

### ヘッドレスフロントエンド

https://wp-experiment-front.stylish-ero.mixh.jp/

## サーバー設定

レンタルサーバー等のデフォルト Apache 環境では、`.htaccess`により
HTML ファイルが存在しない場合は（当然ではあるが）404 を返す。

Next.js で SSG/SPA レンダリングする場合、クライアントサイドのルーティングになるので、
下記をヘッドレスフロントエンドを置いた側に設置する必要がある.

```
<IfModule mod_rewrite.c>
    Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.html [QSA,L]
</IfModule>
```
