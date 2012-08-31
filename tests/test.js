var Mock = require('../lib/akeley').Mock;

exports.test_object_spec = {
    setUp: function(cb) { cb() },
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
            },

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
