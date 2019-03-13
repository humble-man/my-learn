import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text , Image} from '@tarojs/components'
import './top.less'

class Top extends Component {
	render() {
		return(
			<View className="top">
				<View className="left_img">
					<Image className="img" src={require("../../assets/imgs/back.png")} />
				</View>
				<View className="right_img">
					<Image className="img" src={require("../../assets/imgs/search.png")} />
					<Image className="img" src={require("../../assets/imgs/collection.png")} />
					<Image className="img" src={require("../../assets/imgs/group.png")} />
					<Image className="img" src={require("../../assets/imgs/more.png")} />
				</View>
			</View>
		)
	}
}

export default Top