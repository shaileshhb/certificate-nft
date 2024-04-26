// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract Certificate is ERC721URIStorage {
    uint256 public totalIssuedCertificates;
    uint256 public maxPerWallet = 1;
    mapping(address => string) public userNftMapping;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0";
    }

    // modifier isNFTIssued {
    //   require(userNftMapping[msg.sender] != "");
    //   _;
    // }

    function issueCertificate() external returns (uint256) {
        totalIssuedCertificates++;
        _safeMint(msg.sender, totalIssuedCertificates);
        string memory tokenURI = _baseURI();
        _setTokenURI(totalIssuedCertificates, tokenURI);
        userNftMapping[msg.sender] = tokenURI;
        return totalIssuedCertificates;
    }

    function getTotalCertificatesMinted() external view returns (uint256) {
        return totalIssuedCertificates;
    }
}
