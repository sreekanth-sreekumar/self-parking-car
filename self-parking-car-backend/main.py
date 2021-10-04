from flask import Flask
from numpy import random
from genetic_algorithm import *
from flask import jsonify

app = Flask(__name__)

gen_alg = GeneticAlgorithm(2)
gen_count = 0
GEN_MAX_COUNT = 10

@app.route('/get_cars')
def get_cars():
    global gen_alg, gen_count
    if gen_count >= GEN_MAX_COUNT:
        return []
    new_gen = gen_alg.build_generation()
    gen_count += 1
    return jsonify(new_gen)