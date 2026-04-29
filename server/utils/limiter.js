// Limits concurrent outgoing requests to the upstream API to avoid 503s
class ConcurrencyLimiter {
  constructor(max) {
    this.max = max;
    this.active = 0;
    this.queue = [];
  }

  run(fn) {
    return new Promise((resolve, reject) => {
      const execute = () => {
        this.active++;
        Promise.resolve()
          .then(() => fn())
          .then(resolve, reject)
          .finally(() => {
            this.active--;
            if (this.queue.length) this.queue.shift()();
          });
      };
      if (this.active < this.max) execute();
      else this.queue.push(execute);
    });
  }
}

module.exports = new ConcurrencyLimiter(2);
