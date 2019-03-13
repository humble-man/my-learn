import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text , Image} from '@tarojs/components'
import './addcut.less'
import {getFoodCount,setFoodCount,getEvent} from '../../untils/common'

let myEvent = getEvent();
class AddCut extends Component {
	constructor() {
		super(...arguments)
		this.state = {
			num:0	
		}
	}
//	react生命周期初始化
	componentDidMount(){
//		组件初始化获取对应商品数量信息
		this.setState({
			num:getFoodCount(this.props.food)
		})
		myEvent.on('leftCateChange',()=>{
			this.setState({
				num:getFoodCount(this.props.food)
			})
		})
	}
//	递减商品数量
	cutFood(){
		if(this.props.food){
			if(this.state.num>0){
//				设置商品数量  需要有个回调函数
				setFoodCount(this.props.food,this.state.num,"cut",()=>{
					this.setState({
						num:getFoodCount(this.props.food)
					})
					myEvent.emit("storeChange");
				})
			}else{
				console.error("当前商品递减出现异常")
			}
		}
	}
//	递增商品数量
	addFood(){
		if(this.props.food){
//				设置商品数量  需要有个回调函数
			setFoodCount(this.props.food,this.state.num,"add",()=>{
				this.setState({
					num:getFoodCount(this.props.food)
				})
				myEvent.emit("storeChange");
			})
		}
	}
	render() {
		let {num} = this.state;
		let hideClass = num>0?'':'hide';
		return(
			<View className="addcut">
				<Image onClick={this.cutFood.bind(this)} className={"operation_img "+hideClass} src={require('../../assets/imgs/cut.png')} />
				<Text className={"food_num "+hideClass}>{num}</Text>
				<Image onClick={this.addFood.bind(this)} className="operation_img" src={require('../../assets/imgs/add.png')} />
			</View>
		)
	}
}

export default AddCut