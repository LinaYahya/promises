// Calling Error First Callbacks

// FIRST: CALLBACK AND PROMISES

// Q: What is the problem here? What we call this
/* funcOne((err, resOne) => {
  if (err) recoverFromError(err);
  else
    funcTwo((err, resTwo) => {
      if (err) recoverFromError(err);
      else
        funcThree((err, resThree) => {
          if (err) recoverFromError(err);
          else
            funcFour((err, resFour) => {
              if (err) recoverFromError(err);
              else
                funcFive((err, resFive) => {
                  //do the thing
                });
            });
        });
    });
}); */

// How funcOne looks in a promise
/* funcOne
  .then(funcTwo)
  .then(funcThree)
  .then(funcFour)
  .then(funcFive)
  .catch((err) => recoverFromError(err)); */

// SECOND: WHAT IS PROMISE AND PROMISE STATES

// Q: What is promise: an object that may produce a value in the future
// Q: typeof promise
// Q: three states of promise( pending, resolved, rejected )

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("foo");
  }, 3000);
});

promise1
  .then((res) => console.log(res))
  .catch((e) => console.log(`error happened ${e}`));

// THIRD: CREATING PROMISE

// new Promise( /* executor */ function(resolve, reject) { ... } );
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

// Lets illustrate a real example
const readAFile = (callback) => {
  //here you do something async
  fs.readFile(`${__dirname}/public/index.html`, "utf8", (err, data) => {
    //here you do something if it errors
    if (err) callback(err);
    //here you do something if it works
    else callback(null, data);
  });
};
const readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      //here you do something if it errors
      if (err) reject(err);
      //here you do something if it works
      else resolve(data);
    });
  });
};

readFilePromise()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// Q: Assume all we want to do is to print data and error, How to run readAFile

// Q: What if I need to convert to promise instead of callbacks
// How to run .then and .catch ?! SO let's convert to promise

// FOURTH: PROMISE CHAINING
let promiseController = true;
const myFirstPromise = new Promise((resolve, reject) => {
  if (promiseController) {
    setTimeout(() => resolve(5), 1000);
    // Yay! Everything went well!
  } else {
    setTimeout(() => reject("Failed"), 1000);
  }
});

// typeof myFirstPromise
myFirstPromise
  .then((e) => {
    throw new Error("try our first catch");
  })
  .then((result) => {
    // 5
    //5
    // 5
    return result + 2;
  })
  .then((data) => console.log(data)) // 7
  .catch((err) => console.log(err)); // catch(), it's just sugar for ..then(undefined, func)

//  Understanding promise object
// Q: typeof myFirstPromise;
// Q: console.dir(myFirstPromise);
// Q: typeof myFirstPromise.then;
// Q: typeof myFirstPromise.then()

function addPositivesAsync(n1, n2) {
  let p = new Promise(function (resolve, reject) {
    if (n1 >= 0 && n2 >= 0) {
      //do some complex time consuming work
      resolve(n1 + n2);
    } else reject("NOT Positive NumberPassed");
  });
  return p;
}

const myPromise = new Promise();
addPositivesAsync(50, 50)
  .then((sum) => {
    // sum addPositivesAsync + 21 => console.log
    return addPositivesAsync(sum, -1);
  })
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

// console.log("end");
