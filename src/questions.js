export const getQuestions = () => {
  // Generate 20 questions
  const qs = [];
  const emojis = ['⚽', '🍎', '🏀', '🧸', '🐶'];
  const generatedTexts = new Set();

  function addQuestion(q) {
    if (!generatedTexts.has(q.text)) {
      generatedTexts.add(q.text);
      qs.push(q);
      return true;
    }
    return false;
  }

  // Q 1-4: Object addition (e.g. 2 balls + 3 balls)
  while(qs.length < 4) {
    const a = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const answer = a + b;
    const emoji = emojis[qs.length % emojis.length];
    
    addQuestion({ 
      id: qs.length + 1, 
      type: 'object_addition', 
      a, b, emoji, 
      text: `${a} + ${b} = ?`, 
      options: generateOptions(answer), 
      answer
    });
  }

  // Q 5-7: Simple text addition
  while(qs.length < 7) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const answer = a + b;
    addQuestion({ id: qs.length + 1, type: 'addition', text: `${a} + ${b} = ?`, options: generateOptions(answer), answer});
  }

  // Q 8-14: Simple subtraction (e.g. 5 - 2)
  while(qs.length < 14) {
    let a = Math.floor(Math.random() * 5) + 5; // 5 to 9
    let b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    // Ensure b is less than a
    if(b >= a) {
      b = a - 1;
    }
    const answer = a - b;
    addQuestion({ id: qs.length + 1, type: 'subtraction', text: `${a} - ${b} = ?`, options: generateOptions(answer), answer});
  }

  // Q 15-20: Missing numbers (e.g. 5 + ? = 9) or slightly harder addition
  while(qs.length < 20) {
    const a = Math.floor(Math.random() * 5) + 5; // 5 to 9
    const ans = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const total = a + ans;
    addQuestion({ id: qs.length + 1, type: 'missing', text: `${a} + ? = ${total}`, options: generateOptions(ans), answer: ans});
  }
  
  return qs;
};

function generateOptions(correctAnswer) {
  const opts = new Set([correctAnswer]);
  while(opts.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const fake = correctAnswer + offset;
    if (fake >= 0 && fake !== correctAnswer) {
      opts.add(fake);
    } else {
      opts.add(correctAnswer + Math.floor(Math.random() * 4) + 1);
    }
  }
  // Shuffle options
  return Array.from(opts).sort(() => Math.random() - 0.5);
}
