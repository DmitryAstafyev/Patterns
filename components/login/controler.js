_controller(function (results) {
    var instance    = this,
        dom         = results.dom,
        model       = results.model;
    dom.listed.__content__.__controls__[0].button.on('click', function () {
        var data = model.__content__;
        if (data.__login__.value.length < 2) {
            data.__login__.not_valid = true;
            setTimeout(function () {
                data.__login__.not_valid = false;
            }, 2000);
        }
        if (data.__password__.value.length < 6) {
            data.__password__.not_valid = true;
            setTimeout(function () {
                data.__password__.not_valid = false;
            }, 2000);
        }
    });
});