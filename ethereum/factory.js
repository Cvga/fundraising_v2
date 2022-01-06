import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x167a89351ae3E1632CAd22cDC9182C1484e25A52'
);

export default instance;
