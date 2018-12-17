import React from 'react';
import {Animated, StyleSheet} from "react-native";

export default class CollapsibleView extends React.Component {


    state = {
        scrollY: new Animated.Value(0),
    };

    _interpolateHeaderHeight = () => {

        let {collapsibleHeaderHeight} = this.props;

        const clampedScrollY = this.state.scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
        });

        return Animated.diffClamp(clampedScrollY, 0, collapsibleHeaderHeight - this._getStatusBarHeight())
            .interpolate({
                inputRange: [0, 1],
                outputRange: [0, -1],
                extrapolateLeft: 'clamp',
            });
    };

    /**
     * Retrieves the statusBarHeight that was given. When none was given, it will return 0, so it can always
     * be calculated.
     *
     * @return {number}
     * @private
     */
    _getStatusBarHeight = () => {
        let {statusBarHeight} = this.props;
        return statusBarHeight ? statusBarHeight : 0;
    };

    /**
     * Returns the headerStyle that needs to be used for the header to perform according to the animations.
     *
     * @param defaultHeaderHeight
     * @param interpolatedHeaderTranslation
     * @return {*[]}
     * @private
     */
    _getHeaderStyle = (defaultHeaderHeight, interpolatedHeaderTranslation) => {
        return [
            styles.defaultHeaderStyle,
            {
                height: defaultHeaderHeight
            },
            {
                transform: [
                    {
                        translateY: interpolatedHeaderTranslation
                    }
                ]
            }
        ]
    };

    _getAnimatedHeader = () => {

        const interpolatedHeaderTranslation = this._interpolateHeaderHeight();

        let {collapsibleHeaderHeight, collapsibleHeader} = this.props;

        return (
            <Animated.View
                style={this._getHeaderStyle(collapsibleHeaderHeight, interpolatedHeaderTranslation)}>
                {collapsibleHeader}
            </Animated.View>
        )

    };

    /**
     * Returns a object container the styles of a scrollView that is capable of performing collapsible actions.
     *
     * @return {{contentContainerStyle: {_: {paddingTop: *}}, scrollEventThrottle: number, onScroll: *}}
     * @private
     */
    _getCollapsibleViewProps = () => {
        let {collapsibleHeaderHeight} = this.props;

        return {
            contentContainerStyle: {paddingTop: collapsibleHeaderHeight},
            scrollEventThrottle: 1,
            onScroll: Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {y: this.state.scrollY}
                        }
                    }
                ],
                {useNativeDriver: true}
            )
        }
    }

}

const styles = StyleSheet.create({
    defaultHeaderStyle: {
        position: 'absolute',
        width: '100%'
    }
});