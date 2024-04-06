import { HardhatRuntimeEnvironment } from "hardhat/types";
import { hexlify, toUtf8Bytes, zeroPadBytes } from "ethers";
import { DeployFunction } from "hardhat-deploy/types";

const deployTokenizedBallot: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const MyTokenContract = await hre.deployments.get("MyToken");
  const proposals = ["Chocollate", "Vanilla", "Strawberry"].map(name => hexlify(zeroPadBytes(toUtf8Bytes(name), 32)));
  const blockNumber = (await hre.ethers.provider.getBlockNumber()) - 1;
  console.log(proposals, blockNumber);

  await deploy("TokenizedBallot", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [proposals, MyTokenContract.address, BigInt(blockNumber)],
  });
};

export default deployTokenizedBallot;

deployTokenizedBallot.tags = ["TokenizedBallot"];
deployTokenizedBallot.dependencies = ["MyToken"];
