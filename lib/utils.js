var utils = {
    getReturnMessage: function(data,err){
        var isError = typeof(err) === "undefined" ? true : false;
        var result = {
            success : isError,
            err : err,
            data: data
        }
        return result;

    },
    getPosition: function(str, m, i) {
        str = "" + str + "";
        return str.split(m, i).join(m).length;
    }
};

module.exports = utils;