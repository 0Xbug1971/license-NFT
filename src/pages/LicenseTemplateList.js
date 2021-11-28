import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, Image, Message, Button } from 'semantic-ui-react';

import { SLATEAPIKEY, LicenseTEMPLATE_COLLECTIONID } from '../config';

const FREELicenseTEMPLATES = [
  {
    id: "3140e32a-ac7a-4456-ab5e-f09012a117b1",
    filename: "Border1.png",
    cid: "bafkreiflkoahwmhdc5finxpotxcrl74oyd6otl3qriefv3ysh7p2dph5yi"
  },
  {
    id: "80bf1651-de4e-4db5-9792-8b0f92a3f449",
    filename: "Border2.png",
    cid: "bafkreibpztlnlwueyh3s7gd5wypuiwz7z7lrl2rlkuwvptyrejaysiygeu"
  },
]

function LicenseTemplateList() {
  const [LicenseTemplates, setLicenseTemplates] = useState(FREELicenseTEMPLATES);
  const [showUnlockBtn, setShowUnlockBtn] = useState(true);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    window.addEventListener('unlockProtocol.status', function(event) {
      if(event.detail.state === "unlocked"){
        loadWorks();
        setShowUnlockBtn(false);
      }
    })
    
    const loadWorks = async () => {
      const response = await fetch('https://slate.host/api/v2/get-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: SLATEAPIKEY,
        },
        body: JSON.stringify({ data: {
          id: LicenseTEMPLATE_COLLECTIONID // collection ID
        }})
      });

      if (!response) {
        console.log("No response");
        return;
      }

      const json = await response.json();
      if (json.error) {
        console.log(json);
      } else {
        const collection = json.collection;
        setLicenseTemplates([...FREELicenseTEMPLATES, ...collection.objects]);
        console.log(collection)
      }
    }
  }, [])

  const unlock = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  }

  return (
    <Container>
      {showMessage && <Message
        onDismiss={() => setShowMessage(false)}
        header='Contract is deployed on Polygon Test Network'
      />}
      <h1>Choose License Border</h1>
      <Grid columns={3} doubling>
        <Grid.Row>
          {LicenseTemplates.map(License => (
            <Grid.Column key={License.id} style={{marginBottom: '1rem'}}>
              <Card color='purple'>
                <Image src={`https://slate.textile.io/ipfs/${License.cid}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{License.filename}</Card.Header>
                  <div style={{marginTop: '.7rem'}}>
                    <Button basic color='green' as={Link} to={`/License-maker/${License.cid}`}>
                      View
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
          {showUnlockBtn && 
            <Card color='purple'>
              <Card.Content>
                <Card.Header>See More License Border?</Card.Header>
                <Card.Description style={{ marginBottom: '1.5rem' }}>
                  You will need to purchase a membership to see more License Border
                </Card.Description>
                <Button color="purple" onClick={unlock} size="large">
                  Unlock Template
                </Button>
              </Card.Content>
            </Card>
          }
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default LicenseTemplateList;