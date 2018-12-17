import React from 'react';
import {Animated, FlatList, View} from 'react-native';
import CollapsibleView from "./CollapsibleView";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**
 * A FlatList Components that can have a Collapsible Header.
 *
 * @author Johan Kladder
 */
export default class CollapsibleFlatList extends CollapsibleView {

    render() {
        return (
            <View>
                <AnimatedFlatList
                    {...this._getViewProps()}
                >
                </AnimatedFlatList>
                {this._getAnimatedHeader()}
            </View>
        );
    }
}