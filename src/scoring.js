const statConfig = { taste:{ label:'おいしさ', max:40 }, anPreference:{ label:'庵ちゃん好み', max:30 }, imoniAuthenticity:{ label:'芋煮らしさ', max:20 }, originality:{ label:'独創性', max:10 } };

// コンボは基本点と独立した追加点です。複数のコンボはすべて重複発動します。
export const combinationBonuses = [
  { requiredIngredients:['satoimo','beef','negi'], name:'王道三銃士', points:15, reaction:'うんうん、これぞ芋煮って感じ！こういうの好きだな～！' },
  { requiredIngredients:['satoimo','konjac','burdock'], name:'芋煮の土台', points:8, reaction:'この組み合わせ、しっかり芋煮してるね！' },
  { requiredIngredients:['beef','konjac','negi'], name:'肉汁三連星', points:8, reaction:'牛肉の旨みが染みて、長ねぎもいい仕事してるね！' },
  { requiredIngredients:['satoimo','shimeji','maitake'], name:'山のきのこ盛り', points:8, reaction:'きのこの香りがいっぱい！山の恵みって感じだね！' },
  { requiredIngredients:['burdock','negi','maitake'], name:'山里の香り', points:7, reaction:'ふわっといい香り！こういう山の味、好きだな～' },
  { requiredIngredients:['tofu','chicken','negi'], name:'やさしい鶏鍋', points:6, reaction:'なんだかほっとする味だね。優しい芋煮だなぁ' },
  { requiredIngredients:['pork','satoimo','burdock'], name:'豚の旨味根菜', points:7, reaction:'豚肉の旨みと根菜って、やっぱり相性いいね！' },
  { requiredIngredients:['pork','konjac','negi'], name:'豚ねぎ芋煮', points:7, reaction:'豚肉でもちゃんと芋煮になるんだね。おいしそう！' },
  { requiredIngredients:['chicken','shimeji','maitake'], name:'山の鶏鍋', points:7, reaction:'鶏肉ときのこ……これは山で食べたくなるね！' },
  { requiredIngredients:['beef','burdock','maitake'], name:'牛と山の恵み', points:7, reaction:'牛肉にごぼうにきのこ……旨みがすごそう！' },
  { requiredIngredients:['tamakon','satoimo','beef'], name:'山形完全体', points:9, reaction:'玉こんにゃくまで入ってる！山形らしさ満点だね！' },
  { requiredIngredients:['tamakon','negi','maitake'], name:'山形山菜鍋', points:7, reaction:'玉こんにゃくにきのこ……山形を感じるなぁ！' },
  { requiredIngredients:['dadacha','tamakon','negi'], name:'庵ちゃん推しセット', points:8, reaction:'だだちゃ豆まで入れてくれたの？これは嬉しい！' },
  { requiredIngredients:['sansai','maitake','burdock'], name:'山の恵み三重奏', points:9, reaction:'山菜にきのこにごぼう……山の香りがすごい！' },
  { requiredIngredients:['sansai','satoimo','negi'], name:'山里芋煮', points:8, reaction:'素朴だけど、こういう芋煮もいいよね！' },
  { requiredIngredients:['dadacha','sansai','maitake'], name:'山形オールスター', points:9, reaction:'山形のいいところ、ぎゅっと詰め込んだね！' },
  { requiredIngredients:['eel','beef','burdock'], name:'スタミナ芋煮', points:6, reaction:'うなぎに牛肉！？すごく元気が出そう！' },
  { requiredIngredients:['eel','tamakon','negi'], name:'山形ごちそう鍋', points:7, reaction:'うなぎまで入ってる！今日はごちそうだね！' },
  { requiredIngredients:['takuan','natto','dadacha'], name:'ごはんのお供会議', points:7, reaction:'……ごはんのお供が、鍋の中で会議してる！？' },
  { requiredIngredients:['hoshigaki','pear','cherry'], name:'山形フルーツ三銃士', points:8, reaction:'えっ、果物が三つも！？山形らしいけど……芋煮！？' },
  { requiredIngredients:['salmon','maitake','negi'], name:'秋鮭きのこ鍋', points:6, reaction:'鮭ときのこって秋らしくていいね！' },
  { requiredIngredients:['shrimp','tofu','negi'], name:'海鮮寄せ芋煮', points:6, reaction:'エビが入ると一気に海鮮鍋っぽくなるね！' },
  { requiredIngredients:['udon','mochi','satoimo'], name:'炭水化物の極み', points:7, reaction:'炭水化物が大集合！お腹いっぱいになりそう！' },
  { requiredIngredients:['cheese','mochi','maitake'], name:'とろける山鍋', points:8, reaction:'チーズがとろっと……これは意外とアリかも！' },
  { requiredIngredients:['kimchi','pork','tofu'], name:'韓国風芋煮', points:8, reaction:'これは……芋煮というより韓国鍋！？でもおいしそう！' },
  { requiredIngredients:['tomato','cheese','beef'], name:'洋風牛芋煮', points:8, reaction:'洋風なのに芋煮！こういうアレンジ、面白いね！' },
  { requiredIngredients:['wine','beef','maitake'], name:'ワイン香る芋煮', points:8, reaction:'ワインの香りがする……ちょっと大人の芋煮だね！' },
  { requiredIngredients:['wine','cheese','eel'], name:'庵ちゃんの晩酌', points:6, reaction:'ワインにチーズ……って、うなぎまで！？どういうこと！？' },
  { requiredIngredients:['natto','kimchi','cheese'], name:'発酵トリオ', points:7, reaction:'発酵食品が大集合！これはクセになりそう！' },
  { requiredIngredients:['curry','udon','beef'], name:'カレーうどん芋煮', points:10, reaction:'待って、これカレーうどんじゃない！？……でもおいしそう！' },
  { excludedCategories:['ベース'], name:'味付け忘れ', points:-20, reaction:'……あれ？味付け、忘れてない？' }
];

