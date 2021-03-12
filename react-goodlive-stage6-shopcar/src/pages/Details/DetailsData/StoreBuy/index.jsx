import React from "react"
import StoreBuyView from "./StoreBuyView"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as collectActions from "../../../../actions/collect"

class StoreBuy extends React.Component {
    /**
     * 详情页视图页面 - >收藏与购买的业务逻辑 -> 收藏与购买的视图
     * 
     */

    constructor(){
        super();
        this.state = {
            collected:false
        }
    }

    componentDidMount(){
        // 设置收藏的值
        this.setState({
            collected:this.isStore()
        })
    }

    storeHandler() {
        const username = this.props.userinfo.name;
        const goods_id = this.props.id;
        if (username) {

            /**
             *  true:收藏了
             *  false:为收藏
             */
            if (this.isStore()) {
                // 取消收藏
                this.props.collectActions.cancelCollect({
                    id:goods_id
                })
                this.setState({
                    collected:false
                })
            } else {
                // 收藏实现
                this.props.collectActions.setCollect({
                    id: goods_id
                })
                this.setState({
                    collected:true
                })
            }

        } else {
            // 去登陆
            this.props.history.push("/login");
        }
    }

    /**
     * 收藏判断
     */

    isStore() {
        // filter some every
        const id = this.props.id;
        const collects = this.props.collect;
        return collects.some((element) => {
            return element.id === id;
        })
    }


    BuyHandler() {
        console.log("购买");
    }

    render() {
        return (
            <div>
                <StoreBuyView
                    collected={ this.state.collected }
                    onStoreHandler={this.storeHandler.bind(this)}
                    onBuyHandler={this.BuyHandler.bind(this)}
                />
            </div>
        )
    }
}

function mapStateTopProps(state) {
    return {
        userinfo: state.userinfo,
        collect: state.collect
    }
}

function mapDispatchToProps(dispatch) {
    return {
        collectActions: bindActionCreators(collectActions, dispatch)
    }
}

export default connect(
    mapStateTopProps,
    mapDispatchToProps
)(StoreBuy)