import React from 'react';
import {Animated, FlatList, View} from 'react-native';
import CollapsibleView from "./CollapsibleView";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


export default class CollapsibleFlatList extends CollapsibleView {
    
    render() {
        return (
            <View>
                <AnimatedFlatList
                    {...this.props}
                    {...this._getCollapsibleViewProps()}
                >
                </AnimatedFlatList>
                {this._getAnimatedHeader()}
            </View>
        );
    }
}