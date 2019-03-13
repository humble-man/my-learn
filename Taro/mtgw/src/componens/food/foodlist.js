import Taro, {
	Component
} from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './foodlist.less'
import AddCut from '../addcut/addcut'

class FoodList extends Component {
	constructor() {
		super(...arguments)
		this.state = {}
	}
	render() {
//		console.log("当前分类下的数据列表---"+JSON.stringify(this.props.currentfood))
			let {
				currentcate,
				currentfood
			} = this.props;
			return(
					<View className="foodlist">
				<Text className="cate_title">{currentcate?currentcate.name:""}</Text>	
				{
						currentfood.map((item,index)=>{
							return (
									<View className="foodlist_item" key={item.id}>
										<Image className="item_img" src={item.img==1?require('../../assets/imgs/food1.jpg'):require('../../assets/imgs/food2.jpg')} />
										<View className="item_infos">
											<Text className="item_title">{item.title}</Text>
											<Text className="item_solid">月销:{item.solid}</Text>
											<Text className="item_price">¥{item.price}</Text>
											<AddCut food={item}/>
										</View>
									</View>
							)
						})
				}
			</View>
		)
	}
}

export default FoodList