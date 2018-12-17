import React from 'react';
import {Animated, StyleSheet} from "react-native";

/**
 * An collapsible view is a view that is scrollable but has a header. This header needs to move 'up' when scrolling
 * down an move 'down' when scrolling up. It is also capable of keeping a status bar of a given height. The status bar
 * is then always shown and never hidden (also not when scrolling down).
 *
 * The logic in this component is gathered from various (open) sources.
 *
 * @author Johan Kladder
 */
export default class CollapsibleView extends React.Component {


    state = {
        scrollY: new Animated.Value(0),
    };

    _getViewProps = () => {
        let props = {};

        Object.assign(props, this.props);
        Object.assign(props, this._getCollapsibleViewProps());

        return props;
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

    _getStatusBarHeight = () => {
        let {statusBarHeight} = this.props;
        return statusBarHeight ? statusBarHeight : 0;
    };

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