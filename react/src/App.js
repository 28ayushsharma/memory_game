
import  './bootstrap.min.css';
import React, { Component } from 'react';
import GameComponent from './components/gameComponent';



class App extends Component {


    state = {
        game_difficulty : null,
        file_id : null
    }

    savedifficulty = async (dif) => {

        let response = await fetch("http://localhost:5000/save-difficulty", {
                            method: 'post',
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({"difficulty" : dif})
                        });


        const json = await response.json();

        return json;
                        
    }//savedifficulty END

    selectDifficulty = (dif) =>{
        let file_id
        this.savedifficulty(dif)
        .then((json)=> {
            file_id = json.file_id

            if(file_id){
                this.setState({game_difficulty : dif, file_id:file_id});
            }
        });

        
    }//selectDifficulty END

    render(){
        let toLoadHtml;
    
        if(this.state.game_difficulty == null){
            toLoadHtml = (
                <div>
                    <h5>Please select game diffilculty : </h5>
                    <button className="btn btn-success" onClick={() => this.selectDifficulty(5)}>Easy</button>
                    <button className="btn btn-warning m-1" onClick={() => this.selectDifficulty(10)}>Medium</button>
                    <button className="btn btn-danger" onClick={() => this.selectDifficulty(15)}>Hard</button>
                </div>
            )
        }else{
            toLoadHtml = <GameComponent diffilculty={this.state.game_difficulty} file_id={this.state.file_id} />;
        }


        return (
            <div className="row">
                <div className="col-12 text-center mt-5">
                    <h4>Memory Game</h4>
                    {toLoadHtml}

                </div>
            </div>
        );
    }
}

export default App;
