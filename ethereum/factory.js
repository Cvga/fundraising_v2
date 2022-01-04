import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x906750458810C248083F8cD0b82d6C8Bb8717003'
);

export default instance;
