/**
 * @typedef {function(number): void} Callback
 */


/**
 * @template T
 * @typedef Atom
 * @property {function(): T} get - Gets the current state.
 * @property {function(T): void} set - Sets a new state.
 * @property {function(Callback<T>): function(): void} subscribe - Subscribes to state changes.
 * @property {function((current: T) => T): void} update - Updates the state using a computation and fallback value.
 */




/**
 * Creates a reactive store.
 *
 * @template T
 * @param {T} initialState - The initial state of the store.
 * @returns {Atom<T>} A reactive store.
 */
export function atom(initialState) {
    let state = initialState;
    const subscribers = [];


    /**
     * Gets the current state.
     * @returns {T} The current state.
     */
    function get() {
        return state;
    }

    /**
     * Sets a new state and notifies subscribers.
     * @param {T} newState - The new state.
     */
    function set(newState) {
        // Do not update if the data does not change
        if (newState === state) return

        state = newState;
        notifySubscribers();
    }


    /**
     * Updates the state using a computation and fallback value.
     *
     * @param {(current: T) => T} computation - The function to compute the new state.
     */
    function update(computation) {
        try {
            const result = computation(state);
            set(result);
        } catch (error) {
            console.error('Update failed. Falling back to the provided value.');
        }
    }


    /**
     * Subscribes to state changes.
     * @param {Callback<T>} callback - The callback to be executed on state changes.
     * @returns {function(): void} An unsubscribe function.
     */
    function subscribe(callback) {
        subscribers.push(callback);

        /**
         * Unsubscribes from state changes.
         * @returns {void}
         */
        return () => {
            const index = subscribers.indexOf(callback);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
        };
    }

    /**
     * Notifies all subscribers of a state change.
     *
     * @returns {void}
     */
    function notifySubscribers() {
        subscribers.forEach(callback => {
            callback(state);
        });
    }

    return {
        get,
        set,
        update,
        subscribe,
    };
}


