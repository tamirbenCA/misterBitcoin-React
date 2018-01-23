function loadFromStorage(key) {
    var val = localStorage.getItem(key)
        return (val)? JSON.parse(val) : undefined;
    }

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val);
}

function clearStorage(key) {
    localStorage.removeItem(key)
}

export default {
    loadFromStorage,
    saveToStorage,
    clearStorage
}