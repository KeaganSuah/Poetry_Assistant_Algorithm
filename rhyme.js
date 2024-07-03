//////////////////// Data Structures ////////////////////
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

// Node class for linked list
class Node {
  // Constructor to initialise node
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// Linked list class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Adds an element at the end of the list
  insertAtEnd(element) {
    // Create a new node
    const node = new Node(element);

    // If list is empty, set new node as head
    if (!this.head) {
      this.head = node;
    } else {
      // Traverse to the end of the list
      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      // Add new node at the end
      current.next = node;
    }
    this.size++;
  }

  // Checks if the list is empty
  empty() {
    return this.size === 0;
  }

  // Prints the list elements
  printListAssonance() {
    let current = this.head;
    let result = "";
    let index = 1;
    let previousSyllableCount = 0;
    while (current) {
      if (countSyllables(current.element) != previousSyllableCount) {
        result += `Words with Syllables of ${countSyllables(
          current.element
        )}\n`;
      }
      result += `${index}. ${current.element}\n`;
      previousSyllableCount = countSyllables(current.element);
      current = current.next;
      index++;
    }
    console.log(result);
  }

  // Prints the list elements
  printListMasculine(input) {
    let current = this.head;
    let result = "";
    let index = 1;
    let previousSyllableCount = 0;
    while (current) {
      if (masculineAlgorithm(input, current.element) != previousSyllableCount) {
        result += `Words with same letters of ${masculineAlgorithm(
          input,
          current.element
        )}\n`;
      }
      result += `${index}. ${current.element}\n`;
      previousSyllableCount = masculineAlgorithm(input, current.element);
      current = current.next;
      index++;
    }
    console.log(result);
  }
}

//////////////////// Vowel Function, used in both Masculine and Assonance ////////////////////

// Check if the letter in the argument is part of a vowel using linear search
function checkVowels(letter) {
  // Declare array of vowels
  var vowels = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < vowels.length; i++) {
    if (vowels[i] == letter) {
      return true;
    }
  }
  return false;
}

//////////////////// Masculine Rhyme Algorithm Functions ////////////////////

// Takes a string as an argument and convert it into a stack data structure
function stackConvert(word) {
  var wordStack = new Stack();
  for (let i = 0; i < word.length; i++) {
    wordStack.push(word[i]);
  }
  return wordStack;
}

// Takes two words, convert to a stack and count the number of common words
function compareStacks(stack1, stack2) {
  // To count the number of common words
  var counter = 0;
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

// Masculine rhyme algorithm, take two words and find common letters, return the counter if rhyme, must have a minimum of 2 letters
function masculineAlgorithm(word1, word2) {
  // Convert the argument words into a stack
  var stack1 = stackConvert(word1);
  var stack2 = stackConvert(word2);
  // Get the counter of common letters which will be return if is satisfy the condition, min of 2 letters
  var numWords = compareStacks(stack1, stack2);
  // Check to see if the remaining letters before the common letters are vowels or contanents, if both are the same, that means the word rhymes
  if (numWords >= 2 && checkVowels(stack1.top()) == checkVowels(stack2.top())) {
    return numWords;
  } else {
    return false;
  }
}

//////////////////// Assonance Rhyme Algorithm Functions ////////////////////

// Takes a string as an argument and convert it into a array data structure
function arrayConvert(word) {
  var array = [];
  for (let i = 0; i < word.length; i++) {
    array.push(word[i]);
  }
  return array;
}

// Get the vowel letter, letter before and after it in the first syllable of the input word
function getSyllable(array) {
  var startWord = null;
  var vowelWord = null;
  var supportWord = null;
  // Interate through the word array to find the vowel
  for (var i = 0; i < array.length; i++) {
    // To find the vowel and ignore the magic 'E' at the last letter of the word
    if (checkVowels(array[i]) && i != array.length - 1) {
      if (!checkVowels(array[i - 1])) {
        vowelWord = array[i];
      }
      // only get the letter in front of the vowel when it hasn't been declared yet
      if (startWord == null) {
        startWord = array[i - 1];
      }
      // Check to see if the letter behind the vowel is not a vowel, this ignore double vowels word
      if (!checkVowels(array[i + 1])) {
        supportWord = array[i + 1];
        break;
      }
    }
  }
  var syllableArray = [startWord, vowelWord, supportWord];
  return syllableArray;
}

// Compare both arrays to see if they have matching syllable sounds, by using the vowel letter, and letter in front and behind of it, using linear search
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

// assonance rhyme algorithm, take first syllable and vowel letter of input word and compare it with all syllables and vowels in comparing word. As long as one syllable is the same, it rhymes.
function assonanceAlgorithm(word1, word2) {
  var array1 = arrayConvert(word1);
  var array2 = arrayConvert(word2);
  // words shorter than 4 letters will already be picked up by masculine rhyme, so can just ignore it.
  if (word2.length >= 5 && compareArray(getSyllable(array1), array2)) {
    return true;
  } else {
    return false;
  }
}

//////////////////// Sorting Algorithms Functions ////////////////////

// Count the number of syllables in the word, including ending "y" while ignoring duplicated vowels and magic-e
function countSyllables(word) {
  var array = arrayConvert(word);
  var counter = 0;
  var lastIndex = array.length - 1;
  for (let i = 0; i < array.length; i++) {
    if (i == lastIndex && array[i] == "e") {
      continue;
    } else if (
      (i == lastIndex && array[i] == "y") ||
      (checkVowels(array[i]) && !checkVowels(array[i + 1]))
    ) {
      counter += 1;
    } else {
      continue;
    }
  }
  return counter;
}

// swap nodes' values for bubblesort in linked list
function swapNodes(current) {
  let temp = current.element;
  current.element = current.next.element;
  current.next.element = temp;
}

// Bubblesort function on linkedList to sort by syllables for assonance rhyme
function bubbleSortAssonance(linkedList) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    let current = linkedList.head;
    while (current != null && current.next != null) {
      if (
        countSyllables(current.element) > countSyllables(current.next.element)
      ) {
        swapNodes(current);
        swapped = true;
      }
      current = current.next;
    }
  }
}

