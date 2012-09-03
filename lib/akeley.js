var isobj = function(o) {
    return typeof o === 'object' && o.length === undefined;
};
var isfunc = function(f) {
    return typeof f === 'function';
}

var Mock = function(spec) {
    spec || (spec = {});
    var apply = function(s, o) {
        Object.keys(o).forEach(function(k) {
            var thing = o[k];
            if (isobj(thing)) {
                s[k] = {};
                apply(s[k], thing);
            }
            else if (isfunc(thing)) {
                s[k] = Mock.create_func()
            }
            else { s[k] = thing; }
        });
    };
    apply(this, spec);
};

Mock.create_func = function(opts) {
    opts || (opts = {});
    var func = opts.func || null;
    var return_value = opts.return_value || null;
    var side_effect = opts.side_effect || Mock.noop;
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
        side_effect.apply(this, args);
        if (func) { return func.apply(this, args) }
        else { return return_value }
    };

    ['calls', 'args', 'called'].forEach(function(k) {
        Object.defineProperty(wrapped, k, {
            get: function() { return function_spy[k]; }
        });
    });

    return wrapped;
};

Mock.create_nested_obj = function(obj, props) {
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

Mock.noop = function() {};

module.exports = { Mock: Mock };
