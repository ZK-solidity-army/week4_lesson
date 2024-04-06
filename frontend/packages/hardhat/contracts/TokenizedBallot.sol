// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IMyToken {
    function getPastVotes(
        address _address,
        uint256 _blockNumber
    ) external view returns (uint256);
}

contract TokenizedBallot {
    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    IMyToken public tokenContract;
    Proposal[] public proposals;
    uint256 public immutable targetBlockNumber;
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    constructor(
        bytes32[] memory _proposalNames,
        address _tokenContract,
        uint256 _targetBlockNumber
    ) {
        tokenContract = IMyToken(_tokenContract);
        targetBlockNumber = _targetBlockNumber;
        require(
            _targetBlockNumber < block.number,
            "Target block number must be in the past"
        );
        for (uint256 i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({name: _proposalNames[i], voteCount: 0}));
        }
    }

    function vote(uint256 proposal, uint256 amount) external {
        // Check if the sender has not voted on this proposal before
        require(
            !hasVoted[msg.sender][proposal],
            "Already voted on this proposal"
        );

        // DIVERSIFICATION OF THE VOTES
        require(
            tokenContract.getPastVotes(msg.sender, targetBlockNumber) >= amount,
            "Not enough voting power"
        );

        // Mark the proposal as voted by the sender
        hasVoted[msg.sender][proposal] = true;

        // Increment the vote count for the proposal
        proposals[proposal].voteCount += amount;
    }

    function getAllProposals() external view returns (Proposal[] memory) {
        return proposals;
    }

    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
