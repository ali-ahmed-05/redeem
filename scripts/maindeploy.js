// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const stz_address = ""
  const tokenLaunchpadVouchers = ""
  let id = ethers.BigNumber.from("107839786668602942302553276820293112281305365267458194609194986898658");
  
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

    console.log("Account balance:", (await deployer.getBalance()).toString());
    let Owner = (await deployer.getBalance()).toString()

      
  

    DoseVoucherRedeemer = await ethers.getContractFactory("DoseVoucherRedeemer")
    doseVoucherRedeemer = await DoseVoucherRedeemer.deploy(tokenLaunchpadVouchers,stz_address,await deployer.getAddress())
    await doseVoucherRedeemer.deployed()
    
    await doseVoucherRedeemer.unpause()
    _value = await ethers.utils.parseEther("1200")

    await doseVoucherRedeemer.setVoucherValues([id],[_value])

  

    
  saveFrontendFiles(doseVoucherRedeemer)
   

}

function saveFrontendFiles(nFT) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  let config = `
 export const doseVoucherRedeemer_addr = "${nFT.address}"
`

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
  

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby