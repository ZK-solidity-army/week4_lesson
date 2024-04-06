import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMyNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MyNFT", {
    from: deployer,
    log: true,
    autoMine: true,
  });
};

export default deployMyNFT;

deployMyNFT.tags = ["MyNFT"];