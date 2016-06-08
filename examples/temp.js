﻿_patterns.get({
    url     : '/patterns/popup/pattern.html',
    node    : document.body,
    hooks   : {
        id      : id,
        title   : 'Test dialog window',
        content : _patterns.get({
            url     : '/patterns/login/pattern.html',
            hooks   : {
                login   : _patterns.get({
                    url     : '/patterns/controls/textinput/pattern.html',
                    hooks   : {
                        type: 'text',
                    }
                }),
                password: _patterns.get({
                    url     : '/patterns/controls/textinput/pattern.html',
                    hooks   : {
                        type: 'password',
                    }
                }),
                controls: _patterns.get({
                    url     : '/patterns/buttons/flat/pattern.html',
                    hooks   : [{ title: 'login', id: 'login_button' }, { title: 'cancel', id: 'cancel_button' }]
                }),
            },
        })
    },
    callbacks: {
        success: function (results) {
            var instance    = this,
                dom         = results.dom,
                model       = results.model;
            //Attach event to buttons
            dom.listed.__content__.__controls__[0].button.on('click', function () {
                alert('You cannot login. It\'s just test. Login is "' + model.__content__.__login__.value + '", and password is "' + model.__content__.__password__.value + '"');
            });
            dom.listed.__content__.__controls__[1].button.on('click', function () {
                var id      = flex.unique(),
                    clone   = instance.clone({
                        id      : id,
                        title   : 'Clonned dialog window',
                        content : {
                            login   : {
                                type: 'text',
                            },
                            password: {
                                type: 'password',
                            },
                            controls: [{ title: 'login', id: 'login_button' }, { title: 'cancel', id: 'cancel_button' }],
                        }
                });
                document.body.appendChild(clone[0]);
                flex.libraries.ui.window.focus.     init();
                flex.libraries.ui.window.move.      init();
                flex.libraries.ui.window.maximize.  init();
                flex.libraries.ui.window.resize.    init();
            });
        }
    },
}).render();
