import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Image, Form, Button } from 'semantic-ui-react';

import { SERVER_URL } from '../config';
import Spinner from '../components/common/Spinner';

function LicenseMaker({ walletAddress, contract }) {
  const { cid } = useParams();

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [usdPrice, setusdPrice] = useState("0.00");
  const [recipient, setRecipient] = useState('');
  const [statusText, setStatusText] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [LicenseURL, setLicenseURL] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);

  useEffect(() => {
    const loadDataFromNFT = async () => {
      const res = await contract.methods.LicenseTemplateList(cid).call();
      console.log(res);
      setPrice(res.price);

      const usdValue = await contract.methods
        .getThePrice()
        .call();

      let totalUSDValue = (usdValue * res.price / 10 ** 18) / 100000000;
      totalUSDValue = Number.parseFloat(totalUSDValue).toFixed(2);
      setusdPrice(totalUSDValue);
    }
    
    if(contract) loadDataFromNFT();
  }, [contract, cid])

  const createLicenseTemplate = async () => {
    try{
      setLoadingCreate(true);
      setStatusText("Creating License...");

      const response = await fetch(SERVER_URL + 'api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'image_url': `https://slate.textile.io/ipfs/${cid}`,
          'title': title,
          'name': name
        })
      });

      if (!response) {
        console.log('No response');
        return;
      }

      const json = await response.json();
      setStatusText("Minting NFT...");
      setLicenseURL(json.url + "/License.pdf");
      console.log(json);

      const res = await contract.methods
        .mintLicenseNFT(json.cid, recipient)
        .send({ from: walletAddress });
      console.log('createLicenseTemplate', res);
      setTransactionHash(res.transactionHash);
      setLoadingCreate(false);
    }
    catch(err) {
      console.error(err);
      setLoadingCreate(false);
    }
  }
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Create your own License</h1>
      <Grid divided='vertically'>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={9} computer={9}>
            <Image className="Licensemaker" src={`https://slate.textile.io/ipfs/${cid}`} fluid />
            <p className="Licensemaker__onTop Licensemaker__infor">
              {title}
            </p><p className="Licensemaker__onTop Licensemaker__name">
              {name}
            </p>\
          </Grid.Column>
          <Grid.Column mobile={16} tablet={7} computer={7}>
            <Card centered style={{ width: '100%'}}>
              <Card.Content>
                <Form>
                  <Form.Field>
                    <label>Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Recipient's Address</label>
                    <input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                  </Form.Field>
                  
                  {contract 
                    ? <>
                        <p className="red-text">
                          Price: {window.web3.utils.fromWei(price.toString(), 'Ether')} ETH (${usdPrice})
                        </p>
                        <Button
                          type='submit'
                          color="black"
                          onClick={createLicenseTemplate}
                        >Mint NFT</Button>
                      </>
                      
                    : <p className="red-text">Connect to wallet</p>
                  }
                  {loadingCreate && <Spinner text={statusText} />}
                </Form>
              </Card.Content>
            </Card>

            {LicenseURL &&
              <p className="transactionHash">
                License URL, {" "}
                <a href={LicenseURL} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </p>
            }

            {transactionHash &&
              <p className="transactionHash">
                Success, see transaction {" "}
                <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                  {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
                </a>
              </p>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default LicenseMaker;
