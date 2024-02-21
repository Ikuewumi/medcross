import { coinCount } from "./store";
import { enterMsg } from "./toast";

export enum Costs {
	startup = 50,
	checkWord = 5,
}


export const isFirstTime = async () => {
	const firstTime = localStorage.getItem("mc") || "";

	switch (firstTime) {
		case "00":
			break;
		default:
			Coins.setCoins(Costs.startup);
			localStorage.setItem("mc", "00");
			break;
	}
}



export const Coins = {
	value: coinCount,
	setCoins: async function (val: number) {
		const db = await window.getDb();
		await db.put("settings", {
			id: "coins",
			coinNumber: val
		});


		await this.sync();
		
	},
	checkWord: async function (word: string) {
		await this.sync();
		const balance = (this.value.get()- Costs.checkWord);
		if (balance < 0) return;

		this.setCoins(balance);
		return enterMsg(`${word} has been revealed for ${Costs.checkWord} coins`);

		

	},

	sync: async function() {
		const db = await window.getDb();
		const coins = await db.get("settings", "coins");
		if (coins?.id !== "coins") throw Error("could not sync");
		if (typeof coins?.coinNumber !== "number") throw Error("could not sync");

		if (coins.coinNumber !== this.value.get()) return this.value.set(coins.coinNumber);
	},

	reward: function (length: number) {
	 	return (Math.floor(length / (Costs.checkWord - 1))) * Costs.checkWord
	},

	getReward: async function(length: number) {
		const reward = this.reward(length);
		const balance = (this.value.get()) + reward;
		return this.setCoins(balance)
	},

	
}
