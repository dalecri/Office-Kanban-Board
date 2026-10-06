import test from 'node:test';
import assert from 'node:assert/strict';
import { AGENTS, setTasks } from '../src/state.js';
import { getTarget, update, arrive, confetti } from '../src/office/agents.js';
import { routeTo, blocked } from '../src/office/routing.js';

function agent(id) {
  return { ...AGENTS[id], submittedTasks: new Set(), waypoints: [] };
}

test('every character can reach work, meetings, and a completed-task handoff', () => {
  for (let id = 0; id < 5; id++)
    for (const col of ['doing', 'pending', 'done']) {
      const a = agent(id);
      setTasks([{ id: 'task', agent: id, col }]);
      const target = getTarget(a);
      const route = routeTo(550, 350, target.x, target.y);
      assert.ok(route.length, `${a.name}: ${col} is reachable`);
      let previous = { x: 550, y: 350 };
      for (const point of route) {
        const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
        for (let step = 1; step < distance; step++) {
          assert.equal(
            blocked(
              previous.x + ((point.x - previous.x) * step) / distance,
              previous.y + ((point.y - previous.y) * step) / distance,
            ),
            false,
            `${a.name}: route crosses a wall or furniture`,
          );
        }
        previous = point;
      }
      assert.deepEqual(route.at(-1), { x: target.x, y: target.y });
    }
});

test('in-progress work takes precedence over pending work', () => {
  setTasks([
    { id: '1', agent: 2, col: 'pending' },
    { id: '2', agent: 2, col: 'doing' },
  ]);
  assert.equal(getTarget(agent(2)).ps, 'sit');
});

test('Pam leaves her desk for the copier after one seated minute', () => {
  setTasks([{ id: 'pam', agent: 3, col: 'doing' }]);
  const pam = {
    ...agent(3),
    x: 110,
    y: 340,
    state: 'sit',
    stateTimer: 900,
    pamSitMs: 59990,
  };
  update(pam, 1, 20);
  assert.equal(pam.pendingState, 'idle');
  assert.equal(pam.state, 'walk');
  assert.equal(pam.pamSitMs, 0);
  assert.equal(pam.targetTimer, 240);
});

test('a completed handoff emits confetti and does not repeat until work changes', () => {
  globalThis.document = { getElementById: () => ({ textContent: '' }) };
  setTasks([{ id: 'done', agent: 2, col: 'done' }]);
  const jim = { ...agent(2), pendingState: 'submit' };
  confetti.length = 0;
  arrive(jim);
  assert.equal(confetti.length, 38);
  assert.ok(jim.submittedTasks.has('done'));
  assert.equal(getTarget(jim).ps, 'done');
});
