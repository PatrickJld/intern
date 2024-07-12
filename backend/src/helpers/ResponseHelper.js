module.exports = {
    missing_param_response(res){
        console.log("Missing Required Parameters");
        res.status(422);
        res.send("Missing Required Parameters");
    },
    unique_id_response(res){
        console.log("Invalid Unique ID");
        res.status(422);
        res.send("Invalid Unique ID");
    },
    data_not_found_response(res){
        console.log("Data Not Found!");
        res.status(404);
        res.send("Data Not Found!")
    },
    success_response(res, data, msg){
        console.log(msg);
        res.status(200);
        res.send(data);
    }
}