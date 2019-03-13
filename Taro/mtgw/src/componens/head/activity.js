import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text , Image} from '@tarojs/components'
import './activity.less'

class Activity extends Component {
	//	定义空白函数
	constructor(){
		super(...arguments)
		this.state={
			activity:[//活动数据-数组
				{
					type:'cut',//活动类型
					active_list:[//活动详情数据-数组
					{
						full:100,
						cut:48
					},
					{
						full:50,
						cut:28
					},
					{
						full:30,
						cut:10
					}]
				}
			]
		}
	}
	
//	活动类型转换文字
	getTextByType(type){
		switch (type){
			case 'cut': return "减"
				break;
			default: return "加"
				break;
		}
	}
//	活动详细内容
	getActiveDetail(arr){
//		return arr.map((item,index)=>{
//			return (
//				"满"+item.full+"减"+item.cut+";"
//			)
//		})
		
//		简写:
		return arr.map((item,index)=>`满${item.full}减${item.cut}`).join(";")
	}
	render() {
		let {activity:[ListIndex]} = this.state;
		return(
			<View className="activity">
				<View className="left">
					<Text className="type">{this.getTextByType(ListIndex.type)}</Text>
					<Text className="activity_list">{this.getActiveDetail(ListIndex.active_list)}</Text>
				</View>
				<Text className="right">{this.state.activity.length}个活动</Text>
			</View>
		)
	}
}

export default Activity