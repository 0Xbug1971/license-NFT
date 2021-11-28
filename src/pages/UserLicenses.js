import React, { useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';

function UserLicenses({ walletAddress, contract }) {
  const [LicenseURLs, setLicenseURLs] = useState([]); 

  useEffect(() => {
    const loadNFTs = async () => {
      const totalSupply = await contract.methods.totalSupply().call();

      for(let i = 1; i <= totalSupply; i++){
        const tokenOwner = await contract.methods.ownerOf(i).call();
        
        if(tokenOwner === walletAddress){
          let LicenseCID = await contract.methods.tokenURI(i).call();
          console.log(LicenseCID);
          const LicenseURL = `https://ipfs.io/ipfs/${LicenseCID}/License.pdf`
          setLicenseURLs([...LicenseURLs, LicenseURL])
        }
      }
      
    }
    if(contract) loadNFTs();
  }, [walletAddress, contract, LicenseURLs])
  console.log(LicenseURLs)
  return (
    <Container>
      <h1>Your Licenses</h1>
      <List divided relaxed>
          {LicenseURLs.map(License => (
            <List.Item>
              <List.Icon name='License' size='large' verticalAlign='middle' />
              <List.Content>
              <a href={License} target="_blank" rel="noopener noreferrer">
                {License}
              </a>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </Container>
  )
}

export default UserLicenses;
