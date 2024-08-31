(() => {
    const subjects = Array
        .from(document.querySelectorAll('tr.elem_vsechna_obdobi:not(.vyrazne)'))
        .filter(x => !!x.querySelector('td') && !x.querySelector('th'));
    
    const subject = subjects[0];
    const tds = Array.from(subject.querySelectorAll('td'));
	const nameTd =     tds[0];

    const x = nameTd.childNodes;
    return x[1].textContent;

})();