function getCombinationBonuses(selectedIngredients) {
  const ids = new Set(selectedIngredients.map(item => item.id));
  const categories = new Set(selectedIngredients.map(item => item.category));

  return combinationBonuses.filter(({ requiredIngredients, excludedIngredients, requiredCategories, excludedCategories }) => {
    const includesRequiredIngredients = !requiredIngredients || requiredIngredients.every(id => ids.has(id));
    const excludesForbiddenIngredients = !excludedIngredients || excludedIngredients.every(id => !ids.has(id));
    const includesRequiredCategories = !requiredCategories || requiredCategories.every(category => categories.has(category));
    const excludesForbiddenCategories = !excludedCategories || excludedCategories.every(category => !categories.has(category));

    return includesRequiredIngredients
      && excludesForbiddenIngredients
      && includesRequiredCategories
      && excludesForbiddenCategories;
  });
}
function normalisedAverage(items, key, max) { return items.reduce((sum,item) => sum + item[key],0) / items.length / 10 * max; }
export function getIngredientCountMultiplier(count) {
  if (count === 1) return 0.7;
  if (count === 2) return 0.8;
  if (count === 3) return 0.9;
  if (count <= 6) return 1.0;

  if (count <= 10) {
    return 1.0 - (count - 6) * 0.05;
  }

  // 11〜30種類：0.75 → 0.20
  return 0.75 - (count - 10) * (0.55 / 20);
}

export function calculateScore(selectedIngredients) {
  const raw = Object.fromEntries(Object.entries(statConfig).map(([key,{max}]) => [key, normalisedAverage(selectedIngredients,key,max)]));
  const appliedBonuses = getCombinationBonuses(selectedIngredients);
  const scores = Object.fromEntries(Object.entries(statConfig).map(([key,{max,label}]) => [key, { label, max, value:Math.max(0,Math.min(max,Math.round(raw[key]))) }]));
  const baseScore = Object.values(scores).reduce((sum,{value}) => sum + value,0);
  const comboBonus = appliedBonuses.reduce((sum,{points}) => sum + points,0);
  const subtotal = baseScore + comboBonus;
  const multiplier = getIngredientCountMultiplier(selectedIngredients.length);
  const finalScore = Math.round(subtotal * multiplier);
  return { scores, baseScore, comboBonus, subtotal, multiplier, finalScore, appliedBonuses };
}
