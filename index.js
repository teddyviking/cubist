// config

const POLY_SIDES = 3;
const CHROMOSOMES = 200;
const CHROMOSOME_MUTATION_DELTA = 100;
const CHROMOSOME_COLOR_DELTA = 100;
const MUTATION_PROBABILITY = 3;
const INITIAL_COLOR = { r: 0, g: 0, b: 0, a: 0.3 };

/* devuelve la URL de la imagen a copiar */

function getRefImageUrl() {
  return 'https://avatars3.githubusercontent.com/u/876570?v=3&s=460';
  // return 'http://dantri4.vcmedia.vn/a3HWDOlTcvMNT73KRccc/Image/2013/11/42a-83e38.jpg';
}

/* genera un individuo aleatorio */

function generateRandomIndividual(w, h) {
	const individual = {
		dna: {}
	};
	for (let i = 1; i <= CHROMOSOMES; i++) {
		const positions = generateRandomPositions(POLY_SIDES, w, h);
		individual.dna[i] = new Chromosome(INITIAL_COLOR, POLY_SIDES, positions);
	}
	// Mutant.prototype = individual;
	return individual;
}

function generateRandomPositions(total, w, h) {
	const positions = [];
	for (let i = 0; i < total; i++) {
		positions.push(randomPosition(w, h));
	}
	return positions;
}

function randomPosition(w, h) {
	return {x: rnd(w), y: rnd(h)};
}

function mutate(individual, w, h) {
	var mutant = new Mutant(individual.dna);
  return mutant;
}

function Mutant (dna) {
	this.dna = {};
	for(let key in dna) {
		let chromosome = dna[key];
		if (chromosome.shouldMutate()) {
			this.dna[key] = chromosome.mutate();
		} else {
			this.dna[key] = chromosome;
		}
	}
}

function Chromosome (color, sides, positions) {
	this.color = color;
	this.sides = sides;
	positions.forEach((position, i) => {
		return this[i] = position;
	});
}

Chromosome.prototype.shouldMutate = function (probability) {
	if (!probability) probability = MUTATION_PROBABILITY;
	return rnd(100) < probability; //TODO: make the mutation probability a property of Chromosome
}

Chromosome.prototype.mutate = function () {
	const color = mutateColor.call(this, this.color);
	const positions = [];
	for (let i = 0; i < this.sides; i++) {
		positions.push(mutatePosition.call(this, this[i]));
	}
	return new Chromosome(color, this.sides, positions);
}


function mutateColor (color) {
	const attributes = ['r', 'g', 'b'];
	const mutation = {};
	attributes.forEach((attribute) => {
		if (this.shouldMutate && this.shouldMutate(100)) {
			mutation[attribute] = rndVariation(color[attribute], CHROMOSOME_COLOR_DELTA)
		}
	})
	return Object.assign({}, color, mutation);
}

function mutatePosition (position) {
	const mutation = {};
	for (let key in position) {
		if (this.shouldMutate && this.shouldMutate(45)) {
			mutation[key] = rndVariation(position[key], CHROMOSOME_MUTATION_DELTA);
		}
	}
	return Object.assign({}, position, mutation);
}
