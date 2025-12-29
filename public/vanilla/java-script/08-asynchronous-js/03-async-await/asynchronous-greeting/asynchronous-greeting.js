// ! Рішення ----------

const success = false;

async function greet() {
  const promise = await new Promise((resolve, reject) => {
    if (success) {
      setTimeout(() => resolve("Resolve after 1 second!"), 1000);
    }
    setTimeout(() => reject("Reject after 3 second!"), 3000);
  });
  console.log(promise);
  // const result = await promise;
  // return result;
}

// result.then(resolve => console.log(resolve).catch(reject=> console.log(reject)))

greet();
