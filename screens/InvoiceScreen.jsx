import { StyleSheet } from 'react-native'
import React from 'react'
import { Button, Divider, Layout, List, ListItem, Text } from '@ui-kitten/components';

const InvoiceScreen = ({route, navigation}) => {

    // initial variables
    const invoice = route.params.invoice;


    /**
     * Views
     */

    const renderItem = ({item}) => (
        <ListItem
            title={item.product}
            description={item.qty + 'X = ' + item.sum + ' €'}
        />
    );

    return (
        <Layout style={styles.container}>
            <Layout style={styles.infoBox}>
                <Text>Kunde: {invoice.client}</Text>
                <Text>Erstellt: {invoice.created}</Text>
                <Text>Zum Bezahlten: {invoice.total} €</Text>
            </Layout>
            <List 
                data={invoice.items} 
                renderItem={renderItem}
                ItemSeparatorComponent={Divider} 
            />
            <Button
                onPress={() => navigation.navigate("Cashier", {"invoice": invoice})}
                status="success">Bezahlen
            </Button>
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
    },
});

export default InvoiceScreen;