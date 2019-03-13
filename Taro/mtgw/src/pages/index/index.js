import Taro, {
	Component
} from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import './index.less'
import { connect } from '@tarojs/redux'
import Head from '../../componens/head/head'
import Food from '../../componens/food/food'
import Bottom from '../../componens/bottom/bottom'

class Index extends Component {
	config = {
		navigationBarTitleText: '首页'
	}

	componentWillReceiveProps() {
	}

	componentWillUnmount() {}

	componentDidShow() {}

	componentDidHide() {}

	render() {
		return(
			<View className="index">
        		<Head />
        		<Food />
        		<Bottom />
      		</View>
		)
	}
}

export default Index