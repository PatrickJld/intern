module.exports = {
    toFixed(x, precs){
        return parseFloat(Number.parseFloat(x).toFixed(precs));
    },
};