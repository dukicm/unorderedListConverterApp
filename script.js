const mainContainer = document.getElementById("main-div");
const inputField = document.getElementById("exampleFormControlTextarea1");
const inputFieldDiv = document.getElementById("inputFieldDiv");
const convertBtn = document.getElementById("convertBtn");
const resetBtn = document.getElementById("rstBtn");
//const warningTxtId = document.getElementById("warning-txt");
const copyBtn = document.getElementById("copyBtn");

//div where you place the results
const expResDiv = document.getElementById("exportResultDiv");

//CREATING HTML ELEMENTS
//create new HTML element for displaying results
const resultsDiv = document.createElement('div');

//add classes to the new div
resultsDiv.classList.add('form-control', 'resultDiv');
resultsDiv.setAttribute('id','resDiv');

//warning txt
const warningTxt = document.createElement('span');

warningTxt.classList.add('text-danger');
warningTxt.setAttribute('id', 'warning-txt');

//warning txt2
const warningTxt2 = document.createElement('span');

warningTxt2.classList.add('text-danger');
warningTxt2.setAttribute('id', 'warning-txt');

//create new empty array, mora var zbog promenljivosti podata u array-u
var inputArray = [];

convertBtn.addEventListener("click", () => {

	const inputFieldValue = document.getElementById("exampleFormControlTextarea1").value;
	
	//delete all in resultsDiv element
	resultsDiv.innerHTML = '';

	//check if the value is inserted
	if (inputFieldValue === '') {
		warningTxt2.innerHTML = '';
		
		inputFieldDiv.appendChild(warningTxt);

		warningTxt.innerHTML = "* Please insert the bullet text!";
	} else {

		//format input values - cleare bullets
		const inputFieldValueFormated = inputFieldValue.replace(/[•\t.+]/g, '');
		
		//split inputed values and then store them in the array
		inputArrayFormated = inputFieldValueFormated.split('\n');

		//izbrisi prazne stringove ako se jave u arreju i smesti rezultat toga u konacni sredjeni array
		const inputArray = inputArrayFormated.filter(e =>  e);
		
		//define counter for loops
		var counter = 0;

		//ako ih ima više od 10 u nizu 
		if (inputArray.length >= 10) {
			
			//for loop is used to check every item in array and to assign values to those items
			//na svaku drugu iteraciju (index+=2) ubaci i elemente iz arrays. ako  prva iteracija ima vrednost (index) 0 onda uzmi element iz array-a koji je na toj poziciji (0 znaci pozicija 1 u arrayu) inputArray[index].
			for (let index = 0; index < inputArray.length; index+=2) {
				
				//take elements from array - using index 
				const elementFromArray = [inputArray[index]];
				
				//increase counter every loop by 1
				counter++;
				
				//compare even or odd numbers! Even number divaded by 2(using operator %) will give 0 (even number) and odd number divided by 2 (using operator %) will give odd number
				if (counter % 2 === 1) {

					resultsDiv.innerHTML += 
						`
							[{columns:[{ ul: ['${inputArray[index]}']}, { ul: ['${inputArray[index+1]}']}], fillColor:'white', style: 'cell' }],
						`+ "<br >"
				} else {
					resultsDiv.innerHTML += 
						`
							[{columns:[{ ul: ['${inputArray[index]}']}, { ul: ['${inputArray[index+1]}']}], style: 'cell' }],
						` + "<br >"
				}
			}

			//add to the main container results
			expResDiv.appendChild(resultsDiv);

		} else {
		
			//for loop is used to check every item in array and to assign values to those items
			for (let index = 0; index < inputArray.length; index++) {

				//take elements from array
				const elementFromArray = [inputArray[index]];

				//increase counter every loop by 1
				counter++;
				
				//compare even or odd numbers! Even number divaded by 2(using operator %) will give 0 (even number) and odd number divided by 2 (using operator %) will give odd number
				if (counter % 2 === 1) {
					resultsDiv.innerHTML += 
						`
							[{ ul: ['${elementFromArray}'], fillColor:'white', style: 'cell'}],
						`+ "<br >"
				} else {
					resultsDiv.innerHTML += 
						`
							[{ ul: ['${elementFromArray}'], style: 'cell'}],
						` + "<br >"
				}	
				
			}

			//add to the main container results
			expResDiv.appendChild(resultsDiv);

		}
	}
})

//reset button - delete everything
resetBtn.addEventListener("click", () => {	
	inputField.value = "";
	expResDiv.removeChild(resultsDiv);
})

//on click on the input field clear the error paragrafs
inputField.addEventListener("click", () => {
	warningTxt.innerHTML = "";
	warningTxt2.innerHTML = "";
})

copyBtn.addEventListener("click", () => {
	if (resultsDiv.innerHTML === '') {
		warningTxt.innerHTML = "";

		warningTxt2.innerHTML = "* No items to copy, please fill in the text!"

		inputFieldDiv.appendChild(warningTxt2);
	} else {
		var range = document.createRange();
	
		range.selectNode(document.getElementById("resDiv"));
		window.getSelection().removeAllRanges(); // clear current selection
		window.getSelection().addRange(range); // to select text
		document.execCommand("copy");
		window.getSelection().removeAllRanges();// to deselect
	}
	
})

//TASKS
//proveri ono sto je sasa radio
	
// jedna lista

// 		 [{ ul: ['Die Wohnimmobilienkreditrichtlinie der EU'], fillColor:'white', style: 'cell'}], 
//       [{ ul: ['Umsetzung in deutsches Recht'], style: 'cell'}], 
//       [{ ul: ['Konsequenzen für Kreditanbahnung, -abschluss und -abwicklung'], fillColor:'white', style: 'cell'}], 
//       [{ ul: ['Praxis der Kreditberatung und -vermittlung'], style: 'cell'}], 
//       [{ ul: ['Regelungen für Darlehensvermittler'], fillColor:'white', style: 'cell'}], 
//       [{ ul: ['Neue Verordnungen und ihre Konsequenzen für Kreditinstitute'], style: 'cell'}], 

//lista u dve kolone
// [{columns:[{ ul: ['Das Entstehen von Embargos']}, { ul: ['TEST']}], fillColor:'white', style: 'cell' }],

// [{ ul: ['Embargotypen'], style: 'cell'}], 
// [{ ul: ['Rechtliche Aspekte'], fillColor:'white', style: 'cell'}], 
// [{ ul: ['Pflichten für Kreditinstitute'], style: 'cell'}],				
// [{ ul: ['Zahlungsströme / SWIFT'], fillColor:'white', style: 'cell'}], 
// [{ ul: ['Informationsquellen'], style: 'cell'}], 
// [{ ul: ['Pflichten für Kreditinstitute'], style: 'cell'}],				
// [{ ul: ['Zahlungsströme / SWIFT'], fillColor:'white', style: 'cell'}], 
// [{ ul: ['Informationsquellen'], style: 'cell'}], 
// [{ ul: ['Informationsquellen'], style: 'cell'}], 