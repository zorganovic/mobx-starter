/**
 * You might want to replace console with your own logger here
 */
const stdout = process.stdout;
const debug = console.log;
const info = console.info;
const warn = console.warn;
const error = console.error;
const DEFAULT = "\u001B[m";
const GREEN = "\u001B[32;1m";
const CYAN = "\u001B[36;1m";
const YELLOW = "\u001B[33;1m";
const RED = "\u001B[31;1m";


console.debug = function () {
    const args = Array.prototype.slice.call(arguments);
    stdout.write(CYAN);
    debug.apply(this, args);
    stdout.write(DEFAULT);
};
console.info = function () {
    const args = Array.prototype.slice.call(arguments);
    stdout.write(GREEN);
    info.apply(this, args);
    stdout.write(DEFAULT);
};
console.warn = function () {
    const args = Array.prototype.slice.call(arguments);
    stdout.write(YELLOW);
    warn.apply(this, args);
    stdout.write(DEFAULT);
};
console.error = function () {
    const args = Array.prototype.slice.call(arguments);
    stdout.write(RED);
    error.apply(this, args);
    stdout.write(DEFAULT);
};

module.exports = console;
