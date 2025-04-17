const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_initialValue",
				"type": "int256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256",
				"name": "newCount",
				"type": "int256"
			}
		],
		"name": "CounterChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "decrement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default CONTRACT_ABI;