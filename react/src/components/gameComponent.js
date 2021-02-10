import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from './card'

class Game extends Component {

    constructor(props){
        super(props);

        this.state = {
            cards : [],
            canFlip    : false,
            firstCard  : null,
            secondCard : null,
            errorCount : 0,
            gameEnded : false
        }
    }

    checkAllMatched = () =>{

        let cards = this.state.cards;
        
        let unmatch = cards.filter((c) => {
            if(c.canFlip == true){
                return c;
            }
        })

        if(unmatch.length == 0){
            this.setState({canFlip: false, gameEnded:true});
        }
    }

    componentDidMount(){
        this.generateCards(this.props.diffilculty);
    }

    onSuccessGuess = () =>{
        // console.log("success");
        this.setCardCanFlip(this.state.firstCard.id , false);
        this.setCardCanFlip(this.state.secondCard.id , false);
        
        setTimeout(() => {
			this.resetFirstAndSecondCards();
        }, 1000);
        this.checkAllMatched();
    }

    onFailureGuess = () => {
        // console.log("failure");
        const first_card_id = this.state.firstCard.id;
		const second_card_id = this.state.secondCard.id;

        let err_count = parseInt(this.state.errorCount) + 1;
        this.setState({errorCount : err_count });

		setTimeout(() => {
			this.setCardIsFlipped(first_card_id, false);
        }, 1000);
        
		setTimeout(() => {
            this.setCardIsFlipped(second_card_id, false);
            this.resetFirstAndSecondCards();
		}, 1200);


    }

    resetFirstAndSecondCards = () =>{
        this.setState({firstCard : null, secondCard: null, canFlip : true});
    }

    shuffleArray = (array) => {
        return array.sort(() => .5 - Math.random());
    }

    generateCards = (count) => {

        const cards = [];
        for(let i=0; i < count; i++){
            cards.push({
                        id: uuidv4(),
                        isFlipped: false,
                        canFlip: true,
                        value : i
                    });
            cards.push({
                id: uuidv4(),
                isFlipped: false,
                canFlip: true,
                value: i
            });
        }

        setTimeout(() => this.setState({canFlip : true}), 1000);
        this.setState({"cards" : this.shuffleArray(cards) })
    }

    saveAction = () => {

        let data = {
            file_id : this.props.file_id,
            error_score : this.state.errorCount
        };

        fetch('http://localhost:5000/save-action', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(err => console.log(err));


    }//saveAction END

    onCardClick = (card) => {
        
        if (!this.state.canFlip)
        return;
		if (!card.canFlip)
        return;

        //if first and second card not empty
        if ( !this.state.firstCard == null || !this.state.secondCard == null){
            return;
        }

        // console.log("card click" , this.state.firstCard , this.state.secondCard);

		this.setCardIsFlipped(card.id, true);

        // console.log("card click", this.state.firstCard);
        if(this.state.firstCard){
            this.setState({ secondCard : card });

            if(this.state.firstCard.value == card.value){
                setTimeout(() => {
                    this.onSuccessGuess();
                    this.setState({canFlip : false});
                }, 100);
                
            }else{
                setTimeout(() => {
                    this.onFailureGuess();
                    this.setState({canFlip : false});
                }, 100);
                
            }
        }else{
            // console.log("setting first card");
            this.setState({ firstCard : card })
        }
        this.saveAction();
    }
    
    setCardIsFlipped = (card_id, isFlipped) => {

        let cards = this.state.cards;

        let new_cards = cards.map((c) => {
            if(c.id != card_id){
                return c;
            }
            return {...c, isFlipped: isFlipped}
        });

        this.setState({cards : new_cards });

	}//setCardIsFlipped END
    

    
    setCardCanFlip = (card_id, canFlip) => {

        let cards = this.state.cards;

        let new_cards = cards.map((c) => {
            if(c.id != card_id){
                return c;
            }
            return {...c, canFlip: canFlip}
        });

        this.setState({cards : new_cards });

	}//setCardIsFlipped END

    render(){
        let isGameEnded = this.state.gameEnded;
        let cards;

        if(isGameEnded){
            cards = (<div className="col-6">
                        Error Count : {this.state.errorCount}
                    </div>);
        }else{
           cards =  this.state.cards.map(card => <Card cardClick={() => this.onCardClick(card)} key={card.id} {...card}/>)
        }

        return(
            <div>
                <div className="row">
                    <div className="col-12 mb-5">
                        Error Count : {this.state.errorCount}
                    </div>
                </div>
                <div className="row">
                    {cards}
                </div>
            </div>
        )
    }

}

export default Game;