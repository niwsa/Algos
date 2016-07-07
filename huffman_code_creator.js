/** function for computing frequencies of characters in the string 
 * @param str => String 
 * @return f => hash of symbols and their frequencies
*/
const readline = require('readline');

function frequency(str) {
	let f = {};

	for (let sym of str) {
	       if (f[sym]) {
			f[sym]++;
	       }
	       else {
			f[sym]=1;
	       }
	}
	return f;
}

function arrayWrapFrequency(f) {
	let nodeList = [];
	for (let key in f) {
       nodeList.push({key,freq: f[key]}); //ES6 feature
	}
	return nodeList;
}

function sortFrequencyArray(freqArray) {
    freqArray.sort((a,b) => a.freq-b.freq);
	return freqArray;
}

function buildHuffmanTree(freqArray) {
	if(freqArray.length > 1) {
	    let newNode = {};
	    newNode.key = freqArray[0].key + freqArray[1].key;
	    newNode.freq = freqArray[0].freq + freqArray[1].freq;
	    newNode.left = freqArray[0];
	    newNode.right = freqArray[1];
	    freqArray.push(newNode);
	    freqArray = sortFrequencyArray(freqArray.slice(2));
	    return buildHuffmanTree(freqArray);	
	} else if (freqArray.length == 1) {
		return freqArray[0];
	}
}

function traverseHuffTree(root,character) {
	    let code = '',current = root;
		while(current) {
          if(current.left && current.left['key'].includes(character)) {
			  code+='0';
			  current = current.left;
		  } else if (current.right && current.right['key'].includes(character)) {
			  code+='1';
			  current = current.right;
		  } else if (current['key']===character){
			  return code;
		  }
		}
		console.error('Character code not present;Please check the original string / character passed');

}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Please enter a string to be encoded ',(str) => {
    let f = frequency(str);
	let freqArray = arrayWrapFrequency(f);
	sortFrequencyArray(freqArray);
	let root = buildHuffmanTree(freqArray);
	let codeMap = {},code='';
	for(let c of str) {
		if(!codeMap[c]) {
          codeMap[c]=traverseHuffTree(root,c);
		}
		code+=codeMap[c];
	}
	console.log(codeMap);
	console.log("Huffman code for the input string: "+code);
	rl.close();
});

/** 
 * 
exports.frequency = frequency;
exports.arrayWrapFrequency = arrayWrapFrequency;
exports.sortFrequencyArray = sortFrequencyArray;
exports.buildHuffmanTree = buildHuffmanTree;
exports.traverseHuffTree = traverseHuffTree;
*/

