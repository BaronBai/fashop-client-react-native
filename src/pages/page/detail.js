import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { connect } from "react-redux";
import { getPageInfo } from "../../actions/page";
import { stateHoc } from "../../utils";
import SafeAreaView from "react-native-safe-area-view";
import { PublicStyles } from '../../utils/publicStyleModule';
import {
    Goods,
    GoodsList,
    GoodsSearch,
    Separator,
    AuxiliaryBlank,
    ImageAds,
    ImageNav,
    ShopWindow,
    Video,
    TopMenu,
    Title,
    TextNav,
} from "../../components/page"

@connect(({
              view: {
                  page: {
                      pageInfo,
                      pageInfoFetchStatus,
                  }
              }
          }) => ({
    pageInfo,
    fetchStatus: pageInfoFetchStatus,
}))
@stateHoc()
export default class PageDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params || {}
        return {
            title,
        }
    }
    hocComponentDidMount() {
        const { id } = this.props.navigation.state.params
        this.props.dispatch(
            getPageInfo({ params: { id } })
        );

    }
    hocDetailKey() {
        return this.props.navigation.state.params.id
    }
    componentDidMount(){
        const { pageInfo, navigation } = this.props;
        const { name } = pageInfo;
        navigation.setParams({
            title: name
        })
    }
    render() {
        const { pageInfo } = this.props
        const { background_color, name, body } = pageInfo
        return <View
            style={[
                PublicStyles.ViewMax, {
                    backgroundColor: background_color
                }
            ]}
        >
            <ScrollView>
                {
                    body.map((item, index) => this.bodyItem(item, index))
                }
            </ScrollView>
        </View>
    }

    handelLink = (link) => {
        // link.action = portal 首页
        // link.action = goods 商品 param { id: 10000 }
        // link.action = page 页面 param { id: 'slfkf2dc' }
        // link.action = url 页面 param { url: 'http://fashop.cn' }
        const { navigation } = this.props
        switch (link.action) {
            case "portal":
                return navigation.navigate("Home");
            case "goods":
                return navigation.navigate("GoodsDetail", { id: link.param.id });
            case "page":
                return navigation.navigate("PageDetail", { id: link.param.id });
            case "url":
                return navigation.navigate('PublicWebView', {
                    title: 'Fashop',
                    url: link.param.url
                })
            default:
                return navigation.navigate("Home");
        }
    }

    bodyItem(item, index) {
        const { navigation } = this.props;
        switch (item.type) {
            case "goods":
                return <Goods key={index} data={item} navigation={navigation} />;
            case "goods_list":
                return <GoodsList key={index} data={item} navigation={navigation} />;
            case "goods_search":
                return <GoodsSearch
                    key={index}
                    data={item}
                    goGoodsList={() => navigation.navigate("GoodsList", {
                        autoFocus: true
                    })}
                />;
            case "separator":
                return <Separator key={index} data={item} />;
            case "auxiliary_blank":
                return <AuxiliaryBlank key={index} data={item} />;
            case "image_ads":
                return <ImageAds key={index} data={item} handelLink={this.handelLink} />;
            case "image_nav":
                return <ImageNav key={index} data={item} handelLink={this.handelLink} />;
            case "shop_window":
                return <ShopWindow key={index} data={item} handelLink={this.handelLink} />;
            case "video":
                return <Video key={index} data={item} />;
            case "top_menu":
                return <TopMenu key={index} data={item} handelLink={this.handelLink} />;
            case "title":
                return <Title key={index} data={item} />;
            case "text_nav":
                return <TextNav key={index} data={item} handelLink={this.handelLink} />;
            default:
                return <Text key={index}>NULL</Text>;
        }
    }
}

const styles = StyleSheet.create({
    titleWarp: {
        backgroundColor: '#fff'
    },
    title: {
        lineHeight: 44,
        fontSize: 17,
        color: '#000',
        fontWeight: '700',
        textAlign: 'center'
    },
});