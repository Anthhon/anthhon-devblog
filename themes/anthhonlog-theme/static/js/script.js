function switchMenuOption(self) {
    const optionText = self.textContent.trim();
    const sectionMap = {
        'Postagens': 'section1',
        'Descompilando': 'section2',
        'Sobre mim': 'section3'
    };

    // Show only selected section
    const targetId = sectionMap[optionText];
    if (!targetId) return; // Should not be needed, but there it is anyways

    const sections = document.querySelectorAll('.section-group');
    sections.forEach(section => section.classList.add('hidden'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.remove('hidden');

    // Set selected menu option and title size
}
