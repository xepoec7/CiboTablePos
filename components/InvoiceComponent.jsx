import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native';
import Api from '../helpers/Api';

const InvoiceComponent = (props) => {

    // initial variables
    const API = new Api();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [invoices, setInvoices] = useState([]);

    // Check for invoces when get focus
    useEffect(() => {
        API.openInvoices()
            .then((res) => {
                let data = res.data;
                setInvoices(data);
            });
    }, [props, isFocused])



    /**
     * Views
     */

    const renderItem = ({item}) => {
        return (
            <View
                style={styles.card}
                onStartShouldSetResponder={() => navigation.navigate("Invoice", {"invoice": item})}
            >
                <Text style={styles.title}>{item.client}</Text>
            </View>
        )
    }

    return (
        <Layout style={styles.container}>
            <Text style={{textAlign: 'center'}}>Offene Rechnungen</Text>
            <FlatList
                data={invoices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 10,
        padding: 1,
        backgroundColor: '#1d272e',
        borderRadius: 20,
    },
    card: {
        height: 150,
        justifyContent: 'center',
        width: "46%",
        margin: 8,
        backgroundColor: 'skyblue',
    },
    title: {
        color: 'white',
        fontSize: 18,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    }
});

export default InvoiceComponent;