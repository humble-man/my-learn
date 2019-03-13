import Taro, {
	Component
} from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './food.less'
import Cate from './cate'
import FoodList from './foodList'
import './food.less'

class Shop extends Component {
	constructor() {
		super(...arguments)
		this.state = {
			current: 0,
			tabList: [{
				title: '点菜'
			}, {
				title: '评价'
			}, {
				title: '商家'
			}],
			foodlist:[],
			currentfood:[],
			currentcate:null
		}
	}
	//	标签切换事件
	changeTab(value) {
		this.setState({
			current: value
		})
	}
//	切换分类事件-从Cate组件接收分类的信息
	changeCate(cate){
		this.setState({
			currentcate:cate
		})
		if(this.state.foodlist.some(item=>item.pid==cate.id)){  //some(表达式/方法)  判断数组中是否有需要的数据 返回 true/false
			//不用加载数据
			console.log("不需要加载新的数据")
			this.setState({
				currentfood:this.state.foodlist.filter(item=>item.pid==cate.id)
			})
		}else{
			//需要加载数据
			console.log("需要加载新的数据")
			this.setState({
				foodlist:this.state.foodlist.concat(this.getFoodList(cate))
			},
			()=>{
				this.setState({
					currentfood:this.state.foodlist.filter(item=>item.pid==cate.id)
				})
			})
		}
	}
//	获取数据--根据接受的分类
	getFoodList(cate){
		let img_index = Math.round(Math.random()*2);
		return Array.from(
			Array(Math.round(Math.random()*3)),
			(val,k)=>({
				price:Math.round(Math.random()*30),
				solid:Math.round(Math.random()*50),
				pid:cate.id,
				id:cate.id+"_"+k,
				title:"分类"+cate.id+"菜品"+(k+1),
				img:img_index
			})
		)
	}
	render() {
		let {current,tabList} = this.state;
		return(
			<View>
      			<AtTabs current={current} tabList={tabList} onClick={this.changeTab.bind(this)}>
      				<AtTabsPane>
      					<View className="food_body">
      						<Cate onChangeCate={this.changeCate.bind(this)}/>
      						<FoodList currentcate={this.state.currentcate} currentfood={this.state.currentfood}/>
      					</View>
      				</AtTabsPane>
      				<AtTabsPane>点评</AtTabsPane>
      				<AtTabsPane>商家</AtTabsPane>
      			</AtTabs>
      		</View>
		)
	}
}

export default Shop