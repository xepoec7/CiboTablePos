import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Divider, Icon, Layout, List, ListItem, Text } from '@ui-kitten/components';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import Api from '../helpers/Api';

const OrderComponent = (props) => {

    // initial variables
    const API = new Api();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [sound, setSound] = useState();
    const [orders, setOrders] = useState([]);
    const [oldOrders, setOldOrders] = useState([]);


    // Function to play notification when new order arrives.
    async function playSound() {
        const {sound} = Audio.Sound.createAsync(require('../assets/notification.wav'));
        setSound(sound);
        sound.playSound();
    }

    // Hook for checking orders when screen is in focus.
    useEffect(() => {
        API.openOrders()
            .then((res) => {
                let data = res.data;
                setOrders(data);
            });
    }, [props, isFocused]);

    // Hook for checking orders every minut.
    useEffect(() => {
        const interval = setInterval(() => {
            API.openOrders()
                .then((res) => {
                    let data = res.data;
                    setOrders(data);
                    if (JSON.stringify(orders) !== JSON.stringify(oldOrders)) {
                        setOldOrders(orders)
                        playSound();
                    }
                })
        }, 60000);
        return () => clearInterval(interval);
    });


    /**
     * Views
     */

    const renderItem = ({item}) => (
        <ListItem
            title={"Bestellung nr: "+item.id}
            description={item.created}
            onPress={() => navigation.navigate("Order", {"order": item})}
        />
    );

    return (
        <Layout >
            <Text style={{textAlign: 'center'}}>Neue Bestellungen</Text>
            <List
                data={orders} 
                renderItem={renderItem} 
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "40%",
    },
});

export default OrderComponent;