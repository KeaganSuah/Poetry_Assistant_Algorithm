const fs = require("fs");

function readTextFile(fileName, callback) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return callback(err, null);
    }

    // Split the data into individual words
    const words = data.trim().split("\n");
    callback(null, words);
  });
}

const vowels = ["a", "e", "i", "o", "u"];

function wordToStack(word) {
  var stack = [];
  for (let i = 0; i < word.length; i++) {
    stack.unshift(word[i]);
  }
  return stack;
}

// Tail checker algorithm
function tailRhyme(word1, word2) {
  var common = [];
  var stack1 = wordToStack(word1);
  var stack2 = wordToStack(word2);
  for (let i = 0; i < stack1.length; i++) {
    if (stack1[i] == stack2[i]) {
      common.push(stack1[i]);
    } else {
      break;
    }
  }

  if (
    common.length >= word1.length * 0.6 &&
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
function syllableCheck(array) {
  var startWord = null;
  var vowelWord = null;
  var supportWord = null;
  for (var i = 0; i < array.length; i++) {
    if (vowelWord == null || supportWord == null) {
      if (vowels.includes(array[i]) && i != 0) {
        var previous = array[i + 1];
        var next = array[i - 1];
        if (!vowels.includes(next)) {
          supportWord = next;
        }
        if (!vowels.includes(previous)) {
          vowelWord = array[i];
          startWord = previous;
        }
      }
    } else {
      var syllableArray = [startWord, vowelWord, supportWord];
      return syllableArray;
    }
  }
  return false;
}

function checkMatchingStack(array1, array2) {
  for (var i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }
  return true;
}

function assossanceRhyme(word1, word2) {
  var stack1 = wordToStack(word1);
  var stack2 = wordToStack(word2);

  if (
    stack2.length >= 3 &&
    checkMatchingStack(syllableCheck(stack1), syllableCheck(stack2))
  ) {
    return true;
  } else {
    return false;
  }
}

function generateRhyme(userInput, wordList, algorithm) {
  var output = [];
  // Loop through each word
  for (const comparingWord of wordList) {
    if (algorithm(userInput, comparingWord)) {
      output.push(comparingWord);
    }
  }
  return output;
}

function getRhymeWords(fileName, userInput) {
  readTextFile(fileName, (err, array) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Words that Rhyme with ${userInput} are...`);
    console.log("Using Tail Rhyme");
    console.log(sortByStringLength(generateRhyme(userInput, array, tailRhyme)));
    console.log("Using Assonance (Vowel Rhyme)");
    console.log(
      sortByStringLength(generateRhyme(userInput, array, assossanceRhyme))
    );
    poetAssistant();
  });
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function poetAssistant() {
  readline.question(
    "Enter your word and find a list of rhyming words, or (type 'exit' to quit): ",
    (word) => {
      if (word.toLowerCase() == "exit") {
        console.log("Thank you and have fun making poems!");
        readline.close();
      } else if (word.length >= 3 && /^[a-zA-Z]+$/.test(word)) {
        getRhymeWords("wordList.txt", word);
      } else {
        if (word.length < 3) {
          console.log(
            "Invalid input. Make sure the word is equal or more than 3 letters long."
          );
        } else if (/^[a-zA-Z]+$/.test(word)) {
          console.log(
            "Invalid input. Make sure the word contains only English letters."
          );
        }
        poetAssistant();
      }
    }
  );
}

console.log("Hi!, I am your Poet assistant.");
poetAssistant();

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
