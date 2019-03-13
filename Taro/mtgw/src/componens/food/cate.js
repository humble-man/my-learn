import Taro, {
	Component
} from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { getEvent } from '../../untils/common'

import './cate.less'

let event = getEvent();
class Cate extends Component {
	//	定义空函数
	constructor() {
		super(...arguments)
		this.state = {
			selectCate: null,
			cate: [{
					name: '优惠',
					id: 0
				},
				{
					name: '特色',
					id: 1
				},
				{
					name: '套餐',
					id: 2
				},
				{
					name: '素菜',
					id: 3
				},
				{
					name: '荤菜',
					id: 4
				},
				{
					name: '小吃',
					id: 5
				},
				{
					name: '饮料',
					id: 6
				},
			]
		}
	}
	//	点击分类事件
	toSelected(item) {
		if(this.state.selectCate && this.state.selectCate.id != item.id) {

			this.setState({
					selectCate: item
				},
				() => {
					//							将接收的分类信息传给父组件
					this.props.onChangeCate && this.props.onChangeCate(this.state.selectCate)
				})
			event.emit('leftCateChange');
		} else if(!this.state.selectCate) {
			this.setState({
					selectCate: item,
				},
				() => {
					//					将接收的分类信息传给父组件
					this.props.onChangeCate && this.props.onChangeCate(this.state.selectCate)
				}
			)
			event.emit('leftCateChange');
		}
	}
	render() {
		let {
			cate,
			selectCate
		} = this.state;
		return(
			<View className="cate">{
						cate.map((item,index)=>{
							return (
								<Text className={"cate_name "+((selectCate&&selectCate.id==item.id)?"selected":"")} key={item.id} onClick={this.toSelected.bind(this,item)}>{item.name}</Text>
							)
						})
					}
				</View>
		)
	}
}

export default Cate