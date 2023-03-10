import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimunContribution: '',
        nameCampaign: '',
        errorMessage: '',
        loading: false,
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true, errorMessage: ''})

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimunContribution, this.state.nameCampaign)
                .send({
                    from: accounts[0],
                }); //(*)

            Router.pushRoute('/'); //redirect alla landing page
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading:false}); //al fine della chiamata (*)
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Name of Campaign</label>
                        <Input
                            onChange={event => this.setState({nameCampaign: event.target.value})} 
                            value={this.state.nameCampaign}
                            placeholder="Inser name..."
                            required
                            ></Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Minimun Contribution</label>
                        <Input 
                            onChange={event => this.setState({minimunContribution: event.target.value})} 
                            value={this.state.minimunContribution}
                            label="wei" 
                            labelPosition="right" 
                            placeholder="Inser value..."
                            required></Input>
                    </Form.Field>
                    <Message error header="Oops! Somethings went wrong!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;