/**
 * Class for calling API Server
 * 
 * @class Api
 * @constructor
 * @routes
 */

import axios from "axios";

export default class Api {

    constructor() {
        this.api_url = "http://10.0.2.2:8000/api"; // Address to local django server
        this.client = null;
    }

    init = () => {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    }


    /**
     * 
     * API ROUTES
     * 
     */


    // Check Server status
    serverStatus = () => {
        return this.init().get("/");
    };


    // Get open orders
    openOrders = () => {
        return this.init().get('order/');
    };


    // Get single order using primary key 'pk'
    getOrder = (pk) => {
        return this.init().get(`order/${pk}`);
    };


    // Accept order using primary key 'pk'
    acceptOrder = (pk) => {
        return this.init().get(`order/accept/${pk}`);
    };

    // Get open invoices
    openInvoices = () => {
        return this.init().get('invoice/');
    };

    // Pay invoice 
    payInvoice = (invoice) => {
        return this.init().put(`invoice/paidd/${invoice.id}`, invoice);
    };
}