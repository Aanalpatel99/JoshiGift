// Data embedded directly into the script
const data = {
  compliments: [
    "You deserve the world, Princess!",
    "You are unstoppable.",
    "Your kindness makes everything brighter.",
    "You're the definition of grace and power.",
    "You light up every room you enter."
  ],
  self_care: [
    "Take a bubble bath today.",
    "Treat yourself to your favorite dessert.",
    "Write down 3 things you love about yourself.",
    "Put on your comfiest pajamas and relax.",
    "Play your favorite song and dance around."
  ],
  quotes: [
    "She believed she could, so she did.",
    "You are more than enough.",
    "Be your own kind of beautiful.",
    "Queen energy only.",
    "Your potential is limitless."
  ]
};

function showTreatment() {
  const compliment = data.compliments[Math.floor(Math.random() * data.compliments.length)];
  const selfCare = data.self_care[Math.floor(Math.random() * data.self_care.length)];
  const quote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

  document.getElementById('message').innerHTML = `
    <p><strong>Compliment:</strong> ${compliment}</p>
    <p><strong>Self-Care Tip:</strong> ${selfCare}</p>
    <p><strong>Quote:</strong> ${quote}</p>
  `;
}
