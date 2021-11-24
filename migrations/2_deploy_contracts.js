const licenseMaker = artifacts.require("licenseMaker");

module.exports = function(deployer){
  deployer.deploy(licenseMaker);
}
