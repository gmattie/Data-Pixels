/**
 * @description <strong>Dispatcher</strong> is an abstract class that facilitates API generated event capabilities on standard JavaScript objects.
 * @abstract
 * 
 */
class Dispatcher {

    constructor() {

        if (this.constructor.name === Dispatcher.name) {

            throw new Error("Cannot instantiate abstract class.");
        }

        this._listeners = new Map();
    }

    /**
     * @description Registers a new event listener with a label ID and callback function.
     * @param {string} label - An identifier for the event listener. 
     * @param {function} callback - The function to call when the event is dispatched.
     * @public
     * @method 
     * 
     */
    addListener(label, callback) {

        if (!this.hasListener(label)) {

            this._listeners.set(label, []);
        }

        this._listeners.get(label).push(callback);
    }

    /**
     * @description Checks whether an event listener is registered.
     * @param {string} label - An identifier for the event listener.
     * @returns {boolean}
     * @public
     * @method 
     * 
     */
    hasListener(label) {

        return this._listeners.has(label);
    }

    /**
     * @description Deregisters an event listener using its label ID and callback function.
     * @param {string} label - An identifier for the event listener. 
     * @param {function} callback - The function to call when the event is dispatched.
     * @public
     * @method 
     * 
     */
    removeListener(label, callback) {

        if (this.hasListener(label)) {

            const callbacks = this._listeners.get(label);

            if (callbacks.length > 1) {

                callbacks.splice(callbacks.indexOf(callback), 1);
            }
            else {

                this._listeners.delete(label);
            }
        }
    }

    /**
     * @description Dispatches a registered event listener
     * @param {string} label - An identifier for the event listener. 
     * @param {...Object} data - Optional data that is dispatched as arguments to the event listener's callback function.
     * @public
     * @method 
     * 
     */
    dispatch(label, ...data) {

        if (this.hasListener(label)) {

            for (const callback of this._listeners.get(label)) {

                callback(...data);
            }
        }
    }
}

/**
 * @description Dispatcher class module
 * @module
 * 
 */
export default Dispatcher;