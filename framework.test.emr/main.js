import {
  scenario_1,
} from './test/scenario_1'

import {
  scenario_2,
} from './test/scenario_2'

import {
  Test
} from './core/logic'

async function _start()
{
  Test(scenario_2);
}

_start();

