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

	/**
	 * 
	 * @param {object} object with elements: 
	 * {string} name 
	 * {string} yeast 
	 * {string} hops 
	 * {string} malt 
	 * {string} food
	 * {object} abv with elements: {number} lower, {number} upper
	 * {object} ibu with elements: {number} lower, {number} upper
	 * {object} ebc with elements: {number} lower, {number} upper
	 * {object} brewed with elements: {date} before, {date} after mm-yyyy format
	 * @param {number} nb_result 
	 */
	static async getBeersFilter({name, yeast, hops, malt, food, abv, ibu, ebc, brewed} = {}, nb_result = 1) {
		let args = new Map();
		args.set("per_page", nb_result);

		if(name) args.set("beer_name", name.replace(/\s/, "_"));
		if(yeast) args.set("yeast", yeast.replace(/\s/, "_"));
		if(hops) args.set("hops", yeast.replace(/\s/, "_"));
		if(malt) args.set("malt", yeast.replace(/\s/, "_"));
		if(food) args.set("food", food.replace(/\s/, "_"));
		if(abv) {
			if(abv.lower || abv.upper) {
				if(abv.lower) args.set("abv_gt", abv.lower);
				if(abv.upper) args.set("abv_lt", abv.upper);
			}
			else {
				throw new Error("You need at least one of the two bounds to be able to get beers by ABV.");
			}
		}
		if(ibu) {
			if(ibu.lower || ibu.upper) {
				if(ibu.lower) args.set("ibu_gt", ibu.lower);
				if(ibu.upper) args.set("ibu_lt", ibu.upper);
			}
			else {
				throw new Error("You need at least one of the two bounds to be able to get beers by IBU.");
			}
		}
		if(ebc) {
			if(ebc.lower || ebc.upper) {
				if(ebc.lower) args.set("ebc_gt", ebc.lower);
				if(ebc.upper) args.set("ebc_lt", ebc.upper);
			}
			else {
				throw new Error("You need at least one of the two bounds to be able to get beers by EBC.");
			}
		}
		if(brewed) {
			if(brewed.before || brewed.after) {
				const regex_date = RegExp(/^\d{2}-\d{4}$/);
				const error = new Error("The date format is incorect! Use the following format: mm-yyyy ");
				if(brewed.before) {
					if(regex_date.test(brewed.before)) args.set("brewed_before", brewed.before);
					else throw error;
				}
				if(brewed.after){
					if(regex_date.test(brewed.after)) args.set("brewed_after", brewed.after);
					else throw error;
				} 
			}
		}

		let data = await this.getBeers(args);
		return data;
	}

}

export default Model;