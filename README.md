# akeley

_being a mocking utility_

## mock something out

        var m = require('akeley');

        var mock_akeley = m.create_mock({
            name: 'Henry Akeley',
            profession: 'Antiquarian',
            vitals: {
                age: 63,
                height: "5'0",
                weight: "160"
            },
            thoughts:[],
            speak: function() {
                console.log('hello');
            },
            think: function(thought) {
                this.thoughts.push(thought);
            }
        });

        mock_akeley.speak();
        mock_akeley.think('i hate the mi-go');
        mock_akeley.think('i love the mi-go');

        mock_akeley.speak.called; // true
        mock_akeley.speak.calls; // 1
        mock_akeley.speak.args; // [ [] ]

        mock_akeley.think.called; // true
        mock_akeley.think.calls; // 2
        mock_akeley.think.args; // [ ['i hate the mi-go'], ['i love the mi-go'] ]

        mock_akeley.think.reset(); // reset called, calls, args

        // Does right thing when fed a function
        var _ = require('underscore'); // for example
        var mock_ = m.create_mock(_);
        mock_();
        mock_.called // true
        mock_.bind // set to a mock function

        // tweak its behavior
        mock_.return_value = 'azathoth';
        mock_(); // 'azathoth'


## just make a watched function

        // set a return value
        var mockf = m.create_func({return_value:5});
        mockf(): // 5
        mockf.called // true

        // wrap a real function
        var mockf = Mock.create_func({
            func: some_useful_real_func
        });

        // cause side effects
        var mockf = Mock.create_func({
            side_effect: function() { throw 'error' }
        });


## create a nested structure

        var nested = m.create_nested_obj({}, ['hi', 'there', 'how', 'are', 'you']);
        nested.hi.there.how.are.you = 'hi';

## changelog

0.5.0

 * totally change API so mocking Functions as objects works
 * support altering return\_value and friends as properties
 * update tests

0.4.0

 * add 'reset' feature

< 0.3.0

 * who even knows

## author

nathaniel k smith <nathanielksmith@gmail.com>

## license

BSD
