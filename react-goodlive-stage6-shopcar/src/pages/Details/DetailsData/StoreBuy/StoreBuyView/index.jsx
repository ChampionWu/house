import React from "react"
import "./style.less"

export default class StoreBuyView extends React.Component{

    collectHandler(){
        this.props.onStoreHandler();
    }

    buyHandler(){
        this.props.onBuyHandler();
    }

    render(){
        const collected = this.props.collected;
        return(
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                   {
                        collected ? <button className="selected o" onClick={ this.collectHandler.bind(this) }>已收藏</button>
                        : <button className="selected" onClick={ this.collectHandler.bind(this) }>收藏</button>
                   }
                </div>
                <div className="item-container float-right">
                    <button onClick={ this.buyHandler.bind(this) }>购买</button>
                </div>
            </div>
        )
    }
}