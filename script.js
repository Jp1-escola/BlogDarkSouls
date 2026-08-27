// Ambient embers drifting up the page — a quiet nod to Blighttown / Izalith.
// Respects prefers-reduced-motion by simply not spawning any.

(function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var container = document.getElementById('embers');
    if (!container || reduceMotion) return;

    var EMBER_COUNT = 18;

    for (var i = 0; i < EMBER_COUNT; i++) {
        var ember = document.createElement('span');
        ember.className = 'ember';

        var left = Math.random() * 100; // vw
        var duration = 9 + Math.random() * 10; // seconds
        var delay = Math.random() * 14; // seconds
        var drift = (Math.random() * 60 - 30) + 'px';
        var size = 2 + Math.random() * 2;

        ember.style.left = left + 'vw';
        ember.style.width = size + 'px';
        ember.style.height = size + 'px';
        ember.style.setProperty('--drift', drift);
        ember.style.animationDuration = duration + 's';
        ember.style.animationDelay = delay + 's';

        container.appendChild(ember);
    }
})();

// =========================================================
// Alternância de tema (claro / escuro) — persistida em localStorage
// =========================================================

(function () {
    var THEME_KEY = 'lordrans-lore:theme';
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggle.setAttribute('aria-label', 'Alternar para modo escuro');
        } else {
            document.documentElement.removeAttribute('data-theme');
            toggle.setAttribute('aria-label', 'Alternar para modo claro');
        }
    }

    // Garante que o rótulo do botão comece coerente com o tema já aplicado
    // pelo script inline no <head>.
    applyTheme(currentTheme());

    toggle.addEventListener('click', function () {
        var next = currentTheme() === 'light' ? 'dark' : 'light';
        applyTheme(next);
        try {
            localStorage.setItem(THEME_KEY, next);
        } catch (e) {
            // segue sem persistir se localStorage estiver indisponível
        }
    });
})();

// =========================================================
// Sistema de curtidas (fogueiras) — persistido em localStorage
// Cada boss tem uma contagem própria; o navegador lembra quais
// o visitante já curtiu, mesmo depois de fechar a página.
// =========================================================

(function () {
    var STORAGE_KEY = 'lordrans-lore:likes';
    var buttons = document.querySelectorAll('.like-btn');
    if (!buttons.length) return;

    function loadLikes() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            // localStorage indisponível (modo privado, etc.) — segue sem persistir
            return {};
        }
    }

    function saveLikes(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            // silenciosamente ignora se não for possível salvar
        }
    }

    var likes = loadLikes();

    function stateFor(bossId) {
        if (!likes[bossId]) {
            likes[bossId] = { liked: false, count: 0 };
        }
        return likes[bossId];
    }

    function render(btn, state) {
        btn.setAttribute('aria-pressed', state.liked ? 'true' : 'false');
        btn.querySelector('.like-count').textContent = state.count;
        var word = state.count === 1 ? 'curtida' : 'curtidas';
        btn.querySelector('.like-word').textContent = word;
    }

    buttons.forEach(function (btn) {
        var bossId = btn.getAttribute('data-boss-id');
        var state = stateFor(bossId);
        render(btn, state);

        btn.addEventListener('click', function () {
            var state = stateFor(bossId);
            state.liked = !state.liked;
            state.count += state.liked ? 1 : -1;
            if (state.count < 0) state.count = 0;

            render(btn, state);
            saveLikes(likes);

            if (state.liked) {
                btn.classList.remove('just-kindled');
                // força reflow para reiniciar a animação em cliques rápidos
                void btn.offsetWidth;
                btn.classList.add('just-kindled');
            }
        });
    });
})();
