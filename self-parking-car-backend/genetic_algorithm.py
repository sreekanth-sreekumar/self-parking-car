import random
import math

def compare_individuals(individual):
    return individual.fitness

def fitness_to_probability(fitness_list):
    #Find Boltzman probability
    min_val = min(fitness_list)
    temp = max(fitness_list) - min_val
    if temp == 0:
        temp = 0.0001
    scores = [math.exp(-(x - min_val)/temp) for x in fitness_list]
    sum_scores = sum(scores)
    return [score/sum_scores for score in scores]

def randum_pick_from_dist(distributions):
    sample = random.random()
    cumsum = 0
    while True:
        for i in range(len(distributions)):
            cumsum += distributions[i]
            if sample <= cumsum:
                return i
        sample = random.random()

class Individual():
    def __init__(self, genome, fitness):
        self.genome = genome
        self.fitness = fitness

    def set_fitness(fitness):
        self.fitness = fitness

class GeneticAlgorithm():
    def __init__(self, population_size, cull_ratio = 0.05, elite_ratio = 0.06, mut_prob = 0.04):
        self.pop_size = population_size
        self.cull_ratio = cull_ratio
        self.elite_ratio = elite_ratio
        self.mut_prob = mut_prob
        self.genome_length = 180     #Total of 18 coefficients converted to a 10bit representation

    def build_generation(self):
        if (hasattr(self, 'curr_gen')):
            self.build_new_generation()
        else: 
            population = [Individual([(0 if random.random() < 0.5 else 1) for _ in range(self.genome_length)], None) for _ in range(self.pop_size)]
            self.curr_gen = population
        return [ind.genome for ind in self.curr_gen]

    def set_fitness(self, fitness_values):
        if len(fitness_values) != self.pop_size:
            raise RuntimeError('Fitness values size doesnt match size of population')
        for index, value in enumerate(self.curr_gen):
            value.set_fitness(fitness_values[index])

    def elite_selection(self):
        sorted_gen = sorted(self.curr_gen, key=compare_individuals, reverse=True)
        elite_len = int(self.pop_size * self.elite_ratio)
        return self.sorted_gen[elite_len:]


    def culling(self):
        sorted_gen = sorted(self.curr_gen, key=compare_individuals, reverse=True)
        cull_len = int(self.pop_size * self.cull_ratio)
        return self.sorted_gen[:cull_len]

    def mutate(self, genome):
        for i in range(self.genome_length):
            gene = genome[i]
            mut_gene = 1 if gene == 0 else 0
            genome[i] = mut_gene if random.random() < self.mut_prob else gene
        return genome

    def mate(parent1, parent2):
        if len(parent1.genome) != len(parent2.genome):
            raise RuntimeError('Both parents are of different genome length')

        first_child_genome, second_child_genome = [], []
        for i in range(self.genome_length):
            first_chid_genome.append(parent1.genome[i] if random.random() < 0.5 else parent2.genome[i])
            second_child_genome.append(parent1.genome[i] if random.random() < 0.5 else parent2.genome[i])
        
        return Individual(self.mutate(first_chid_genome), None), Individual(self.mutate(second_child_genome), None)

    def build_new_generation(self):
        new_generation = self.elite_selection()
        for ind in new_generation:
            ind.set_fitness(None)
        
        curr_individuals = self.culling()

        probability_ind = fitness_to_probability([ind.fitness for ind in curr_individuals])

        while len(new_generation) < self.pop_size:
            parent1_ind = randum_pick_from_dist(probability_ind)
            parent2_ind = parent1_ind
            
            resample_count = 0
            while parent2_ind == parent1_ind:
                parent2_ind = randum_pick_from_dist(probability_ind)
                resample_count+=1
                if resample_count == 15:
                    parent2_ind = parent1_ind + 1
                    if (parent1_ind == (len(self.pop_size)-1)):
                        parent2_ind = parent1_ind - 1

            
            first_child, second_child = self.mate(curr_individuals[parent1_ind], curr_individuals[parent2_ind])
            new_generation.append(first_child)

            if len(new_generation) < self.pop_size:
                new_generation.append(second_child)
        self.curr_gen = new_generation
