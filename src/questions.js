export const getQuestions = () => {
  // Generate 20 questions
  const qs = [];
  const emojis = ['⚽', '🍎', '🏀', '🧸', '🐶'];

  // Q 1-4: Object addition (e.g. 2 balls + 3 balls)
  for(let i=0; i<4; i++) {
    const a = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const answer = a + b;
    const emoji = emojis[i % emojis.length];
    qs.push({ 
      id: i+1, 
      type: 'object_addition', 
      a, b, emoji, 
      text: `${a} + ${b} = ?`, 
      options: generateOptions(answer), 
      answer
    });
  }
  // Q 5-7: Simple text addition
  for(let i=4; i<7; i++) {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const answer = a + b;
    qs.push({ id: i+1, type: 'addition', text: `${a} + ${b} = ?`, options: generateOptions(answer), answer});
  }
  // Q 8-14: Simple subtraction (e.g. 5 - 2)
  for(let i=0; i<7; i++) {
    const a = Math.floor(Math.random() * 5) + 5; // 5 to 9
    const b = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const answer = a - b;
    qs.push({ id: 7+i+1, type: 'subtraction', text: `${a} - ${b} = ?`, options: generateOptions(answer), answer});
  }
  // Q 15-20: Missing numbers (e.g. 5 + ? = 9) or slightly harder addition
  for(let i=0; i<6; i++) {
    const a = Math.floor(Math.random() * 5) + 5; // 5 to 9
    const ans = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const total = a + ans;
    qs.push({ id: 14+i+1, type: 'missing', text: `${a} + ? = ${total}`, options: generateOptions(ans), answer: ans});
  }
  return qs;
};

function generateOptions(correctAnswer) {
  const opts = new Set([correctAnswer]);
  while(opts.size < 4) {
    const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const fake = correctAnswer + offset;
    if (fake > 0 && fake !== correctAnswer) {
      opts.add(fake);
    } else {
      opts.add(correctAnswer + Math.floor(Math.random() * 4) + 1);
    }
  }
  // Shuffle options
  return Array.from(opts).sort(() => Math.random() - 0.5);
}
