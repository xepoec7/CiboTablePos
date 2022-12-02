import React from "react";
import { Layout, List, ListItem, Text, Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Api from "../helpers/Api";


const OrderScreen = ({route, navigation}) => {

    /**
     * Initial variables
     */
    const API = new Api();
    const order = route.params.order;




    /**
     * Accept button handler function
     * 
     * Set order in server to accepted,
     * prints label with bluetooth 
     * printer and returns to Floor
     * 
     * @navigate to FloorScreen
     */
    const acceptHandler = () => {
        API.acceptOrder(order.id)
            .then((res) => {
                navigation.navigate('Floor');
            })
            .catch((er) => {
                console.log(er);
            });
    };


    /**
     * Views
     */
    const renderItem = ({item}) => (
        <ListItem
            title={item.product}
            description={item.qty + ' X '+ item.sum + ' €'}
        />
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.infoBox}>
                <Text>Kunde: {order.client}</Text>
                <Text>Erstellt: {order.created}</Text>
            </Layout>
            <List data={order.orderitems} renderItem={renderItem} />    
            <Layout >
                <Button 
                    onPress={() => acceptHandler()} 
                    status="success">Akzeptieren
                </Button>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 30,
    },
    infoBox: {
        marginRight: 10,
        marginLeft: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#212630',
    }

});

export default OrderScreen;