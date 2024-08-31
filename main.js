(() => {

    function distinctFilter(value, index, array) {
        return array.indexOf(value) === index;
    }

    function getSubjectFromTr(tr) {
        const tds = Array.from(tr.querySelectorAll('td'));
        if (tds.length !== 7) {
            console.error('Bad length of tds in a tr', tds.length, tr);
            return { bad: true };
        }
        const nameTd =     tds[0];
        const creditsTd =  tds[1];
        const endingTd =   tds[2];
        const markTd =     tds[3];
        const markDateTd = tds[4]
        const commentTd =  tds[5]
        const setByTd =    tds[6];
    
        const code = nameTd.childNodes[0].querySelector('b > a')?.textContent?.trim();
        const link = nameTd.childNodes[0].querySelector('b > a')?.getAttribute('href');
        const name = nameTd.childNodes[1]?.textContent?.trim();
    
        const credits = creditsTd.innerText;
        const ending = endingTd.innerText;
        const mark = markTd.querySelector('strong')?.childNodes[1]?.textContent;
        const markDate = markDateTd.innerText;
    
        const comment = commentTd.innerText;
        const setBy = setByTd.innerText;
    
        const isOk = markTd.classList.contains('ok');
        const isNotOk = markTd.classList.contains('ko');
    
        if (isOk && isNotOk) {
            console.error('Subject is ok and nok at the same time', code, tr);
        }

        const isMarked = isOk || isNotOk;
    
        return {
            code,
            isOk,
            isNotOk,
            isMarked,
            name,
            link,
            credits,
            ending,
            mark,
            markDate,
            comment,
            setBy,
        };
    }

    function getSubjectsList(body) {
        const arr1 = Array
            .from(body.querySelectorAll('tr.elem_vsechna_obdobi:not(.vyrazne)'))
            .filter(x => !!x.querySelector('td') && !x.querySelector('th'))
            .map(getSubjectFromTr);
        const arr2 = Array
            .from(body.querySelectorAll('tr.elem_vybrane_obdobi:not(.vyrazne)'))
            .filter(x => !!x.querySelector('td') && !x.querySelector('th'))
            .map(getSubjectFromTr);
        
        return [ ...arr1, ...arr2 ];
        // return [ ...arr1, ...arr2 ].filter(x => x.isOk !== x.isNotOk); // Those who are neither ok, nor nok are not marked yet
    }

    function getSuccessDict(subjects) {
        const codes = subjects.map(x => x.code).filter(distinctFilter);
        
        const dict = {};
        
        for (const code of codes) {
            // const trials = subjects.filter(x => x.code === code);
            // todo mb some refactoring

            const markedTrials = subjects.filter(x => x.code === code && x.isMarked);
            
            const isSuccessfull = !!markedTrials.filter(x => x.isOk).length;
            const isMarked = !!markedTrials.length;
            const name = subjects.filter(x => x.code === code)[0].name;
            
            dict[code] = { name, isMarked, isSuccessfull };
        }
        
        return dict;
    }
    
    const allSubjects = getSubjectsList(document.body);
    const successDict = getSuccessDict(allSubjects);

    return successDict;
})();

