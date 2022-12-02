import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';


/**
 * Top navigation component with icon
 */
const TopNavigationComponent = (props) => {

    // Left arrow icon
    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    // Action handler
    const BackAction = () => (
        <TopNavigationAction
            icon={BackIcon}
            onPress={props.handler}
        />
    );

    // View
    return (
        <TopNavigation accessoryLeft={BackAction} title={props.title} />
    )
}

export default TopNavigationComponent;