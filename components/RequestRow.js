import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2; //Next feature
    const deadlineTimestamp = parseInt(request.deadline);
    const millisecondsDeadLine = deadlineTimestamp*1000;
    const date = new Date(millisecondsDeadLine).toUTCString();
    const dateTime = Date.now();
    const status = dateTime < millisecondsDeadLine && !request.complete ? "Opened":
                   dateTime > millisecondsDeadLine && !request.complete ? "Expired":
                   request.complete ? "Success" : "N/A";
    
    return (
      <Row
        disabled={request.complete || dateTime >= millisecondsDeadLine}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell>
          {request.complete || dateTime >= millisecondsDeadLine ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete || dateTime >= millisecondsDeadLine ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
        <Cell>{date}</Cell>
        <Cell>{status}</Cell>

      </Row>
    );
  }
}

export default RequestRow;

