const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let scssLines = [];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanges = false;
    let sectionCount = 1;
    let pageName = file.replace('.html', '');

    // Pattern to match <section ...> taking newlines into account
    content = content.replace(/<section([^>]*)>/gi, (match, attrsText) => {
        let hasChangesInside = false;

        // Find existing id
        let idMatch = attrsText.match(/id\s*=\s*"([^"]+)"/);
        let idName = idMatch ? idMatch[1] : null;

        // If no ID, generate one
        if (!idName) {
            idName = `${pageName}-section-${sectionCount}`;
            attrsText = ` id="${idName}"` + attrsText;
            hasChangesInside = true;
        }

        // Find classes and move background/utility classes to SCSS
        let classMatch = attrsText.match(/class\s*=\s*"([^"]+)"/);
        let keptClasses = [];
        let movedClasses = [];

        if (classMatch) {
            const classes = classMatch[1].split(/\s+/).filter(Boolean);
            classes.forEach(cls => {
                // keep py-section, mb-section, containers etc
                if (cls === 'py-section' || cls === 'mb-section' || cls === 'container' || cls.includes('container-') || cls === 'row' || cls === 'col' || cls === 'reveal') {
                    keptClasses.push(cls);
                } else {
                    movedClasses.push(cls);
                }
            });

            if (movedClasses.length > 0) {
                let rules = [];
                movedClasses.forEach(cls => {
                    // map bootstrap utilities back to logical SCSS
                    if (cls === 'bg-surface') rules.push('background-color: $neutral-300;');
                    else if (cls === 'bg-white') rules.push('background-color: #ffffff;');
                    else if (cls === 'bg-light') rules.push('background-color: $neutral-100;');
                    else if (cls === 'bg-primary') rules.push('background-color: $primary;');
                    else if (cls === 'bg-secondary') rules.push('background-color: $secondary;');
                    else if (cls === 'bg-secondary-dark' || cls === 'bg-luxury-dark-green') rules.push('background-color: $secondary-dark;');
                    else if (cls === 'text-white') rules.push('color: #ffffff;');
                    else if (cls === 'text-center') rules.push('text-align: center;');
                    else if (cls === 'text-start') rules.push('text-align: left;');
                    else if (cls === 'text-end') rules.push('text-align: right;');
                    else if (cls === 'position-relative') rules.push('position: relative;');
                    else if (cls === 'overflow-hidden') rules.push('overflow: hidden;');
                    else if (cls.startsWith('pb-') && cls === 'pb-0') rules.push('padding-bottom: 0 !important;');
                    else {
                        // For other specific utility classes we don't map explicitly
                        // We will keep them in HTML to avoid breaking the layout completely.
                        keptClasses.push(cls);
                    }
                });

                if (rules.length > 0) {
                    scssLines.push(`\n#${idName} {\n    ${rules.join('\n    ')}\n}`);
                }

                // Update attrs to only include keptClasses
                if (keptClasses.length > 0) {
                    attrsText = attrsText.replace(classMatch[0], `class="${keptClasses.join(' ')}"`);
                } else {
                    attrsText = attrsText.replace(classMatch[0], ''); // completely omit class=""
                }
                hasChangesInside = true;
            }
        }

        if (hasChangesInside) {
            hasChanges = true;
        }

        sectionCount++;
        return `<section${attrsText}>`;
    });

    if (hasChanges) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated file: ${file}`);
    }
});

if (scssLines.length > 0) {
    const scssPath = 'assets/scss/components/_components.scss';
    fs.appendFileSync(scssPath, '\n/* Auto-generated Section Utilities */' + scssLines.join(''));
    console.log(`Appended SCSS into ${scssPath}`);
}
