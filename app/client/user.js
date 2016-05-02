function User(name, id) {
    this.name = name;
    this.id = id || generateId();
};
var generateId = function () {
    var id = '';
    for (var i = 0; i < 7; i++) {
        var digit = Math.floor(Math.random() * 10);
        id += digit;
    }
    return id;
}
module.exports = User;