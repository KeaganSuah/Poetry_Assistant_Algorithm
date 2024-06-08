// Declare the Stack Data Structure
class Stack {
  constructor() {
    this.items = [];
  }
  // Adds a new element to the top of the stack
  push(item) {
    this.items.push(item);
  }
  // Removes the element at the top of the stack
  pop() {
    return this.items.pop();
  }
  // Returns the element at the top of the stack
  top() {
    if (this.items.length == 0) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
  // Checks whether the stack is empty
  empty() {
    return this.items.length === 0;
  }
}

// Declare the nodes for the linked list
class Node {
  // constructor
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// Declare the linked list data structure
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // adds an element at the end of list
  add(element) {
    // creates a new node
    let node = new Node(element);

    // to store current node
    let current;

    // if list is Empty add the element and make it head
    if (this.head == null) this.head = node;
    else {
      current = this.head;

      // iterate to the end of the list
      while (current.next) {
        current = current.next;
      }

      // add node
      current.next = node;
    }
    this.size++;
  }

  // checks the list for empty
  empty() {
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

// Check if the letter in the argument is part of a vowel
function checkVowels(letter) {
  // Declare array of vowels
  var vowels = ["a", "e", "i", "o", "u"];
  for (var i of vowels) {
    if (i == letter) {
      return true;
    }
  }
  return false;
}

// Takes a string as an argument and convert it into a stack data structure
function stackConvert(word) {
  var wordStack = new Stack();
  for (let i = 0; i < word.length; i++) {
    wordStack.push(word[i]);
  }
  return wordStack;
}

// Takes a string as an argument and convert it into a array data structure
function arrayConvert(word) {
  var array = [];
  for (let i = 0; i < word.length; i++) {
    array.push(word[i]);
  }
  return array;
}

// Takes a string as an argument, convert and reverse it into a array data structure
function reverseArray(word) {
  var array = [];
  for (let i = word.length - 1; i >= 0; i--) {
    array.push(word[i]);
  }
  return array;
}

// Takes two words, convert to a stack and count the number of common words
function compareStacks(word1, word2) {
  // To count the number of common words
  var counter = 0;
  // Convert the argument words into a stack
  var stack1 = stackConvert(word1);
  var stack2 = stackConvert(word2);
  while (!stack1.empty()) {
    // If both stack have same "head" letters, increment the counter and remove the head
    if (stack1.top() == stack2.top()) {
      counter += 1;
      stack1.pop();
      stack2.pop();
    } else {
      break;
    }
  }
  return counter;
}

// If the word is longer than 3 letters, it will still return the max amount of 3, else it returns 60% of the word length
function surpressLength(word) {
  if (word.length > 3) {
    return 3;
  } else {
    return word.length * 0.6;
  }
}

// Masculine rhyme algorithm, take two words and find common letters in the last syllable of both words
function masculineAlgorithm(word1, word2) {
  // Get the counter of common letters, it satisfy if its more than the value return by surpress length
  var numWords = compareStacks(word1, word2);
  // Check to see if the letter before the common letters are vowels, which will be compared later, if same vowel, that means the word rhymes
  var word1MidLetter = word1[word1.length - (numWords + 1)];
  var word2MidLetter = word2[word2.length - (numWords + 1)];
  if (
    numWords >= surpressLength(word1) &&
    checkVowels(word1MidLetter) == checkVowels(word2MidLetter)
  ) {
    return true;
  } else {
    return false;
  }
}

// Get the vowel letter, letter before and after it in the last syllable of the input word
function getSyllable(array) {
  var startWord = null;
  var vowelWord = null;
  var supportWord = null;
  // Interate through the word reversed array to find the vowel
  for (var i = 0; i < array.length; i++) {
    // To find the vowel and ignore the magic 'E' at the last letter of the word
    if (checkVowels(array[i]) && i != 0) {
      var next = array[i + 1];
      vowelWord = array[i];
      // only get the letter behind the vowel when it hasn't been declared yet
      if (supportWord == null) {
        supportWord = array[i - 1];
      }
      // Check to see if the letter in front of the vowel if its not a vowel, this ignore double vowels word
      if (!checkVowels(next)) {
        startWord = next;
        break;
      }
    }
  }
  var syllableArray = [startWord, vowelWord, supportWord];
  return syllableArray;
}

// Compare both arrays to see if they have matching syllable sounds, by the vowel letter, and letter in front and behind of it
function compareArray(array1, array2) {
  for (let i = 0; i < array2.length; i++) {
    // check if the letter is a vowel
    if (checkVowels(array2[i])) {
      var checkFront = array2[i - 1] == array1[0];
      var checkBack = array2[i + 1] == array1[2];
      var compareVowel = array2[i] == array1[1];
      // check only if the same vowel letter, letter infront and behind and the same, if not it will not make the similar syllable sound
      if (compareVowel && checkBack && checkFront) {
        return true;
      }
    }
  }
  return false;
}

// Assossance rhyme algorithm, take last syllable and vowel letter of input word and compare it with all syllables and vowels in comparing word. As long as one syllable is the same, it rhymes.
function assossanceAlgorithm(word1, word2) {
  var array1 = reverseArray(word1);
  var array2 = arrayConvert(word2);
  // words shorter than 4 letters will already be picked up by masculine rhyme, so can just ignore it.
  if (word2.length >= 5 && compareArray(getSyllable(array1), array2)) {
    return true;
  } else {
    return false;
  }
}

var fs = require("fs");
// function to node.js to read text file
function readTextFile(fileName, callback) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return callback(err, null);
    }

