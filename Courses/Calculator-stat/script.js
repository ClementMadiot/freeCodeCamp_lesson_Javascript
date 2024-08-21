
const calculate = () => {
  const mean = document.querySelector("#mean");
  const median = document.querySelector("#median");
  const mode = document.querySelector("#mode");

  const value = document.querySelector("#numbers").value;
  console.log(value)
  const array = value.split(/,\s*/g)
  // The value of an input element is always a string, even if the input type is number. 
  const numbers = array.map(el => Number(el)).filter((el => !isNaN(el)));
  // display the value of mean
  mean.textContent = getMean(numbers);
  median. textContent = getMedian(numbers)
  mode.textContent = getMode(numbers)
  // console.log(getMode(numbers))

}


// ------------------------------------------------ //
//* mean calculation
// ------------------------------------------------ //

const getMean = (array) => {
  // take the sum of all numbers in the list.
  const sum = array.reduce((acc, el) => acc + el, 0);
  // divide the sum of numbers by the count of numbers in the list.
  const mean = sum / array.length
  return mean
}
/// clean this logic up a bit. Using the implicit return 
// const getMean = (array) => array.reduce((acc, el) => acc + el, 0)/ array.length ;

// ------------------------------------------------ //
//* median calculation
// ------------------------------------------------ //

// calculating the median is to ensure the list of numbers is sorted from least to greatest
const getMedian = (array) => {
  // smallest to largest
  const sorted = array.sort((a,b) => a - b)
  
  const meadian = 
  array.length % 2 === 0
  ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
  : sorted[Math.floor(array.length / 2)]
  return meadian
}
// ------------------------------------------------ //
//* Mode calculation
// ------------------------------------------------ //

// the number that appears most often in the list
const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el]
    ? counts[el] += 1
    : counts[el] = 1
  });
  // return counts;

  /// every value appears the same number of times, there is no mode.
  if(new Set(Object.values(counts)).size === 1){
    return null
  }
  /// sort the values properly.
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  // If multiple numbers in a series occur at the same highest frequency, they are all considered the mode. Otherwise, the mode is the number that occurs most often, that single number is the mode.
  const mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
  return mode

}

// ------------------------------------------------ //
//! Def 
// ------------------------------------------------ //

//: A Set : is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values.

//: Object.keys() method :  find the value that occurs with the highest frequency.