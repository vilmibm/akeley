var Mock = require('../lib/akeley').Mock;

exports.test_object_spec = {
    setUp: function(cb) { cb() },
    test_toplevel: function(test) {
        var cat = {
            name: 'unix',
            age: 6
        };
        var mock_cat = new Mock(cat);
        test.equal(mock_cat.name, 'unix', 'name set');
        test.equal(mock_cat.age, 6, 'age set');
        test.done();
    },
    test_nested: function(test) {
        var cat = {
            vitals: {
                age: 6,
                weight: 17,
                appearance: {
                    legs: 4,
                    colours: ['orange', 'black', 'brown']
                }
            }
        };
        var mock_cat = new Mock(cat);
        test.equal(mock_cat.vitals.age, 6, 'age set');
        test.equal(mock_cat.vitals.weight, 17, 'weight set');
        test.equal(mock_cat.vitals.appearance.legs, 4, 'legs set');
        test.deepEqual(mock_cat.vitals.appearance.colours, ['orange', 'black', 'brown'], 'colours set');
        test.done()

    },
    test_functions: function(test) {
        var cat = {
            speak: function() { return "my name is " + this.name },
            abilities: {
                sit: function() { return "sat" },
                sleep: function() { return "zzz" }
            }
        };
        var mock_cat = new Mock(cat);
        test.equal(mock_cat.speak.called, false, 'function wrapped');
        test.equal(mock_cat.abilities.sit.called, false, 'function wrapped');
        test.equal(mock_cat.abilities.sleep.called, false , 'function wrapped');
        test.done();
    },
    test_combined: function(test) {
        var cat = {
            name: 'unix',
            vitals: {
                age: 6,
                colours: ['orange', 'black', 'brown'],
            },
            speak: function() { return "my name is " + this.name },
            abilities: {
                sit: function() { return "sat" },
                sleep: function() { return "zzz" }
            }
        };
        var mock_cat = new Mock(cat);
        test.equal(mock_cat.name, 'unix', 'name is set');
        test.equal(mock_cat.vitals.age, 6, 'age is set');
        test.deepEqual(mock_cat.vitals.colours, ['orange', 'black', 'brown'], 'colours is set');
        test.equal(mock_cat.speak.calls, 0, 'function mocked');
        test.equal(mock_cat.abilities.sit.calls, 0, 'function mocked');
        test.equal(mock_cat.abilities.sleep.calls, 0, 'function mocked');

        test.done();
    }
};

exports.test_MockFunction = {
    setUp: function(cb) {
        this.f = function() { return "hi" };
        this.mock_f = new Mock.MockFunction(this.f);
        cb();
    },
    test_passthrough: function(test) {
        test.done();
    },
    test_noop: function(test) {
        test.done();
    },
    test_call_count: function(test) {
        test.done();
    },
    test_args: function(test) {
        test.done();
    },
    test_called: function(test) {
        test.done();
    }
};
