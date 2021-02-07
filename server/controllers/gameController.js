
const {v4 : uuidv4} = require('uuid')
const fs = require('fs');




exports.index = (req, res, next) => {
    const newId = uuidv4()
    res.status(200).json({
        "index" : '1' , 
        "aa"    : newId 
    });

}//index END


exports.saveDifficulty = (req, res, next) => {
    //5  - easy
    //10 - medium
    //25 - hard
    const file_id = uuidv4();

    if([5,10,25].indexOf(req.body.difficulty) == -1){
        res.status(400).json({
            msg : "Please select difficulty"
        });
    }else{
        const game_details = {
            file_id : file_id,
            difficulty : req.body.difficulty,
            start_time : new Date(),
            action : []
        };
    
        fs.appendFile('./game-boards/'+file_id+'.json', JSON.stringify(game_details) , (err) => {
            
            if (err) throw err;
            
            console.log('Saved!');
        
        });
    
 
    
         
        res.status(200).json({
            "file_id"    : file_id 
        });
    }


}//saveDifficulty END



exports.saveAction = (req, res, next) => {
    //5  - easy
    //10 - medium
    //25 - hard

    const file_id = req.body.file_id;
    const is_correct  = req.body.is_correct;
    const error_score   = req.body.error_score;
    
    let rawdata = fs.readFileSync('./game-boards/'+file_id+'.json');
    let game_details = JSON.parse(rawdata);
    
    game_details.action.push({
        "step" : game_details.action.length + 1 ,
        "is_correct" : is_correct,
        "error_score" : error_score
    });
    

    fs.writeFile('./game-boards/'+file_id+'.json', JSON.stringify(game_details) , (err) => {
        if (err) throw err;
        
        console.log('Saved!');
    
    });
         
    res.status(200).json({
        "file_id"    : file_id 
    });
    


}//saveDifficulty END