import React, { useState } from 'react'
import Api from '../helpers/Api';
import { Button, Divider, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, StyleSheet } from 'react-native';

const CashierScreen = ({route, navigation}) => {

    // initial variable
    const API = new Api();
    const invoice = route.params.invoice;
    const [cashIn, setCashIn] = useState(0.00);
    const [cashOut, setCashOut] = useState(0.00);
    const [paid, setPaid] = useState(false);

    // Handler for cash in out and sending paid status to server
    const cashInHandler = () => {
        if (cashIn >= invoice.total) {
            let ammount = cashIn - Number(invoice.total);
            setCashOut(ammount);
            setPaid(true);
        }
    }

    // Handler sends server that invoice is paid
    const paidHandler = () => {
        invoice['cash'] = cashIn;
        API.payInvoice({"id":invoice.id, "cash": cashIn, "paid": true})
            .then((res) => {
                navigation.navigate("Floor");
            })
            .catch((er) => {
                Alert.alert("err" +err);
            })
    }

    /**
     * Views
     */

    if (!paid) {
        return (
            <Layout style={styles.container}>
                <Text style={styles.total_text}>{invoice.total} €</Text>
                <Input
                    style={styles.field}
                    placeholder='Geld Eingang'
                    keyboardType='decimal-pad'
                    onChangeText={newVal => { setCashIn(Number(newVal))}}
                />
                <Button
                    style={styles.btn}
                    onPress={() => cashInHandler()}
                    status="warning"
                >Kassa</Button>
            </Layout>
        );
    }

    return (
        <Layout style={styles.container}>
            <Text style={styles.total_text}>{invoice.total} €</Text>
            <Divider style={styles.divider} />
            <Text style={styles.cashout_text}>Geld ein:  {cashIn} €</Text>
            <Text style={styles.cashout_text}>Retour:  {cashOut} €</Text>
            <Button
                style={styles.btn}
                onPress={() => paidHandler()}
                status="success"
            >Bezahlt!</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: "100%",
        alignItems: 'center',
    },
    total_text: {
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    field: {
        width: 300,
        marginTop: 40,
    },
    btn: {
        marginTop: 40,
        width: 100,
    },
    divider: {
        color: "white",
    },
    cashout_text: {
        marginTop: 40
    },
});

export default CashierScreen;