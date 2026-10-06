import { tasks, setTasks, seed } from './state.js';
import { $, toast } from './ui/dom.js';
let db,
  saveChain = Promise.resolve();
export async function init() {
  try {
    db = await new Promise((res, rej) => {
      const r = indexedDB.open('scranton-paperwork', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('data');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    const saved = await new Promise((res, rej) => {
      const r = db.transaction('data').objectStore('data').get('tasks');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
    setTasks(Array.isArray(saved) ? saved : structuredClone(seed));
    if (!saved) persist();
  } catch (e) {
    setTasks(structuredClone(seed));
    $('saved').textContent = 'Temporary session';
    toast('Device storage is unavailable. Tasks will last for this session.');
  }
}
export function persist() {
  if (!db) return;
  $('saved').textContent = 'Saving…';
  const snapshot = structuredClone(tasks);
  saveChain = saveChain
    .then(
      () =>
        new Promise((res, rej) => {
          const t = db.transaction('data', 'readwrite');
          t.objectStore('data').put(snapshot, 'tasks');
          t.oncomplete = res;
          t.onerror = () => rej(t.error);
        }),
    )
    .then(() => {
      $('saved').textContent = 'Saved on this device';
    })
    .catch(() => {
      $('saved').textContent = 'Could not save';
      toast('Your changes could not be saved. Keep this tab open.');
    });
}
