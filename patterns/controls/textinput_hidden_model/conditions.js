var conditions = {
    type        : function (data) {
        return data.type;
    },
    showinfo    : function (data) {
        return data.bad_password === true ? 'show' : 'null';
    }
};
conditions.showinfo.tracking = ['bad_password'];
_conditions(conditions);
