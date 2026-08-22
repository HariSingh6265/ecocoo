// Three.js Setup for Hologram
const container = document.getElementById('hologram-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(400, 400);
container.appendChild(renderer.domElement);

// Create a high-tech looking core (Icosahedron with wireframe)
const geometry = new THREE.IcosahedronGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00f3ff, 
    wireframe: true,
    transparent: true,
    opacity: 0.8
});
const core = new THREE.Mesh(geometry, material);

// Add inner core
const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
const innerMat = new THREE.MeshBasicMaterial({ 
    color: 0xbc13fe, 
    wireframe: true,
    transparent: true,
    opacity: 0.5
});
const innerCore = new THREE.Mesh(innerGeo, innerMat);

scene.add(core);
scene.add(innerCore);

camera.position.z = 5;

// Animation Loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    core.rotation.x += 0.005;
    core.rotation.y += 0.01;
    
    innerCore.rotation.x -= 0.01;
    innerCore.rotation.y -= 0.005;

    // Breathing effect
    time += 0.05;
    const scale = 1 + Math.sin(time) * 0.05;
    core.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
}
animate();

// UI Logic
const micBtn = document.getElementById('mic-btn');
const visualizer = document.querySelector('.visualizer');
const statusText = document.getElementById('status-text');
const chatLog = document.getElementById('chat-log');
const textInput = document.getElementById('text-input');
const sendBtn = document.getElementById('send-btn');

let isRecording = false;

// Web Speech API for quick prototype (Browser-based STT)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        statusText.innerText = "LISTENING...";
        visualizer.classList.add('active');
        core.material.color.setHex(0xbc13fe); // change color to purple when listening
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        addMessage(transcript, 'user');
        sendToJarvis(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        statusText.innerText = "SYSTEM STANDBY";
        visualizer.classList.remove('active');
        isRecording = false;
        core.material.color.setHex(0x00f3ff);
    };

    recognition.onend = () => {
        statusText.innerText = "PROCESSING...";
        visualizer.classList.remove('active');
        isRecording = false;
        core.material.color.setHex(0x00f3ff);
    };
}

micBtn.addEventListener('click', () => {
    if (!recognition) {
        alert("Speech recognition not supported in this browser. Use Chrome/Edge.");
        return;
    }
    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
        isRecording = true;
    }
});

sendBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        textInput.value = '';
        sendToJarvis(text);
    }
});

textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    const prefix = sender === 'jarvis' ? 'JARVIS:' : 'USER:';
    div.innerHTML = `<span class="sender">${prefix}</span> ${text}`;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Communicate with Python Backend
async function sendToJarvis(message) {
    statusText.innerText = "ANALYZING...";
    visualizer.classList.add('active'); // mock thinking animation
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        visualizer.classList.remove('active');
        statusText.innerText = "SYSTEM STANDBY";
        
        addMessage(data.reply, 'jarvis');
        
    } catch (error) {
        console.error("Backend offline", error);
        visualizer.classList.remove('active');
        statusText.innerText = "OFFLINE";
        addMessage("Warning: Core systems are unreachable. Please ensure the Python backend is running.", 'jarvis');
    }
}
