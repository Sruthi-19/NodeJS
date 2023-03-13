console.log = function () {};
console.warn = function () {};
console.error = function () {};

const demoFunc = () => {
    for (let i = 0; i < 10000; i++) {
      console.log("i: ", i);
    }
  };
  
  console.log(
    console.log(demoFunc())
  );
  
  for (let i = 0; i < 5; i++) {
    console.log("Main Code Loop");
  }
  