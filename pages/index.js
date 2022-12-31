import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory.js";
import Layout from "../components/Layout.js";

class CampaignIndex extends Component {
    static async getInitialProps() { //methodo globale di NextJs, chiamato prima del rendering del componente. Setta i props globali
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {campaigns};
    }

    renderCampaigns() {
       const items =  this.props.campaigns.map(address => {
        return {
            header: address,
            description: <a>View Campaigns</a>,
            fluid: true,
        };
       });

       return <Card.Group items={items} />
    } 

    render() {
        return (
        <Layout>
            <h3>Open Campaigns</h3>
            <Button 
                primary
                floated="right"
                content='Create a Campaign' 
                icon='add circle' 
                labelPosition='left' />

            {this.renderCampaigns()}
        </Layout>
        );
    }
}

export default CampaignIndex;