import { expect } from "chai";

describe("Certificate", () => {
  const NAME = "Certificate"
  const SYMBOL = "CTF"

  let deployer, user
  let certificateContract

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners()
    const CertificateContract = await ethers.getContractFactory(NAME)
    certificateContract = await CertificateContract.deploy(NAME, SYMBOL)
  })

  describe("Deployment", () => {
    it("Sets the name & symbol", async () => {
      let result = await certificateContract.name()
      expect(result).to.be.equal(NAME)

      result = await certificateContract.symbol()
      expect(result).to.be.equal(SYMBOL)
    })
  })

  describe("Mint NFT", () => {
    beforeEach(async () => {
      const transaction = await certificateContract.connect(user).issueCertificate()
      await transaction.wait()
    })

    it("increase total issued certificates", async () => {
      // const result = await certificateContract.totalIssuedCertificates()
      const count = await certificateContract.getTotalCertificatesMinted()
      // expect(result).to.be.equal(1)
      expect(count).to.be.equal(1)
    })
  })
})