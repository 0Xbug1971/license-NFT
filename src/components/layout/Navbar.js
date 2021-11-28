import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Segment, Menu, Button } from 'semantic-ui-react';
import Web3 from 'web3';

import LicenseMaker from '../../abis/LicenseMaker.json';
import Logo from '../../logo.svg';

function Navbar({ walletAddress, setWalletAddress, setContract }) {
  const [activeItem, setActiveItem] = useState('Home');

  const connectToBlockchain = async () => {
    await loadWeb3();
    await loadBlockchainData();
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setWalletAddress(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = LicenseMaker.networks[networkId];

    if(networkData){
      const abi = LicenseMaker.abi;
      const address = LicenseMaker.networks[networkId].address;

      const data = new web3.eth.Contract(abi, address);
      setContract(data);
    }else{
      window.alert('Contract is not deployed to detected network')
    }
  }

  const logout = () => {
    setWalletAddress('');
    setContract(null);
  }

  return (
    <Segment color='purple' inverted>
      <Container>
        <Menu inverted secondary>
          <Menu.Item
            as={Link}
            to='/'
            name='License Maker'
            onClick={() => setActiveItem('Home')}
          >
            <img src={Logo} style={{ width: '8rem' }} alt="Logo" />
          </Menu.Item>
          <Menu.Item
            as={Link}
            to='/'
            name='Home'
            active={activeItem === 'Home'}
            onClick={() => setActiveItem('Home')}
          />
          <Menu.Item
            as={Link}
            to='/add-License'
            name='Add License Border'
            active={activeItem === 'Add License Border'}
            onClick={() => setActiveItem('Add License Border')}
          />
          {walletAddress
            && <Menu.Item
                as={Link}
                to='/user-Licenses'
                name='Your Licenses'
                active={activeItem === 'Your Licenses'}
                onClick={() => setActiveItem('Your Licenses')}
              />
          }
          {walletAddress ? (
            <Menu.Menu position='right'>
              <Menu.Item>
                <p>{walletAddress.substring(0,8)}...{walletAddress.substring(34,42)}</p>
              </Menu.Item>
              <Menu.Item>
                <Button color="red" onClick={logout}>Disconnect</Button>
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button color='green' onClick={connectToBlockchain}>Open Wallet</Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>
      </Container>
    </Segment>

  );
}

export default Navbar;
