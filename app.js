const express = require('express');
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./functions');

const app = express();

app.get("/mean", (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    const numsString = req.query.nums.split(',');

    const nums = convertAndValidateNumsArray(numsString);
    const mean = findMean(nums);
    const result = {
        operation: "mean",
        result: mean
      }
    return res.send(result);
})

app.get("/median", (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    const numsString = req.query.nums.split(',');

    const nums = convertAndValidateNumsArray(numsString);
    const mean = findMedian(nums);
    const result = {
        operation: "median",
        result: mean
      }
    return res.send(result);
})

app.get("/mode", (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
      }
    const numsString = req.query.nums.split(',');

    const nums = convertAndValidateNumsArray(numsString);
    const mean = findMode(nums);
    const result = {
        operation: "mode",
        result: mean
      }
    return res.send(result);
})

/** general error handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found",404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


app.listen(3000, () => {
    console.log("App running on port 3000");
})