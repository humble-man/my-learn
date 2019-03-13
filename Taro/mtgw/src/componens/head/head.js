import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text , Image} from '@tarojs/components'
import Top from './top'
import './head.less'
import Activity from './activity'

class Head extends Component {
//	定义空白函数
	constructor(){
		super(...arguments)
		this.state={
			"store":{
				title:"深夜食堂",
				notice:"深夜食堂，夜晚温馨的港湾~",
				tags:["装修精美","分量足","超级划算","温馨"]
			}
		}
	}
	render() {
		let {store}=this.state;  //es6 分解赋值
		return(
			<View className="head">
				<Top />
				<Image className="store_background" src={require("../../assets/imgs/background_img.jpg")}/>
				<View className="store_infos">
					<Image className="store_img" src={require("../../assets/imgs/store_img.jpg")}/>
					<View className="store_text">
						<Text className="store_title">{store.title}</Text>
						<Text className="store_notice">{store.notice}</Text>
						<View>
						{store.tags.map((item,index)=>{
								return(
									<Text className="tag_text" key={index}>{item}</Text>
								)	
							})
						}
						</View>
					</View>
				</View>
				<Activity />
			</View>
		)
	}
}

export default Head