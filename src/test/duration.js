module.exports.loop = function () {
    console.log('_____ CYCLE ' + Game.time + ' _____');
    var t0 = performance.now();    
    var test1a = performance.now();
    // ↓↓↓↓↓↓↓ TEST 1 CODE ↓↓↓↓↓↓↓
    
    // ↑↑↑↑↑↑↑ TEST 1 CODE ↑↑↑↑↑↑↑
    var test1b = performance.now();
    var test2a = performance.now();
    // ↓↓↓↓↓↓↓ TEST 2 CODE ↓↓↓↓↓↓↓
    
    // ↑↑↑↑↑↑↑ TEST 2 CODE ↑↑↑↑↑↑↑
    var test2b = performance.now();
    var t1 = performance.now();
    console.log("Cycle performance: " + (t1 - t0) + " milliseconds.")
    console.log('Test 1 by name: ' + (test1b - test1a));
    console.log('Test 2 by ID: ' + (test2b - test2a));
};