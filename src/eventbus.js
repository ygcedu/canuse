class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      if (callback) {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      } else {
        delete this.events[eventName];
      }
    }
  }

  async emitAsync(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      await Promise.all(callbacks.map(callback => callback(...args)));
    }
  }
}

module.exports = EventBus;
