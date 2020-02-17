import fetch from "node-fetch";

class Model {

	static async getBeers(map) {
		let args = "?"
		map.forEach( (v, k) => {
			args += `${k}=${encodeURIComponent(v)}&`;
		});
		args = args.replace(/&$/, "");

		let response = await fetch(`https://api.punkapi.com/v2/beers${args}`);
		let data = await response.json();
		return data;
	}

	static async getBeersByName(name, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("beer_name", name.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	static async getBeersByYeast(yeast, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("yeast", yeast.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	static async getBeersByHops(hops, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("hops", hops.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	static async getBeersByMalt(malt, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("malt", malt.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	static async getBeersByFood(food, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("food", food.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	static async getRandomBeer() {
		let response = await fetch(`https://api.punkapi.com/v2/beers/random`);
		let data = await response.json();
		return data;
	}

}

export default Model;