Array.from(document.querySelectorAll('tr.elem_vsechna_obdobi:not(.vyrazne)'))
.filter(x => !!x.querySelector('td') && !x.querySelector('th'))
.map(tr => {
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

	const code = nameTd.children[0].querySelector('b > a')?.innerHTML;
	const link = nameTd.children[0].querySelector('b > a')?.getAttribute('href');
	const name = nameTd.children[1];

	const credits = creditsTd.innerText;
	const ending = endingTd.innerText;
	const mark = markTd.querySelector('strong')?.children[1]?.innerHTML;
	const markDate = markDateTd.innerText;

	const comment = commentTd.innerText;
	const setBy = setByTd.innerText;

	const isOk = markTd.classList.contains('ok');
	const isNotOk = markTd.classList.contains('ko');

	if (isOk === isNotOk) {
		console.error('Subject is ok and nok at the same time', code, tr);
	}

	return {
		code,
		isOk,
		name,
		link,
		credits,
		ending,
		mark,
		markDate,
		comment,
		setBy,
	};
})



