var Mock = function(spec) {
    // TODO support constructor
    spec || (spec = {});
    var apply = function(s, o) {
        Object.keys(o).forEach(function(k) {
            var thing = o[k];
            if (typeof thing === 'object') {
                s[k] = {};
                apply(s[k], thing);
            }
            else if (typeof thing === 'function') {
                s[k] = new Mock.MockFunction().wrapped;
            }
            else { s[k] = thing; }
        });
    };
    apply(this, spec);
};

Mock.create_nested_mock = function(obj, props) {
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

Mock.MockFunction = function(f) {
    this.f = (f || Mock.noop);
    this.called = false;
    this.calls = 0;
    this.args = [];
    var mockf = this;
    this.wrapped = function() {
        var args = Array.prototype.slice.call(arguments);
        mockf.called = true;
        mockf.calls += 1;
        mockf.args.push(args)
        return mockf.f.apply(this, args);
    };
    var wrapped = this.wrapped;
    ['called', 'calls', 'args'].forEach(function(x) {
        Object.defineProperty(wrapped, x, {
            get: function() { return mockf[x] }
        });
    });
};

Mock.noop = function() {};

module.exports = { Mock: Mock };
