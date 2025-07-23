const storageServices = {
    getItem: (storageKey) => {
        const storedValue = window.localStorage.getItem(storageKey);
        return storedValue ? JSON.parse(storedValue) : null;
    },
    setItem: (storageKey, value) => {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
    }
}

export default storageServices;