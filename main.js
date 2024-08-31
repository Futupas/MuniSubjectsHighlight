(() => {
    'use strict';

    const COLOR_SUCCESS = '#dfd';
    const COLOR_FAIL = '#fdd';
    const COLOR_NOT_MARKED = '#ddf';
    const FINAL_TEXT = 'Done. Enjoy:)';
    const HIDE_TABLE = true; // You can set to false if you don't wanna hide the table

    main();


    async function main() {
        const subjects = getTemplateSubjects();

        const iframe = await createIframe('https://is.muni.cz/auth/student/moje_znamky?vsob=1');
        
        const successDict = getSuccessDict(getSubjectsList(iframe.contentWindow.document.body));
        
        colorPage(subjects, successDict);

        console.log(FINAL_TEXT);
    }


    function colorPage(subjects, successDict) {
        for (const subject of subjects) {
            if (HIDE_TABLE) {
                subject.element.querySelector('table').style.display = 'none';
            }

            const exists = subject.code in successDict;
            if (!exists) continue;

            const isMarked = successDict[subject.code].isMarked;
            const isSuccess = successDict[subject.code].isSuccessfull;

            if (!isMarked) {
                subject.element.style.backgroundColor = COLOR_NOT_MARKED;
                continue;
            }

            subject.element.style.backgroundColor = isSuccess ? COLOR_SUCCESS : COLOR_FAIL;
        }
    }


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

    function createIframe(src) {
        return new Promise((resolve, reject) => {
            try {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.onload = _ => {
                    resolve(iframe);
                };
                iframe.src = src;
                document.body.appendChild(iframe);
            }
            catch (ex) {
                reject(ex);
            }
        });
    }


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
    }

    function getSuccessDict(subjects) {
        const codes = subjects.map(x => x.code).filter(distinctFilter);
        
        const dict = {};
        
        for (const code of codes) {
            // todo mb some refactoring

            const markedTrials = subjects.filter(x => x.code === code && x.isMarked);
            
            const isSuccessfull = !!markedTrials.filter(x => x.isOk).length;
            const isMarked = !!markedTrials.length;
            const name = subjects.filter(x => x.code === code)[0].name;
            
            dict[code] = { name, isMarked, isSuccessfull };
        }
        
        return dict;
    }
    
})();

