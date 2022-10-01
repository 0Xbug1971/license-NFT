// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract licenseMaker is ERC721 {
  AggregatorV3Interface internal priceFeed;
  mapping(string => licenseTemplate) public licenseTemplateList;

  struct licenseTemplate {
    string cid;
    uint date;
    uint price;
    address payable from;
  }

  event licenseTemplateCreated (
    string cid,
    uint date,
    uint price,
    address payable from
  );

  event licenseNFTCreated (
    uint tokenId,
    string cid,
    uint date,
    address payable from,
    address payable to
  );

  /**
  * Network: Mumbai Testnet 
  * Aggregator: ETH/USD
  * Address: 0x0715A7794a1dc8e42615F059dD6e406A6594651A
  */
  
  /**
  * Network: Rinkeby Testnet
  * Aggregator: ETH/USD
  * Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
  */
  constructor() ERC721("license Maker", "CMR")  public {
    priceFeed = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
  }

  function createlicenseTemplate(string memory _cid, uint _price) external {
    licenseTemplateList[_cid] = licenseTemplate(_cid, now, _price, msg.sender);

    emit licenseTemplateCreated(_cid, now, _price, msg.sender);
  }

  function mintlicenseNFT(string memory _cid, address payable _to) external {
    uint _tokenId = totalSupply().add(1);
    _safeMint(_to, _tokenId);
    _setTokenURI(_tokenId, _cid);

    emit licenseNFTCreated(_tokenId, _cid, now, msg.sender, _to);
  }

  // Returns the latest price
  function getThePrice() public view returns (int) {
    (
        uint80 roundID, 
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price;
  }
      function getCharacterStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            characters[tokenId].strength,
            characters[tokenId].dexterity,
            characters[tokenId].constitution,
            characters[tokenId].intelligence,
            characters[tokenId].wisdom,
            characters[tokenId].charisma,
            characters[tokenId].experience
        );
    }
  function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
}
