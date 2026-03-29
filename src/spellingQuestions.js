const poolLevel1 = ['cat', 'dog', 'sun', 'tree', 'ball', 'book', 'car', 'hat', 'run', 'jump', 'red', 'blue', 'one', 'two', 'pig', 'cow', 'day', 'play', 'boy', 'girl'];
const poolLevel2 = ['house', 'happy', 'water', 'friend', 'school', 'apple', 'green', 'black', 'white', 'sleep', 'night', 'under', 'small', 'large', 'clean', 'dirty', 'quick', 'slow', 'right', 'left'];
const poolLevel3 = ['animal', 'people', 'always', 'because', 'before', 'mother', 'father', 'sister', 'brother', 'family', 'summer', 'winter', 'spring', 'autumn', 'yellow', 'orange', 'purple', 'flower', 'garden', 'window'];
const poolLevel4 = ['beautiful', 'together', 'favorite', 'tomorrow', 'yesterday', 'dinosaur', 'elephant', 'computer', 'hospital', 'library', 'mountain', 'umbrella', 'vacation', 'vegetable', 'sandwich', 'surprise', 'treasure', 'whisper', 'building', 'question'];

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
