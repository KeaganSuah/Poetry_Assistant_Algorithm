// Stack Data Structure

class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peak() {
    if (this.items.length == 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  getSize() {
    return this.items.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }
}

// Linked List Data Structure

class Node {
  // constructor
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
// linkedlist class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // adds an element at the end
  // of list
  add(element) {
    // creates a new node
    let node = new Node(element);

    // to store current node
    let current;

    // if list is Empty add the
    // element and make it head
    if (this.head == null) this.head = node;
    else {
      current = this.head;

      // iterate to the end of the
      // list
      while (current.next) {
        current = current.next;
      }

      // add node
      current.next = node;
    }
    this.size++;
  }

  // checks the list for empty
  isEmpty() {
    return this.size == 0;
  }

  // prints the list items
  printList() {
    let curr = this.head;
    let str = "";
    let count = 1;
    while (curr) {
      str += count + ". " + curr.element + "\n";
      curr = curr.next;
      count += 1;
    }
    console.log(str);
  }
}

function letterInVowel(letter) {
  // Declare array of vowels
  const vowels = ["a", "e", "i", "o", "u"];
  for (var i of vowels) {
    if (i == letter) {
      return true;
    }
  }
  return false;
}

// convert to stack
function wordToStack(word) {
  var wordStack = new Stack();
  for (let i = 0; i < word.length; i++) {
    wordStack.push(word[i]);
  }
  return wordStack;
}

// convert to reverse array
function reverseArray(word) {
  var array = [];
  for (let i = word.length - 1; i >= 0; i--) {
    array.push(word[i]);
  }
  return array;
}

function GenerateCommonWords(word1, word2) {
  var commonStack = new Stack();
  var stack1 = wordToStack(word1);
  var stack2 = wordToStack(word2);
  while (!stack1.isEmpty()) {
    if (stack1.peak() == stack2.peak()) {
      commonStack.push(stack1.peak());
      stack1.pop();
      stack2.pop();
    } else {
      break;
    }
  }
  return commonStack;
}

// Tail checker algorithm
function tailRhyme(word1, word2) {
  const commonStack = GenerateCommonWords(word1, word2);
  if (
    commonStack.getSize() >= word1.length * 0.6 &&
    letterInVowel(word1[word1.length - 1 - commonStack.getSize()]) ==
      letterInVowel(word2[word2.length - 1 - commonStack.getSize()])
  ) {
    return true;
  } else {
    return false;
  }
}

// function syllableCheck(array) {
//   var startWord = null;
//   var vowelWord = null;
//   var supportWord = null;
//   for (var i = 0; i < array.length; i++) {
//     if (vowelWord == null || supportWord == null) {
//       var previous = array[i + 1];
//       var next = array[i - 1];
//       if (letterInVowel(array[i]) && i != 0) {
//         if (!letterInVowel(next)) {
//           supportWord = next;
//         }
//         if (!letterInVowel(previous)) {
//           vowelWord = array[i];
//           startWord = previous;
//         }
//       }
//     } else {
//       var syllableArray = [startWord, vowelWord, supportWord];
//       return syllableArray;
//     }
//   }
//   return false;
// }

function syllableCheck(array) {
  var startWord = null;
  var vowelWord = null;
  var supportWord = null;
  for (var i = 0; i < array.length; i++) {
    var previous = array[i + 1];
    var next = array[i - 1];
    if (!letterInVowel(next) && (vowelWord == null || supportWord == null)) {
      if (letterInVowel(array[i]) && i != 0) {
        supportWord = next;
        if (!letterInVowel(previous)) {
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
  for (let i = 0; i < array2.length; i++) {
    if (letterInVowel(array2[i]) && i != 0) {
      if (array2[i] == array1[1]) {
        var checkFront = array2[i - 1] == array1[0];
        var checkBack = array2[i + 1] == array1[2];
        if (checkBack && checkFront) {
          return true;
        }
      } else {
        break;
      }
    }
  }
  return false;
}

function assossanceRhyme(word1, word2) {
  var array1 = reverseArray(word1);
  if (word2.length >= 3 && checkMatchingStack(syllableCheck(array1), word2)) {
    return true;
  } else {
    return false;
  }
}

// console.log(assossanceRhyme("test", "intestine"));

// Vowel checker
// Output the common vowel and support word
// syllableArray stack

// function syllableCheck(stack) {
//   var syllableStack = new Stack();
//   while (!stack.isEmpty()) {
//     // the rule is the surrounding the first and last must be support
//     if (letterInVowel(stack.peak())) {
//       if (syllableStack.getSize() >= 1) {
//         syllableStack.push(stack.peak());
//       }
//     } else {
//       if (syllableStack.isEmpty() || letterInVowel(syllableStack.peak())) {
//         syllableStack.push(stack.peak());
//       } else if (
//         syllableStack.getSize() >= 3 &&
//         !letterInVowel(syllableStack.peak())
//       ) {
//         break;
//       } else {
//         syllableStack.pop();
//         syllableStack.push(stack.peak());
//       }
//     }
//     stack.pop();
//   }
//   return syllableStack;
// }

// array is stack, loop through and remove
// function checkMatchingStack(array1, array2) {
//   if (array1.getSize() == array2.getSize()) {
//     while (!array1.isEmpty()) {
//       if (array1.peak() != array2.peak()) {
//         return false;
//       }
//       array1.pop();
//       array2.pop();
//     }
//     return true;
//   } else {
//     return false;
//   }
// }

// function assossanceRhyme(word1, word2) {
//   var array1 = wordToStack(word1);
//   var array2 = wordToStack(word2);
//   if (
//     array2.getSize() >= 3 &&
//     checkMatchingStack(syllableCheck(array1), syllableCheck(array2))
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

function getRhymeWords(fileName, userInput) {
  readTextFile(fileName, (err, array) => {
    if (err) {
      console.error(err);
      return;
    }

    var tailEnd = new LinkedList();
    var assonance = new LinkedList();
    for (const comparingWord of array) {
      if (tailRhyme(userInput, comparingWord)) {
        tailEnd.add(comparingWord);
      } else if (assossanceRhyme(userInput, comparingWord)) {
        assonance.add(comparingWord);
      }
    }

    console.log(`\nWords that Rhyme with ${userInput}\n\nUsing Tail Rhyme`);
    if (!tailEnd.isEmpty()) {
      tailEnd.printList();
    } else {
      `Sorry no words rhyme with ${userInput}`;
    }
    console.log("Additional words with Assonance (Vowel Rhyme)");
    if (!assonance.isEmpty()) {
      assonance.printList();
    } else {
      console.log(
        `No addition words rhyme with ${userInput} using Assonance rhyme`
      );
    }
    poetAssistant();
  });
}

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
        if (!/^[a-zA-Z]+$/.test(word)) {
          console.log(
            "Invalid input. Make sure the word contains only English letters."
          );
        } else if (word.length < 3) {
          console.log(
            "Invalid input. Make sure the word is equal or more than 3 letters long."
          );
        }
        poetAssistant();
      }
    }
  );
}

console.log("Hi!, I am your Poet assistant.");
poetAssistant();
