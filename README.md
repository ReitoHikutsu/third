# かみのやま庵ちゃん オリジナル芋煮ゲーム

静的ファイルだけで動く GitHub Pages 向けの実装です。`index.html` をブラウザで開くか、このフォルダを GitHub Pages の公開元に設定してください。

## 画像アセット

以下へ任意の PNG を配置してください。未配置の場合は、安全に「庵ちゃん」の代替表示になります。

- `assets/images/an_normal.png`
- `assets/images/an_happy.png`
- `assets/images/an_surprised.png`
- `assets/images/an_confused.png`
- `assets/images/an_bad.png`
- `assets/character/anchan-cooking.png`（調理中のローディング画面用）

画像パスとスコア帯は `src/config.js`、具材データは `src/ingredients.js`、採点・具材数倍率・30種類の組み合わせボーナスは `src/scoring.js` で変更できます。コンボ点は基本点と分離され、具材数倍率を掛ける前の小計に加算されます。
