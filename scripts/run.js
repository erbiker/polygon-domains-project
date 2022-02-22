const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("dev");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    // We're passing in a second variable - value. This is the moneyyyyyyyyyy
    let txn = await domainContract.register("erbiker",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const domainOwner = await domainContract.getAddress("erbiker");
    console.log("Owner of domain:", domainOwner);
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();