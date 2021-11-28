import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LicenseTemplateList from './pages/LicenseTemplateList';
import LicenseForm from './pages/LicenseForm';
import LicenseMaker from './pages/LicenseMaker';
import UserLicenses from './pages/UserLicenses';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);

  return (
    <Router className="App">
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setContract={setContract} />
      <div style={{ minHeight: '77vh' }}>
        <Switch>
          <Route path="/user-Licenses">
            <UserLicenses
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/add-License">
            <LicenseForm
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/License-maker/:cid">
            <LicenseMaker
              walletAddress={walletAddress}
              contract={contract} />
          </Route>
          <Route path="/">
            <LicenseTemplateList />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
