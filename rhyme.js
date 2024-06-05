const vowels = ["a", "e", "i", "o", "u"];

// dog cat lake happy cloud
var inputWord = "cloud";

var rhymeWords = [];

function wordToStack(word) {
  var stack = [];
  for (let i = 0; i < word.length; i++) {
    stack.unshift(word[i]);
  }
  return stack;
}

// Tail checker algorithm
function checkRhyme(stack1, stack2) {
  var common = [];
  for (let i = 0; i < stack1.length; i++) {
    if (stack1[i] == stack2[i]) {
      common.push(stack1[i]);
    } else {
      break;
    }
  }
  if (
    common.length >= stack1.length * 0.6 &&
    vowels.includes(stack1[common.length]) ==
      vowels.includes(stack2[common.length])
  ) {
    return true;
  } else {
    return false;
  }
}

// Vowel checker
// Output the common vowel and support word
function syllableCheck(stack) {
  var vowelWord = null;
  var supportWord = null;
  for (var i = 0; i < stack.length; i++) {
    if (vowelWord == null || supportWord == null) {
      if (vowels.includes(stack[i]) && i != 0) {
        var previous = stack[i + 1];
        var next = stack[i - 1];
        if (!vowels.includes(next)) {
          supportWord = next;
        }
        if (!vowels.includes(previous)) {
          vowelWord = stack[i];
        }
      }
    } else {
      var syllableArray = [vowelWord, supportWord];
      return syllableArray;
    }
  }
  return false;
}

function checkMatchingStack(stack1, stack2) {
  for (var i = 0; i < stack1.length; i++) {
    if (stack1[i] != stack2[i]) {
      return false;
    }
  }
  return true;
}

function assossanceRhyme(word1, word2) {
  var stack1 = wordToStack(word1);
  var stack2 = wordToStack(word2);
  if (checkMatchingStack(syllableCheck(stack1), syllableCheck(stack2))) {
    return true;
  } else {
    return false;
  }
}

const fs = require("fs");

// Read the file
// "commonWords.txt"  "wordlist.txt"
fs.readFile("wordlist.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  inputStack = wordToStack(inputWord);
  var archiveCurrent1 = inputStack.slice();

  // Split the data into individual words
  const words = data.trim().split("\n");

  // Loop through each word
  for (const word of words) {
    wordInlist = wordToStack(word);
    // sameWordcheck(inputStack, wordInlist)
    // checkRhyme(inputStack, wordInlist)
    // assossanceRhyme(inputWord,word)
    if (checkRhyme(inputStack, wordInlist)) {
      rhymeWords.push(word);
    }
    inputStack = archiveCurrent1.slice();
  }

  console.log("word is " + inputWord, sortByStringLength(rhymeWords));
});

// Sorting Algorithm
function sortByStringLength(stringArray) {
  return stringArray.sort(compareByLength);
}

function compareByLength(a, b) {
  if (a.length < b.length) {
    return -1;
  } else if (a.length > b.length) {
    return 1;
  } else {
    return 0;
  }
}

// TESTING

// // Assossance algorithm
// function sameWordcheck(stack1, stack2) {
//   var current1 = stack1;
//   for (let i = 0; i < stack1.length; i++) {
//     var archive = stack2.slice();
//     var current2 = stack2;
//     for (let j = 0; j < stack2.length; j++) {
//       if (current1[0] == current2[0]) {
//         if (checkRhyme(current1, current2)) {
//           return true;
//         }
//       }
//       current2.shift();
//     }
//     stack2 = archive.slice();
//     current1.shift();
//   }
//   return false;
// }

// sameWordcheck(inputStack, wordInlist)

// function findRhymeWords(array) {
//     inputStack = wordToStack(inputWord);
//     var archiveCurrent1 = inputStack.slice();
//     for (var i = 0; i < array.length; i++) {
//       wordInlist = wordToStack(array[i]);
//       if (checkRhyme(inputStack, wordInlist)) {
//         rhymeWords.push(array[i]);
//       }
//       inputStack = archiveCurrent1.slice();
//     }
//   }

// findRhymeWords(testingWord)
// console.log("word is " + inputWord, sortByStringLength(rhymeWords));
