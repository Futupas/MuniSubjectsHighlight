(() => {
    function getTemplateSubjects() {
        const subjects = Array.from(document.querySelectorAll('li'))
            .filter(x => x.querySelector('table') && x.querySelector('a.okno'));

        return subjects.map(x => {
            const element = x;
            const code = x.innerText.trim().split(' ', 1)[0];
            if (!code.length || !code.includes(':')) console.error('Unknown code: ', code);
            return {
                code, element
            }
        });
    }

    return getTemplateSubjects();

})();
