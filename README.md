# akeley

_being a mocking utility_

## status

very much a work in progress. not recommended for any use outside of
experimentation until further notice.

## mock something out

        var Mock = require('akeley').Mock

        var mock_akeley = new Mock({
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
        mock_akeley.speakargs; // [ [] ]

        mock_akeley.think.called; // true
        mock_akeley.think.calls; // 2
        mock_akeley.think.args; // [ ['i hate the mi-go'], ['i love the mi-go'] ]

## just make a watched function

        // set a return value
        var mockf = Mock.create_func({return_value:5});
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

        var nested = Mock.create_nested_obj({}, ['hi', 'there', 'how', 'are', 'you']);
        nested.hi.there.how.are.you = 'hi';

## author

nathaniel k smith <nathanielksmith@gmail.com>

## license

BSD
