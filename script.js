// ========================================
// MENU HAMBURGER - MOBILE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu ao clicar no hamburger
    hamburger.addEventListener('click', function() {
        const isOpen = this.classList.toggle('active');
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', isOpen.toString());
    });

    // Fechar menu ao clicar num link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu quando a janela redimensiona acima de 768px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// ========================================
// SCROLL SUAVE GLOBAL
// ========================================

// A navegação já usa scroll-behavior: smooth no CSS, 
// mas adicionamos handler para melhorar UX

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px para compensar navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// TIMELINE INTERATIVA
// ========================================

const timelineItems = document.querySelectorAll('.timeline-item');
const timelineDetails = document.getElementById('timelineDetails');
const timelineImage = document.getElementById('timelineImage');
const timelineTitle = document.getElementById('timelineTitle');
const timelineDescription = document.getElementById('timelineDescription');

// Adicionar efeito de clique na timeline
timelineItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        // Remover classe active de todos os items
        timelineItems.forEach(i => i.classList.remove('active'));
        // Adicionar classe active ao item clicado
        this.classList.add('active');

        // Obter dados do item clicado
        const image = this.dataset.image;
        const title = this.querySelector('h3').textContent;
        const description = this.dataset.description;

        // Atualizar painel de detalhes
        timelineImage.src = image;
        timelineImage.alt = title;
        timelineTitle.textContent = title;
        timelineDescription.textContent = description;

        // Mostrar painel com animação
        timelineDetails.classList.add('active');

        // Scroll suave para o painel se necessário
        setTimeout(() => {
            timelineDetails.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    });

    // Efeito ao passar mouse (hover)
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });

    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ========================================
// ANIMAÇÃO DAS BARRAS DE PROGRESSO
// ========================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Quando a secção entra em vista, as barras já estão animadas pelo CSS
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar secção de dificuldades
const dificuldadesSection = document.querySelector('.dificuldades');
if (dificuldadesSection) {
    progressObserver.observe(dificuldadesSection);
}

// ========================================
// ANIMAÇÃO DE FADE-IN AO SCROLL
// ========================================

const elementObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observar cards, seções e elementos que devem ter fade-in
const cardsToObserve = document.querySelectorAll(
    '.conflict-card, .benefit-card, .advantage-card, .challenge-item, .conclusion-point'
);

cardsToObserve.forEach(card => {
    card.classList.add('fade-in-element');
    elementObserver.observe(card);
});

// CSS para fade-in (adicionado dinamicamente)
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-element.fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-item.active {
        animation: pulse 0.6s ease;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ========================================
// EFEITOS DE PARALLAX SUAVE
// ========================================

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Efeito parallax na hero section
        hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
    }
});

