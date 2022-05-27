const { expect } = require("chai");
const { ethers } = require("hardhat");


async function mineNBlocks(n) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send('evm_mine');
  }
}

describe("TokenLaunchpadVouchers ",  function ()  {

  
  
  let TokenLaunchpadVouchers
  let tokenLaunchpadVouchers
  let ERC2099starz
  let eRC2099starz
  let DoseVoucherRedeemer
  let doseVoucherRedeemer




   let [_,per1,per2,per3] = [1,1,1,1]

  it("Should deploy all smart contracts", async function () {

    [_,per1,per2,per3] = await ethers.getSigners()
    
    TokenLaunchpadVouchers = await ethers.getContractFactory("TokenLaunchpadVouchers")
    
    tokenLaunchpadVouchers = await TokenLaunchpadVouchers.deploy(_.address,_.address)
    await tokenLaunchpadVouchers.deployed()  

    let _value = await ethers.utils.parseEther("100000")
    ERC2099starz = await ethers.getContractFactory("ERC2099starz")
    eRC2099starz = await ERC2099starz.deploy("stz","stz",_value,_.address)
    await eRC2099starz.deployed()  
  //   constructor(
  //     IERC1155InventoryBurnable _vouchersContract,
  //     IWrappedERC20 _tokenContract,
  //     address _tokenHolder
  // )

    DoseVoucherRedeemer = await ethers.getContractFactory("DoseVoucherRedeemer")
    doseVoucherRedeemer = await DoseVoucherRedeemer.deploy(tokenLaunchpadVouchers.address,eRC2099starz.address,_.address)
    await doseVoucherRedeemer.deployed()

    await eRC2099starz.approve(doseVoucherRedeemer.address,_value)
    console.log(tokenLaunchpadVouchers.address)
    
    await doseVoucherRedeemer.unpause()
  });
  
 
  it("Should create collection", async function () {
    //107839786668602942302553276820293112281305365267458194609194986898658
    let id = ethers.BigNumber.from("107839786668602942302553276820293112281305365267458194609194986898658");
    let tx = await tokenLaunchpadVouchers.createCollection(id)
    await tx.wait()

    tx = await tokenLaunchpadVouchers.safeMint(
      per1.address,
      id,
      10,
      []
  )

  await tx.wait()
  let _value = await ethers.utils.parseEther("1200")

  await doseVoucherRedeemer.setVoucherValues([id],[_value])

  console.log((await doseVoucherRedeemer.getVoucherValue(id)).toString())

});

 
it("Should burn", async function () {
  let bal = await eRC2099starz.balanceOf(per1.address)
  console.log("before" , bal.toString())
  let id = ethers.BigNumber.from("107839786668602942302553276820293112281305365267458194609194986898658");
  
  await tokenLaunchpadVouchers.connect(per1).safeTransferFrom(
    per1.address,
    doseVoucherRedeemer.address,
    id,
    2,
    [])

    bal = await tokenLaunchpadVouchers.balanceOf(per1.address,id)
  console.log("after" , bal.toString())

});
});
