function toggleSliderTbl(){
	if (select('#switchView').html()=='MATRIX VIEW &gt;&gt;'){
		document.getElementById("matrices").style.display='block';
		select('#switchView').html('Sliding Controls &gt;&gt;');
	}
	else{
		document.getElementById("matrices").style.display='none';
		select('#switchView').html('MATRIX VIEW &gt;&gt;');
	}
}