import React from 'react';
import {Animated, ScrollView, View} from 'react-native';
import CollapsibleView from "./CollapsibleView";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);


export default class CollapsibleScrollView extends CollapsibleView {

    render() {
        return (
            <View>
                <AnimatedScrollView
                    {...this.props}
                    {...this._getCollapsibleViewProps()}
                >
                    {this.props.children}
                </AnimatedScrollView>
                {this._getAnimatedHeader()}
            </View>
        );
    }
}

