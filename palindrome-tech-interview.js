// input: str - string -- can assume it is only letters, no spaces or additional characters
// output: boolean - true if word is palindrome (the same forward and reversed), false if not
function palindrome(str) {
    str = str.toLowerCase();
    let middle = str.length/2
    let leftPointer = 0;
    let rightPointer = 0;
    
    if (Number.isInteger(middle)) {
        leftPointer = middle - 1;
        rightPointer = middle;
    } else {
        middle = Math.floor(middle)
        leftPointer = middle - 1;
        rightPointer = middle + 1;
    }

    while (leftPointer >= 0) {
        if (str[leftPointer] !== str[rightPointer]) {
            return false
        }

        leftPointer--
        rightPointer++
    }

    return true
}


// initialize outside of function so it can collect words across books.
const isPalindrome = new Map()

//input: wordArray - array of words (representing the words in a book)
//output: count - number of unique palindromes in the array/book
function uniquePalindromes(wordArray) {
    const palindromesInBook = []
    let count = 0;

    wordArray.forEach(word => {
        if (isPalindrome.get(word) !== true && isPalindrome.get(word) !== false) {
            isPalindrome.set(word, palindrome(word))
        }
        if (isPalindrome.get(word) === true && !palindromesInBook.includes(word)) {
            palindromesInBook.push(word)
            count++
        }
    })
    return count;
}


// input: books - array of objects where there is a key for the title and a key for the array of words in the book
// output: palindromeObj - object where key is book title and value is number of unique palindromes
function allBooksWithPalindromeCount(books) {
    const booksWithCount = []
    books.forEach(book => {
        const palindromeCount = uniquePalindromes(book.words);
        booksWithCount.push([book.title, palindromeCount]);
    })

    return booksWithCount;
}

console.log(allBooksWithPalindromeCount([
    {title: "Test", words: ["racecar", "test", "mom", "dog", "asddsa", "banana", "three", "palindromes"]},
    {title: "Green", words: ["first", "second", "mom", "racecar", "fifth", "two", "palindromes"]},
    {title: "Book Title", words: ["this", "has", "repeats", "wow", "wow", "one", "unique", "palindrome"]}
]))