// Bubblesort function on linkedList to sort by ranking of masculine rhyme
function bubbleSortMasculine(linkedList, input) {
  let swapped = true;
  while (swapped) {
    swapped = false;
    let current = linkedList.head;
    while (current != null && current.next != null) {
      if (
        masculineAlgorithm(input, current.element) <
        masculineAlgorithm(input, current.next.element)
      ) {
        swapNodes(current);
        swapped = true;
      }
      current = current.next;
    }
  }
}

//////////////////// Poet Assistance Functions ////////////////////

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
  readTextFile(fileName, (err, wordList) => {
    if (err) {
      console.error(err);
      return;
    }

    // declare the linked lists for both assonance rhyme and masculine rhyme
    var masculineList = new LinkedList();
    var assonanceList = new LinkedList();
    // Loop through the list of words, and apply the two algorithms to get the words that rhymes
    for (var i = 0; i < wordList.length; i++) {
      if (masculineAlgorithm(userInput, wordList[i])) {
        masculineList.insertAtEnd(wordList[i]);
      } else if (assonanceAlgorithm(userInput, wordList[i])) {
        assonanceList.insertAtEnd(wordList[i]);
      }
    }

    // To show user words that rhyme using mascline algorithm
    console.log(
      `\nWords that Rhyme with ${userInput}\n\nUsing Masculine Rhyme Algorithm`
    );
    if (!masculineList.empty()) {
      bubbleSortMasculine(masculineList, userInput);
      masculineList.printListMasculine(userInput);
    } else {
      console.log(`Sorry no words rhyme with ${userInput}`);
    }
    // To show user words that rhyme using assonance algorithm
    console.log(
      "Additional words with Assonance (Vowel Rhyme) Rhyme Algorithm"
    );
    if (!assonanceList.empty()) {
      bubbleSortAssonance(assonanceList);
      assonanceList.printListAssonance();
    } else {
      console.log(
        `No addition words rhyme with ${userInput} using Assonance rhyme`
      );
    }
    // To repeat asking user to continue inputting words to find rhyming words
    poetAssistant(fileName);
  });
}

// The main function and start of the poetry assistance
function poetAssistant(fileName) {
  // request for user input to be used to find rhymes
  readline.question(
    "Enter your word to find rhyming words, or (type 'exit' to quit): ",
    (userInput) => {
      // userInput = userInput.toLowerCase();
      // user can exit by typing the word 'exit'
      if (userInput == "exit") {
        console.log("Thank you and have fun making poems!");
        readline.close();
      }
      // if words satisfy the conditions, start putting the input word into the algorithm to start getting rhyming words
      else if (userInput.length >= 3 && /^[a-zA-Z]+$/.test(userInput)) {
        getRhymeWords(fileName, userInput);
      }
      // reject input words that are shorter than 3 letters or have non-alphabatical letters in them
      else {
        if (!/^[a-zA-Z]+$/.test(userInput)) {
          console.log(
            "Invalid input. Make sure the word contains only English letters."
          );
        } else if (userInput.length < 3) {
          console.log(
            "Invalid input. Make sure the word is equal or more than 3 letters long."
          );
        }
        poetAssistant(fileName);
      }
    }
  );
}

// Start the app running
console.log("Hi!, I am your Poet assistant.");
poetAssistant("wordList.txt");
