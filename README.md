# react-native-collapsible-header-components

This package contains a `<CollapsibleScrollView/>` and a 
`<CollapsableFlatList/>` component. These components can be used as 
a 'normal' ScrollView/FlatList, but can have collapsible headers. 

## What are 'collapsible headers' ?

Collapsible headers are bars that are in top of scroll-views. 
Most of the time these bars contain controllers, like: a channel 
selector or a search-bar. The point is, they make up space on the top space 
of a view.

## When do I need 'collapsible headers' ?

Collapsible headers can be used when your header takes up a lot 
of space of the UI. With a collapsible header it is possible to automatically 
remove the header when scrolling down and show it again when scrolling 
up.

## Additional properties of the 'scroll-views'.

Both the `<CollapsibleScrollView/>` and the `<CollapsableFlatList/>` 
contain the following additional props:

Property | Default | Description
---------|---------|------------
`collapsibleHeaderHeight` | Required | The height of the header. (integer) 
`collapsibleHeader` | Required | The actual header component (React.Component)
`statusBarHeight` | 0 | The height that the logic should always remain. So when given 100, the bottom 100 pixels is always visible


## Example code:
```javascript
    import {CollapisbleScrollView} from '@johankladder/react-native-collapsible-header-components'

    [...]
    
    renderCollapsibleScrollView = () => {
        return (
            <CollapsibleScrollView
                collapsibleHeader={this.renderHeaderWithMarkers()}
                collapsibleHeaderHeight={225}
                statusBarHeight={75}
            >
                {this.renderItemsForScrollView()}
            </CollapsibleScrollView>
        )
    };

    renderHeaderWithMarkers = () => {
        return (
            <View style={{}}>
                <View style={{height: 75, backgroundColor: 'red'}}/>
                <View style={{height: 75, backgroundColor: 'green'}}/>
                <View style={{height: 75, backgroundColor: 'blue'}}/>
            </View>
        )
    };
    
    renderItemsForScrollView = () => {
        let items = [];
        for (let i = 0; i < 50; i++) {
            items.push(
                <View key={'test-' + i}
                      style={{flex: 1, height: 50, backgroundColor: 'yellow', borderWidth: 1, borderColor: 'black'}}>
                    <Text>{i}</Text>
                </View>
            )
        }
        return items;
    }; 
    
    [...]
```

## How It looks:

