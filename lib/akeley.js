var isobj = function(o) {
    return typeof o === 'object' && o.length === undefined;
};
var isfunc = function(f) {
    return typeof f === 'function';
}

var create_mock = function(spec) {
    spec || (spec = {});
    var mock;
    if (isobj(spec)) { mock = {}; }
    else if (isfunc(spec)) { mock = create_func(); }
    else { return spec; }
    var mock_out = function(s, o) {
        Object.keys(o).forEach(function(k) {
            var thing = o[k];
            if (isobj(thing)) {
                s[k] = {};
                mock_out(s[k], thing);
            }
            else if (isfunc(thing)) {
                s[k] = create_func()
            }
            else { s[k] = thing; }
        });
    };
    mock_out(mock, spec);

    return mock;
};

var create_func = function(opts) {
    opts || (opts = {});
    var func = opts.func || null;
    var return_value = opts.return_value || null;
    var side_effect = opts.side_effect || noop;
    var function_spy = {
        calls: 0,
        args: [],
        called: false
    };

    var wrapped = function() {
        var args = Array.prototype.slice.call(arguments);
        function_spy.calls += 1;
        function_spy.args.push(args);
        function_spy.called = true;
        wrapped.side_effect.apply(this, args);
        if (wrapped.func) { return wrapped.func.apply(this, args) }
        else { return wrapped.return_value }
    };

    wrapped.func = func;
    wrapped.side_effect = side_effect;
    wrapped.return_value = return_value;
    wrapped.reset = function() {
        function_spy.called = false;
        function_spy.calls = 0;
        function_spy.args = [];
    };

    ['calls', 'args', 'called'].forEach(function(k) {
        Object.defineProperty(wrapped, k, {
            get: function() { return function_spy[k]; }
        });
    });

    return wrapped;
};

var create_nested_obj = function(obj, props) {
    var help = function(o, ps) {
        if (ps.length === 0) { return }
        else {
            o[ps[0]] = {};
            help(o[ps[0]], ps.slice(1));
        }
    }
    help(obj, props);
    return obj;
};

var noop = function() {};

module.exports = {
    create_mock: create_mock,
    create_func: create_func,
    create_nested_obj: create_nested_obj,
    noop: noop
};
