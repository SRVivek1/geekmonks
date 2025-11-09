// Mermaid JS: render diagrams client-side. We convert fenced code blocks
// 		 with class `language-mermaid` into <div class="mermaid"> so existing
// 		 markdown files don't need editing. 


(function () {
    var debounceTimer = null;
    function convertAndInit() {
        // Convert fenced code blocks (common markdown output: <pre><code class="language-mermaid">...)
        document.querySelectorAll('pre > code.language-mermaid, pre > code.lang-mermaid').forEach(function (code) {
            var pre = code.parentNode;
            var wrapper = document.createElement('div');
            wrapper.className = 'mermaid';
            // preserve literal text (avoid HTML decoding issues)
            wrapper.textContent = code.textContent;
            pre.parentNode.replaceChild(wrapper, pre);
        });

        if (window.mermaid) {
            try {
                mermaid.initialize({ startOnLoad: true });
                // Initialize any mermaid blocks present
                mermaid.init(undefined, document.querySelectorAll('.mermaid'));
            } catch (e) {
                console.error('Mermaid initialization error:', e);
            }
        }
    }

    function scheduleConvert() {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () { convertAndInit(); }, 50);
    }

    // Run once on initial load
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        convertAndInit();
    } else {
        document.addEventListener('DOMContentLoaded', convertAndInit);
    }

    // Observe DOM changes so dynamically-inserted topic content (AJAX) gets converted
    try {
        var observer = new MutationObserver(function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (m.addedNodes && m.addedNodes.length) {
                    // If any added node contains mermaid code or mermaid blocks, schedule conversion
                    for (var j = 0; j < m.addedNodes.length; j++) {
                        var node = m.addedNodes[j];
                        if (node.nodeType !== 1) continue; // element only
                        if (node.matches && (node.matches('.mermaid') || node.querySelector && node.querySelector('code.language-mermaid, code.lang-mermaid'))) {
                            scheduleConvert();
                            return;
                        }
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        // MutationObserver not available -> fall back to nothing (most browsers support it)
        console.warn('MutationObserver not available for mermaid auto-init', err);
    }
})();
