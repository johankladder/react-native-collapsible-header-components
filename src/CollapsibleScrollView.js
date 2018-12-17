import React from 'react';
import {Animated, ScrollView, View} from 'react-native';
import CollapsibleView from "./CollapsibleView";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/**
 * A ScrollView Components that can have a Collapsible Header.
 *
 * @author Johan Kladder
 */
export default class CollapsibleScrollView extends CollapsibleView {

    render() {
        return (
            <View>
                <AnimatedScrollView
                    {...this._getViewProps()}
                >
                    {this.props.children}
                </AnimatedScrollView>
                {this._getAnimatedHeader()}
            </View>
        );
    }
}

