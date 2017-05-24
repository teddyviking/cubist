// config

const POLY_SIDES = 3
const CHROMOSOMES = 200
const CHROMOSOME_MUTATION_DELTA = 100
const CHROMOSOME_COLOR_DELTA = 100
const MUTATION_PROBABILITY = 3

/* devuelve la URL de la imagen a copiar */

function getRefImageUrl() {
  return 'http://dantri4.vcmedia.vn/a3HWDOlTcvMNT73KRccc/Image/2013/11/42a-83e38.jpg';
}

/* genera un individuo aleatorio */

function generateRandomIndividual(w, h) {
	const individual = {
		dna: {}
	}
	const color = { r: 0, g: 0, b: 0, a: 0.3 };
	const sides = POLY_SIDES;
	for (let i = 1; i <= CHROMOSOMES; i++) {
		individual.dna[i] = {
			color,
			sides,
			0: randomPosition(w, h),
			1: randomPosition(w, h),
			2: randomPosition(w, h)
		};
	}
	return individual;
}

function randomPosition(w, h) {
	return {x: rnd(w), y: rnd(h)};
}

function mutate(individual, w, h) {
	const descendant = {
		dna: {},
	};
	Object.values(individual.dna).forEach((chromosome, i) => {
		if (!shouldMutate()) {
			return descendant.dna[i+1] = chromosome;
		}
		return descendant.dna[i+1] = mutateChromosome(chromosome);
	});
  return descendant;
}

function shouldMutate() {
	return rnd(100) < MUTATION_PROBABILITY;
}

function mutateChromosome (chromo) {
	const mutation = {
		color: mutateColor(chromo.color),
		0: mutatePosition(chromo[0]),
		1: mutatePosition(chromo[1]),
		2: mutatePosition(chromo[2])
	};
	return Object.assign({}, chromo, mutation);
}

function mutateColor (color) {
	const mutation = {
		r: rndVariation(color.r, CHROMOSOME_COLOR_DELTA),
		g: rndVariation(color.g, CHROMOSOME_COLOR_DELTA),
		b: rndVariation(color.b, CHROMOSOME_COLOR_DELTA),
	};
	return Object.assign({}, color, mutation);
}

function mutatePosition (position) {
	const mutation = {
		x: rndVariation(position.x, CHROMOSOME_MUTATION_DELTA),
		y: rndVariation(position.y, CHROMOSOME_MUTATION_DELTA),
	}
	return mutation;
}
