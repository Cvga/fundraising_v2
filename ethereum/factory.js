import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xFBcB561D087Cf1Af74E2ae3448618A2dB6270F8d'
);

export default instance;
