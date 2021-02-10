import React from "react";

export default function Card(props) {

	return <div className="col-md-3">
            <div className="card border-primary mb-3" style={{maxWidth: "20rem"}} onClick={ props.cardClick}>
                <div className="card-header">Card</div>
                <div className="card-body">
                    <h4 className="card-title">{ props.isFlipped ? props.value : "Hidden" }</h4>
                </div>
            </div>
        </div>;
}