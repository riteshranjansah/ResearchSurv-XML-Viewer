if (!window.contentScriptInjected) {
    window.contentScriptInjected = true; // Set a flag to indicate the script has been injected

    console.log('Content script injected');

    window.addEventListener('load', () => {
        console.log('Window fully loaded');

        // Inject CSS
        const style = document.createElement('style');
        style.textContent = `
            pre {
                white-space: pre-wrap; /* Ensure line wrapping */
                word-wrap: break-word; /* Ensure long words are broken to fit within the container */
            }
            .line-number {
                width: 50px;
                text-align: right;
                padding-right: 10px;
                color: #999;
                user-select: none;
                vertical-align: top;
                background-color: #f7f7f7;
                border-right: 1px solid #ddd; /* Vertical line */
            }
            .attribute-name {
                color: #2518cc;
            }
            .attribute-value {
                color: #b42721;
            }
            .tag {
                color: #207a10;
            }
            table {
                border-spacing: 0;
                width: 100%;
            }
            td {
                padding: 0;
            }
        `;
        document.head.append(style);

        const preBlocks = document.querySelectorAll('pre');
        if (preBlocks.length === 0) {
            console.log('No <pre> tags found.');
        } else {
            console.log(`Found ${preBlocks.length} <pre> tags.`);
            preBlocks.forEach((block, index) => {
                console.log(`Highlighting syntax for <pre> tag ${index + 1}`);
                block.innerHTML = highlightXML(block.textContent);
            });
        }
    });

    function highlightXML(xml) {
        xml = xml.replace(/\s+id="[^"]*"/g, '');
        // Add a new line after <suspend/>
        xml = xml.replace(/<suspend\/>/g, '<suspend/>\n');
        // Escape HTML entities
        xml = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Match and highlight attribute names and values
        xml = xml.replace(/(\b\w+)\s*=\s*"([^"]*)"/g, '<span class="attribute-name">$1</span>=<span class="attribute-value">"$2"</span>');

        // Match and highlight opening tags
        xml = xml.replace(/(&lt;\/?\w+)/g, '<span class="tag">$1</span>');

        // Match and highlight self-closing tags
        xml = xml.replace(/(\/&gt;)/g, '<span class="tag">$1</span>');

        // Match and highlight closing tags
        xml = xml.replace(/(&gt;)/g, '<span class="tag">$1</span>');

        // Replace &quot; with actual double quotes
        xml = xml.replace(/(&amp;quot;)/g, '"');

        // Split into lines and add line numbers
        const lines = xml.split('\n');
        xml = '<table>';
        lines.forEach((line, index) => {
            xml += `<tr><td class="line-number">${index + 1}</td><td>${line}</td></tr>`;
        });
        xml += '</table>';

        return xml;
    }
}
