_controller(function (model, binds, map, resources) {
    return true;
    var instance    = this,
        clone       = null;
    clone = instance.clone({
        id      : 'clonned_pattern',
        title   : 'Clonned dialog window',
        content : {
            login: {
                type: 'text',
            },
            password: {
                type: 'password',
            },
            controls: [{ title: 'login', id: 'login_button' }, { title: 'cancel', id: 'cancel_button' }],
        }
    });
    //Do something;
});