class Model {

	/**
	 * Querying the Punk API with the parameters passed in the Map 
	 * @param {Map} map (key > param, value > value)
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
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

	/**
	 * Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA),
	 * if you need to add spaces just add an underscore (_).
	 * @param {string} name The searched name
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByName(name, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("beer_name", name.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	/**
	 * Returns all beers matching the supplied yeast name, this performs a fuzzy match,
	 * if you need to add spaces just add an underscore (_).
	 * @param {string} yeast The searched yeast
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByYeast(yeast, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("yeast", yeast.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	/**
	 * Returns all beers matching the supplied hops name, this performs a fuzzy match,
	 * if you need to add spaces just add an underscore (_).
	 * @param {string} hops The searched hops
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByHops(hops, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("hops", hops.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	/**
	 * Returns all beers matching the supplied malt name, this performs a fuzzy match,
	 * if you need to add spaces just add an underscore (_).
	 * @param {string} malt The searched malt
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByMalt(malt, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("malt", malt.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	/**
	 * Returns all beers matching the supplied food name, this performs a fuzzy match,
	 * if you need to add spaces just add an underscore (_).
	 * @param {string} food The searched food
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByFood(food, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);
		args.set("food", food.replace(/\s/, "_"));
		let data = await this.getBeers(args);
		return data;
	}

	/**
	 * Returns all beers that have their ABV higher or/and lower than those passed in parameter.
	 * @param {object} bounds Lower and upper terminals (at least 1 is required)
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByABV({lower, upper} = {}, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		if(lower) args.set("abv_gt", lower);
		if(upper) args.set("abv_lt", upper);

		if(args.size === 1) 
			throw new Error("You need at least one of the two bounds to be able to get beers by ABV.");
		else {
			let data = await this.getBeers(args);
			return data;
		}
	}

	/**
	 * Returns all beers that have their IBU higher or/and lower than those passed in parameter.
	 * @param {object} bounds Lower and upper terminals (at least 1 is required)
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByIBU({lower, upper} = {}, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		if(lower) args.set("ibu_gt", lower);
		if(upper) args.set("ibu_lt", upper);

		if(args.size === 1) 
			throw new Error("You need at least one of the two bounds to be able to get beers by IBU.");
		else {
			let data = await this.getBeers(args);
			return data;
		}
	}

	/**
	 * Returns all beers that have their EBC higher or/and lower than those passed in parameter.
	 * @param {object} bounds Lower and upper terminals (at least 1 is required)
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersByEBC({lower, upper} = {}, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		if(lower) args.set("ebc_gt", lower);
		if(upper) args.set("ebc_lt", upper);

		if(args.size === 1) 
			throw new Error("You need at least one of the two bounds to be able to get beers by EBC.");
		else {
			let data = await this.getBeers(args);
			return data;
		}
	}

	/**
	 * Returns all beers brewed before date
	 * @param {date} date Date in mm-yyyy format
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersBrewedBefore(date, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		const regex = RegExp(/^\d{2}-\d{4}$/);
		if(!regex.test(date)) {
			throw new Error("The date format is incorect! Use the following format: mm-yyyy ");
		}
		else {
			args.set("brewed_before", date);
			let data = await this.getBeers(args);
			return data;
		}
	}

	/**
	 * Returns all beers brewed after date
	 * @param {date} date Date in mm-yyyy format
	 * @param {number} nb_result Maximum number of results
	 * @returns {JSON} A JSON document with all the beers and their information.
	 */
	static async getBeersBrewedAfter(date, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		const regex = RegExp(/^\d{2}-\d{4}$/);
		if(!regex.test(date)) {
			throw new Error("The date format is incorect! Use the following format: mm-yyyy ");
		}
		else {
			args.set("brewed_after", date);
			let data = await this.getBeers(args);
			return data;
		}
	}

	/**
	 * Return a random beer
	 * @returns {JSON} A JSON document with all the information on beer.
	 */
	static async getRandomBeer() {
		let response = await fetch(`https://api.punkapi.com/v2/beers/random`);
		let data = await response.json();
		return data;
	}

}

export default Model;