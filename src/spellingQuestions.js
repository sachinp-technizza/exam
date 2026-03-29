const poolLevel1 = ['cat', 'dog', 'sun', 'tree', 'ball', 'book', 'car', 'hat', 'run', 'jump', 'red', 'blue', 'one', 'two', 'pig', 'cow', 'day', 'play', 'boy', 'girl', 'bed', 'box', 'cup', 'egg', 'fly', 'fun', 'hop', 'hot', 'ice', 'leg', 'map', 'nut', 'pen', 'top', 'zoo'];

const poolLevel2 = ['house', 'happy', 'water', 'friend', 'school', 'apple', 'green', 'black', 'white', 'sleep', 'night', 'under', 'small', 'large', 'clean', 'dirty', 'quick', 'slow', 'right', 'left', 'bird', 'boat', 'coat', 'corn', 'farm', 'fire', 'fish', 'game', 'hand', 'hill', 'home', 'milk', 'name', 'nest', 'rain', 'ring', 'seed', 'shoe', 'snow', 'song', 'star', 'time', 'wind'];

const poolLevel3 = ['animal', 'always', 'because', 'before', 'mother', 'father', 'sister', 'brother', 'family', 'summer', 'winter', 'spring', 'autumn', 'yellow', 'orange', 'purple', 'flower', 'garden', 'window', 'basket', 'rabbit', 'kitten', 'puppy', 'turtle', 'monkey', 'cookie', 'jacket', 'pocket', 'rocket', 'ticket'];

const poolLevel4 = ['beautiful', 'together', 'favorite', 'tomorrow', 'yesterday', 'dinosaur', 'elephant', 'computer', 'hospital', 'library', 'mountain', 'umbrella', 'vacation', 'vegetable', 'sandwich', 'surprise', 'treasure', 'whisper', 'building', 'question', 'teacher', 'children', 'picture', 'birthday', 'morning', 'evening', 'rainbow', 'butterfly', 'airplane'];

function getRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export const getSpellingWords = () => {
  return [
    ...getRandom(poolLevel1, 5),
    ...getRandom(poolLevel2, 5),
    ...getRandom(poolLevel3, 5),
    ...getRandom(poolLevel4, 5)
  ];
};
