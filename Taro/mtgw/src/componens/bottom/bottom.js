import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text , Image} from '@tarojs/components'
import './bottom.less'
import {getAllFoodInfo,getEvent} from '../../untils/common'

let event = getEvent();

class Bottom extends Component {
	constructor() {
		super(...arguments)
		this.state = {
			food_num:0,
			send_money:3,
			take_self:true,
			must_price:20,
			all_price:0
		}
	}
//	初始化
	componentDidMount(){
		let {allPrice,allNum} = getAllFoodInfo();
		this.setState({
			food_num:allNum,
			all_price:allPrice
		})
		event.on("storeChange",()=>{
			let {allPrice,allNum} = getAllFoodInfo();
			this.setState({
				food_num:allNum,
				all_price:allPrice
			})
		})
	}
	render() {
		let {all_price,food_num,send_money,take_self,must_price} = this.state;
		return(
			<View className="bottom">
				<View className="bottom_body">
					{food_num>0?<Text className="count_num">{food_num}</Text>:null}
					<Image className="img" src={food_num>0?require('../../assets/imgs/have_food.png'):require('../../assets/imgs/no_food.png')}/>
					<View>
						{all_price>0?<Text className="price">¥{all_price}</Text>:<Text>{send_money>0?"另需配送费¥"+send_money+"元":""}</Text>} | <Text>{take_self?"支持自取":""}</Text>
					</View>
					<View className="must_price">
						{all_price>=must_price?<Text className="submit">去结算</Text>:<Text className="price">{must_price}元起送</Text>}
					</View>
				</View>
			</View>
		)
	}
}

export default Bottom