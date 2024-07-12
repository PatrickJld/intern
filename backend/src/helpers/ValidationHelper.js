module.exports = {
    validate_required_columns(
        req,
        model,
        guard = [],
        fillable = [],
        hasFile = false
    ) {
        const default_guard = ["id", "createdAt", "updatedAt"];
        const guards = default_guard.concat(guard);

        const model_attributes = Object.keys(model.rawAttributes);
        const attributes = [...model_attributes, ...fillable];
        for (let attr of attributes){
            if (guard.includes(attr)) continue;
            if (req.body[attr] === undefined || req.body[attr] === null || req.body[attr] === ''){
                return attr;
            }
        }

        if (hasFile && !req.file){
            return false;
        }

        return true;
    },
};