// Scene Switcher: Ensures only one scene is visible at a time
function showScene(sceneId) {
    // Hide all scenes
    const allScenes = document.querySelectorAll('.scene');
    allScenes.forEach(scene => {
        scene.classList.remove('active');
    });

    // Show target scene
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
    }

    // Trigger game if Scene 3 is opened
    if (sceneId === 'scene3') {
        startHeartGame();
    }
    // Trigger Typing if Scene 7 is opened
    if (sceneId === 'scene7') {
        startTyping();
    }
}

// Password Logic
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const error = document.getElementById('errorMsg');
    const inputField = document.getElementById('passwordInput');

    if (input === "Falak123") {
        showScene('scene2');
    } else {
        error.style.display = 'block';
        inputField.classList.add('shake');
        setTimeout(() => inputField.classList.remove('shake'), 400);
    }
}

// Heart Game Logic
let score = 0;
function startHeartGame() {
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');

    const gameInterval = setInterval(() => {
        if (score >= 10) {
            clearInterval(gameInterval);
            setTimeout(() => showScene('scene4'), 800);
            return;
        }

        const heart = document.createElement('div');
        heart.className = 'heart-drop';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 85 + '%';
        heart.style.top = '-50px';
        gameArea.appendChild(heart);

        let pos = -50;
        const fall = setInterval(() => {
            pos += 4;
            heart.style.top = pos + 'px';
            if (pos > gameArea.clientHeight) {
                clearInterval(fall);
                heart.remove();
            }
        }, 20);

        heart.onclick = () => {
            score++;
            scoreDisplay.innerText = score;
            heart.remove();
            clearInterval(fall);
            createConfetti(5);
        };
    }, 900);
}

// Cake Cutting Logic
function cutTheCake() {
    const knife = document.getElementById('knife');
    const flames = document.querySelector('.candle-flames');
    const cake = document.getElementById('cakeImg');
    const btn = document.getElementById('cutBtn');

    knife.classList.add('cut-action');
    
    setTimeout(() => {
        flames.style.display = 'none'; // Blow out candles
        cake.style.clipPath = "polygon(0 0, 48% 0, 48% 100%, 0% 100%)"; // Visual cut
        createConfetti(50);
        btn.innerText = "Next Step";
        btn.onclick = () => showScene('scene5');
    }, 1000);
}

// Love Letter Typing Logic
const letterContent = [
    "Happy Birthday Meri Jaan ❤️",
    "You are the most beautiful part of my life.",
    "Your smile makes my world beautiful.",
    "I pray Allah always keeps you happy.",
    "You are my biggest blessing.",
    "Thank you for being in my life.",
    "I will always respect and care for you.",
    "May all your dreams come true.",
    "I wish every happiness for you.",
    "I love you more every day.",
    "You are my forever.",
    "Happy Birthday My Love ❤️",
    "\nForever Yours ❤️"
];

function startTyping() {
    const target = document.getElementById('typewriter');
    let lineIdx = 0;
    let charIdx = 0;

    function typeLine() {
        if (lineIdx < letterContent.length) {
            if (charIdx < letterContent[lineIdx].length) {
                target.innerHTML += letterContent[lineIdx].charAt(charIdx);
                charIdx++;
                setTimeout(typeLine, 50);
            } else {
                target.innerHTML += "<br>";
                lineIdx++;
                charIdx = 0;
                setTimeout(typeLine, 600);
            }
        } else {
            document.getElementById('replayBtn').style.display = 'block';
            createConfetti(100);
        }
    }
    typeLine();
}

// Confetti Celebration
function createConfetti(amount) {
    const colors = ['#ff4d6d', '#ffb703', '#ffffff', '#7209b7'];
    for (let i = 0; i < amount; i++) {
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        div.style.left = Math.random() * 100 + 'vw';
        div.style.top = '-10px';
        div.style.zIndex = '9999';
        div.style.borderRadius = '50%';
        document.body.appendChild(div);

        let y = -10;
        let x = 0;
        const fall = setInterval(() => {
            y += 5;
            x += Math.sin(y / 20) * 2;
            div.style.top = y + 'px';
            div.style.transform = `translateX(${x}px)`;
            if (y > window.innerHeight) {
                clearInterval(fall);
                div.remove();
            }
        }, 20);
    }
}
