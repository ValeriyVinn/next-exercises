
class MiniPromise {
  constructor(executor) {
    this.state = 'pending';
    this.result = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = value => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.result = value;
      this.onFulfilled.forEach(fn => fn(value));
    };

    const reject = reason => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.result = reason;
      this.onRejected.forEach(fn => fn(reason));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.result);
    } else if (this.state === 'pending') {
      this.onFulfilled.push(onFulfilled);
    }
    return this; // для ланцюжків
  }

  catch(onRejected) {
    if (this.state === 'rejected') {
      onRejected(this.result);
    } else if (this.state === 'pending') {
      this.onRejected.push(onRejected);
    }
    return this;
  }
}

const p = new MiniPromise((resolve) => {
  setTimeout(() => resolve("Готово!"), 3000);
});

p.then(result => console.log("Результат:", result))
 .catch(error => console.error("Помилка:", error));