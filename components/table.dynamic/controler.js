_controller(function (collapsed, uncollapsed) {
    function add(event) {
        var index = event.target.__indexes !== void 0 ? event.target.__indexes[0] : rows.length - 1;
        rows.splice(index + 1, 0, {
            column_0: (Math.random() * 1000).toFixed(4),
            column_1: (Math.random() * 1000).toFixed(4),
            column_2: (Math.random() * 1000).toFixed(4),
            column_3: (Math.random() * 1000).toFixed(4),
        });
        uncollapsed.map.update();
        uncollapsed.dom.update();
        uncollapsed.dom.listed[0].__rows__[index + 1].add.      on('click', add);
        uncollapsed.dom.listed[0].__rows__[index + 1].remove.   on('click', remove);
    };
    function remove(event) {
        var index = event.target.__indexes[0];
        rows.splice(index, 1);
        uncollapsed.map.update();
        uncollapsed.dom.update();
    };
    var rows = uncollapsed.model[0].__rows__;
    _node('a[id="add_row"]').events().add('click', add);
    uncollapsed.dom.grouped[0].__rows__.add.    on('click', add);
    uncollapsed.dom.grouped[0].__rows__.remove. on('click', remove);
});