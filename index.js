let active_tab = 0;

const fileNames = [
    'about.md',
    'experience.md',
    'skills.md',
    'projects.md',
    'contact.md'
];

function countLines(element) {
    let lineCount = 0;

    // Recursively count lines in element
    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Count newlines in text
            const text = node.textContent;
            lineCount += text.split('\n').length;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Handle specific elements
            if (node.tagName === 'BR') {
                lineCount += 1;
            } else if (['P', 'DIV', 'H1', 'H2', 'H3', 'LI'].includes(node.tagName)) {
                // These elements add a line
                if (node.children.length === 0 && node.textContent.trim() === '') {
                    lineCount += 1;
                } else {
                    for (let child of node.childNodes) {
                        traverse(child);
                    }
                    lineCount += 0.5; // Add small amount for block elements
                }
            } else {
                for (let child of node.childNodes) {
                    traverse(child);
                }
            }
        }
    }

    traverse(element);
    return Math.ceil(lineCount);
}

function generateLineNumbers(sectionId) {
    const contentArea = document.querySelector('main.content');
    const lineNumbersArea = document.getElementById('line-numbers');
    const section = document.getElementById(sectionId);

    // Wait for content to render
    setTimeout(() => {
        if (!section) {
            lineNumbersArea.textContent = '';
            return;
        }

        const lineCount = countLines(section);
        const contentHeight = contentArea.scrollHeight;
        const lineHeight = parseFloat(window.getComputedStyle(contentArea).lineHeight);
        const visualLineCount = Math.ceil(contentHeight / lineHeight);

        // Use visual line count as it's more reliable
        const finalLineCount = Math.max(lineCount, visualLineCount);

        let html = '';
        for (let i = 1; i <= finalLineCount; i++) {
            html += i + '\n';
        }
        lineNumbersArea.textContent = html;
    }, 50);
}

function updateStatusLine() {
    const fileName = fileNames[active_tab];
    const statuslineFile = document.getElementById('statusline-file');
    const statuslinePosition = document.getElementById('statusline-position');

    statuslineFile.textContent = fileName;
    statuslinePosition.textContent = '1:1';
}

function updateSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        if (index === active_tab) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function toggleTab(index) {
    active_tab = index;

    // Hide all sections
    const sections = document.querySelectorAll('.content-block');
    sections.forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('block');
    });

    // Show active section
    const activeSection = document.getElementById('section-' + index);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.classList.add('block');
    }

    // Update UI
    updateSidebar();
    updateStatusLine();
    generateLineNumbers('section-' + index);

    // Scroll to top
    const contentArea = document.querySelector('main.content');
    if (contentArea) {
        contentArea.scrollTop = 0;
    }
}

// Sync scroll between line numbers and content
document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.querySelector('main.content');
    const lineNumbersArea = document.getElementById('line-numbers');

    contentArea.addEventListener('scroll', function() {
        lineNumbersArea.scrollTop = contentArea.scrollTop;
    });

    toggleTab(0);
});
