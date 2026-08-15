// 画像を配置すると、相対パスのまま GitHub Pages のサブパスでも利用できます。
export const characterImages = {
  normal: './assets/images/an_normal.png', happy: './assets/images/an_happy.png',
  surprised: './assets/images/an_surprised.png', confused: './assets/images/an_confused.png', bad: './assets/images/an_bad.png'
};
// 調理中の画像はここに置くと、ローディング画面に自動表示されます。
export const loadingCharacterImage = './assets/character/anchan-cooking.png';
export const reactionBands = [
  { min: 90, key: 'happy', text: '「最高！ また作ってね！」' }, { min: 70, key: 'normal', text: '「おいしい芋煮になったね。」' },
  { min: 50, key: 'surprised', text: '「おどろいたけど、なかなか面白いかも。」' }, { min: 30, key: 'confused', text: '「これは……芋煮、だよね？」' },
  { min: 0, key: 'bad', text: '「庵ちゃんには、ちょっと難しかったかも……。」' }
];
