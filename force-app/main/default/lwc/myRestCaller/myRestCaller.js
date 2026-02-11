import { LightningElement, track } from 'lwc';

export default class MyRestCaller extends LightningElement {
    @track responseData;
    @track error;

    connectedCallback() {
        this.callRestService();
    }

    async callRestService() {
        try {
            const response = await fetch('/services/data/v60.0/query/?q=' + 
                encodeURIComponent('SELECT Id, Name, Industry FROM Account LIMIT 5'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken') // Optional if running in Salesforce UI
                }
            });
            console.log(JSON.stringify(response));
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.accounts = data.records;
            this.error = undefined;
        } catch (err) {
            this.error = err.message;
            this.accounts = [];
        }
    }
}