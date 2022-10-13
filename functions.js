const ExpressError = require('./expressError');

function createFrequencyCounter(arr) {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}


function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}


function convertAndValidateNumsArray(numsString) {
  let result = [];

  for (let num of numsString) {
    num = parseInt(num);
    
    if (Number.isNaN(num)) {
      throw new ExpressError(
        `The value '${num}' is not a valid number.`, 400
      );
    }

    result.push(num);
  }

  return result;
}

function findMean(nums){
  if(nums.length === 0) return 0;
  return nums.reduce(function (acc, cur) {
    return acc + cur;
  }) / nums.length
}

function findMedian(nums){
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median
}



module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray
};
