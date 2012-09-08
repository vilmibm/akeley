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
    test_is_a_function: function(test) {
        var heyquery = function() { return 'dom stuff'; }
        heyquery.ajax = function() { return 'networks'; }
        heyquery.stuff = 'awesome';
        var mock = new Mock(heyquery);
        test.equal(mock.ajax.called, false, 'mocked function');
        test.equal(mock.stuff, 'awesome', 'preserved property');
        test.equal(mock(), 'dom stuff', 'mock is still a function');
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

exports.test_mock_function = {
    test_func: function(test) {
        var f = function() { return "hi" };
        var mock_f = Mock.create_func({func: f});
        var result = mock_f();
        test.equal(result, 'hi', 'got result');
        test.equal(mock_f.calls, 1, 'saw call');

        test.done();
    },
    test_no_args: function(test) {
        var mock_f = Mock.create_func();
        var result = mock_f();
        test.ok(!result, 'got no result from noop');
        test.equal(mock_f.calls, 1, 'saw call');

        test.done();
    },
    test_side_effect: function(test) {
        var affected = 0;
        var mock_f = Mock.create_func({
            side_effect: function() {affected += 1}
        });
        mock_f();
        test.equal(affected, 1, 'side effect happened');
        test.done();
    },
    test_side_effect_error: function(test) {
        var mock_f = Mock.create_func({
            side_effect: function() { throw 'error' }
        });
        test.throws(mock_f, 'error', 'saw error');
        test.done();
    },
    test_side_effect_and_func: function(test) {
        var affected = 0;
        var mockf = Mock.create_func({
            func: function() { return 5 },
            side_effect: function() { affected += 1}
        });
        var ret = mockf();
        test.equal(affected, 1, 'side effect happened');
        test.equal(ret, 5, 'func called');
        test.done();
    },
    test_return_value: function(test) {
        var mock_f = Mock.create_func({return_value: 5});
        test.equal(mock_f(), 5, 'saw return value');
        test.done();
    },
    test_call_count: function(test) {
        var mock_f = Mock.create_func();
        [1,2,3,4,5].forEach(mock_f);
        test.equal(mock_f.calls, 5, 'saw 5 calls');

        test.done();
    },
    test_args: function(test) {
        var mock_f = Mock.create_func();
        [1,2,3,4,5].forEach(function(x) { mock_f(x); });
        test.deepEqual(mock_f.args, [[1],[2],[3],[4],[5]], 'saw right args');

        test.done();
    },
    test_called: function(test) {
        var mock_f = Mock.create_func();
        test.equal(mock_f.called, false, 'not called yet');
        mock_f();
        test.ok(mock_f.called, 'saw it was called');

        test.done();
    },
    test_reset: function(test) {
        var mock_f = Mock.create_func();
        mock_f(); mock_f(); mock_f();
        test.equal(mock_f.calls, 3, 'sanity: saw three calls');
        mock_f.reset();
        test.equal(mock_f.calls, 0, 'reset call count');
        test.equal(mock_f.called, false, 'reset called boolean');
        test.deepEqual(mock_f.args, [], 'reset args');
        test.done();
    }
};

exports.test_create_nested = {
    test_empty_target: function(test) {
        var result = Mock.create_nested_obj({}, ['hi', 'there', 'how']);
        test.ok(result.hi.there.how, 'nested properly');
        test.done();
    },
    test_nonempty_target: function(test) {
        var result = Mock.create_nested_obj({a:'b'}, ['hi', 'there', 'how']);
        test.ok(result.hi.there.how, 'nested properly');
        test.equal(result.a, 'b', 'preserved target');
        test.done();
    }
};
