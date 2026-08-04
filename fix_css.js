const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace('.app-body {\n    display: flex;\n    flex: 1;', '.app-body {\n    display: flex;\n    flex-direction: column;\n    flex: 1;');
css = css.replace(/\.sidebar-overlay {[\s\S]*?z-index: 99;\n}/, '');

const blocksToRemove = [
  /\.app-sidebar \{[\s\S]*?\n\}/,
  /\.sidebar-collapsed \.app-sidebar \{[\s\S]*?\n\}/,
  /\.sidebar-collapsed \.sidebar-nav,[\s\S]*?\n\}/,
  /\.sidebar-top \{[\s\S]*?\n\}/,
  /\.sidebar-collapsed \.sidebar-top \{[\s\S]*?\n\}/,
  /\.sidebar-nav ul \{[\s\S]*?\n\}/,
  /\.sidebar-nav \{[\s\S]*?\n\}/,
  /\.sidebar-nav li \{[\s\S]*?\n\}/,
  /\.sidebar-nav li:hover \{[\s\S]*?\n\}/,
  /\.sidebar-nav li\.active \{[\s\S]*?\n\}/,
  /\.sidebar-nav li\.completed \{[\s\S]*?\n\}/,
  /\.sidebar-title \{[\s\S]*?\n\}/,
  /\[data-theme=\"dark\"\] \.sidebar-nav li:hover \{[\s\S]*?\n\}/
];

blocksToRemove.forEach(regex => {
  css = css.replace(regex, '');
});

const horizontalNavStyles = \
/* --- Horizontal Navigation --- */
.horizontal-nav {
    background-color: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0.75rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 50;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    scrollbar-width: none;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}
.horizontal-nav::-webkit-scrollbar { display: none; }

.section-menu {
    list-style: none;
    display: flex;
    gap: 0.75rem;
    margin: 0;
    padding: 0;
}

.section-menu li {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-muted);
    background-color: var(--background);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.section-menu li:hover {
    background-color: rgba(0, 69, 173, 0.05);
    color: var(--primary);
    border-color: var(--primary);
}

.section-menu li.active {
    background-color: var(--primary);
    color: #ffffff;
    border-color: var(--primary);
    box-shadow: 0 2px 6px rgba(0, 69, 173, 0.3);
}

.section-menu li.completed {
    background-color: rgba(34, 197, 94, 0.1);
    color: var(--success);
    border-color: var(--success);
}
.section-menu li.completed.active {
    background-color: var(--success);
    color: #ffffff;
}

[data-theme=\"dark\"] .section-menu li {
    background-color: rgba(255, 255, 255, 0.03);
}
[data-theme=\"dark\"] .section-menu li:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
\;

css += horizontalNavStyles;
fs.writeFileSync('style.css', css);
console.log('CSS updated successfully.');