// ========================================
// ANIMAÇÃO DO UNDERLINE NA NAVEGAÇÃO
// ========================================

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// BOTÕES COM RIPPLE EFFECT
// ========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple-animation 0.6s ease-out;
        `;

        this.appendChild(ripple);

        // Remover ripple após animação
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

// Adicionar estilos para ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// CONTADOR DE VISUALIZAÇÕES (OPCIONAL)
// ========================================

// Marcar quando cada seção foi visualizada
const sections = document.querySelectorAll('section');
const viewedSections = new Set();

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            viewedSections.add(entry.target.id);
            // Aqui poderia enviar dados de telemetria
            // console.log('Seção visualizada:', entry.target.id);
        }
    });
}, { threshold: 0.25 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========================================
// EVENTO AO CARREGAR PÁGINA
// ========================================

window.addEventListener('load', function() {
    // Remover loader se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }

    // Adicionar classe 'loaded' ao body para animações
    document.body.classList.add('loaded');

    // Log de sucesso
    console.log('🇲🇰 Website Macedónia do Norte carregado com sucesso!');
});

// ========================================
// PREVENIR FLICKERS NAS ANIMAÇÕES
// ========================================

// Otimização de performance
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Carregar elementos pesados após o carregamento inicial
    });
}

// ========================================
// VOLTAR AO TOPO COM BOTÃO (FUTURO)
// ========================================

// Função para criar botão "voltar ao topo" quando necessário
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--dourado);
        color: var(--azul-escuro);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Descomentar para ativar botão "voltar ao topo"
// createBackToTopButton();

// ========================================
// TRATAMENTO DE ERROS E LOGS
// ========================================

window.addEventListener('error', (event) => {
    console.error('Erro no script:', event.error);
});

// Log final
console.log('✅ Todos os scripts carregados e ativos!');
 

// ========================================
// BACKGROUND - FLOATING SUNS
// ========================================

(function () {
    function initSuns() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Resize canvas to fill the window
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Draw a sun: circle + 8 rays
        function drawSun(x, y, r, alpha) {
            const rays = 8;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = '#FFD200';
            ctx.fillStyle = '#FFD200';
            ctx.lineWidth = Math.max(2, r * 0.25);
            ctx.lineCap = 'round';

            // Rays
            for (let i = 0; i < rays; i++) {
                const angle = (i / rays) * Math.PI * 2;
                const innerR = r * 1.3;
                const outerR = r * 2.2;
                ctx.beginPath();
                ctx.moveTo(x + Math.cos(angle) * innerR, y + Math.sin(angle) * innerR);
                ctx.lineTo(x + Math.cos(angle) * outerR, y + Math.sin(angle) * outerR);
                ctx.stroke();
            }

            // Core circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Create sun particles
        const NUM_SUNS = 20;
        const suns = [];

        for (let i = 0; i < NUM_SUNS; i++) {
            suns.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: 8 + Math.random() * 18,          // radius 8–26px
                alpha: 0.18 + Math.random() * 0.22, // 18–40% opacity
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                rotSpeed: (Math.random() - 0.5) * 0.005,
                rot: Math.random() * Math.PI * 2,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Soft warm gradient background
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            grad.addColorStop(0, '#fffdf5');
            grad.addColorStop(1, '#f5f0ea');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw each sun
            suns.forEach(s => {
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(s.rot);
                drawSun(0, 0, s.r, s.alpha);
                ctx.restore();

                s.x += s.speedX;
                s.y += s.speedY;
                s.rot += s.rotSpeed;

                // Wrap around edges
                const pad = 60;
                if (s.x < -pad) s.x = canvas.width + pad;
                if (s.x > canvas.width + pad) s.x = -pad;
                if (s.y < -pad) s.y = canvas.height + pad;
                if (s.y > canvas.height + pad) s.y = -pad;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSuns);
    } else {
        initSuns();
    }
})();

// ========================================
// FLAG RAIN
// ========================================

document.getElementById('flag-rain-btn').addEventListener('click', function () {
    const count = 40;
    const images = ['descarregar.webp', 'descarregar.webp', 'descarregar.webp', 'descarregar3.webp'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const el = document.createElement('img');
            el.src = images[Math.floor(Math.random() * images.length)];
            el.alt = 'Macedónia do Norte';
            el.classList.add('falling-flag');

            // Random horizontal position
            el.style.left = Math.random() * 100 + 'vw';

            // Random size between 40px and 90px wide
            const width = 40 + Math.random() * 50;
            el.style.width = width + 'px';
            el.style.height = (width * 0.65) + 'px';
            el.style.objectFit = 'cover';
            el.style.borderRadius = '4px';
            el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';

            // Random fall duration between 2s and 5s
            const duration = 2 + Math.random() * 3;
            el.style.animationDuration = duration + 's';

            document.body.appendChild(el);

            // Remove after animation ends
            el.addEventListener('animationend', () => el.remove());
        }, i * 60);
    }
});

// ========================================
// FUN FACTS + SECRET CURIOSIDADES
// ========================================

const funfacts = [
    { emoji: '🏛️', text: 'A cidade de Ohrid, na Macedónia do Norte, é considerada a "Jerusalém dos Balcãs" — tem mais de 365 igrejas, uma para cada dia do ano.' },
    { emoji: '📜', text: 'O alfabeto cirílico foi criado no século IX por São Clemente de Ohrid, que viveu e trabalhou no território da atual Macedónia do Norte.' },
    { emoji: '🌊', text: 'O Lago Ohrid é um dos lagos mais antigos do mundo, com mais de 3 milhões de anos, e é Património Mundial da UNESCO.' },
    { emoji: '🍷', text: 'A Macedónia do Norte é um dos maiores produtores de vinho per capita da Europa, com uma tradição vinícola de mais de 4000 anos.' },
    { emoji: '🌍', text: 'Apesar de ser um país pequeno (25 713 km²), a Macedónia do Norte faz fronteira com 5 países: Sérvia, Kosovo, Bulgária, Grécia e Albânia.' },
    { emoji: '🏔️', text: 'O ponto mais alto do país é o Monte Korab, com 2764 metros — é também o ponto mais alto da Albânia, pois a fronteira passa pelo cume.' },
    { emoji: '🎭', text: 'Skopje, a capital, tem uma das maiores concentrações de estátuas por habitante do mundo, com mais de 130 estátuas só no centro da cidade.' },
    { emoji: '🌿', text: 'A Macedónia do Norte produz cerca de 80% de todo o tabaco cultivado na região dos Balcãs.' },
    { emoji: '🐟', text: 'A truta de Ohrid (Salmo letnica) é uma espécie de peixe endémica que só existe no Lago Ohrid e é considerada um símbolo nacional.' },
    { emoji: '🤝', text: 'A Macedónia do Norte aderiu à NATO em 2020, tornando-se o 30.º membro da aliança — um passo importante no seu caminho para a integração europeia.' },
    { emoji: '🎵', text: 'A música tradicional macedónia usa ritmos assimétricos únicos, como o 7/8 e o 11/8, que são raros na música europeia.' },
    { emoji: '🏺', text: 'A região foi habitada desde o Paleolítico. A cidade de Stobi, fundada no século IV a.C., foi uma das mais importantes cidades romanas dos Balcãs.' },
];

let lastFunfactIndex = -1;

function getRandomFunfact() {
    let idx;
    do { idx = Math.floor(Math.random() * funfacts.length); }
    while (idx === lastFunfactIndex && funfacts.length > 1);
    lastFunfactIndex = idx;
    return funfacts[idx];
}

// --- Fun fact button ---
const funfactBtn  = document.getElementById('funfact-btn');
const funfactCard = document.getElementById('funfact-card');
const funfactText = document.getElementById('funfact-text');
const funfactClose = document.getElementById('funfact-close');
const funfactNext  = document.getElementById('funfact-next');

function showFunfact() {
    const fact = getRandomFunfact();
    funfactText.textContent = fact.text;
    funfactCard.classList.add('visible');
    // re-trigger animation
    funfactCard.style.animation = 'none';
    funfactCard.offsetHeight; // reflow
    funfactCard.style.animation = '';
}

funfactBtn.addEventListener('click', function () {
    if (funfactCard.classList.contains('visible')) {
        funfactCard.classList.remove('visible');
    } else {
        showFunfact();
    }
});

funfactClose.addEventListener('click', () => funfactCard.classList.remove('visible'));
funfactNext.addEventListener('click', showFunfact);

// Close funfact card when clicking outside
document.addEventListener('click', function (e) {
    if (funfactCard.classList.contains('visible') &&
        !funfactCard.contains(e.target) &&
        !funfactBtn.contains(e.target)) {
        funfactCard.classList.remove('visible');
    }
});

// --- Secret curiosidades overlay ---
const overlay         = document.getElementById('curiosidades-overlay');
const openBtn         = document.getElementById('openCuriosidades');
const closeBtn        = document.getElementById('closeCuriosidades');
const grid            = document.getElementById('curiosidadesGrid');

// Populate the grid with all fun facts
funfacts.forEach(fact => {
    const card = document.createElement('div');
    card.className = 'curiosidade-card';
    card.innerHTML = `<span class="curiosidade-emoji">${fact.emoji}</span><p class="curiosidade-text">${fact.text}</p>`;
    grid.appendChild(card);
});

openBtn.addEventListener('click', function () {
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden', 'false');
    // close the nav menu
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navMenu').classList.remove('active');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden', 'true');
});

// Close overlay on backdrop click
overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
        overlay.classList.remove('visible');
        overlay.setAttribute('aria-hidden', 'true');
    }
});

// Close overlay with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) {
        overlay.classList.remove('visible');
        overlay.setAttribute('aria-hidden', 'true');
    }
});

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const scrollBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = pct + '%';
});

// ========================================
// READING TIME ESTIMATE
// ========================================

(function () {
    const text = document.body.innerText || '';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200); // avg 200 wpm
    const el = document.getElementById('readingTime');
    if (el) el.textContent = `⏱ Leitura: ~${minutes} min`;
})();

// ========================================
// SHARE BUTTON
// ========================================

const shareBtn  = document.getElementById('shareBtn');
const shareToast = document.getElementById('share-toast');

shareBtn.addEventListener('click', function () {
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(showToast);
    } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast();
    }
});

function showToast() {
    shareToast.classList.add('visible');
    setTimeout(() => shareToast.classList.remove('visible'), 2500);
}

// ========================================
// DARK MODE TOGGLE
// ========================================

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = darkModeToggle.querySelector('.dark-mode-icon');

// Check saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.textContent = '☀️';
}

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});

// ========================================
// SECRET QUIZ
// ========================================

const quizData = [
    {
        question: "Em que ano a Macedónia do Norte se tornou independente?",
        options: ["1989", "1991", "1995", "2001"],
        correct: 1
    },
    {
        question: "Qual foi o nome oficial do país entre 1991 e 2019?",
        options: ["República da Macedónia", "Antiga República Jugoslava da Macedónia", "Macedónia do Sul", "República Jugoslava"],
        correct: 1
    },
    {
        question: "Quantos países fazem fronteira com a Macedónia do Norte?",
        options: ["3", "4", "5", "6"],
        correct: 2
    },
    {
        question: "Qual é a cor de fundo da bandeira da Macedónia do Norte?",
        options: ["Azul", "Verde", "Vermelho", "Amarelo"],
        correct: 2
    },
    {
        question: "Em que ano a Macedónia do Norte aderiu à NATO?",
        options: ["2005", "2015", "2018", "2020"],
        correct: 3
    }
];

const quizOverlay = document.getElementById('quiz-overlay');
const openQuizBtn = document.getElementById('openQuiz');
const closeQuizBtn = document.getElementById('closeQuiz');
const quizContainer = document.getElementById('quiz-container');
const quizResult = document.getElementById('quiz-result');
const submitBtn = document.getElementById('quiz-submit');
const restartBtn = document.getElementById('quiz-restart');

let userAnswers = [];

function renderQuiz() {
    userAnswers = [];
    quizContainer.innerHTML = '';
    quizResult.style.display = 'none';
    submitBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';

    quizData.forEach((q, qIndex) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        
        const qText = document.createElement('p');
        qText.className = 'quiz-question-text';
        qText.textContent = `${qIndex + 1}. ${q.question}`;
        qDiv.appendChild(qText);

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'quiz-options';

        q.options.forEach((opt, oIndex) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.dataset.qIndex = qIndex;
            btn.dataset.oIndex = oIndex;
            btn.addEventListener('click', selectOption);
            optionsDiv.appendChild(btn);
        });

        qDiv.appendChild(optionsDiv);
        quizContainer.appendChild(qDiv);
    });
}

function selectOption(e) {
    const qIndex = parseInt(e.target.dataset.qIndex);
    const oIndex = parseInt(e.target.dataset.oIndex);
    
    // Deselect others in this question
    const allOptions = document.querySelectorAll(`[data-q-index="${qIndex}"]`);
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    e.target.classList.add('selected');
    userAnswers[qIndex] = oIndex;
}

function submitQuiz() {
    if (userAnswers.length < quizData.length) {
        alert('Responde a todas as perguntas primeiro! 😊');
        return;
    }

    let correct = 0;
    quizData.forEach((q, qIndex) => {
        const allOptions = document.querySelectorAll(`[data-q-index="${qIndex}"]`);
        allOptions.forEach((opt, oIndex) => {
            opt.disabled = true;
            if (oIndex === q.correct) {
                opt.classList.add('correct');
            } else if (oIndex === userAnswers[qIndex] && oIndex !== q.correct) {
                opt.classList.add('wrong');
            }
        });
        if (userAnswers[qIndex] === q.correct) correct++;
    });

    const pct = (correct / quizData.length) * 100;
    let msg = '';
    let cls = '';

    if (pct === 100) {
        msg = `🎉 Perfeito! ${correct}/${quizData.length} corretas!`;
        cls = 'good';
    } else if (pct >= 60) {
        msg = `👏 Muito bem! ${correct}/${quizData.length} corretas!`;
        cls = 'good';
    } else if (pct >= 40) {
        msg = `😊 Não está mal! ${correct}/${quizData.length} corretas.`;
        cls = 'ok';
    } else {
        msg = `📚 Talvez reler o site? ${correct}/${quizData.length} corretas.`;
        cls = 'bad';
    }

    quizResult.textContent = msg;
    quizResult.className = `quiz-result ${cls}`;
    quizResult.style.display = 'block';
    submitBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
}

openQuizBtn.addEventListener('click', function () {
    renderQuiz();
    quizOverlay.classList.add('visible');
    quizOverlay.setAttribute('aria-hidden', 'false');
    // close nav
    document.getElementById('hamburger').classList.remove('active');
    document.getElementById('navMenu').classList.remove('active');
});

closeQuizBtn.addEventListener('click', () => {
    quizOverlay.classList.remove('visible');
    quizOverlay.setAttribute('aria-hidden', 'true');
});

submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', renderQuiz);

// Close on backdrop click
quizOverlay.addEventListener('click', function (e) {
    if (e.target === quizOverlay) {
        quizOverlay.classList.remove('visible');
        quizOverlay.setAttribute('aria-hidden', 'true');
    }
});

// Close with Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && quizOverlay.classList.contains('visible')) {
        quizOverlay.classList.remove('visible');
        quizOverlay.setAttribute('aria-hidden', 'true');
    }
});