    // Split the data into individual words
    var words = data.trim().split("\n");
    callback(null, words);
  });
}

var readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Get the list of words from the text file and compare it with the user input
function getRhymeWords(fileName, userInput) {
  readTextFile(fileName, (err, array) => {
    if (err) {
      console.error(err);
      return;
    }

    // declare the linked lists for both assonance rhyme and masculine rhyme
    var masculine = new LinkedList();
    var assonance = new LinkedList();
    // Loop through the list of words, and apply the two algorithms to get the words that rhymes
    for (var comparingWord of array) {
      if (masculineAlgorithm(userInput, comparingWord)) {
        masculine.add(comparingWord);
      } else if (assossanceAlgorithm(userInput, comparingWord)) {
        assonance.add(comparingWord);
      }
    }

    // To show user words that rhyme using mascline algorithm
    console.log(
      `\nWords that Rhyme with ${userInput}\n\nUsing Masculine Rhyme Algorithm`
    );
    if (!masculine.empty()) {
      masculine.printList();
    } else {
      `Sorry no words rhyme with ${userInput}`;
    }
    // To show user words that rhyme using assossance algorithm
    console.log(
      "Additional words with Assonance (Vowel Rhyme) Rhyme Algorithm"
    );
    if (!assonance.empty()) {
      assonance.printList();
    } else {
      console.log(
        `No addition words rhyme with ${userInput} using Assonance rhyme`
      );
    }
    // To repeat asking user to continue inputting words to find rhyming words
    poetAssistant();
  });
}

// The main function and start of the poetry assistance
function poetAssistant() {
  console.log('Example of Words to use, "dog", "cat", "climb", "lime","flow"');
  // request for user input to be used to find rhymes
  readline.question(
    "Enter your word to find rhyming words, or (type 'exit' to quit): ",
    (word) => {
      // user can exit by typing the word 'exit'
      if (word.toLowerCase() == "exit") {
        console.log("Thank you and have fun making poems!");
        readline.close();
      }
      // if words satisfy the conditions, start putting the input word into the algorithm to start getting rhyming words
      else if (word.length >= 3 && /^[a-zA-Z]+$/.test(word)) {
        getRhymeWords("wordList.txt", word);
      }
      // reject input words that are shorter than 3 letters or have non-alphabatical letters in them
      else {
        if (!/^[a-zA-Z]+$/.test(word)) {
          console.log(
            "Invalid input. Make sure the word contains only English letters."
          );
        } else if (word.length < 3) {
          console.log(
            "Invalid input. Make sure the word is equal or more than 3 letters long."
          );
        }
      }
    }
  );
}

console.log("Hi!, I am your Poet assistant.");
poetAssistant();

// Old syllable check
// function getSyllable(array) {
//   var startWord = null;
//   var vowelWord = null;
//   var supportWord = null;
//   for (var i = 0; i < array.length; i++) {
//     if (vowelWord == null || supportWord == null) {
//       var previous = array[i + 1];
//       var next = array[i - 1];
//       if (checkVowels(array[i]) && i != 0) {
//         if (!checkVowels(next)) {
//           supportWord = next;
//         }
//         if (!checkVowels(previous)) {
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

// function getSyllable(array) {
//   var startWord = null;
//   var vowelWord = null;
//   var supportWord = null;
//   console.log(array);
//   for (var i = 0; i < array.length; i++) {
//     var previous = array[i + 1];
//     var next = array[i - 1];
//     if (startWord == null) {
//       if (checkVowels(array[i]) && i != 0) {
//         vowelWord = array[i];
//         if (!checkVowels(next)) {
//           supportWord = next;
//         }
//         if (!checkVowels(previous)) {
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

// Using Stack for assossance

// function getSyllable(stack) {
//   var syllableStack = new Stack();
//   while (!stack.empty()) {
//     // the rule is the surrounding the first and last must be support
//     if (checkVowels(stack.top())) {
//       if (syllableStack.getSize() >= 1) {
//         syllableStack.push(stack.top());
//       }
//     } else {
//       if (syllableStack.empty() || checkVowels(syllableStack.top())) {
//         syllableStack.push(stack.top());
//       } else if (
//         syllableStack.getSize() >= 3 &&
//         !checkVowels(syllableStack.top())
//       ) {
//         break;
//       } else {
//         syllableStack.pop();
//         syllableStack.push(stack.top());
//       }
//     }
//     stack.pop();
//   }
//   return syllableStack;
// }

// array is stack, loop through and remove
// function compareArray(array1, array2) {
//   if (array1.getSize() == array2.getSize()) {
//     while (!array1.empty()) {
//       if (array1.top() != array2.top()) {
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

// function assossanceAlgorithm(word1, word2) {
//   var array1 = stackConvert(word1);
//   var array2 = stackConvert(word2);
//   if (
//     array2.getSize() >= 3 &&
//     compareArray(getSyllable(array1), getSyllable(array2))
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
