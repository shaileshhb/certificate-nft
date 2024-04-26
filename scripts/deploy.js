const main = async () => {
  const NAME = "Certificate"
  const SYMBOL = "CTF"
  const [deployer] = await ethers.getSigners()

  const certificateContractFactory = await ethers.getContractFactory(NAME)
  const certificateContract = await certificateContractFactory.deploy(NAME, SYMBOL)
  await certificateContract.deployed()

  console.log(`Contract successfully deployed at ${certificateContract.address}\n`);

  // call the function.
  let txn = await certificateContract.connect(deployer).issueCertificate()
  await txn.wait()

  const count = await certificateContract.connect(deployer).totalIssuedCertificates()
  const result = await certificateContract.connect(deployer).getTotalCertificatesMinted()

  console.log("Minted NFT #1", count.toString(), result.toString())
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (err) {
    console.error(err);
    process.exit(1)
  }
}

runMain()