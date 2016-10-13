class EventEmitter {
  constructor(scope) {
    this.scope = scope;
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    if (this.events[eventName].indexOf(callback) !== -1) return;

    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter((c) => c !== callback);
  }

  emit(eventName) {
    if (!this.events[eventName]) return;

    const args = [...arguments].slice(1);
    this.events[eventName].forEach((callback) => callback(...args));
  }
}

export default EventEmitter;
