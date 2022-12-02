import { Layout } from '@ui-kitten/components';
import React from 'react'
import { StyleSheet } from 'react-native';



import OrderComponent from '../components/OrderComponent';
import InvoiceComponent from '../components/InvoiceComponent';

const FloorScreen = (props) => {
    
    /**
     * Views
     */

    return (
        <Layout style={styles.container}>
            <OrderComponent />
            <InvoiceComponent />
        </Layout>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingTop: 30,
    },
    order_container: {
        height: "50%",
    }
})

export default FloorScreen;